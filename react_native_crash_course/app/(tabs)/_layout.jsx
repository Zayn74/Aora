import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'


const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height:70
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <Image
                  source={require("../../assets/icons/home.png")}
                  resizeMode="contain"
                  tintColor={color}
                  className="w-6 h-6"
                />
                <Text
                  className={`${
                    focused ? "font-psemibold" : "font-pregular"
                  } text-xs mt-1 text-white`}
                >
                  Home
                </Text>
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="Create"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <Image
                  source={require("../../assets/icons/plus.png")}
                  resizeMode="contain"
                  tintColor={color}
                  className="w-6 h-6"
                />
                <Text
                  className={`${
                    focused ? "font-psemibold" : "font-pregular"
                  } text-xs mt-1 text-white`}
                >
                  Create
                </Text>
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <>
                <Image
                  source={require("../../assets/icons/profile.png")}
                  resizeMode="contain"
                  tintColor={color}
                  className="w-6 h-6"
                />
                <Text
                  className={`${
                    focused ? "font-psemibold" : "font-pregular"
                  } text-xs mt-1 text-white`}
                >
                  Profile
                </Text>
              </>
            ),
          }}
        />
      </Tabs>
      
    </>
  );
}

export default TabLayout