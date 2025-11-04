import { useEffect, useState, useRef } from "react";
import {
  DeleteHeroImage,
  GetHeroBanner,
  PostHeroBanner,
  UpdateHeroImage,
} from "../../api/api";

export default function Banner() {
  const [HeroUplodeImage, setHeroUplodeImage] = useState(null);
  const [AllHeroImage, setAllHeroImage] = useState([]);
  const [isReloade, setIsReloade] = useState(false);
  const [prev, setPrev] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const GetHeroBannerData = async () => {
      const responce = await GetHeroBanner();
      setAllHeroImage(responce);
    };
    GetHeroBannerData();
  }, [isReloade]);

  const DeleteBannerData = async (id) => {
    const Isconfirm = confirm("Are You Sure Delete Row?");
    if (Isconfirm) {
      await DeleteHeroImage(id);
      setIsReloade(!isReloade);
    }
  };

  const handleEdit = async (id) => {
    const SinglePrev = AllHeroImage.find((item) => item._id === id);
    setPrev(SinglePrev.image);
    setUpdateId(id);
  };

  async function PostHeroImageUplode(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", HeroUplodeImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (updateId) {
      formData.append("id", updateId);
      await UpdateHeroImage(formData);
    } else {
      await PostHeroBanner(formData);
    }

    setPrev(null);
    setHeroUplodeImage(null);
    setIsReloade(!isReloade);
  }

  const handelData = (e) => {
    e.preventDefault();
    const value = e.target.files[0];
    setHeroUplodeImage(value);
    if (value) {
      const previewURL = URL.createObjectURL(value);
      setPrev(previewURL);
    }
  };


  const handleIsActive = async (id,isActive)=>{
    const newVal = !isActive;
    console.log(newVal)
    const activeVal = new FormData();
    activeVal.append("id",id)
    activeVal.append("isActive",newVal);
    const responce = await UpdateHeroImage(activeVal)
    setIsReloade(!isReloade)
  }
  return (
    <div className=" p-6 bg-indigo-50 md:p-10 space-y-10">
      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 flex items-center gap-3">
          Hero Banner Image Uplode
        </h2>

        <form
          className="flex flex-col md:flex-row items-center gap-4  rounded-xl"
          onSubmit={PostHeroImageUplode}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handelData}
            className="file-input file-input-bordered file-input-md w-full max-w-sm border shadow px-3 py-3 border-gray-100 rounded-lg"
          />
          <button
            type="submit"
            className="btn bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg shadow hover:shadow-md hover:scale-105 transition-transform"
          >
            {updateId ? "Update Banner" : "Upload Banner"}
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

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
          Banner Data
        </h3>

        <div className="overflow-x-auto rounded-xl border border-purple-100">
          <table className="table w-full text-left border-collapse">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Active</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {AllHeroImage.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-purple-50 transition-colors border-b last:border-none"
                >
                  <td className="py-3 px-4 text-gray-600 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      alt="Banner"
                      className="w-32 h-20 object-cover rounded-lg border border-purple-200 shadow-sm"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {
                        item.isActive ? "Active":"Inactive"
                      }
                      
                    </span>
                  </td>
                  <td className="py-3 px-4">
                     <span onClick={()=>handleIsActive(item._id,item.isActive)}>
                          {item.isActive ? (
                            <i className="fa-solid fa-eye text-green-500 cursor-pointer hover:text-green-700 transition"></i>
                          ) : (
                            <i className="fa-solid fa-eye-slash text-yellow-500 cursor-pointer hover:text-yellow-700 transition"></i>
                          )}
                        </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="btn btn-sm border border-purple-400 text-purple-600 hover:bg-purple-100 rounded-md px-3 py-1 mr-2 transition"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm border border-red-400 text-red-600 hover:bg-red-50 rounded-md px-3 py-1 transition"
                      onClick={() => DeleteBannerData(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {AllHeroImage.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-center text-gray-500 font-medium"
                  >
                    No banner images found.
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
