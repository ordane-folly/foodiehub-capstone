import React, { useEffect, useState } from "react";
import { StatusBar, View, ActivityIndicator, Alert } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { storage } from "./src/services/storage";
import { COLORS } from "./src/constants/theme";

export default function App() {
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState("login");
  const [screen, setScreen] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    storage.getSession().then((session) => {
      if (session) setUser(session);
      setBooting(false);
    });
  }, []);

  if (booting) {
    return <View style={{ flex:1, alignItems:"center", justifyContent:"center", backgroundColor:COLORS.background }}><ActivityIndicator size="large" color={COLORS.primary}/></View>;
  }

  if (!user) {
    if (authScreen === "signup") {
      return <SignupScreen onSignup={(u) => { setUser(u); setScreen("home"); }} onGoLogin={() => setAuthScreen("login")} />;
    }
    return <LoginScreen onLogin={(u) => { setUser(u); setScreen("home"); }} onGoSignup={() => setAuthScreen("signup")} />;
  }

  function logout() {
    Alert.alert("Déconnexion", "Voulez-vous vous déconnecter ?", [
      { text:"Annuler", style:"cancel" },
      { text:"Se déconnecter", style:"destructive", onPress: async () => {
        await storage.clearSession();
        setUser(null);
        setAuthScreen("login");
        setScreen("home");
      }}
    ]);
  }

  if (screen === "detail" && selectedProduct) {
    return <DetailScreen product={selectedProduct} onBack={() => setScreen("home")} />;
  }

  if (screen === "settings") {
    return <SettingsScreen user={user} onBack={() => setScreen("home")} />;
  }

  if (screen === "profile") {
    return <ProfileScreen user={user} onBack={() => setScreen("home")} />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <HomeScreen
        user={user}
        onDetail={(product) => { setSelectedProduct(product); setScreen("detail"); }}
        onLogout={logout}
        onSettings={() => setScreen("settings")}
        onProfile={() => setScreen("profile")}
      />
    </>
  );
}
