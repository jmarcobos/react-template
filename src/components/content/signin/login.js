import React from 'react';
import { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import PubSub from 'pubsub-js';
import { getUsuario } from './login.service';
import './login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false, error: false, username: '', password: '' };
    this.submit = this.submit.bind(this);
  }
  
  onChangeUsername = event => {
    this.setState({ username: event.target.value});
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  submit = event => {
    event.preventDefault();
    getUsuario(this.state.username)
      .then((response) => {
        localStorage.clear();
        if (response.status === 200 && response.data.password === this.state.password) {
          localStorage.setItem('username', response.data.login);
          localStorage.setItem('last_login', response.data.last_login);
          PubSub.publish('logeado', response.data.login);
          this.setState({ redirect: true, error: false });
        } else {
          this.setState({ error: true });
        }
          
      })
      .catch((err) => console.log(err));
  }

  renderLogin = () => {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label>
            Username:<br></br>
            <input type="text" value={this.state.username} onChange={this.onChangeUsername} />
          </label>
          <br></br>
          <label>
            Password:<br></br>
            <input type="text" value={this.state.password} onChange={this.onChangePassword} />
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="Aceptar" />
        </form>
        <Link className='item' to='/recordar'>Olvidó su contraseña?</Link>
      </div>
    );
  }

  renderError = () => {
    return (
      <div>
        <form onSubmit={this.submit}>
          <p> Usuario o contraseña incorrectos. </p>
          <label>
            Username:<br></br>
            <input type="text" value={this.state.username} onChange={this.onChangeUsername} />
          </label>
          <br></br>
          <label>
            Password:<br></br>
            <input type="text" value={this.state.password} onChange={this.onChangePassword} />
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="Aceptar" />
        </form>
      </div>
    );
  }

  render() {
    const { redirect, error } = this.state;
    if (redirect) {
      return <Redirect  to='/viajes' />
    } else {
      if (!error) {
        return (<div className = 'login'> {this.renderLogin()} </div>);
      } else {
        return (<div className = 'login'> {this.renderError()} </div>);
      }
    }
  }
  
}

export default Login;