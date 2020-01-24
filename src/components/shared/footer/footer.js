import React from 'react';
import { Component } from 'react';
import { getEtiquetas } from '../../../common/services/common.service';
import './footer.css';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, etiquetas: [] };
    }

    componentDidMount() {
        getEtiquetas('footer')
            .then((response) => {
                this.setState ({ etiquetas: response.data, loading: false });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { loading, etiquetas } = this.state;
        if (!loading) {
            return (
                <footer className='pie'>
                    <nav className='level'>
                        {etiquetas.data.map((viaje, index) => {
                            const { castellano } = viaje;
                            return (
                                <div key={index} className='level-item has-text-centered'>
                                    <h5>{castellano}</h5>
                                </div>
                            );
                        })}
                    </nav>
                </footer>
            )
        } else {
            return '';
        }
    }
    
}

export default Footer;