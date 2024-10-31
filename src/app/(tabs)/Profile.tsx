import { StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useRouter } from "expo-router";

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

      <Text style={styles.sectionTitle}>⚙️ Settings</Text>
      <View style={styles.settingContainer}>
        {["Languages", "Notifications", "Password", "Parental Control", "Text Sizing", "Theme", "Content Policy", "Privacy Policy", "User Agreement", "Our Team", "Report Issue"].map((setting, index) => (
          <TouchableOpacity key={index} style={styles.settingsRow}>
            <Text style={styles.settingsText}>{setting}</Text>
            <Text style={styles.settingsArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 16,
  },
  editHeader: {
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
    justifyContent: "flex-end",
  },
  header: {
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
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
    backgroundColor: "#1A1A1A",
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
    paddingHorizontal: 12,
    paddingVertical: 5,
    width: 50,
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 12,
  },
  sectionContainer: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  settingContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
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
    backgroundColor: "#1A1A1A",
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
    borderRadius: 10,
    backgroundColor: "#444",
    paddingHorizontal: 16,
    marginVertical: 5,
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
    backgroundColor: "#1A1A1A",
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
