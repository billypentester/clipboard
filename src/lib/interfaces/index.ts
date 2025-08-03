interface IClip {
    id: string
    content: string
    created_at: string
    is_pin: boolean
}

interface IUser {
    id: string
    email: string
}

interface IGroupedClips { 
    date: string,
    clips: OptionalClip[]

}

interface IClipStore {
    clips: IClip[]
    clipView: ClipView
    setClipView: (view: ClipView) => void
    clearClips: () => void
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

interface IUserCredentials {
    email: string
    password: string 
}

interface ToastConfig {
    icon: string;
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    style: React.CSSProperties;
}