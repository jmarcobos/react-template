import axios from 'axios';

const urlMisViajes = 'http://localhost:4200/historico';
const urlViajes = 'http://localhost:4200/viajes';

export function getMisViajes(email) {
    return axios.get(urlMisViajes + '/user/' + email);
};

export function postMiViaje(viaje) {
    return axios.post(urlViajes, viaje);
};