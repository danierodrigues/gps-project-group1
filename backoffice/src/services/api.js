
const { REACT_APP_API_URL, REACT_APP_API_URL_PROD, REACT_APP_ENV } = process.env;
var BASE_URL;

if(REACT_APP_ENV === 'dev')
    BASE_URL = REACT_APP_API_URL;

else if(REACT_APP_ENV === 'prod')
    BASE_URL = REACT_APP_API_URL_PROD;



export function login(body){

    return fetch(BASE_URL + "/auth", {

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
};

export function verifyToken(token) {

    return fetch(BASE_URL + "/verifyToken", {

        method: 'GET',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {

        return response.json();
    });
}


export function getAllUniversities(token, querystring = '') {

    return fetch(BASE_URL + `/institutions?${querystring}`, {
      method: 'GET',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {

        return response.json();
    });
}
      

/* Retrieve all candidatures */
export function getAllCandidatures(token, querystring = '') {

    return fetch(BASE_URL + `/candidatures?${querystring}`, {

        method: 'GET',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {

        return response.json();
    });
}


export function deleteUniversities(token, body) {

    return fetch(BASE_URL + `/deleteinstitutions`, {

        method: 'POST',
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })
    .then(response => {

        return response.json();
    });
}

/*Delete a candidature*/
export function deleteACandidature(token, id) {

    return fetch(BASE_URL + `/candidatures/${id}`, {

        method: 'DELETE',


        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token

        }
    })
    .then(response => {

        return response.json();
    });
}

export function createInstitution(token, body) {

    return fetch(BASE_URL + "/institutions", {

        method: 'POST',

        headers: {
            'Authorization': token
        },
        body: body
    })
    .then(response => {

        return response.json();
    });
}


export function updateInstitutionVideo(token, body) {

    return fetch(BASE_URL + "/institutionswvideo", {

        method: 'PUT',

        headers: {
            'Authorization': token
        },
        body: body
    })
    .then(response => {

        return response.json();
    });
}



export function updateInstitutionWithoutVideo(token, body) {

    return fetch(BASE_URL + "/institutionswithout", {
       method: 'PUT',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })
    .then(response => {

        return response.json();
    });
}
      

/*update a candidature*/
export function updateCandidature(token, body) {

    return fetch(BASE_URL + "/candidatures", {


        method: 'PUT',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })
    .then(response => {

        return response.json();
    });
}

export function getFaqs(token, querystring = '') {

    return fetch(BASE_URL + `/faqs?${querystring}`, {
      method: 'GET',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {

        return response.json();
    });
}


/*Delete a faq*/
export function deleteAFaq(token, id) {

    return fetch(BASE_URL + `/faqs/${id}`, {

        method: 'DELETE',


        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {

        return response.json();
    });
}

export function createFaq(token, body) {

    return fetch(BASE_URL + "/faqs", {
       method: 'POST',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })
    .then(response => {

        return response.json();
    });
}


/*update a candidature*/
export function updateFaq(token, body) {

    return fetch(BASE_URL + "/faqs", {


        method: 'PUT',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    })
    .then(response => {

        return response.json();
    });
}