import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { COLORS, shadow } from "../constants/theme";
import { storage } from "../services/storage";
import PrimaryButton from "../components/PrimaryButton";

export default function DetailScreen({ product, onBack }) {
  const [favorite, setFavorite] = useState(false);

  React.useEffect(() => {
    storage.getFavorites().then((ids) => setFavorite(ids.includes(product.id)));
  }, [product.id]);

  async function toggle() {
    const ids = await storage.getFavorites();
    const next = ids.includes(product.id) ? ids.filter((x) => x !== product.id) : [...ids, product.id];
    await storage.saveFavorites(next);
    setFavorite(next.includes(product.id));
  }

  return (
    <View style={styles.page}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.back} onPress={onBack}><Text style={styles.backText}>‹</Text></TouchableOpacity>
        <Text style={styles.topTitle}>Détails</Text>
        <TouchableOpacity style={styles.back} onPress={toggle}><Text style={styles.heart}>{favorite ? "♥" : "♡"}</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <View style={styles.body}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.row}>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.rating}>★ {product.rating}</Text>
          </View>
          <Text style={styles.section}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.infoBox}>
            <Text style={styles.info}>Stock : {product.stock}</Text>
            <Text style={styles.info}>Marque : {product.brand || "Standard"}</Text>
            <Text style={styles.info}>Réduction : {product.discountPercentage}%</Text>
          </View>
          <PrimaryButton title={favorite ? "Retirer des favoris" : "Ajouter aux favoris"} onPress={toggle} secondary={favorite} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background, paddingTop: 46 },
  topbar: { height: 58, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  back: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", ...shadow },
  backText: { fontSize: 35, color: COLORS.text, lineHeight: 35 },
  heart: { fontSize: 21, color: COLORS.favorite },
  topTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text },
  image: { width: "100%", height: 320, resizeMode: "cover", backgroundColor: "#E2E8F0" },
  body: { padding: 20, gap: 12 },
  category: { color: COLORS.primary, fontWeight: "800", textTransform: "uppercase", fontSize: 12 },
  title: { fontSize: 28, fontWeight: "900", color: COLORS.text },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: 24, fontWeight: "900", color: COLORS.text },
  rating: { color: COLORS.warning, fontWeight: "900" },
  section: { fontSize: 17, fontWeight: "900", marginTop: 8, color: COLORS.text },
  description: { color: COLORS.muted, lineHeight: 22 },
  infoBox: { backgroundColor: "#fff", borderRadius: 16, padding: 16, gap: 9, ...shadow },
  info: { color: COLORS.text, fontWeight: "600" }
});
