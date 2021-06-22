const { REACT_APP_API_URL, REACT_APP_API_URL_PROD, REACT_APP_ENV } = process.env;
var BASE_URL;

if(REACT_APP_ENV === 'dev')
    BASE_URL = REACT_APP_API_URL;

else if(REACT_APP_ENV === 'prod')
    BASE_URL = REACT_APP_API_URL_PROD;

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

    return fetch(BASE_URL + "/institutions", {

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

/* Retrieve all questions for FAQ */
export function getQuestions() {

    return fetch(BASE_URL + "/faqs", {

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