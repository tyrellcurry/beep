import { StyleSheet, Platform } from "react-native";

const TabStyles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === "ios" ? 85 : 60,
    paddingVertical: Platform.OS === "ios" ? 15 : 8,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 0,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 15 : 10,
    left: "5%",
    right: "5%",
    width: "90%",
    alignSelf: "center",
    zIndex: 1,
  },
  tabBarItemStyle: {
    marginBottom: Platform.OS === "ios" ? 0 : 10,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default TabStyles;
