import axios from 'axios';

const urlConfiguracion = 'http://localhost:4200/configuracion';

export function getEtiquetas(componente) {
    return axios.get(urlConfiguracion + '/' + componente);
};