import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "@/src/components/Themed";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.profileImage} />
      <Text style={styles.status}>Stay safe,</Text>
      <Text style={styles.name}>Dora</Text>
      <Text style={styles.username}>@dora.the.explorer</Text>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.contactContainer}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <View style={styles.contacts}>
          <View style={styles.contactItem}>
            <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.contactImage} />
            <Text style={styles.contactName}>Mom</Text>
          </View>
          <View style={styles.contactItem}>
            <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.contactImage} />
            <Text style={styles.contactName}>Dad</Text>
          </View>
          <View style={styles.contactItem}>
            <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.contactImage} />
            <Text style={styles.contactName}>Deluka</Text>
          </View>
          <View style={styles.contactItem}>
            <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.contactImage} />
            <Text style={styles.contactName}>Brian</Text>
          </View>
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.addContactButton}>
              <Text style={styles.addContactText}>+</Text>
            </View>
            <Text style={styles.contactName}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingsBox}>
          <Text style={styles.settingsText}>Settings</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsArrow}>→</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.nightModeBox}>
          <Text style={styles.settingsText}>Night Mode</Text>
          <Text style={styles.moonIcon}>🌙</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 70,
    marginTop: 20,
  },
  status: {
    color: "#AAA",
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  username: {
    color: "#AAA",
    marginBottom: 20,
  },
  editButton: {
    borderColor: "#651FD7",
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  editButtonText: {
    color: "#FFF",
  },
  contactContainer: {
    width: "90%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  contacts: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactItem: {
    alignItems: "center",
  },
  contactName: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },

  addContactButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
  },
  addContactText: {
    fontSize: 24,
    color: "#FFF",
  },
  settingsContainer: {
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  settingsBox: {
    width: "45%",
    backgroundColor: "#651FD7",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  nightModeBox: {
    width: "45%",
    backgroundColor: "#1A1A1A",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  settingsText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  settingsButton: {
    marginTop: 10,
  },
  settingsArrow: {
    fontSize: 20,
    color: "#FFF",
  },
  moonIcon: {
    fontSize: 24,
    color: "#FFF",
    marginTop: 10,
  },
  signOutButton: {
    backgroundColor: "#FF005C",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 20,
    marginBottom: 20,
  },
  signOutText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});
