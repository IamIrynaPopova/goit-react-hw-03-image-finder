import { Component } from 'react';
import { GetImage } from 'components/services/GetImage';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
  };
  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      GetImage(value)
        .then(response => response.json())
        .then(images => {
          this.setState({ images: images.hits });
        });
    }
  }
  render() {
    const { images } = this.state;
    return (
      <ul className={css.gallery}>
        {images.map(image => {
          const { id, webformatURL, largeImageURL, tags } = image;
          return <ImageGalleryItem key={id} srs={webformatURL} alt={tags} />;
        })}
      </ul>
    );
  }
}
