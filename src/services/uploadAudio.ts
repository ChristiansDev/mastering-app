import type { DataAudio } from "@/utils";
import { api } from "@/config/api";

export const uploadAudio = async (file: File): Promise<DataAudio> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await api.post<DataAudio>('/audios', formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (e) {
        return {} as DataAudio
    }
};
