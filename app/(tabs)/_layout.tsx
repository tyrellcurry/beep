import React from "react";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { Platform } from "react-native";
import { useNavigationState } from "@react-navigation/native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import TabStyles from "@/components/tabStyles";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // TODO: need to change real user info
  const profileImageUrl = "https://i.pravatar.cc/300";

  // TODO: change tab background color based on which screen it is on but the route is showing (tab)
  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });
  // console.log(currentRouteName);

  const getTabBarBackgroundColor = () => {
    switch (currentRouteName) {
      case "Location":
        return "#000"; // Background color for Location screen
      default:
        return "#FFF"; // Default background color
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, false),
        tabBarStyle: {
          ...TabStyles.tabBarStyle,
          backgroundColor: getTabBarBackgroundColor(),
        },
        tabBarItemStyle: TabStyles.tabBarItemStyle,
        tabBarLabelStyle: TabStyles.tabBarLabelStyle,
      }}
    >
      <Tabs.Screen
        name="Location"
        options={{
          title: "Location",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/LocationNavPurpleFilled.png") // Image for active state
                  : require("@/assets/icons/LocationNavBlack.png") // Image for inactive state
              }
              style={TabStyles.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Emergency"
        options={{
          title: "Emergency",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/SOSPurpleFilled.png") // Image for active state
                  : require("@/assets/icons/SOSBlackHollow.png") // Image for inactive state
              }
              style={TabStyles.tabIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SafeZone"
        options={{
          title: "SafeZone",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/EmergencyPurpleFilled.png") // Image for active state
                  : require("@/assets/icons/EmergencyBlack.png") // Image for inactive state
              }
              style={{ width: 30, height: 25, resizeMode: "contain" }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <Image source={{ uri: profileImageUrl }} style={{ width: 24, height: 24, borderRadius: 12 }} />,
          tabBarItemStyle: {
            flex: 1,
            marginLeft: -5,
            marginBottom: Platform.OS === "ios" ? 0 : 10,
          },
        }}
      />
    </Tabs>
  );
}
