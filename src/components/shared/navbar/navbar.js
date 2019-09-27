import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';
import './navbar.css';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { user: '' };
  }

  logearse = (msg, data) => {
    if (msg === 'logeado') {
      this.setState({ user: data });
    } else {
      if (msg === 'nologeado')
      {
        this.setState({ user: data});
      }
    }
  }

  salir = () => {
    localStorage.clear();
    this.setState({ user: null});
  }

  componentDidMount() {
    PubSub.subscribe('logeado', this.logearse);
    if (localStorage.getItem('email')) {
      this.setState({ user: localStorage.getItem('email') });
    }
  }

  render() {
    if (this.state.user) {
      return (
        <div className='navbar'>
          <Link className='item' to='/'>Logo</Link>
          <Link className='item' to='/viajes'>Viajes</Link>
          <div className='busqueda' texto="Búsqueda">Búsqueda</div>
          <Link className='item' to='/personal'>{this.state.user}</Link>
          <Link className='item' to={this.props.path} onClick={this.salir}>Salir</Link>
        </div>
      );
    } else {
      return (
        <div className='navbar'>
          <Link className='item' to='/'>Logo</Link>
          <Link className='item' to='/viajes'>Viajes</Link>
          <div className='busqueda' texto="Búsqueda">Búsqueda</div>
          <Link className='item' to='/login'>Identificate</Link>
        </div>
      );
    }
  }

}

export default Navbar;