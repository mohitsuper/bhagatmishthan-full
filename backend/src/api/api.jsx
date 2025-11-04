import axios from "axios";
const baseurl = import.meta.env.VITE_BASEURL;
const localurl = import.meta.env.VITE_LOCALURL;

// topbar api start
export const TopbarPost = async ({ title }) => {
  const url = `${localurl}/api/post/topbar`;
  axios
    .post(url, { title })
    .then(() => {
      alert("Submit Your Data");
    })
    .catch((error) => {
      alert("Data Submit Failed");
      console.log(error);
    });
};

export const TopbarGet = async () => {
  const url = `${localurl}/api/topbar`;
  const responce = await axios.get(url);
  try {
    console.log("topbar data get successfull");
    return responce.data.data;
  } catch (error) {
    console.log("topbar data get failed", error);
  }
};

export const TopbarUpdate = async (id, text) => {
  const url = `${localurl}/api/update/topbar`;
  try {
    const responce = await axios.put(url, {
      _id: id,
      title: text,
    });
  } catch (error) {
    alert("Data Update Failed");
    console.log(error);
  }
};
export const TopbarIsActive = async (id, isActive) => {
  const url = `${localurl}/api/update/topbar`;
  try {
    const responce = await axios.put(url, {
      _id: id,
      isActive,
    });
    console.log(responce);
  } catch (error) {
    alert("Data active and inactive Failed");
    console.log(error);
  }
};
export const TopbarDelete = async (id) => {
  try {
    const url = `${localurl}/api/delete/topbar/${id}`;
    const confirmDelete = confirm("Are You Sure Delete Value");
    if (confirmDelete) {
      const responce = await axios.delete(url);
      alert("topbar data delete successfull");
      return responce.data.data;
    }
  } catch (error) {
    console.log("topbar data delete failed", error);
  }
};

// topbar api end

// user api start

export const SinginUserData = async () => {
  const url = `${localurl}/api/singup`;
  const responce = await axios.get(url);
  try {
    console.log("Singin User Data get successfull");
    return responce.data.data;
  } catch (error) {
    console.log("topbar data get failed", error);
  }
};

//user api end

// herobanner api start

export const PostHeroBanner = async (data) => {
  const url = `${localurl}/api/post/banner`;
  try {
    const res = await axios.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res) {
      alert("Hero Image Uplode Successfull");
    }
  } catch (error) {
    alert("Hero Image Uplode failed");
    console.log(error);
  }
};

export const GetHeroBanner = async () => {
  const url = `${localurl}/api/banner`;
  const responce = await axios.get(url);
  try {
    console.log("banner data get successfull");
    return responce.data.data;
  } catch (error) {
    console.log("banner data get failed", error);
  }
};

export const DeleteHeroImage = async (id) => {
  const url = `${localurl}/api/delete/banner/${id}`;
  const responce = await axios.delete(url);
  try {
    console.log("banner data delete successfull");
    return responce.data.data;
  } catch (error) {
    console.log("banner data delete failed", error);
  }
};

export const UpdateHeroImage = async (data) => {
  try {
    const url = `${localurl}/api/update/banner`;
    const responce = await axios.put(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (responce) {
      console.log("banner data update successfull", responce);
    }
  } catch (error) {
    console.log("banner data delete failed", error);
  }
};

export const IsAcitveHeroImage = async (data) => {
  try {
    const url = `${localurl}/api/update/banner`;
    const responce = await axios.put(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (responce) {
      console.log("banner data update successfull");
    }
  } catch (error) {
    console.log("banner data delete failed", error);
  }
};

// herobanner api end

// category api start

export const GetCategory = async () => {
  try{
    const responce = await axios.get(`${localurl}/api/category`);
    return responce.data.data
  }
  catch(error){
    console.log("category data get failed:",error)
  }
};

export const PostCategory = async (data)=>{
  try{
    const responce = await axios.post(`${localurl}/api/post/category`,data,{
      headers:{"Content-Type": "multipart/form-data"}
    });

    console.log("category data post successfull:")
  }
  catch(error){
    console.log("category data post failed:",error)
  }
}

export const DeleteCategory = async (id)=>{
  const url = `${localurl}/api/delete/category/${id}`;
  try{
    const responce = await axios.delete(url)
    console.log("category delete successfull")
  }
  catch(error){
    console.log("category delete failed:",error.message)
  }
}

export const UpdateCategory = async (id,data)=>{
  try{
    const responce = await axios.put(`${localurl}/api/update/category/${id}`,data,{
      headers:{"Content-Type": "multipart/form-data"}
    });

    console.log("category data update successfull:",responce)
  }
  catch(error){
    console.log("category data update failed:",error)
  }
}

// category api end


//product type api start 
export const GetProductType = async ()=>{
  try{
    const responce = await axios.get(`${localurl}/api/product-type`);
    return responce.data.data
  }
  catch(error){
    console.log("product type data get failed:",error)
  }
}

export const PostProductType= async (data)=>{
  try{
    const responce = await axios.post(`${localurl}/api/post/product-type`,{
      name:data
    });

    console.log("product type data post successfull",responce)
  }
  catch(error){
    console.log("product type data post failed:",error)
  }
}


export const DeleteProductType = async (id)=>{
  const url = `${localurl}/api/delete/product-type/${id}`;
  try{
    const responce = await axios.delete(url)
    console.log("product type delete successfull",responce)
  }
  catch(error){
    console.log("product type delete failed:",error)
  }
}

export const UpdateProductType = async (id,data)=>{
  const url = `${localurl}/api/update/product-type`;
  try{
    const responce = await axios.put(url,{
      id:id,
      name:data.name,
      isActive:data.isActive,
    })
    console.log("product type update successfull",responce)
  }
  catch(error){
    console.log("product type udpate failed:",error)
  }
}
//product type api end 

//product add api start 

export const GetProduct = async ()=>{
  try{
    const responce = await axios.get(`${localurl}/api/product`);
    return responce.data.data
  }
  catch(error){
    console.log("product type data get failed:",error)
  }
}

export const PostProduct = async (data)=>{
  // const {name, description, weight, stock, price, category, ingredients, image1,image2,image3,image4} = data;
  try{
    const url = `${localurl}/api/post/product`
    const responce = await axios.post(url,data)
    console.log("product add successfull",responce)
  }
  catch(error){
    console.log("product add failed",error)
  }
}



//product add api end 