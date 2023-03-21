import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.gallery}>
      {images.map(image => {
        const { id, webformatURL, largeImageURL, tags } = image;
        return <ImageGalleryItem key={id} srs={webformatURL} alt={tags} />;
      })}
    </ul>
  );
};
