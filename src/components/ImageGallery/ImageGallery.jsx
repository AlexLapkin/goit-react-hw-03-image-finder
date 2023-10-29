import css from './ImageGallery.module.css';
import PropTypes from "prop-types";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({gallery, openModal}) => {
    
    return (
        <ul className={css.gallery}>
          { gallery !== null &&
          gallery.map(({id, webformatURL, largeImageURL}) => (
            <ImageGalleryItem 
            key={id}
            src={webformatURL}
            largeImageURL={largeImageURL}
            openModal={openModal}
            />
          ))} 
        </ul>
   )
}

ImageGallery.propTypes = {
  gallery: PropTypes.array,
  openModal: PropTypes.func,
}

export default ImageGallery;