import React, { Component } from 'react';
import { getViaje } from './viaje.service';
import Loading from './../../shared/pages/loading/loading';
import Error from './../../shared/pages/error/error';

class Viaje extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      error: false,
      errorObject: null, 
      viaje: {}, 
      usuarios: [] 
    };
  }

  componentDidMount() {
    getViaje(this.props.match.params.id)
      .then(response => {
        this.setState({ 
          viaje: response.data[0][0], 
          usuarios: response.data[1], 
          error: false,
          errorObject: null,
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

  renderViaje = () => {
    const { viaje, usuarios } = this.state;
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column is-full'>
            <h1 className='title'>{viaje.titulo}</h1>
          </div>
        </div>
        <div className='columns'>
          <div className='column is-two-thirds'>
            <div className='columns'>
              <div className='column is full'>
                <h5 className='subtitle is-5'>{viaje.subtitulo}</h5>
                <h6 className='subtitle is-6'>{viaje.cuerpo}</h6>
              </div>
            </div>
            <div className='columns'>
              <div className='column is-one-fifth'>
                <h6 className='subtitle is-6'>Inicio: </h6> 
              </div>
              <div className='column is-four-fifth'>
                <h6 className='subtitle is-6'>{viaje.inicio.substring(0, 10)}</h6>
              </div>
            </div>
            <div className='columns'>
              <div className='column is-one-fifth'>
                <h6 className='subtitle is-6'>Vuelta: </h6> 
              </div>
              <div className='column is-four-fifth'>
                <h6 className='subtitle is-6'>{viaje.fin.substring(0, 10)}</h6>
              </div>
            </div>
            <div className='columns'>
              <div className='column is-one-fifth'>
                <h6 className='subtitle is-6'>Precio: </h6> 
              </div>
              <div className='column is-four-fifth'>
                <h6 className='subtitle is-6'>{viaje.precio}</h6>
              </div>
            </div>
          </div>
          <div className='column is-one-third'>
            <div className='columns'>
              <div className='column is-full'>
                {
                  usuarios
                    .filter(usuario => usuario.creador)
                    .map(usuario => { return ( 
                      <div key={usuario.id}>
                        <h5 className='subtitle is-5'>{usuario.nombre} {usuario.apellido1} {usuario.apellido2} - Owner</h5>
                        <h6 className='subtitle is-6'>{usuario.email}</h6>
                      </div>
                      )})
                }
              </div>
            </div>
            <div className='columns'>
              <div className='column is-full'>
                {
                  usuarios
                    .filter(usuario => !usuario.creador)
                    .map(usuario => { return (
                      <div key={usuario.id}>
                        <h5 className='subtitle is-5'>{usuario.nombre} {usuario.apellido1} {usuario.apellido2}</h5>
                        <h6 className='subtitle is-6'>{usuario.email}</h6>
                      </div> 
                    )})
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } 

  render() {
    const { loading, error, errorObject } = this.state;
    return (
      <div className='section'>
        { !error ? loading ? <Loading /> : this.renderViaje() : <Error errorObject={errorObject} /> }
      </div>
    )
  }

}

export default Viaje;