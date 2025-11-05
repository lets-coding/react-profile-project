import React, { useState } from 'react';
import './style.css';

export default function App() {
  const tabs = ['About Me', 'Experiences', 'Recommended'];
  const [activeTab, setActiveTab] = useState(0);
  const [images, setImages] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // slider start index

  const visibleCount = 3; // show 3 images at a time

  const tabContent = [
    "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It allows designers to create layouts without relying on meaningful content. The text is derived from a work by Cicero and has been used since the 1500s. You can also generate Lorem Ipsumtext using various online tools, such as the Lipsum generator, which allows you to create random placeholder text easily.",
    'I was born and raised in Albany, NY & have been living in Santa Carla for 10 years with my wife Tiffany and my twin daughters - Emma and Ella. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It allows designers to create layouts without relying on meaningful content. The text is derived from a work by Cicero and has been used since the 1500s. You can also generate Lorem Ipsumtext using various online tools, such as the Lipsum generator, which allows you to create random placeholder text easily.',
    'Here are some recommended resources and connections for your next steps. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem Ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development. It allows designers to create layouts without relying on meaningful content. The text is derived from a work by Cicero and has been used since the 1500s. You can also generate Lorem Ipsumtext using various online tools, such as the Lipsum generator, which allows you to create random placeholder text easily.',
  ];

  const handleTabClick = (index) => setActiveTab(index);

  // Add images
  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((f) => URL.createObjectURL(f));
    setImages([...images, ...newImages]);
  };

  // Slider navigation
  const prevImage = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const nextImage = () => {
    if (startIndex < images.length - visibleCount)
      setStartIndex(startIndex + 1);
  };

  const visibleImages = images.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="app-container">
      <div className="left-panel"></div>

      <div className="right-panel">
        {/* Tabs Widget */}
        <div className="widget tabs-widget">
          <div className="tabs">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                className={`tab ${activeTab === idx ? 'active' : ''}`}
                onClick={() => handleTabClick(idx)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="tab-content">{tabContent[activeTab]}</div>
        </div>

        {/* Gallery Widget */}
        <div className="widget gallery-widget">
          <div className="gallery-header">
            <div className="title">Gallery</div>
            <div className="controls">
              <label className="add-btn">
                + ADD IMAGE
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAddImage}
                  hidden
                />
              </label>
              <button
                className="nav-btn"
                onClick={prevImage}
                disabled={startIndex === 0}
              >
                ◀
              </button>
              <button
                className="nav-btn"
                onClick={nextImage}
                disabled={startIndex >= images.length - visibleCount}
              >
                ▶
              </button>
            </div>
          </div>

          <div className="gallery-grid">
            {images.length === 0 ? (
              <div className="empty-msg">No images added yet</div>
            ) : (
              visibleImages.map((img, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={img} alt={`img${idx}`} className="gallery-img" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
