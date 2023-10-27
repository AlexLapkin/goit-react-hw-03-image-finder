import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ( { src, alt, largeImageURL } ) => {
  return (
    <li class="gallery-item"  >
   <img src={src} alt={alt} />
</li>
)}

export default ImageGalleryItem;