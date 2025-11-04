import React, { useState } from 'react';

export default function Gifting_product() {
  const [form, setForm] = useState({
    name: '',
    link: '',
    mainImage: null,
    images: [null, null, null, null],
    description: '',
    price: '',
    stock: '',
    weight: '',
    ingredients: '',
    freeShipping: false,
    fastShipping: false,
    shelfLife: false,
    noPreservatives: false,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      if (name === 'mainImage') {
        setForm({ ...form, mainImage: files[0] });
      } else {
        const idx = parseInt(name.split('_')[1], 10);
        const newImages = [...form.images];
        newImages[idx] = files[0];
        setForm({ ...form, images: newImages });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((img, idx) => {
            if (img) formData.append(`images[${idx}]`, img);
          });
        } else if (key === 'mainImage' && value) {
          formData.append('mainImage', value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch('/api/best-seller-products', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Product added successfully!');
        setForm({
          name: '',
          link: '',
          mainImage: null,
          images: [null, null, null, null],
          description: '',
          price: '',
          stock: '',
          weight: '',
          ingredients: '',
          freeShipping: false,
          fastShipping: false,
          shelfLife: false,
          noPreservatives: false,
        });
      } else {
        setMessage('Failed to add product.');
      }
    } catch (error) {
      setMessage('Error connecting to backend.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-20">
      <div className="bg-white p-8 rounded shadow-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Gifting's Selling Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="link"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Link"
            value={form.link}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium text-gray-700">Main Image</label>
          <input
            type="file"
            name="mainImage"
            accept="image/*"
            className="w-full px-4 py-2 border rounded"
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium text-gray-700">Other Images (4)</label>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                type="file"
                name={`image_${idx}`}
                accept="image/*"
                className="px-2 py-1 border rounded"
                onChange={(e) => handleChange({ ...e, target: { ...e.target, name: `images_${idx}` } })}
              />
            ))}
          </div>
          <textarea
            name="description"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stock"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="weight"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Weight"
            value={form.weight}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ingredients"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingredients"
            value={form.ingredients}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="freeShipping"
                checked={form.freeShipping}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>Free Shipping</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="fastShipping"
                checked={form.fastShipping}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>Shipping in 3-5 days</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="shelfLife"
                checked={form.shelfLife}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>15 Days Shelf Life</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="noPreservatives"
                checked={form.noPreservatives}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>No Preservatives</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Add Product
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-sm text-gray-700">{message}</div>
        )}
      </div>
    </div>
  );
}
