import { create, type StateCreator } from "zustand";
import { audiosSlice, type AudiosSlice } from "./slices/audios";

export type Slices = AudiosSlice;

export type Slice<S> = StateCreator<Slices, [], [], S>;

export const useStore = create<Slices>((...a) => ({
  ...audiosSlice(...a),
}));
