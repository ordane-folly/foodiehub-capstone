import { storage } from "./storage";

export function validateSignup(username, email, password) {
  if (!username.trim() || !email.trim() || !password) {
    return "Tous les champs sont obligatoires.";
  }
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    return "Veuillez saisir une adresse électronique valide.";
  }
  if (password.length < 6) {
    return "Le mot de passe doit contenir au moins 6 caractères.";
  }
  return null;
}

export async function signup(username, email, password) {
  const error = validateSignup(username, email, password);
  if (error) throw new Error(error);

  const users = await storage.getUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
  if (exists) throw new Error("Cette adresse électronique est déjà utilisée.");

  const user = {
    id: Date.now().toString(),
    username: username.trim(),
    email: email.trim().toLowerCase()
  };

  await storage.saveUsers([...users, { ...user, password }]);
  await storage.saveSession(user);
  return user;
}

export async function login(email, password) {
  if (!email.trim() || !password) {
    throw new Error("Veuillez remplir les deux champs.");
  }

  const users = await storage.getUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      u.password === password
  );

  if (!user) throw new Error("Email ou mot de passe incorrect.");

  const session = {
    id: user.id,
    username: user.username,
    email: user.email
  };

  await storage.saveSession(session);
  return session;
}
