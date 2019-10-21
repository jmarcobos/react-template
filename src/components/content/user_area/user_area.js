import React from 'react';
import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PubSub from 'pubsub-js';
import './user_area.css';

class UserArea extends Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  logout = () => {
    localStorage.clear();
    PubSub.publish('logeado', null);
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect  to='/login' />
    } else {
      return (
        <section className = 'section user_area'>
          <div className='container'>
          <nav className="level">
            <p className="level-item has-text-centered">
              <Link className='link is-info' to='/misviajes'>Mis viajes</Link>
            </p>
            <p className="level-item has-text-centered">
              <Link className='item' to='/misdatos'>Datos personales</Link>
            </p>
            <p className="level-item has-text-centered">
            <Link className='item' to={this.props.location.pathname} onClick={this.logout}>Salir</Link>
            </p>
            </nav>
          </div>
        </section>
      )
    }
  }
  
}

export default UserArea;