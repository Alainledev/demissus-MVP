import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Toast from "react-native-toast-message"
import { MaterialIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";

import ArchiveProducts from "./screens/ArchiveProducts";
import Cart from "./screens/Cart";
import ArticlesUsers from "./screens/ArticlesUsers";
import BreadAndPastries from "./screens/BreadAndPastries";
import CreamAndDairy from "./screens/CreamAndDairy";
import CreateUsers from "./screens/CreateUsers";
import DeleteAccountUser from "./screens/DeleteAccountUser";
import Drinks from "./screens/Drinks";
import EditEmailUser from "./screens/EditEmailUser";
import EditPasswordUser from "./screens/EditPasswordUser";
import FrozenFoods from "./screens/FrozenFoods";
import FruitsAndVegetables from "./screens/FruitsAndVegetables";
import HomePage from "./screens/HomePage";
import InfoUsers from "./screens/InfoUsers";
import MeatsAndFishes from "./screens/MeatsAndFishes";
import MyProfile from "./screens/MyProfile";
import SaltyGrocery from "./screens/SaltyGrocery";
import StartingPage from "./screens/StartingPage";
import SweetGrocery from "./screens/SweetGrocery";
import Mapping from "./screens/Mapping";
import Login from "./screens/Login";
import { LogBox } from 'react-native';


import user from "./reducers/users";
import ProductDetails from "./screens/ProductDetails";

LogBox.ignoreAllLogs();
const reducers = combineReducers({ user });

const persistConfig = {
  key: "Demissus", 
  storage: AsyncStorage, 
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const InternalNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FruitsAndVegetables"
        component={FruitsAndVegetables}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MeatsAndFishes"
        component={MeatsAndFishes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SweetGrocery"
        component={SweetGrocery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SaltyGrocery"
        component={SaltyGrocery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BreadAndPastries"
        component={BreadAndPastries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drinks"
        component={Drinks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FrozenFoods"
        component={FrozenFoods}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreamAndDairy"
        component={CreamAndDairy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArchiveProducts"
        component={ArchiveProducts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InfoUsers"
        component={InfoUsers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticlesUsers"
        component={ArticlesUsers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditEmailUser"
        component={EditEmailUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPasswordUser"
        component={EditPasswordUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeleteAccountUser"
        component={DeleteAccountUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Mapping"
        component={Mapping}
        options={{ headerShown: false }}
      />
      <Stack.Screen  
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'house';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffcb6b',
        tabBarInactiveTintColor: '#E8F2FF',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#062954',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          height: 60,
          position: 'absolute',
          paddingBottom: 5,
          marginBottom: 20,
          marginLeft: 30,
          marginRight: 30,
        
        },
      })}
    >
      <Tab.Screen name="Home" component={InternalNavigation} />
      <Tab.Screen name="Profile" component={CreateUsers} />
    </Tab.Navigator>
  );
};



export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Jost-Regular": require("./assets/fonts/Jost-Regular.ttf"),
    "Jost-Medium": require("./assets/fonts/Jost-Medium.ttf"),
    "Jost-SemiBold": require("./assets/fonts/Jost-SemiBold.ttf"),
    "Jost-Bold": require("./assets/fonts/Jost-Bold.ttf"),
    "Jost-ExtraBold": require("./assets/fonts/Jost-ExtraBold.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartingPage} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </Provider>
  );
}
