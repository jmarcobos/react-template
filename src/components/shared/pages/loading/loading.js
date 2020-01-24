import React from 'react';
import { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column is-half is-offset-one-quarter has-text-centered'>
            <p className='title is-6'>
              Cargando...
            </p>
          </div>
        </div>
        <div className='columns'>
          <div className='column is-half is-offset-one-quarter has-text-centered'>
            <progress className='progress is-medium is-dark' max='100'>30%</progress>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;