import React, { useState, useEffect } from "react";
import {
  DeleteProductType,
  GetProductType,
  PostProductType,
  UpdateProductType,
} from "../../api/api";

export default function ProductType() {
  const [text, setText] = useState("");
  const [ProductTypeData, setProductTypeData] = useState([]);
  const [isReloade, setIsReloade] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isActiveId,setIsActiveId] = useState(null)
  const [updateId, setUpdateId] = useState(null);
  useEffect(() => {
    fetchProductTypeData();
  }, [isReloade]);

  //get all the ProductTypedata
  async function fetchProductTypeData() {
    const response = await GetProductType();
    setProductTypeData(response || []);
  }

  //delte ProductType data
  const ProductTypeDeleteItem = async (id) => {
    alert(id)
    await DeleteProductType(id);
    setIsReloade(!isReloade);
  };

  //post & update handle ProductType data

  const HandelPostUpdate = async (e) => {
    e.preventDefault();
    if (updateId) {
      await UpdateProductType(updateId,{name:text});
      fetchProductTypeData();
      setText("");
    } 
    else {
      await PostProductType(text);
      setUpdateId(null)
    }
    setIsReloade(!isReloade)
  };


  const handleUpdate =(item)=>{
    setUpdateId(item._id)
    setText(item.name)
  }
  const handleIsActive = async (id,isActive)=>{
    const NewIsActive = !isActive;
    const responce = await UpdateProductType(id,{isActive: NewIsActive})
    setIsReloade(!isReloade)
  }
  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col py-10 px-6 md:px-20">
      <div className="bg-white shadow-md rounded-2xl p-8 mb-10 border border-indigo-100">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center md:text-left">
            Product Type
        </h1>
        <form
          onSubmit={HandelPostUpdate}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Product Type"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition flex items-center gap-2"
          >
            <i className="fa-solid fa-paper-plane"></i> Submit
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center md:text-left">
          <i className="fa-solid fa-database mr-2 text-indigo-600"></i>Product Type
          Data
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm text-gray-700">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ProductTypeData.length > 0 ? (
                ProductTypeData.map((item, index) => (
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
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-4 text-lg">
                        <i
                          className="fa-solid fa-pen-to-square text-blue-500 cursor-pointer hover:text-blue-700 transition"
                          onClick={() => handleUpdate(item)}
                        ></i>
                        <span onClick={()=>handleIsActive(item._id,item.isActive)}>
                          {item.isActive ? (
                            <i className="fa-solid fa-eye text-green-500 cursor-pointer hover:text-green-700 transition"></i>
                          ) : (
                            <i className="fa-solid fa-eye-slash text-yellow-500 cursor-pointer hover:text-yellow-700 transition"></i>
                          )}
                        </span>
                        <i
                          className="fa-solid fa-trash text-red-500 cursor-pointer hover:text-red-700 transition"
                          onClick={() => ProductTypeDeleteItem(item._id)}
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
                    <i className="fa-solid fa-circle-info mr-2"></i>No ProductType
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
