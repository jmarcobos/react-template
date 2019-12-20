import React from 'react';
import { Component } from 'react';
import { getViaje } from './viaje.service';
import './viaje.css';

class Viaje extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, viaje: {}, usuarios: [] };
  }

  componentDidMount() {
    getViaje(this.props.match.params.id)
      .then((response) => {
        this.setState({ viaje: response.data[0][0], usuarios: response.data[1], loading: false });
        //console.log(this.props.location.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderPosts = () => {
    const { viaje, usuarios } = this.state;
    console.log(usuarios);
    return (
      <div className='container'>
        <h1 className='title'>{viaje.titulo}</h1>
        <h3 className='subtitle is-4'>{viaje.subtitulo}</h3>
        <h6 className='subtitle is-5'>{viaje.cuerpo}</h6>
        <div className='field'>
          <label className='label'>Fecha inicio:</label>
          <div className='control'>
            <label className='label'>{viaje.inicio.substring(0, 10)}</label>   
          </div>
        </div>
        <div className='field'>
          <label className='label'>Fecha fin:</label>
          <div className='control'>
            <label className='label'>{viaje.fin.substring(0, 10)}</label>   
          </div>
        </div>
        <div className='field'>
          <label className='label'>Precio:</label>
          <div className='control'>
            <span className='tag is-light'>{viaje.precio}</span>   
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <div className = 'section viaje'>
        {loading ? 'Cargando...' : this.renderPosts()}
      </div>
    );
  }

}

export default Viaje;