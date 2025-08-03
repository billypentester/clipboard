const isMobile = () => {
    if(typeof window === 'undefined') {
        return false;
    }
    return window.innerWidth <= 1024;
}

export const errorToastConfig: ToastConfig = {
    icon: '❌',
    position: isMobile() ? 'top-center' : 'bottom-center',
    style: {
        background: '#f8d7da',
        color: '#721c24'
    }
}

export const successToastConfig: ToastConfig = {
    icon: '✅',
    position: isMobile() ? 'top-center' : 'bottom-center',
    style: {
        background: '#d4edda',
        color: '#155724'
    }
}