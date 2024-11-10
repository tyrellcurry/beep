import React from "react";
import { StyleSheet, Image, TouchableOpacity, ScrollView, View } from "react-native";
import { Text } from "@/src/components/Themed";
import { useRouter } from "expo-router";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons"; // 아이콘 라이브러리 추가

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
      <View style={styles.editHeader}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Dora Lee</Text>
          <Text style={styles.username}>@dora123</Text>
          <Text style={styles.address}>🏡 3700 Willingdon Ave...</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>☎️ Emergency Contacts</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.contacts}>
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.addContactButton}>
              <Text style={styles.addContactText}>+</Text>
            </View>
            <Text style={styles.contactName}>Add</Text>
          </TouchableOpacity>
          <View style={styles.contactItem}>
            <View style={styles.contactCircle}>
              <Text style={styles.contactInitial}>D</Text>
            </View>
            <Text style={styles.contactName}>Dad</Text>
          </View>
          <View style={styles.contactItem}>
            <View style={styles.contactCircle}>
              <Text style={styles.contactInitial}>M</Text>
            </View>
            <Text style={styles.contactName}>Mom</Text>
          </View>
          <View style={styles.contactItem}>
            <View style={styles.contactCircle}>
              <Text style={styles.contactInitial}>J</Text>
            </View>
            <Text style={styles.contactName}>Jane</Text>
          </View>
          <TouchableOpacity style={styles.arrowContainer}>
            <Text style={styles.arrowText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Section */}
      <Text style={styles.sectionTitle}>⚙️ Settings</Text>
      <View style={styles.settingContainer}>
        {[
          { icon: <FontAwesome5 name="user" size={24} color="white" />, title: "   Profile & Account" },
          { icon: <MaterialIcons name="brush" size={24} color="white" />, title: "   Customizations" },
          { icon: <Ionicons name="notifications-outline" size={24} color="white" />, title: "   Notifications" },
          { icon: <FontAwesome5 name="baby" size={24} color="white" />, title: "   Parental Control" },
          { icon: <FontAwesome5 name="file-alt" size={24} color="white" />, title: "   Policies & Legal" },
          { icon: <Ionicons name="chatbox-ellipses-outline" size={24} color="white" />, title: "  Support & Feedback" },
        ].map((setting, index) => (
          <TouchableOpacity key={index} style={styles.settingsRow}>
            {/* 아이콘과 텍스트를 함께 보여주는 구조 */}
            <View style={styles.iconAndText}>
              {setting.icon}
              <Text style={styles.settingsText}>{setting.title}</Text>
            </View>
            {/* 화살표 */}
            <Ionicons name="chevron-forward-outline" size={20} color="#AAA" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out and Delete Buttons */}
      <TouchableOpacity style={styles.signOutButton} onPress={() => router.push("/")}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141216",
    paddingHorizontal: 16,
  },
  editHeader: {
    backgroundColor: "#141216",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 5,
    justifyContent: "flex-end",
  },
  header: {
    backgroundColor: "#141216",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#141216",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  username: {
    color: "#AAA",
    fontSize: 14,
  },
  address: {
    color: "#AAA",
    fontSize: 12,
  },
  editButton: {
    backgroundColor: "#333",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 5,
    width: 55,
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 12,
  },
  sectionContainer: {
    backgroundColor: "#333",
    borderRadius: 25,
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  settingContainer: {
    backgroundColor: "#141216",
    marginBottom: 10,
    marginTop: 5,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  contacts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#333",
  },
  contactItem: {
    alignItems: "center",
    backgroundColor: "#333",
  },
  addContactButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#141216",
    borderColor: "#FFF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addContactText: {
    fontSize: 24,
    color: "#FFF",
  },
  contactCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4B0082",
    alignItems: "center",
    justifyContent: "center",
  },
  contactInitial: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  contactName: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 5,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444",
    borderRadius: 15,
    marginLeft: 5,
  },
  arrowText: {
    color: "#FFF",
    fontSize: 16,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: "#444",
    paddingHorizontal: 30,
    marginVertical: 5,
  },
  iconAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsText: {
    fontSize: 16,
    color: "#FFF",
  },
  settingsArrow: {
    fontSize: 16,
    color: "#AAA",
  },
  signOutButton: {
    backgroundColor: "#FF005C",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  signOutText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#141216",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FF005C",
    alignItems: "center",
    marginBottom: 20,
  },
  deleteButtonText: {
    color: "#FF005C",
    fontWeight: "bold",
    fontSize: 16,
  },
});
