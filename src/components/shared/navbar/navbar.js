import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';
import './navbar.css';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { user: '', ruta: '' };
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
        <nav className="level navegacion">
          <p className="level-item has-text-centered">
            <Link className='link is-info' to='/'>Logo</Link>
          </p>
          <p className="level-item has-text-centered">
            <Link className='link is-info' to='/viajes'>Viajes</Link>
          </p>
          <p className="level-item has-text-centered">
            <span className="control has-icons-left">
              <input className="input is-rounded" type="text" placeholder="Búsqueda" />
              <span className="icon is-small is-left">
                <i className="fa fa-search"></i>
              </span>
            </span>
          </p>
          <p className="level-item has-text-centered">
            <Link className='link is-info' to='/personal'>{this.state.user}</Link>
          </p>
          <p className="level-item has-text-centered">
          <Link className='link is-info' to={this.state.ruta} onClick={this.salir}>Salir</Link>
          </p>
        </nav>
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