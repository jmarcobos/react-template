import React from 'react';
import { Component } from 'react';
import { getViaje } from './viaje.service';
import './viaje.css';

class Viaje extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, viaje: 0 };
  }

  componentDidMount() {
    getViaje(this.props.match.params.id)
      .then((response) => {
        this.setState({ viaje: response.data, loading: false });
        console.log(this.props.location.state);
      })
      .catch((err) => console.log(err));
  }

  renderPosts = (viaje) => {
    return (
      <div className='viaje'>
        <h1>{viaje.titulo}</h1>
        <p>{viaje.cuerpo}</p>
      </div>
    )
  }

  render() {
    const { loading, viaje } = this.state;
    console.log(viaje)
    return (
      <div className = 'viajes'>
        {loading ? 'Cargando...' : this.renderPosts(viaje)}
      </div>
    );
  }

}

export default Viaje;