import type { Audio } from './interfaces/audio';
import FormData from 'form-data';
import api from './api';

// Función para subir el audio
export const uploadAudio = async (file: File): Promise<number> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<{ id: number }>('/audios', formData, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data.id;
};

// Función para obtener los audios
export const getAudios = async (): Promise<Audio[]> => {
    const response = await api.get<Audio[]>('/audios');
    return response.data;
}

// Función para masterizar el audio
export const masterAudio = async (
    inputAudioId: number,
    masteringOptions: Record<string, any>
): Promise<{ id: number }> => {
    const formData = new FormData();
    formData.append('input_audio_id', inputAudioId.toString());

    Object.entries(masteringOptions).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await api.post<{ id: number }>('/masterings', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

// Función para obtener el token de descarga
export const getDownloadToken = async (audioId: number): Promise<string> => {
    const response = await api.get<{ token: string }>(`/audios/${audioId}/download_token`);
    return response.data.token;
};

// Función para descargar el audio masterizado
export const downloadMasteredAudio = async (audioId: number, token: string): Promise<Blob> => {
    const response = await api.get(`/audios/${audioId}/download`, {
        params: { token },
        responseType: 'blob',
    });
    return response.data;
};
