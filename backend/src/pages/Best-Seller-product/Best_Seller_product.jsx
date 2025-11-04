import React, { useState } from "react";
import { useEffect } from "react";
import { GetCategory, GetProductType, PostProduct } from "../../api/api";

export default function Best_Seller_product() {
  const [Allcategory, setAllCategory] = useState([]);

  const [AllProductType, setAllProductType] = useState([]);
  const [ProductData, setProductData] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    name: "",
    description: "",
    price: null,
    stock: null,
    weight: null,
    ingredients: "",
    category: "",
    productType: [],
  });
  const handleImage = (e, i) => {
    const value = e.target.files[0];
    setProductData((prev) => ({
      ...prev,
      [`image${i + 1}`]: value,
    }));
  };

  const AllProductTypeData = async () => {
    const responce = await GetProductType();
    setAllProductType(responce || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromDataProduct = new FormData();
    fromDataProduct.append("title", ProductData.name);
    fromDataProduct.append("description", ProductData.description);
    fromDataProduct.append("price", ProductData.price);
    fromDataProduct.append("stock", ProductData.stock);
    fromDataProduct.append("weight", ProductData.weight);
    fromDataProduct.append("category",ProductData.category);
    fromDataProduct.append("ingredients", ProductData.ingredients);
    ProductData.productType.forEach((item)=>fromDataProduct.append("productType",item))
    
    const { image1, image2, image3, image4 } = ProductData;
    if (image1) fromDataProduct.append("subimage", image1);
    if (image2) fromDataProduct.append("subimage", image2);
    if (image3) fromDataProduct.append("subimage", image3);
    if (image4) fromDataProduct.append("subimage", image4);
    await PostProduct(fromDataProduct);
    alert("add new Product...");
    setProductData({
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      name: "",
      description: "",
      price: null,
      stock: null,
      weight: null,
      ingredients: "",
      category: "",
      productType: [],
    });
  };
  useEffect(() => {
    const Allcategorydata = async () => {
      const responce = await GetCategory();
      setAllCategory(responce || []);
    };
    Allcategorydata();
    AllProductTypeData();
  }, []);

 const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "productType") {
      if (checked) {
        setProductData((prev) => ({
          ...prev,
          productType: [...prev.productType, value],
        }));
      } else {
        setProductData((prev) => ({
          ...prev,
          productType: prev.productType.filter((type) => type !== value),
        }));
      }
    }
    else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  console.log(ProductData.productType)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Add Product
        </h2>
        <form
          className="space-y-6"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section */}
            <div className="flex flex-col gap-5 w-full lg:w-1/2">
              <input
                type="text"
                name="name"
                value={ProductData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Product Name"
                required
              />
              <textarea
                name="description"
                value={ProductData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Description"
                rows="4"
                required
              />

              <input
                type="number"
                name="price"
                value={ProductData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Price"
                required
              />
              <input
                type="number"
                name="stock"
                value={ProductData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Stock"
                required
              />
              <input
                type="number"
                name="weight"
                value={ProductData.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Weight"
                required
              />
              <input
                type="text"
                name="ingredients"
                value={ProductData.ingredients}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Ingredients"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="freeShipping"
                    className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Free Shipping</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="fastShipping"
                    className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Shipping in 3-5 days</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="shelfLife"
                    className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">15 Days Shelf Life</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="noPreservatives"
                    className="w-5 h-5 text-blue-600 border-gray-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No Preservatives</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
              >
                Add Product
              </button>
            </div>
            {/* Right Section */}
            <div className="flex flex-col gap-5 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({ length: 4 }, (_, i) => {
                  const currentImage = ProductData[`image${i + 1}`];
                  return (
                    <div
                      className="h-24 bg-gray-100 border border-gray-500 rounded-lg flex items-center justify-center text-gray-500 relative"
                      key={i}
                    >
                      <input
                        type="file"
                        onChange={(e) => handleImage(e, i)}
                        className="border h-full w-full rounded-lg text-[0px]"
                      />
                      <label className="absolute">
                        {currentImage ? (
                          <img
                            src={URL.createObjectURL(currentImage)}
                            alt={`Preview ${i + 1}`}
                          />
                        ) : (
                          <p>Image {i + 1}</p>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                onChange={handleChange}
                value={ProductData.category}
                name="category"
                className="border px-2 py-3 rounded-lg border-gray-500 text-gray-500 outline-none"
              >
                {Allcategory.map((item, index) => {
                  return (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>

              <label className="block text-sm font-medium text-gray-700">
                Product type
              </label>

              {["Best Seller","Gifting's product"].map((item, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    name="productType"
                    checked={ProductData.productType.includes(item)}
                    onChange={handleChange} 
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
