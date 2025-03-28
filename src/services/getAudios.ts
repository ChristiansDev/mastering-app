import type { DataAudio } from "../utils/interfaces";
import { api } from "@/config/api";

export const getAudios = async (): Promise<DataAudio[]> => {
    try {
        const response = await api.get<DataAudio[]>('/audios');
        return response.data;
    } catch (e) {
        console.error(e)
        return []
    }
}