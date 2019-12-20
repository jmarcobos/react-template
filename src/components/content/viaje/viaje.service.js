import axios from 'axios';

const urlViaje = 'http://localhost:4200/viajes';

export function getViaje(idViaje) {
    return axios.get(urlViaje + '/' + idViaje);
};