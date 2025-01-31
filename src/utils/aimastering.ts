// src/utils/aimastering.ts

import FormData from "form-data";
import axios from "axios";

const API_URL = "https://api.bakuage.com:443";
const API_KEY = import.meta.env.PUBLIC_AI_MASTERING_API_KEY;

// Upload audio and get input_audio_id
export const uploadAudio = async (file: File): Promise<number> => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await axios.post<{ id: number }>(`${API_URL}/audios`, formData, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data.id; // Return the input_audio_id
};

// Master audio using the input_audio_id
export const masterAudio = async (
    inputAudioId: number,
    masteringOptions: Record<string, any>
): Promise<{ id: number }> => {
    const formData = new FormData();
    formData.append("input_audio_id", inputAudioId);

    // Add mastering options to the form data
    Object.entries(masteringOptions).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await axios.post<{ id: number }>(`${API_URL}/masterings`, formData, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data; // Return mastering response
};

// Generate a download token for the mastered audio
export const getDownloadToken = async (audioId: number): Promise<string> => {
    const response = await axios.get<{ token: string }>(
        `${API_URL}/audios/${audioId}/download_token`,
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );

    return response.data.token; // Return the download token
};

// Download the mastered audio using the token
export const downloadMasteredAudio = async (audioId: number, token: string): Promise<Blob> => {
    const response = await axios.get(`${API_URL}/audios/${audioId}/download`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
        params: {
            token,
        },
        responseType: "blob", // To handle binary data (audio file)
    });

    return response.data; // Return the audio file as a blob
};