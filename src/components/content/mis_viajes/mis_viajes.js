import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMisViajes, getMisViajesHistorico, postMiViaje } from './mis_viajes.service';
import './mis_viajes.css';

class MisViajes extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      viajes: [], 
      viaje: {}, 
      viajesHistorico: [], 
      loadingViaje: true, 
      loadingHistorico: true, 
      showCreate: false,  
      titulo: '', 
      subtitulo: '', 
      cuerpo: '', 
      inicio: '', 
      fin: '', 
      precio: '' 
    };
    this.submit = this.submit.bind(this);
  }

  componentWillMount = () => {
    getMisViajes(localStorage.getItem('email'))
      .then((response) => {
        this.setState({
          viajes: response.data,
          loadingViaje: false
        });
      })
      .catch((err) => console.log(err));

      getMisViajesHistorico(localStorage.getItem('email'))
      .then((response) => {
        this.setState({
          viajesHistorico: response.data,
          loadingHistorico: false
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
      id: null,
      titulo: this.state.titulo,
      subtitulo: this.state.subtitulo,
      cuerpo: this.state.cuerpo,
      inicio: this.state.inicio,
      fin: this.state.fin,
      precio: this.state.precio,
      usuario: {
        email: localStorage.getItem('email')
      }
    }
    this.setState({ viaje: viaje });
    
    postMiViaje(viaje)
      .then((response) => {
        if (response.status === 200 && response.data) {
          var viaje = this.state.viaje;
          viaje.id = response.data.insertId;
          var viajes = this.state.viajes;
          viajes.push(viaje);
          this.setState({ viajes: viajes });
          this.setState({ showCreate: false });
        }
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

  renderMisViajes = (viajes, viajesHistorico) => {
    return (
      <div>
        <h4>Viajes</h4>    
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Subtitulo</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              viajes.map(viaje => {
                return (
                  <tr key={viaje.id}>
                    <td>{viaje.titulo}</td>
                    <td>{viaje.titulo}</td>
                    <td>{viaje.subtitulo}</td>
                    <td>Sí</td>
                    <td><Link className='item' to={{ pathname: '/viaje/' + viaje.id, state: { parametro: 'hola' }}}>Ver</Link></td>
                  </tr>
                  
                )
              })
            }
            {
              viajesHistorico.map(viajeHistorico => {
                return (
                  <tr key={viajeHistorico.id}>
                    <td>{viajeHistorico.titulo}</td>
                    <td>{viajeHistorico.subtitulo}</td>
                    <td>No</td>
                    <td><Link className='item' to={{ pathname: '/historico/' + viajeHistorico.id }}>Ver</Link></td>
                  </tr>
                )
              })
            }
          </tbody>        
        </table>
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
    const { viajes, viajesHistorico, loadingViaje, loadingHistorico, showCreate } = this.state;
  
    if (!loadingViaje && !loadingHistorico) {
      if (!showCreate) {
        return this.renderMisViajes(viajes, viajesHistorico);
      } else {
        return this.renderPost();
      }     
    } else {
      return 'Cargando...';
    }

  }
  
}

export default MisViajes;