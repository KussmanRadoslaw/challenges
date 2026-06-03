import {DOMAIN} from './config'

export const registerApi = async (bodyObject) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    };

    try {
        const response = await fetch(`${DOMAIN}/users`, requestOptions);
        if(response.ok) {
            //const data = await response.json();
            return [response, '']
        }
        if(response.status === 422) {
            return ['', `User already exists`]
        }
        return ['', 'Server side error']
    } catch(error) {
        return ['',` Server down: ${error}`]
    }
}

export const loginApi = async (bodyObject) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
    };

    try {
        const response = await fetch(`${DOMAIN}/users/sign_in`, requestOptions);
        if(response.ok) {
            //const data = await response.json();
            return [response, '']
        }
        
        return ['', 'Server side error']
    } catch(error) {
        return ['',` Server down: ${error}`]
    }
}

export const logoutApi = async (jwtToken) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
        },
    };

    try {
        const response = await fetch(`${DOMAIN}/users/sign_out`, requestOptions);
        if(response.ok) {
            return [response, '']
        }
        const errorMess = await response.text();
        console.log('Server error:', errorMess);  

        return ['', `Server side error ${errorMess}`];
    } catch(error) {
        return ['',` Server down: ${error}`]
    }
}