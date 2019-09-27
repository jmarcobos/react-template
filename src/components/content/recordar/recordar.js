import React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { getUsuarioByEmail } from './recordar.service';
import './recordar.css';

class Recordar extends Component {

  constructor(props) {
    super(props);
    this.state = { redirect: false, error: false, email: '' };
    this.submit = this.submit.bind(this);
  }
  
  onChangeEmail = event => {
    this.setState({ email: event.target.value});
  }

  submit = event => {
    event.preventDefault();
    getUsuarioByEmail(this.state.email)
      .then((response) => {
        alert(JSON.stringify(response));
        localStorage.clear();
        if (response.status === 200 && response.data.password === this.state.password) {
          //this.setState({ redirect: true, error: false });
        } else {
          //this.setState({ error: true });
        }
          
      })
      .catch((err) => console.log(err));
  }

  renderRecordar = () => {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label>
            E-Mail:<br></br>
            <input type="text" value={this.state.username} onChange={this.onChangeEmail} />
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
      return <Redirect  to='/' />
    } else {
      if (!error) {
        return (<div className = 'recordar'> {this.renderRecordar()} </div>);
      }
    }
  }
  
}

export default Recordar;