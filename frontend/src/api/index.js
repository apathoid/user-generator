const defaultOptions = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export class Api {
    root = process.env.FRONTEND_API_URL || 'http://localhost:3000';

    get(path) {
        return fetch(`${this.root}${path}`, defaultOptions);
    }

    post(path, body) {
        const options = {
            ...defaultOptions,
            method: 'POST',
            body
        };

        return fetch(`${this.root}${path}`, options);
    }
}
