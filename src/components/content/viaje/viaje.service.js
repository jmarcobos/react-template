import axios from 'axios';

const urlViajes = 'http://localhost:4200/viajes';

export function getViaje(idViaje) {
    return axios.get(urlViajes + '/' + idViaje);
};