import axios from 'axios';
import { enviroments } from '@/config';

async function fetchApiKey(): Promise<string | null> {
    try {
        const response = await axios.get(enviroments.services.workers.generateApiKey);
        if (response.status !== 200) {
            console.error('Error getting the api key:', response.statusText);
            return null;
        }
        const data = response.data;
        return data.apiKey;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error en fetchApiKey:', error.message);
        } else {
            console.error('Error en fetchApiKey:', error);
        }
        return null;
    }
}

export default fetchApiKey;
