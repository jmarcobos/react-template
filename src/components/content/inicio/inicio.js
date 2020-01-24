import React, { Component } from 'react';
import { getEtiquetas } from './inicio.service';
import Loading from './../../shared/pages/loading/loading';
import Error from './../../shared/pages/error/error';

class Inicio extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            error: false,
            errorObject: null, 
            etiquetas: [] 
        };
    }

    componentDidMount() {
        getEtiquetas('inicio')
            .then((response) => {
                this.setState ({
                    etiquetas: response.data,
                    loading: false
                });
            })
            .catch(e => {
                this.setState({ 
                  error: true,
                  errorObject: e
                });
              });
    }

    renderInicio = () => {
        var titulo = this.state.etiquetas.data.filter(x => x.nombre === 'titulo');
        var subtitulo = this.state.etiquetas.data.filter(x => x.nombre === 'subtitulo');
        var cuerpo = this.state.etiquetas.data.filter(x => x.nombre === 'cuerpo');
        return (
            <div className='container'>
                <h1 className="title">{titulo[0].castellano}</h1>
                <h3 className="subtitle is-4">{subtitulo[0].castellano}</h3>
                <h5 className="subtitle is-5">{cuerpo[0].castellano}</h5>
            </div>
        );
    }

    render() {
        const { loading, error, errorObject } = this.state;
        return (
          <div className='section'>
            { !error ? loading ? <Loading /> : this.renderInicio() : <Error errorObject={errorObject} /> }
          </div>
        )
      }
    
}

export default Inicio;