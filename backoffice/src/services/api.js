
const { REACT_APP_API_URL, REACT_APP_API_URL_PROD, REACT_APP_ENV } = process.env;
var BASE_URL;

if(REACT_APP_ENV === 'dev')
    BASE_URL = REACT_APP_API_URL;

else if(REACT_APP_ENV === 'prod')
    BASE_URL = REACT_APP_API_URL_PROD;



export function Login(body){
/* setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
    setLoading(false);
    setUserSession(response.data.token, response.data.user);
    props.history.push('/dashboard');
    }).catch(error => {
    setLoading(false);
    if (error.response.status === 401) setError(error.response.data.message);
    else setError("Something went wrong. Please try again later.");
    }); */

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

/* Retrieve all candidatures */
export function getAllCandidatures(token) {

    return fetch(BASE_URL + "/candidatures", {

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
