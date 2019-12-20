import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/fr.js';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import Moment from 'react-moment';
import { getMisViajes, getMisViajesHistorico, postMiViaje } from './mis_viajes.service';
import './mis_viajes.css';
import 'rc-datepicker/lib/style.css';

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
      inicio: new Date(), 
      fin: '', 
      precio: '',
      modalActive: false
    };
    this.submit = this.submit.bind(this);
    
  }

  onChangeInicio = inicio => this.setState({ inicio, modalActive: false });
  closeCalendar = () => this.setState({ modalActive: false });

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

  clickCalendar = event => {
    this.setState({ modalActive: true });
  }

  /*onChangeInicio = event => {
    this.setState({ inicio: new Date(event.target.value) });
  }*/

  onChangeFin = event => {
    this.setState({ fin: event.target.value });
  }

  onChangePrecio = event => {
    this.setState({ precio: event.target.value });
  }

  renderMisViajes = (viajes, viajesHistorico) => {
    return (
      <section className = 'section mis_viajes'>
        <div className='container'>
          <h4 className="title is-4">Viajes</h4>  
          <div className="columns">
            <div className="column is-one-fifth">
              <h5 className="title is-5">Fecha creación</h5>
            </div>
            <div className="column is-one-quarter">
              <h5 className="title is-5">Título</h5>
            </div>
            <div className="column is-one-third">
              <h5 className="title is-5">Subtitulo</h5>
            </div>
            <div className="column">
              <h5 className="title is-5">Activo</h5>
            </div>
          </div>
          {
            viajes.map(viaje => {
              return (
                <div className="columns" key={viaje.id}>
                  <div className="column is-one-fifth">{viaje.created_date.substring(0, 10)}</div>
                  <div className="column is-one-quarter">{viaje.titulo}</div>
                  <div className="column is-one-third">{viaje.subtitulo}</div>
                  <div className="column">Sí</div>
                  <div className="column"><Link className='item' to={{ pathname: '/viaje/' + viaje.id, state: { parametro: 'hola' }}}>Ver</Link></div>
                </div>
              )
            })
          }
          {
            viajesHistorico.map(viajeHistorico => {
              return (
                <div className="columns" key={viajeHistorico.id}>
                  <div className="column is-one-fifth">{viajeHistorico.created_date.substring(0, 10)}</div>
                  <div className="column is-one-quarter">{viajeHistorico.titulo}</div>
                  <div className="column is-one-third">{viajeHistorico.subtitulo}</div>
                  <div className="column">No</div>
                  <div className="column"><Link className='item' to={{ pathname: '/historico/' + viajeHistorico.id }}>Ver</Link></div>
                </div>
              )
            })
          }
          <div className="buttons has-addons is-centered">
          <Link className="button is-dark is-right" to={this.props.path} onClick={this.mostrarAlta}>Nuevo viaje</Link>
          </div>
        </div>
      </section>
    );
  }

  renderPost = () => {
    return (
      <section className = 'section mis_viajes'>
      <div className="container">
        <form onSubmit={this.submit}>
          <div className="field">
            <label className="label">Título</label>
            <div className="control">
              <input className="input" type="text" placeholder="p. ej. Vaije a Almería" value={this.state.titulo} onChange={this.onChangeTitulo} />
            </div>
          </div>
          <div className="field">
            <label className="label">Subtítulo</label>
            <div className="control">
              <input className="input" type="text" placeholder="p. ej. Alex Smith" value={this.state.subtitulo} onChange={this.onChangeSubtitulo} />
            </div>
          </div>
          <div className="field">
            <label className="label">Cuerpo</label>
            <div className="control">
              <input className="input" type="text" placeholder="p. ej. Alex Smith" value={this.state.cuerpo} onChange={this.onChangeCuerpo} />
            </div>
          </div>
          <div className="field has-addons">
            <div className="control">
              <input className="input" type="text" placeholder="Fecha inicio" value={this.state.inicio} />
            </div>
            <div className="control">
              <a className="button is-info" onClick={this.clickCalendar}>
                Calendar
              </a>
            </div>
          </div>
          <div className="field">
            <label className="label">Fecha fin</label>
            <div className="control">
            </div>
              <input className="input" type="text" placeholder="p. ej. Alex Smith" value={this.state.fin} onChange={this.onChangeInicio} />
          </div>
          <div className="field">
            <label className="label">Precio</label>
            <div className="control">
            </div>
              <input className="input" type="text" placeholder="p. ej. Alex Smith" value={this.state.precio} onChange={this.onChangePrecio} />
          </div>
          <div className="field is-grouped is-grouped-right">
            <p className="control">
              <a className="button is-primary" type="submit">
                Aceptar
              </a>
            </p>
            <p className="control">
              <a className="button is-light">
                Cancelar
              </a>
            </p>
          </div>
          <div className={this.state.modalActive ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <div className="box">
                <div className="media-content">
                  <div className="has-text-centered">
                    <DatePicker onChange={this.onChangeInicio} value={this.state.inicio} />
                  </div>
                </div>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={this.closeCalendar}></button>
          </div>
        </form>
      </div>
      </section>
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