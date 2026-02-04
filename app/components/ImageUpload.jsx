"use client";
import { useState } from "react";
import { FaPaperclip, FaTimes } from "react-icons/fa";

export default function ImageUpload({ onSend }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // When user selects a file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  // Send the image to the chat
  const handleSendImage = () => {
    if (!selectedImage) return;
    onSend(selectedImage); // send the file object
    setSelectedImage(null); // reset
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Image Preview */}
      {selectedImage && (
        <div className="relative w-24 h-24 border rounded overflow-hidden">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
            title="Remove"
          >
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {/* Upload Button */}
      <label
        htmlFor="image-upload"
        className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full cursor-pointer text-white"
        title="Upload Image"
      >
        <FaPaperclip size={18} />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Send Button */}
      {selectedImage && (
        <button
          onClick={handleSendImage}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
        >
          Send
        </button>
      )}
    </div>
  );
}
