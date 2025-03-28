import type { DataAudio } from "@/utils"
import type { Slice } from ".."
import { getAudios } from "@/services"

const initialState = {
    audios: [] as DataAudio[],
    loadingAudios: false,
    audioError: null,
}

export type AudiosSlice = {
    audios: DataAudio[]
    setAudio: (audio: DataAudio) => void
    resetAudios: () => void
    loadAudios: () => Promise<void>
    loadingAudios: boolean
    audioError: string | null
}

export const audiosSlice: Slice<AudiosSlice> = (set) => ({
    audios: initialState.audios,
    loadingAudios: initialState.loadingAudios,
    audioError: initialState.audioError,
    loadAudios: async () => {
        set({ loadingAudios: true, audioError: null })
        await getAudios()
            .then((audios) => {
                if(!audios) return
                set((state) => ({ ...state, audios }))
            })
            .catch((audioError) => {
                set((state) => ({ ...state, audioError }))
            }).finally(() => {
                set((state) => ({ ...state, loadingAudios: false }))
            })
    },
    setAudio: (audio: DataAudio) => set((state) => ({ ...state, audios: state.audios ? [...state.audios, audio] : [audio] })),
    resetAudios: () => set(initialState)
})
