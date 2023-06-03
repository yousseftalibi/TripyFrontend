import React, { useState } from 'react';

function UploadImage() {
    const [image, setImage] = useState();

    const onImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const onImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            await fetch('http://localhost:8083/api/images', {
                method: 'POST',
                body: formData,
            });
            alert('Image uploaded successfully');
        } catch (error) {
            alert('Failed to upload image');
        }
    }

    return (
        <div>
            <input type="file" onChange={onImageChange} />
            <button onClick={onImageUpload}>Upload</button>
        </div>
    );
}

export default UploadImage;
