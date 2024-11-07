import React, { useState } from 'react';
import { db, storage } from '../../firebase'; // Firebase imports
import { v4 as uuidv4 } from 'uuid'; // For unique product IDs
import { AiOutlineUpload, AiOutlineCheckCircle } from 'react-icons/ai'; // React Icons
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Correct import for Firebase Storage
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import required Firestore functions

const AdditemForm = ({ closeForm }) => {
  const [productDetails, setProductDetails] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    amazonLink: '',
  });
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setImages([...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productDetails.title || !productDetails.price || images.length === 0) {
      alert('Please fill out all fields and upload images.');
      return;
    }

    setIsUploading(true);

    const imageURLs = [];
    try {
      // Upload images to Firebase Storage
      for (const image of images) {
        const imageRef = ref(storage, `images/${uuidv4()}-${image.name}`);
        await uploadBytes(imageRef, image);
        const imageURL = await getDownloadURL(imageRef);
        imageURLs.push(imageURL);
      }

      // Save product data in Firestore
      const productId = uuidv4();
      const productData = {
        ...productDetails,
        images: imageURLs,
        productId,
        timestamp: serverTimestamp(), // Use serverTimestamp()
      };

      // Add product data to Firestore collection
      await addDoc(collection(db, 'items'), productData);

      alert('Product added successfully!');
      setProductDetails({
        category: '',
        title: '',
        description: '',
        price: '',
        amazonLink: '',
      });
      setImages([]);
      closeForm(); // Close the form after success
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Error adding product!');
    }
    setIsUploading(false);
  };

  return (
    <div className="w-full max-w-5xl p-8 mx-auto overflow-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={productDetails.title}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Category Input */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-semibold text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={productDetails.category}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={productDetails.description}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={productDetails.price}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Amazon Link Input */}
        <div className="mb-4">
          <label htmlFor="amazonLink" className="block text-lg font-semibold text-gray-700">Amazon Link</label>
          <input
            type="url"
            name="amazonLink"
            id="amazonLink"
            value={productDetails.amazonLink}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="images" className="block text-lg font-semibold text-gray-700">Select Images</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className={`py-2 px-4 rounded-lg text-white font-semibold ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} flex items-center justify-center space-x-2`}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <AiOutlineCheckCircle className="animate-spin" /> <span>Uploading...</span>
              </>
            ) : (
              <>
                <AiOutlineUpload /> <span>Add Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdditemForm;
