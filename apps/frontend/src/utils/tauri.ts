const TESTING_TAURI_WRAPPER = import.meta.env.VITE_TEST_TAURI_IN_WEB

export const isTestingTauriWrapper = () => TESTING_TAURI_WRAPPER === '1'

export const isTauri = () => '__TAURI_IPC__' in window
