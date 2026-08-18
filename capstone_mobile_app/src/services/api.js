const API_URL = "https://dummyjson.com/products?limit=20";

export async function fetchProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Impossible de récupérer les produits.");
  const data = await response.json();
  return data.products || [];
}
