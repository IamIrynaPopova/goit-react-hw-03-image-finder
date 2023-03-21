import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ srs, alt }) => {
   return (
    <li className={css.galleryItem}>
      <img className={css.galleryItemImage} src={srs} alt={ alt} />
    </li>
  );
};
