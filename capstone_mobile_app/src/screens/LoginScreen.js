import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import Logo from "../components/Logo";
import { login } from "../services/auth";
import { COLORS } from "../constants/theme";

export default function LoginScreen({ onLogin, onGoSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      const user = await login(email, password);
      onLogin(user);
    } catch (e) {
      Alert.alert("Erreur de connexion", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.page}>
      <View style={styles.card}>
        <Logo />
        <Text style={styles.title}>Bon retour 👋</Text>
        <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
        <Input label="Adresse électronique" value={email} onChangeText={setEmail} placeholder="exemple@email.com" keyboardType="email-address" />
        <Input label="Mot de passe" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
        <PrimaryButton title="Se connecter" onPress={handleLogin} loading={loading} />
        <Text style={styles.link} onPress={onGoSignup}>Pas encore de compte ? <Text style={styles.bold}>S'inscrire</Text></Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background, justifyContent: "center", padding: 20 },
  card: { backgroundColor: "#fff", borderRadius: 24, padding: 24, gap: 16 },
  title: { fontSize: 29, fontWeight: "900", color: COLORS.text, marginTop: 8 },
  subtitle: { color: COLORS.muted, marginBottom: 4 },
  link: { textAlign: "center", color: COLORS.muted, fontSize: 14 },
  bold: { color: COLORS.primary, fontWeight: "800" }
});
