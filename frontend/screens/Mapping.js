import * as React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Pressable, Linking } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyle";
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import Constants from "expo-constants";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

export default function Mapping() {
    const user= useSelector((state)=> state.user.value) 
    const cart= user.cart;
    // console.log("cart",cart);
    const [productData, setProductData]= useState([]);
    const [storeMarkers, setStoreMarkers]= useState([]);
    const location = user.location.address ? user.location : {latitude: 48.8603769, longitude: 2.3327577}
    // console.log("userlocation:",location);
    useEffect(() => {
        (async () => {
          let expoAddress="";
          try {
            if (Constants.expoConfig.hostUri) {    //Get the host URI from the config            
              
              const regex = /^([\d.]+)(?::(\d+))?$/; //Extract every string made of numbers with an optional capture of numbers after ':' ((?::(\d+))?)
              const match = Constants.expoConfig.hostUri.match(regex); 

              if (match) {                  
                  expoAddress = match[1];//We match the host URI against the regex to extract the host only. Can also match the port at [2]
              }
          }
          } catch (error) {
            console.error('Error fetching Expo development URL:', error);
          }
          let fetchData=[];
          for (let cart_item of cart){
            
            const response= await fetch(`http://${expoAddress}:3000/products/getByUrl`, { //Because products were made identical by their image URL, we query by product image URL instead of ids
              method: 'POST', //POST is necessary because URLS are not allowed as GET requests parameters
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                urlImage: cart_item.productImage
              })
            });          
            const data= await response.json();

            if (data.result){
              fetchData.push(data.produits)
            }
          }
          setProductData(fetchData);                
        })();
        
      }, []);
    //3 objects cause I don't wanna loop the same data array 3 times in a row
    let totalPerStore={} 
    const storeAvailability = {}; //store if all cart items are available in each store
    const storeAddresses= {}; //get each store address for map use
    if(productData.length>0){
      for (let product of productData){
        product.forEach(item=>{  //product correspond à un produit du panier. Item correspond à ce produit dans chaque enseigne. 
          console.log("doing cart total for:", item)
          const quantity = cart.find(cart_item => item.productName === cart_item.name).quantity; //Lookup the quantity for the current item
          console.log("quantity:", quantity)
          const storeName= item.info.store.name;          
          const price= parseFloat(item.info.price.replace('€', '').replace(',', '.'))*quantity
          if (!totalPerStore[storeName]) {
            totalPerStore[storeName] = {
              store: item.info.store,
              totalCost: price,
            };
          } else {
            totalPerStore[storeName].totalCost += price;
          }

          //registers article names into an array of stores, used to check item avaliability per store
          if (!storeAvailability[storeName]) {
            storeAvailability[storeName] = [item.name];
          } else {
            storeAvailability[storeName].push(item.name);
          }
          if (!storeAddresses[storeName]) {
            storeAddresses[storeName] = item.info.store.address;
          }
        });
      }
    }
    //If a store doesn't have all the items in our cart, we remove it from the calculations
    for (key in storeAvailability){
      if (storeAvailability[key].length!==cart.length){
        delete totalPerStore[key];
        delete storeAddresses[key];
      }
    }
    
    totalPerStore= Object.values(totalPerStore).sort((a, b)=>{
      return a.totalCost-b.totalCost;
    });

    // console.log("addresses:", storeAddresses);
    

    const getMarkerLocations = async (storeName, storeAddress, i) => {      
      const response= await fetch(`https://api-adresse.data.gouv.fr/search/?q=${storeAddress}`);
      const data= await response.json();
      const location = data.features[0];
      const locationData = {            
        latitude: location.geometry.coordinates[1],
        longitude: location.geometry.coordinates[0],
      };
      // console.log(storeName, locationData);
      return(
          <Marker coordinate={{latitude: locationData.latitude, longitude: locationData.longitude}}     
          title="Store location"
          pinColor="navy"
          key={i}
          >
          <Callout onPress={()=>{openGMaps(storeAddress)}}>
            <View>
              <Text style={styles.marker_title}>{storeName}</Text>
              <Text style={styles.marker_desc}>{storeAddress}</Text>
              <Text>Tap to Go</Text>
            </View>
          </Callout>
        </Marker>
        )
      }
    //In a useEffect cause I need the store geolocation for those markers before it tries to display the map
      useEffect(() => {
        
        const createMarkers = async () => {
          const markers = await Promise.all( //Wait for geolocation of all store markers
            Object.entries(storeAddresses).map(async ([storeName, storeAddress], i) => {
              return getMarkerLocations(storeName, storeAddress, i);
            })
          );
          setStoreMarkers(markers);
        };
        createMarkers();
      }, [productData]); //Because productData contain store infos, if a new Store appears it needs to be updated on the map


    const cheapeastStores= totalPerStore.map((data,i)=>{
      return (
        <View style={styles.cell} key={i}>    
            <View style={styles.storeListing}>
                <Image
                    style={styles.logoView}
                    contentFit="contain"                          
                    source={{uri: data.store.logoUrl}}
                />
                <View style={[styles.storeListingCol, styles.contentText]}>
                  <Text style={{fontSize: FontSize.size_lg}} >{data.store.name}</Text>
                  <Text>{data.totalCost.toFixed(2)+'€'}</Text>
                </View>
            </View>
        </View>
      )
    })

    //Redirect to GMaps when the map Popover is clicked
    function openGMaps(destination){      
      const origin= user.location.address;
      const mapsUrl = `https://maps.apple.com/?saddr=${origin}&daddr=${destination}`;
      Linking.openURL(mapsUrl).catch(err => console.error('An error occurred', err));
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Text style={styles.title}>Comparateur</Text>
            <View >
              <ScrollView horizontal={true}>
                {cheapeastStores}
              </ScrollView>
              <MapView
              region={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.11,
                  longitudeDelta: 0.11,
              }}
              
              // latitudeDelta: 0.0922,
              // longitudeDelta: 0.0421,
              
              style = {styles.map} 
              >
                <Marker coordinate={{latitude: location.latitude, longitude: location.longitude}}     
                  title="Marker Title"
                  description="Marker Description">
                  <Callout>
                    <View>
                      <Text style={styles.marker_title}>My position</Text>
                      <Text style={styles.marker_desc}>{location.address}</Text>
                    </View>
                  </Callout>
                </Marker>
                {storeMarkers.map((marker, index) => (
                  <>{marker}</>
                ))}
              </MapView>
            </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: "20%",
      },
      map : {
        width: "100%",
        height: 400,
        alignSelf : 'flex-end',
        marginRight : 10
        },  

      title: {
        fontSize: FontSize.size_5xl,
        fontWeight: "800",
        color: Color.darkslateblue_100,
        textAlign: "center",
        marginTop: 15,
      },
      cell: {        
        margin: 10,    
        padding: 15,
        width: "30%",
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
      },
      logoView:{
        width: 100,
        height:50
      },
      contentText:{
        display: "flex",
        flexWrap: "nowrap",    
        width: "100%"    
      },
      marker_title:{
        fontSize: FontSize.size_xl,
        fontWeight: "800",
        color: Color.darkslateblue_100,
        textAlign: "center",
        marginTop: 15,
      },
      marker_desc: {
        fontSize: FontSize.size_xs,
        fontWeight: "40",
        color: Color.darkslateblue_100,
        textAlign: "center",
        marginTop: 15,
      }
    });
        