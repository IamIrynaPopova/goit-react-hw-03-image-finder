import Notiflix from 'Notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GetImage } from '../../src/services/GetImage';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import css from './App.module.css';


export class App extends Component {
  state = {
    value: '',
    images: [],
    error: null,
    isLoader: false,
    page: 1,
    largeImageURL: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
     this.setState(({ isLoader }) => ({ isLoader: !isLoader }));
      GetImage(value, page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Not found'));
        })
        .then(images => {
          if (images.hits.length > 0) {
            this.setState(prevImages => ({
              images:
                page === 1
                  ? images.hits
                  : [...prevImages.images, ...images.hits],
            }));
          }
          else {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
        })
        .catch(error => this.setState({ error: error }))
        .finally(() =>this.setState(({ isLoader }) => ({ isLoader: !isLoader })));
    }
    if (prevState.page !== page && page !== 1) {
        this.setState(({ isLoader }) => ({ isLoader: !isLoader }));
     }
   
   
  }

  onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ value: form.elements.input.value, page: 1 });
    form.reset();
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoader: true,
    }));
  };

  openModal = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL, showModal: true });
  };
  closeModal = e => {
    if (e.target.nodeName === 'DIV') this.setState({ showModal: false });
  };
  closeESCModal = e => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, error, isLoader, showModal, largeImageURL } = this.state;
    return (
      <>
        <div className={css.app}>
          {error && <h1>{error.message}</h1>}
          <Searchbar onSubmit={this.onSubmit} />
          {images.length > 0 && (
            <ImageGallery images={images} openModal={this.openModal} />
          )}
          {isLoader && <Loader />}
          {images.length > 0 && <Button onLoadMore={this.onLoadMore} />}
          {showModal && (
            <Modal
              closeESCModal={this.closeESCModal}
              closeModal={this.closeModal}
              largeImageURL={largeImageURL}
            />
          )}
        </div>
      </>
    );
  }
}
