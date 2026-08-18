import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default function Input({ label, value, onChangeText, placeholder, secureTextEntry = false, keyboardType = "default" }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 7 },
  label: { fontSize: 14, fontWeight: "700", color: COLORS.text },
  input: {
    height: 52, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: 13, paddingHorizontal: 15, color: COLORS.text,
    backgroundColor: "#fff", fontSize: 15
  }
});
