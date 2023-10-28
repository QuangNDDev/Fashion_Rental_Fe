import React from "react";
import { Image } from "antd";

const MuntilImage = ({ images }) => {
  if (!images || images.length === 0) {
    return null; // Handle the case when images are not defined or empty
  }

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0", // Remove any gaps between the images
  };

  const imageContainerStyle = {
    flex: "0 0 25%", // Each image container takes up 25% of the container width
    boxSizing: "border-box",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "20px", // Maintain the aspect ratio
  };
  
  return (
    <div style={containerStyle}>
      {images.map((imgUrl, index) => (
        <div key={index} style={imageContainerStyle}>
          <Image src={imgUrl} style={imageStyle} />
        </div>
      ))}
    </div>
  );
};

export default MuntilImage;
