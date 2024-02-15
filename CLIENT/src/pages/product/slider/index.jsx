import React from 'react'
import left from '../../../assets/icon/arrow-left-Gallery.svg'
import right from '../../../assets/icon/arrow-right-Gallery.svg'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import './slider.scss'

const Slider = ({ images }) => {
  const customRenderLeftNav = (onClick, disabled) => {
    return (
      <button
        className={`image-gallery-icon image-gallery-left-nav ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
        onClick={onClick}
        aria-label="Previous Slide"
      >
        <img src={left} alt="Left" />
      </button>
    );
  };
  const customRenderRightNav = (onClick, disabled) => {
    return (
      <button
        className={`image-gallery-icon image-gallery-right-nav ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
        onClick={onClick}
        aria-label="Next Slide"
      >
        <img src={right} alt="Right" />
      </button>
    );
  };
  return (
    <div className='slider'>
      <ImageGallery
        items={images}
        showPlayButton={false} // Disable play button
        showFullscreenButton={false} // Disable fullscreen button
        renderLeftNav={customRenderLeftNav} // Custom left button
        renderRightNav={customRenderRightNav} // Custom right button
      />
    </div>
  );
};

export default Slider