import React from 'react';
import { Component } from 'react';

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: this.props.errorObject
    };
  }
  render() {
    const { error } = this.state;
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column is-half is-offset-one-quarter has-text-centered'>
            <p className='title is-6'>
              {error.toString()}
            </p>
          </div>
        </div>
        <div className='columns'>
          <div className='column is-half is-offset-one-quarter has-text-centered'>
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;