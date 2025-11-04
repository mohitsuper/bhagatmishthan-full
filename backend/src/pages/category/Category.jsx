import React, { useState, useEffect } from "react";
import {
  DeleteCategory,
  GetCategory,
  PostCategory,
  UpdateCategory,
} from "../../api/api";
import { useRef } from "react";

export default function Category() {
  const [text, setText] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [prev, setPrev] = useState(null);
  const [image, setImage] = useState(null);
  const [isReloade, setIsReloade] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const ImageRef = useRef(null);
  const CategoryPostData = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", text);
    if (updateId) {
      await UpdateCategory(updateId, formData);
      alert("category update successfull...");
    } else {
      await PostCategory(formData);
      alert("category add successfull...");
    }
    setText("");
    if (ImageRef.current) {
      ImageRef.current.value = "";
    }
    setIsReloade(!isReloade);
    setPrev(null);
  };

  const fetchcategoryData = async () => {
    const response = await GetCategory();
    setCategoryData(response || []);
  };

  const handleImage = (e) => {
    const value = e.target.files[0];
    setImage(value);
    if (value) {
      const prevUrl = URL.createObjectURL(value);
      setPrev(prevUrl);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are You Sure Delete Recode");
    if (!confirm) return;
    else {
      const reponce = await DeleteCategory(id);
      setIsReloade(!isReloade);
    }
  };

  const handleEdit = async (id) => {
    const singleData = CategoryData.find((item) => item._id === id);
    setText(singleData.name);
    setPrev(singleData.image);
    setUpdateId(id);
  };

  const handleIsActive = async (id, isActive) => {
    const newIsAcive = !isActive;
    const UpdateIsActive = new FormData();
    UpdateIsActive.append('isActive',newIsAcive)
    await UpdateCategory(id,UpdateIsActive)
    setIsReloade(!isReloade)
  };


  useEffect(() => {
    fetchcategoryData();
  }, [isReloade]);
  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col py-10 px-6 md:px-20">
      <div className="bg-white shadow-md rounded-2xl p-8 mb-10 border border-indigo-100">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center md:text-left">
          Product Category
        </h1>
        <form
          onSubmit={CategoryPostData}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <input
            type="file"
            ref={ImageRef}
            onChange={handleImage}
            placeholder="Enter Product Category Image"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Product Category"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition flex items-center gap-2"
          >
            <i className="fa-solid fa-paper-plane"></i> Submit
          </button>
        </form>
        {prev && (
          <div className="mt-6 flex flex-col items-start">
            <p className="text-sm text-gray-600 mb-2 font-medium">Preview:</p>
            <img
              src={prev}
              className="w-48 h-28 object-cover rounded-lg border-2 border-purple-300 shadow"
              alt="Preview"
            />
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center md:text-left">
          <i className="fa-solid fa-database mr-2 text-indigo-600"></i>Product
          Category Data
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm text-gray-700">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-center">Image</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {CategoryData.length > 0 ? (
                CategoryData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b last:border-none hover:bg-indigo-50 transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-6 font-medium text-gray-800">
                      {index + 1}
                    </td>
                    <td className="py-3 px-6">{item.name}</td>
                    <td className="py-3 px-6  w-50">
                      <img
                        src={item.image}
                        className="h-20 w-full  border border-gray-100 rounded-lg shadow object-cover"
                      />
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-4 text-lg">
                        <i
                          className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer hover:text-blue-700 transition"
                          onClick={() => handleEdit(item._id)}
                        ></i>

                        <span
                          onClick={() =>
                            handleIsActive(item._id, item.isActive)
                          }
                        >
                          {item.isActive ? (
                            <i className="fa-solid fa-eye text-green-500 cursor-pointer hover:text-green-700 transition"></i>
                          ) : (
                            <i className="fa-solid fa-eye-slash text-yellow-500 cursor-pointer hover:text-yellow-700 transition"></i>
                          )}
                        </span>
                        <i
                          className="fa-solid fa-trash text-red-500 cursor-pointer hover:text-red-700 transition"
                          onClick={() => handleDelete(item._id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    <i className="fa-solid fa-circle-info mr-2"></i>No topbar
                    data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
