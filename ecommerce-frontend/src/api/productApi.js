const API_URL = ""; 

export async function fetchProducts() {
  const response = await fetch(`/products`);  
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
