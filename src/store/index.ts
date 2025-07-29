import { create } from 'zustand'


const clipStore = create<IClipStore>((set) => ({
    clips: [],
    setClips: (clips: IClip[]) => set({ clips }),
    deleteClip: (id) =>
        set((state) => ({
            clips: state.clips.filter((clip) => clip.id !== id),
        })),
    addClip: (clip) =>
        set((state) => ({
            clips: [clip, ...state.clips],
        })),
    pinClip: (id, status) =>
        set((state) => ({
            clips: state.clips.map((clip) =>
                clip.id === id ? { ...clip, is_pin: !status } : clip
            ),
        })),
}))

const userStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null })
}))

export { userStore, clipStore }