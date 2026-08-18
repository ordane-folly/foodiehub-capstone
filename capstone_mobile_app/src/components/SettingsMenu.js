import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { COLORS, shadow } from "../constants/theme";

export default function SettingsMenu({ visible, onClose, onSettings, onProfile, onLogout }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menu}>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity style={styles.item} onPress={onProfile}>
            <Text style={styles.icon}>👤</Text><Text style={styles.label}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={onSettings}>
            <Text style={styles.icon}>⚙️</Text><Text style={styles.label}>Paramètres</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={onLogout}>
            <Text style={styles.icon}>↪</Text><Text style={[styles.label, { color: COLORS.danger }]}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(15,23,42,.25)", alignItems: "flex-end" },
  menu: { marginTop: 72, marginRight: 16, width: 230, backgroundColor: "#fff", borderRadius: 18, padding: 14, ...shadow },
  title: { fontSize: 18, fontWeight: "900", color: COLORS.text, marginBottom: 8 },
  item: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14 },
  icon: { fontSize: 19, width: 25 },
  label: { fontSize: 15, fontWeight: "700", color: COLORS.text }
});
