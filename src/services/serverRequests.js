const API_BASE_URL = 'http://127.0.0.1:5000';

const ServerRequests = {
    requestAuth: async (password) => {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'password': password}),
        });
        if (!response.ok) {
            throw new Error('There was an error in auth request');
        }
        const data = await response.json();
        return data;
    }
}

export default ServerRequests;