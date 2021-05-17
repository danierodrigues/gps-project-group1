
const { REACT_APP_API_URL, REACT_APP_API_URL_PROD, REACT_APP_ENV } = process.env;
var BASE_URL;

if(process.env.REACT_APP_ENV === 'dev')
    BASE_URL = REACT_APP_API_URL;

else if(process.env.REACT_APP_ENV === 'prod')
    BASE_URL = REACT_APP_API_URL_PROD;

/* For now, overwrite the BASE_URL */
BASE_URL = 'http://localhost:5000';

/* Create a candidature */
export function createCandidature(body) {

     return fetch(BASE_URL + "/candidatures", {

         method: 'POST',

         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },

         body: JSON.stringify(body)
     })
     .then(response => {

         return response.json();
     });
}

/* Retrieve all universities */
export function getUniversities() {

    return fetch(BASE_URL + "/a-definir", {

        method: 'GET',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {

        return response.json();
    });
}