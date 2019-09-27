import React from 'react';
import { Component } from 'react';
import { getEtiquetas } from './inicio.service';
import './inicio.css';

class Inicio extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, etiquetas: [] };
    }

    componentDidMount() {
        getEtiquetas('inicio')
            .then((response) => {
                this.setState ({
                    etiquetas: response.data,
                    loading: false
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    renderPosts = () => {
        var titulo = this.state.etiquetas.data.filter(x => x.nombre === 'titulo');
        var subtitulo = this.state.etiquetas.data.filter(x => x.nombre === 'subtitulo');
        var cuerpo = this.state.etiquetas.data.filter(x => x.nombre === 'cuerpo');
        return (
            <div className='inicio-item'>
                <h1>{titulo[0].castellano}</h1>
                <h3>{subtitulo[0].castellano}</h3>
                <h5>{cuerpo[0].castellano}</h5>
            </div>
        );
    }

    render() {
        const { loading } = this.state;
        return (
            <div className = 'inicio'>
                {loading ? 'Cargando...' : this.renderPosts()}
            </div>
        );
    }
    
}

export default Inicio;