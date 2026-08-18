import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS } from "../constants/theme";

export default function PrimaryButton({ title, onPress, loading = false, secondary = false }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
      style={[styles.button, secondary && styles.secondary]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? COLORS.primary : "#fff"} />
      ) : (
        <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52, borderRadius: 14, alignItems: "center",
    justifyContent: "center", backgroundColor: COLORS.primary, paddingHorizontal: 20
  },
  secondary: { backgroundColor: "#EFF6FF", borderWidth: 1, borderColor: "#BFDBFE" },
  text: { color: "#fff", fontWeight: "800", fontSize: 16 },
  secondaryText: { color: COLORS.primary }
});
