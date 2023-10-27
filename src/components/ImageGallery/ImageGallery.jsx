import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({gallery}) => {
    //console.log(gallery)
    return (
        <ul class="gallery">
          { gallery !== null &&
          gallery.map(({id, webformatURL}) => (
            <ImageGalleryItem 
            key={id}
            src={webformatURL}
            />
          ))} 

        </ul>
          
    )
}

export default ImageGallery;