import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {
  state = {
    value: '',
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    this.setState({ value: form.elements.input.value });
    form.reset();
  };

  render() {
    return (
      <> <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery value={ this.state.value} />
      </div></>
    );
  }
}
