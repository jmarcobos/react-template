import React from 'react';
import { Component } from 'react';
import { getViajes } from './viajes.service';
import { Link } from 'react-router-dom';
import './viajes.css';

class Viajes extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, viajes: [] };
  }

  componentDidMount() {
    getViajes()
      .then((response) => {
        this.setState({
          viajes: response.data,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  renderPosts = () => {
    const { viajes } = this.state;
    return viajes.data.map(viaje => {
      const { titulo, cuerpo, id } = viaje;
      return (
        <div key={id} className='viajes-item'>
          <Link to={{ pathname: '/viaje/' + id }}>
            <div>
              <h1>{titulo}</h1>
              <p>{cuerpo}</p>
            </div>
          </Link>
        </div>
      );
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className = 'viajes'>
        {loading ? 'Cargando...' : this.renderPosts()}
      </div>
    );
  }

}

export default Viajes;