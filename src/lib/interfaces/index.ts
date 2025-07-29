interface IClipData {
    id: string
    content: string
    is_pin: boolean
}

interface IClipProps {
    data: IClipData
}

interface IClip {
    id: string
    content: string
    created_at?: string
    is_pin: boolean
    [key: string]: any
}

interface IClipStore {
    clips: IClip[]
    setClips: (clips: IClip[]) => void
    deleteClip: (id: string) => void
    addClip: (clip: IClip) => void
    pinClip: (id: string, status: boolean) => void
}

interface IUserStore {
    user: IUser | null
    setUser: (user: IUser) => void
    clearUser: () => void
}

interface IUser {
    id: string
    email: string
}