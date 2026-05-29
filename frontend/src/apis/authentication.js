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
            const data = await response.json();
            return [data, '']
        }
        return ['', 'Server side error']
    } catch(error) {
        return ['',` Server down: ${error}`]
    }
}