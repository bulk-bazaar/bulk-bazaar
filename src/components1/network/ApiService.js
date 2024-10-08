import axios from 'axios';
import {store} from "./../../store/index";

const BASEURL = "http://localhost:3001"
// const BASEURL = "http://192.168.31.44:3001"
class ApiService {
    // const BASEURL = "http://ec2-15-207-115-10.ap-south-1.compute.amazonaws.com:3000"
    constructor(baseURL = BASEURL) {
        this.api = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Add a request interceptor to include the Authorization header
        this.api.interceptors.request.use((config) => {
            const state = store.getState();
            const token = state.user?.token; // Access the token from Redux store (adjust path as needed)

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }

    // Add a method to handle GET requests
    async get(endpoint) {
        try {
            const response = await this.api.get(endpoint);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Add a method to handle POST requests
    async post(endpoint, data) {
        try {
            const response = await this.api.post(endpoint, data);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Add a method to handle PUT requests
    async put(endpoint, data) {
        try {
            const response = await this.api.put(endpoint, data);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Add a method to handle DELETE requests
    async delete(endpoint) {
        try {
            const response = await this.api.delete(endpoint);
            return response;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Error handler method
    handleError(error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error(`API error: ${error.response.status} ${error.response.data}`);
        } else if (error.request) {
            // Request was made but no response was received
            console.error('No response received from API');
        } else {
            // Something happened in setting up the request
            console.error(`Error setting up request: ${error.message}`);
        }
        throw error;
    }
}

export default ApiService;
