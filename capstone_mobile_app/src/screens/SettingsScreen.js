import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native";
import { COLORS } from "../constants/theme";
import { storage } from "../services/storage";
import { configureNotifications, sendTestNotification } from "../services/notifications";

export default function SettingsScreen({ user, onBack }) {
  const [notifications, setNotifications] = useState(true);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    storage.getSettings().then((s) => setNotifications(s.notifications));
    storage.debugDump().then(setLocalData);
  }, []);

  async function toggleNotifications(value) {
    setNotifications(value);
    await storage.saveSettings({ notifications: value });
    if (value) {
      const granted = await configureNotifications();
      if (!granted) {
        setNotifications(false);
        await storage.saveSettings({ notifications: false });
        Alert.alert("Notifications", "Permission non accordée.");
      }
    }
  }

  async function testNotification() {
    const granted = await configureNotifications();
    if (!granted) {
      Alert.alert("Notifications", "Veuillez autoriser les notifications.");
      return;
    }
    await sendTestNotification();
    Alert.alert("Succès", "Notification de test programmée.");
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={onBack}><Text style={styles.backText}>‹</Text></TouchableOpacity>
        <Text style={styles.title}>Paramètres</Text>
      </View>

      <View style={styles.profile}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{user.username.charAt(0).toUpperCase()}</Text></View>
        <View>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <Text style={styles.section}>Préférences</Text>
      <View style={styles.item}>
        <View><Text style={styles.itemTitle}>Notifications</Text><Text style={styles.itemText}>Recevoir les alertes de l'application</Text></View>
        <Switch value={notifications} onValueChange={toggleNotifications} />
      </View>

      <TouchableOpacity style={styles.test} onPress={testNotification}>
        <Text style={styles.testTitle}>🔔 Tester une notification</Text>
        <Text style={styles.itemText}>Déclenche une notification locale de démonstration</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Stockage local</Text>
      <View style={styles.storage}>
        <Text style={styles.itemTitle}>Données persistantes</Text>
        <Text style={styles.itemText}>Session : {localData?.session ? "active" : "aucune"}</Text>
        <Text style={styles.itemText}>Favoris : {localData?.favorites?.length ?? 0}</Text>
        <Text style={styles.itemText}>Utilisateurs : {localData?.users?.length ?? 0}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background, padding: 18, paddingTop: 48 },
  header: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 22 },
  back: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  backText: { fontSize: 35, lineHeight: 35 },
  title: { fontSize: 25, fontWeight: "900", color: COLORS.text },
  profile: { backgroundColor: "#fff", borderRadius: 18, padding: 18, flexDirection: "row", alignItems: "center", gap: 14 },
  avatar: { width: 55, height: 55, borderRadius: 28, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 22, fontWeight: "900" },
  name: { fontSize: 17, fontWeight: "900", color: COLORS.text },
  email: { color: COLORS.muted, marginTop: 4 },
  section: { fontSize: 14, fontWeight: "900", color: COLORS.muted, marginTop: 24, marginBottom: 9, textTransform: "uppercase" },
  item: { backgroundColor: "#fff", borderRadius: 17, padding: 17, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  itemTitle: { color: COLORS.text, fontWeight: "800", fontSize: 15 },
  itemText: { color: COLORS.muted, marginTop: 5, fontSize: 12 },
  test: { backgroundColor: "#EFF6FF", borderRadius: 17, padding: 17, marginTop: 10 },
  testTitle: { color: COLORS.primary, fontWeight: "900", fontSize: 15 },
  storage: { backgroundColor: "#fff", borderRadius: 17, padding: 17, gap: 4 }
});
