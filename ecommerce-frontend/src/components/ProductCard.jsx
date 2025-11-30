export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-72 hover:shadow-xl transition">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
      <p className="text-lg font-bold text-green-600">${product.price}</p>
    </div>
  );
}
