/* eslint-disable no-trailing-spaces */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, { useState, useEffect } from 'react';

function ProjectModal({ project, projects, opened, onClose }) {
  const [selectedProject, setSelectedProject] = useState(project);

  useEffect(() => {
    setSelectedProject(project);
  }, [project]);

  const handleImageClick = (project, index) => {
    setSelectedProject(project);
  };

  if (!opened) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex-container">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          {/* <h5 className="title">{selectedProject?.title}</h5> */}
          {/* <img className="styled-modal-image" src={selectedProject?.imageUrl} alt={selectedProject?.title} /> */}
          {/* <p className="description">{selectedProject?.description}</p> */}
          <div 
            dangerouslySetInnerHTML={{ __html: selectedProject?.html }}
            style={{ width: '85%', margin: '20px auto', height: '720px', backgroundColor: 'white', color: 'red', borderRadius: '10px' }}
          />
          {/* <div className="html-grid" dangerouslySetInnerHTML={{ __html: selectedProject?.html }} /> */}
          {/* <div className="image-gallery-main">
            <div className="image-gallery" style={{ display: 'flex', overflowX: 'auto', justifyContent: 'space-between', width: '0 10vw' }}>
            {projects?.map((proj, index) => (
              <div key={index} onClick={() => handleImageClick(proj, index)} style={{ marginRight: '10px' }}>
                <div className="image-container">
                  <img src={proj.imageUrl} alt={`Additional Image ${index}`} style={{ width: '260px', maxHeight: '220px' }} />
                  <span className="image-title">{proj.title}</span>
                </div>
              </div>
            ))}
            </div>
          </div> */}
          <div className="image-gallery-main">
            <div className="image-gallery">
              {projects?.map((proj, index) => (
                <div key={index} onClick={() => handleImageClick(proj, index)} className="image-item">
                  <div className="image-container">
                    <img src={proj.imageUrl} alt={`Additional Image ${index}`} className="image" />
                    <span className="image-title">{proj.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
