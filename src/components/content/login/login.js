import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import PubSub from 'pubsub-js';
import { getUsuarioByEmail } from './login.service';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false, error: false, email: '', password: '' };
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChangeUsername = event => {
    this.setState({ email: event.target.value});
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();
    getUsuarioByEmail(this.state.email)
      .then((response) => {
        localStorage.clear();
        if (response.status === 200 && response.data.password === this.state.password) {
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('last_login', response.data.last_login);
          PubSub.publish('logeado', response.data.email);
          this.setState({ redirect: true, error: false });
        } else {
          this.setState({ error: true });
        }
          
      })
      .catch((err) => console.log(err));
  }

  renderLogin = () => {
    const { error } = this.state;
    return (
      <div className='container'>
        <form onSubmit={this.onSubmit}>
          <div className='columns'>
            <div className='column is-half is-offset-one-quarter'>
              <div className="field">
                <label className="label">Username:</label>
                <div className="control">
                  <input className="input" type="text" placeholder='Escriba aquí su nombre de usuario' value={this.state.email} onChange={this.onChangeUsername} />
                </div>
              </div>
              <div className="field">
                <label className="label">Password:</label>
                <div className="control">
                  <input className="input" type="password" placeholder='Escriba aquí su password' value={this.state.password} onChange={this.onChangePassword} />
                </div>
              </div>
            </div>
          </div>
          { !error ? null : 
            <div className='columns'>
              <div className='column is-half is-offset-one-quarter'>
                <p className='has-text-centered'>Usuario o contraseña incorrectos.</p>
              </div>
            </div>
          }
          <div className='columns'>
            <div className='column is-half is-offset-one-quarter'>
              <div className="field is-grouped is-grouped-centered">
                <div className="control">
                  <button type="submit" className="button is-link">Aceptar</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light">Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className='columns is-centered'>
            <div className='column is-half is-offset-one-quarter'>
              <Link className='item' to='/recordar'>¿Olvidó su contraseña?</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/viajes' />
    } else {
        return (
          <div className = 'section'>
            { this.renderLogin() }
          </div>
        );
    }
  }
  
}

export default Login;