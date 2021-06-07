
const { REACT_APP_API_URL, REACT_APP_API_URL_PROD, REACT_APP_ENV } = process.env;
var BASE_URL;

if(REACT_APP_ENV === 'dev')
    BASE_URL = REACT_APP_API_URL;

else if(REACT_APP_ENV === 'prod')
    BASE_URL = REACT_APP_API_URL_PROD;



export function Login(body){

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

export function getAllUniversities(token) {

    return fetch(BASE_URL + "/institutions", {

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


/* Create a candidature */
/*export function createCandidature(body) {

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
}*/

/* Retrieve all universities */
/*export function getUniversities() {

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
}*/
