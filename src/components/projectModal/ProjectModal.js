/* eslint-disable no-trailing-spaces */
/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React, { useState, useEffect, useRef } from 'react';

function ProjectModal({ project, projects, opened, onClose }) {
  const [selectedProject, setSelectedProject] = useState(project);
  const iframeRef = useRef(null);

  useEffect(() => {
    setSelectedProject(project);
  }, [project]);

  const handleImageClick = (proj) => {
    setSelectedProject(proj);
  };

  const injectContentIntoIframe = () => {
    if (selectedProject.html && iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        const completeHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              ${selectedProject.css || ''}
            </style>
            <script>
              ${selectedProject.js || ''}
            </script>
          </head>
          <body>
            ${selectedProject.html}
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                ${selectedProject.js || ''}
              });
            </script>
          </body>
          </html>
        `;
        doc.open();
        doc.write(completeHtml);
        doc.close();
      }
    }
  };

  useEffect(() => {
    injectContentIntoIframe();
  }, [selectedProject.html, selectedProject.css, selectedProject.js]);

  if (!opened) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex-container">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <div
            style={{
              width: '85%',
              margin: '20px auto',
              height: '720px',
              backgroundColor: 'white',
              color: 'red',
              borderRadius: '10px',
            }}
          >
            {selectedProject?.videoUrl ? (
              <video
                key="video-player"
                controls
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '10px',
                }}
                title={selectedProject.title}
              >
                <source src={selectedProject.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : selectedProject?.html ? (
              <iframe
                key="html-iframe"
                ref={iframeRef}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '10px',
                }}
                title={selectedProject.title}
              />
            ) : (
              <iframe
                key="link-iframe"
                src={selectedProject.link}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '10px',
                }}
                title={selectedProject.title}
              />
            )}
          </div>
          <div className="image-gallery-main">
            <div className="image-gallery">
              {projects?.map((proj, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(proj)}
                  className="image-item"
                >
                  <div className="image-container">
                    <img
                      src={proj.imageUrl}
                      alt={`Additional Image ${index}`}
                      className="image"
                    />
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
