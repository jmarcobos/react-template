import axios from 'axios';

const urlViajes = 'http://localhost:4200/viajes';

export function getViajes() {
    return axios.get(urlViajes);
};
  
export function postPost({title, body}) {
    return axios({
        method: 'post',
        url: urlViajes,
        data: {
            title,
            body
        }
    })
};