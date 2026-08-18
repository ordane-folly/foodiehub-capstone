import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import Logo from "../components/Logo";
import SettingsMenu from "../components/SettingsMenu";
import { fetchProducts } from "../services/api";
import { storage } from "../services/storage";
import { COLORS, shadow } from "../constants/theme";

function ProductCard({ item, favorite, onFavorite, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <TouchableOpacity style={styles.heart} onPress={onFavorite}>
          <Text style={{ fontSize: 20 }}>{favorite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.name} numberOfLines={1}>{item.title}</Text>
      <View style={styles.bottom}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.rating}>★ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ user, onDetail, onLogout, onSettings, onProfile }) {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [items, favs] = await Promise.all([fetchProducts(), storage.getFavorites()]);
      setProducts(items);
      setFavorites(favs);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function toggleFavorite(id) {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    setFavorites(next);
    await storage.saveFavorites(next);
  }

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Logo small />
        <View>
          <Text style={styles.hello}>Bonjour, {user.username}</Text>
          <Text style={styles.caption}>Découvrez nos produits</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={() => setMenu(true)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>Les tendances du moment</Text>
          <Text style={styles.heroText}>Explorez les articles populaires.</Text>
        </View>
        <Text style={styles.heroEmoji}>🛍️</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12, paddingBottom: 30 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              favorite={favorites.includes(item.id)}
              onFavorite={() => toggleFavorite(item.id)}
              onPress={() => onDetail(item)}
            />
          )}
        />
      )}

      <SettingsMenu
        visible={menu}
        onClose={() => setMenu(false)}
        onSettings={() => { setMenu(false); onSettings(); }}
        onProfile={() => { setMenu(false); onProfile(); }}
        onLogout={() => { setMenu(false); onLogout(); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16, paddingTop: 48 },
  header: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 },
  hello: { fontSize: 15, fontWeight: "800", color: COLORS.text },
  caption: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  menuButton: { marginLeft: "auto", width: 42, height: 42, borderRadius: 12, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", ...shadow },
  menuIcon: { fontSize: 21, color: COLORS.text },
  hero: { backgroundColor: COLORS.primary, borderRadius: 20, padding: 20, flexDirection: "row", alignItems: "center", marginBottom: 18 },
  heroTitle: { color: "#fff", fontWeight: "900", fontSize: 20, maxWidth: 230 },
  heroText: { color: "#DBEAFE", marginTop: 6 },
  heroEmoji: { fontSize: 45 },
  card: { flex: 1, backgroundColor: "#fff", borderRadius: 18, padding: 9, ...shadow },
  imageWrap: { height: 145, borderRadius: 14, overflow: "hidden", backgroundColor: "#F1F5F9", position: "relative" },
  image: { width: "100%", height: "100%" },
  heart: { position: "absolute", top: 8, right: 8, width: 34, height: 34, borderRadius: 17, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  category: { color: COLORS.primary, fontSize: 11, fontWeight: "700", marginTop: 9 },
  name: { fontWeight: "800", color: COLORS.text, marginTop: 4 },
  bottom: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  price: { fontWeight: "900", color: COLORS.text },
  rating: { color: COLORS.warning, fontWeight: "700", fontSize: 12 }
});
