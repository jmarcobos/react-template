import axios from 'axios';

const urlUsuarios = 'http://localhost:4200/usuarios';

export function getUsuario(username) {
    return axios.get(urlUsuarios + '/login/' + username);
};