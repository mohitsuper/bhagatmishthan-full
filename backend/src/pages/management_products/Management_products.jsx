import React, { useState } from "react";
import { GetProduct } from "../../api/api";

const categories = ["Electronics", "Clothing", "Books", "Home", "Other"];

export default function Management_products() {
  const [allProduct, setAllProduct] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Sample Product",
      category: "Electronics",
      image: "",
      active: true,
    },
  ]);

  useState(() => {
    const AllProductData = async () => {
      const responce = await GetProduct();
      setAllProduct(responce || []);
    };
    AllProductData();
  }, []);
  // Stats
  const totalProducts = products.length;
  const totalCategories = new Set(products.map((p) => p.category)).size;
  const activeProducts = products.filter((p) => p.active).length;
  const inactiveProducts = totalProducts - activeProducts;

  const handleToggleActive = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const handleEdit = (product) => {
    // Edit logic placeholder
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className=" mx-auto p-20">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <i className="fas fa-box-open text-3xl text-white mb-2"></i>
          <div className="text-lg font-semibold text-white">Total Products</div>
          <div className="text-3xl font-extrabold text-white">
            {totalProducts}
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-300 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <i className="fas fa-th-large text-3xl text-white mb-2"></i>
          <div className="text-lg font-semibold text-white">
            Total Categories
          </div>
          <div className="text-3xl font-extrabold text-white">
            {totalCategories}
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <i className="fas fa-check-circle text-3xl text-white mb-2"></i>
          <div className="text-lg font-semibold text-white">
            Active Products
          </div>
          <div className="text-3xl font-extrabold text-white">
            {activeProducts}
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-300 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <i className="fas fa-times-circle text-3xl text-white mb-2"></i>
          <div className="text-lg font-semibold text-white">
            Inactive Products
          </div>
          <div className="text-3xl font-extrabold text-white">
            {inactiveProducts}
          </div>
        </div>
      </div>
      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Product type</th>

              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((p) => {
              console.log(p);
              return (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">
                    {p.subimage ? (
                      <img
                        src={p.subimage[0]}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">{p.productType}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleToggleActive(p.id)}
                      className={`px-2 py-1 rounded ${
                        p.active
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {p.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
