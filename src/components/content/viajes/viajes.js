import React, { Component } from 'react';
import { getViajes } from './viajes.service';
import { Link } from 'react-router-dom';
import Loading from './../../shared/pages/loading/loading';
import Error from './../../shared/pages/error/error';

class Viajes extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      error: false,
      errorObject: null, 
      viajes: [] 
    };
  }

  componentDidMount() {
    getViajes()
      .then(response => {
        this.setState({
          viajes: response.data,
          loading: false
        });
      })
      .catch(e => {
        this.setState({ 
          error: true,
          errorObject: e
        });
      });
  }

  renderViajes = () => {
    const { viajes } = this.state;
    return (
      <div className='container'>
        <div className='columns'>
          {
            viajes.data.map(viaje => {
              const { titulo, subtitulo, inicio, precio, id } = viaje;
              return (
                <div key={id} className='column is-one-third'>
                  <Link to={{ pathname: '/viaje/' + id }}>
                  <div className='card'>
                    <div className='card-header'>
                    <div className="card-header-title">
                      <p className='title is-4'>{titulo}</p>
                    </div>
                    </div>
                    <div className='card-content'>
                      <p className='subtitle is-6 ellipsis'>{subtitulo}</p>
                    </div>
                    <div className='card-footer'>
                      <div className='card-footer-item'>
                        <p className='subtitle is-6'>{inicio.substring(0, 10)}</p>
                      </div>
                      <div className='card-footer-item'>
                        <p className='subtitle is-6'>{precio}</p> 
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }

  render() {
    const { loading, error, errorObject } = this.state;
    return (
      <div className='section'>
        { !error ? loading ? <Loading /> : this.renderViajes() : <Error errorObject={errorObject} /> }
      </div>
    )
  }

}

export default Viajes;