import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

export default function Logo({ small = false }) {
  return (
    <View style={styles.row}>
      <View style={[styles.mark, small && styles.smallMark]}>
        <Text style={[styles.markText, small && styles.smallText]}>C</Text>
      </View>
      <Text style={[styles.text, small && styles.smallTitle]}>Capstone</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  mark: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center", justifyContent: "center"
  },
  markText: { color: "#fff", fontWeight: "900", fontSize: 22 },
  text: { color: COLORS.text, fontSize: 21, fontWeight: "800" },
  smallMark: { width: 32, height: 32, borderRadius: 9 },
  smallText: { fontSize: 18 },
  smallTitle: { fontSize: 17 }
});
