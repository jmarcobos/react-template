import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMisViajes, postMiViaje } from './mis_viajes.service';
import './mis_viajes.css';

class MisViajes extends Component {

  constructor(props) {
    super(props);
    this.state = { viajes: [], loading: true, showCreate: false,  titulo: '', subtitulo: '', cuerpo: '', inicio: '', fin: '', precio: '' };
    this.submit = this.submit.bind(this);
  }

  componentWillMount = () => {
    getMisViajes(localStorage.getItem('email'))
      .then((response) => {
        this.setState({
          viajes: response.data,
          loading: false
        });
      })
      .catch((err) => console.log(err));
  }

  mostrarAlta = () => {
    this.setState({ showCreate: true });
  }

  submit = (event) => {
    event.preventDefault();
    var viaje = {
      titulo: this.state.titulo,
      subtitulo: this.state.subtitulo,
      cuerpo: this.state.cuerpo,
      inicio: this.state.inicio,
      fin: this.state.fin,
      precio: this.state.precio
    }
    postMiViaje(viaje)
      .then((response) => {
        /*if (response.status === 200 && response.data.password === this.state.password) {
          this.setState({ redirect: true, error: false });
        } else {
          this.setState({ error: true });
        }*/
        alert('hola');
      })
      .catch((err) => console.log(err));
  }

  onChangeTitulo = event => {
    this.setState({ titulo: event.target.value });
  }

  onChangeSubtitulo = event => {
    this.setState({ subtitulo: event.target.value });
  }

  onChangeCuerpo = event => {
    this.setState({ cuerpo: event.target.value });
  }

  onChangeInicio = event => {
    this.setState({ inicio: event.target.value });
  }

  onChangeFin = event => {
    this.setState({ fin: event.target.value });
  }

  onChangePrecio = event => {
    this.setState({ precio: event.target.value });
  }

  renderMisViajes = (viajes) => {
    return (
      <div>
        {
          viajes.map(viaje => {
            return (
              <div key={viaje.cod}>{viaje.titulo} - {viaje.subtitulo}</div>
            )
          })
        }
         <Link className='item' to={this.props.path} onClick={this.mostrarAlta}>Nuevo viaje</Link>
      </div>
    );
  }

  renderPost = () => {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label>
            Título:<br></br>
            <input type="text" value={this.state.titulo} onChange={this.onChangeTitulo} />
          </label>
          <br></br>
          <label>
            Subtítulo:<br></br>
            <input type="text" value={this.state.subtitulo} onChange={this.onChangeSubtitulo} />
          </label>
          <br></br>
          <label>
            Cuerpo:<br></br>
            <input type="text" value={this.state.cuerpo} onChange={this.onChangeCuerpo} />
          </label>
          <br></br>
          <label>
            Fecha inicio:<br></br>
            <input type="text" value={this.state.inicio} onChange={this.onChangeInicio} />
          </label>
          <br></br>
          <label>
            Fecha fin:<br></br>
            <input type="text" value={this.state.fin} onChange={this.onChangeFin} />
          </label>
          <br></br>
          <label>
            Precio:<br></br>
            <input type="text" value={this.state.precio} onChange={this.onChangePrecio} />
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="Aceptar" />
        </form>
      </div>
    );
  }

  render() {
    const { viajes, loading, showCreate } = this.state;
  
    if (!loading) {
      if (!showCreate) {
        return this.renderMisViajes(viajes);
      } else {
        return this.renderPost();
      }     
    } else {
      return 'Cargando...';
    }

  }
  
}

export default MisViajes;