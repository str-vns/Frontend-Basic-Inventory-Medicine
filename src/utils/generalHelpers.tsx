export const devError = (error: string) => {
    if (import.meta.env.VITE_MED_PROCESS === 'DEV') {
        console.error('Error:', error);
    }
}

export const devLog = (message: string) => {
    if (import.meta.env.VITE_MED_PROCESS === 'DEV') {
        console.log('Log:', message);
    }
}

export const devWarn = (message: string) => {
    if (import.meta.env.VITE_MED_PROCESS === 'DEV') {
        console.warn('Warning:', message);
    }
}

