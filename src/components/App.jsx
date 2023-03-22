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
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ isLoader: true });
      GetImage(value, this.state.page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Not found'));
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

  onLoadMore = () => {
    const { value, page } = this.state;
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        GetImage(value, page);
      }
    );
  };

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
