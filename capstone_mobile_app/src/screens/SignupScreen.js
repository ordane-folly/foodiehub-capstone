import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import Logo from "../components/Logo";
import { signup } from "../services/auth";
import { COLORS } from "../constants/theme";

export default function SignupScreen({ onSignup, onGoLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    try {
      const user = await signup(username, email, password);
      onSignup(user);
    } catch (e) {
      Alert.alert("Erreur d'inscription", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.page}>
      <View style={styles.card}>
        <Logo />
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>Rejoignez Capstone Market</Text>
        <Input label="Nom d'utilisateur" value={username} onChangeText={setUsername} placeholder="Votre nom" />
        <Input label="Adresse électronique" value={email} onChangeText={setEmail} placeholder="exemple@email.com" keyboardType="email-address" />
        <Input label="Mot de passe" value={password} onChangeText={setPassword} placeholder="Minimum 6 caractères" secureTextEntry />
        <PrimaryButton title="S'inscrire" onPress={handleSignup} loading={loading} />
        <Text style={styles.link} onPress={onGoLogin}>Déjà un compte ? <Text style={styles.bold}>Se connecter</Text></Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background, justifyContent: "center", padding: 20 },
  card: { backgroundColor: "#fff", borderRadius: 24, padding: 24, gap: 15 },
  title: { fontSize: 29, fontWeight: "900", color: COLORS.text, marginTop: 8 },
  subtitle: { color: COLORS.muted },
  link: { textAlign: "center", color: COLORS.muted, fontSize: 14 },
  bold: { color: COLORS.primary, fontWeight: "800" }
});
