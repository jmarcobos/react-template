import axios from 'axios';

const urlViajesHistorico = 'http://localhost:4200/historico';
const urlViajes = 'http://localhost:4200/viajes';

export function getMisViajes(email) {
    return axios.get(urlViajes + '/user/' + email);
};

export function getMisViajesHistorico(email) {
    return axios.get(urlViajesHistorico + '/user/' + email);
};

export function postMiViaje(viaje) {
    return axios.post(urlViajes, viaje);
};