import React, { useState, useEffect } from "react";
import './Gallery.css';
export const Gallery = () => {
  const [images, setImages] = useState(getImagesFromLocalStorage());

  const onFilesChange = (e) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        if (!file.type.match("image")) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target.result;
          const newImage = {
            id: generateImageId(),
            name: file.name,
            dataURL: result
          };
          setImages((prevImages) => [newImage, ...prevImages]);
        };
        reader.readAsDataURL(file);
      });
    } else {
      alert("Votre navigateur ne supporte pas l'API de fichier");
    }
  };

  const deleteImage = (imageId) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
  };

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(images));
  }, [images]);

  return (
    <div>
      <label htmlFor="files">Select multiple files:</label>
      <input type="file" id="files" multiple="multiple" accept="image/jpeg, image/png, image/jpg" onChange={onFilesChange} />
      <div id="result">
        {images.map((image) => (
          <div key={image.id} className="thumbnail">
            <img src={image.dataURL} title={image.name} alt={image.name} />
            <div className="delete" onClick={() => deleteImage(image.id)}>
              <i className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  function generateImageId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
  
  function getImagesFromLocalStorage() {
    const imagesData = localStorage.getItem("images");
    return imagesData ? JSON.parse(imagesData) : [];
  }
  
};

export default Gallery;
