import { StyleSheet, Platform } from "react-native";

const TabStyles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === "ios" ? 60 : 60,
    paddingVertical: Platform.OS === "ios" ? 30 : 8,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 0,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 10,
    left: "5%",
    right: "5%",
    marginLeft: Platform.OS === "ios" ? 10 : 0,
    width: "95%",
    alignSelf: "center",
    zIndex: 100,
    backgroundColor: "#FFF", //hard coded for now
  },
  tabBarItemStyle: {
    marginBottom: Platform.OS === "ios" ? 0 : 10,
  },
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  tabBarLabelStyle: {
    bottom: Platform.OS === "ios" ? -5 : 0,
    fontSize: Platform.OS === "ios" ? 12 : 10,
  },
});

export default TabStyles;
