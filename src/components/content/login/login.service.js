import axios from 'axios';

const urlUsuarios = 'http://localhost:4200/usuarios';

export function getUsuarioByEmail(email) {
    return axios.get(urlUsuarios + '/email/' + email);
};