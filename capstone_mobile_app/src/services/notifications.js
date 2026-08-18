import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export async function configureNotifications() {
  const permissions = await Notifications.getPermissionsAsync();
  let status = permissions.status;

  if (status !== "granted") {
    const requested = await Notifications.requestPermissionsAsync();
    status = requested.status;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.DEFAULT
    });
  }

  return status === "granted";
}

export async function sendTestNotification() {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Capstone Market",
      body: "Notification de test déclenchée avec succès.",
      data: { type: "test" }
    },
    trigger: null
  });
}
