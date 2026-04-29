export const DEBUG = import.meta.env.VITE_DEBUG === 'true'
export const IS_BETA = (import.meta.env.VITE_BRANCH ?? 'local') === 'beta'
