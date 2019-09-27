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

  renderUserArea = () => {
    return (
      <div className='user_area'>
        <Link className='item' to='/misviajes'>Mis viajes</Link>
        <Link className='item' to='/misdatos'>Datos personales</Link>
        <Link className='item' to={this.props.path} onClick={this.logout}>Salir</Link>
      </div>
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect  to='/login' />
    } else {
      return this.renderUserArea();
    }
  }
  
}

export default UserArea;