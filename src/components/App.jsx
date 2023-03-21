import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GetImage } from './services/GetImage';
import css from './App.module.css';

export class App extends Component {
  state = {
    value: '',
    images: [],
  };

  componentDidUpdate(_, prevState) {
    const { value } = this.state;
    if (prevState.value !== value) {
      GetImage(value)
        .then(response => response.json())
        .then(images => {
          this.setState({ images: images.hits });
        });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ value: form.elements.input.value });
    form.reset();
  };

  render() {
    return (
      <>
          <div className={css.app}>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery images={this.state.images} />
        </div>
      </>
    );
  }
}
