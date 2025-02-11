import axios from 'axios';

async function fetchApiKey(): Promise<string | null> {
    try {
        const response = await axios.get('https://api-key-generator.christianscartaya.workers.dev/');
        if (response.status !== 200) {
            console.error('Error al obtener el API key:', response.statusText);
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
