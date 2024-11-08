import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Platform } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // need to change real user info
  const profileImageUrl = "https://i.pravatar.cc/300";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, false),
        tabBarStyle: {
          height: Platform.OS === "ios" ? 70 : 60,
          paddingVertical: Platform.OS === "ios" ? 12 : 8,
          paddingHorizontal: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F0F1",
          borderRadius: 50,
          position: "absolute",
          bottom: Platform.OS === "ios" ? 15 : 10,
          left: "5%",
          right: "5%",
          width: "90%",
          alignSelf: "center",
          zIndex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Location"
        options={{
          title: "Location",
          tabBarIcon: ({ focused }) => <Image
            source={
              focused
                ? require("../../../assets/icons/LocationNavPinkFilled.png") // Image for active state
                : require("../../../assets/icons/LocationNavBlack.png") // Image for inactive state
            }
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>{({ pressed }) => <FontAwesome name="info-circle" size={25} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="Emergency"
        options={{
          title: "Emergency",
          tabBarIcon: ({ focused }) => <Image
            source={
              focused
                ? require("../../../assets/icons/SOSPinkFilled.png") // Image for active state
                : require("../../../assets/icons/SOSBlackHollow.png") // Image for inactive state
            }
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />,
        }}
      />
      <Tabs.Screen
        name="SafeZone"
        options={{
          title: "SafeZone",
          tabBarIcon: ({ focused }) => <Image
            source={
              focused
                ? require("../../../assets/icons/EmergencyPinkFilled.png") // Image for active state
                : require("../../../assets/icons/EmergencyBlack.png") // Image for inactive state
            }
            style={{ width: 30, height: 25, resizeMode: "contain" }}
          />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: () => (
            <Image
              source={{ uri: profileImageUrl }}
              style={{ width: 24, height: 24, borderRadius: 12 }}
            />
          ), tabBarItemStyle: {
            flex: 1,
            marginLeft: -5,
          },
        }}
      />
    </Tabs>
  );
}
