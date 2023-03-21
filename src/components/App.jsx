import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';

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
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery value={ this.state.value} />
      </>
    );
  }
}
