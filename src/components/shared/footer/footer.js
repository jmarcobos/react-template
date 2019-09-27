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
            .catch((err) => {
                console.log(err)
            });
    }

    renderPosts = () => {
        const { etiquetas } = this.state;
        return etiquetas.data.map((viaje, index) => {
          const { castellano } = viaje;
          return (
            <div key={index} className='footer-item'>
                <h5>{castellano}</h5>
            </div>
          );
        });
    }

    render() {
        const { loading } = this.state;
        return (
        <div className = 'footer'>
            {loading ? '' : this.renderPosts()}
            </div>
        );
    }
    
}

export default Footer;