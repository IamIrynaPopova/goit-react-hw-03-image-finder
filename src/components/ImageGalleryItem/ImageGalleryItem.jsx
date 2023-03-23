import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ srs, alt, openModal, largeImageURL }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItemImage}
        src={srs}
        alt={alt}
        onClick={() => openModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  srs: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
