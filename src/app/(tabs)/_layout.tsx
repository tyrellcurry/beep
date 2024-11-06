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
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: Platform.OS === "ios" ? 90 : 65,
          paddingVertical: Platform.OS === "ios" ? 10 : 5,
          paddingHorizontal: 5,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F0F1",
          borderRadius: 50,
          position: "absolute",
          bottom: Platform.OS === "ios" ? 15 : 10,
          width: "90%",
          alignSelf: "center",
          left: 20,
        },
      }}
    >
      <Tabs.Screen
        name="Location"
        options={{
          title: "Location",
          tabBarIcon: ({ color }) => <Ionicons name="location-outline" size={24} color="black" />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>{({ pressed }) => <FontAwesome name="info-circle" size={25} color={Colors[colorScheme ?? "light"].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />}</Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="Emergency"
        options={{
          title: "Emergency",
          tabBarIcon: ({ color }) => <MaterialIcons name="emergency" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="SafeZone"
        options={{
          title: "SafeZone",
          tabBarIcon: ({ color }) => <AntDesign name="Safety" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: () => <Image source={{ uri: profileImageUrl }} style={{ width: 24, height: 24, borderRadius: 12 }} />,
        }}
      />
    </Tabs>
  );
}
