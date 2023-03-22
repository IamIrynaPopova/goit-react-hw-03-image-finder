import Notiflix from 'Notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GetImage } from './services/GetImage';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

export class App extends Component {
  state = {
    value: '',
    images: [],
    error: null,
    isLoader: false,
  };

  componentDidUpdate(_, prevState) {
    const { value } = this.state;
    if (prevState.value !== value) {
      this.setState({ isLoader: true });
      GetImage(value)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Invalid'));
        })
        .then(images => {
          if (images.hits.length > 0) {
            this.setState({ images: images.hits });
          } else {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
        })
        .catch(error => this.setState({ error: error }))
        .finally(this.setState({ isLoader: false }));
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ value: form.elements.input.value });
    form.reset();
  };

  onLoadMore = () => {};

  render() {
    const { images, error } = this.state;
    return (
      <>
        <div className={css.app}>
          {error && <h1>{error.message}</h1>}
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery images={images} />
          {this.state.isLoader && <Loader />}
          {images.length > 0 && <Button onLoadMore={this.onLoadMore} />}
        </div>
      </>
    );
  }
}
