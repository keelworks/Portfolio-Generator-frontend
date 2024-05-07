/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, { useState, useEffect } from 'react';

function ProjectModal({ project, opened, onClose }) {
  // Initialize selectedImage with the main project image or the clicked image
  const [selectedImage, setSelectedImage] = useState({
    src: project?.initialImageUrl || project?.imageUrl,
    alt: project?.title,
  });

  // Update selectedImage when the project changes
  useEffect(() => {
    setSelectedImage({
      src: project?.initialImageUrl || project?.imageUrl,
      alt: project?.title,
    });
  }, [project]);

  // Image click handler remains the same
  const handleImageClick = (imageUrl, index) => {
    setSelectedImage({
      src: imageUrl,
      alt: `Additional Image ${index}`,
    });
  };

  if (!opened) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex-container">
          <h5 className="title">{project.title}</h5>
          <img className="styled-modal-image" src={selectedImage.src} alt={selectedImage.alt} />
          <p className="description">{project.description}</p>
          <div className="image-gallery" style={{ display: 'flex', overflowX: 'auto', justifyContent: 'space-between' }}>
            {project.details.map((imageDetail, index) => (
              <div key={index} onClick={() => handleImageClick(imageDetail.src, index)} style={{ marginRight: '10px' }}>
                <div className="image-container">
                  <img src={imageDetail.src} alt={imageDetail.title} style={{ width: '200px', height: 'auto' }} />
                  <span className="image-title">{imageDetail.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
