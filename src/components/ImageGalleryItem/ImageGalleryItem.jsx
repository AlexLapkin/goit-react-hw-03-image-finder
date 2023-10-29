import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ( { src, alt, largeImageURL, openModal } ) => {
  
  return (
    <li className={css.gallery_item} 
    onClick={() => openModal(largeImageURL)}  >
   <img className={css.gallery_item_img} 
   src={src} alt={alt}
    
   />
</li>
)}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
}  

export default ImageGalleryItem;