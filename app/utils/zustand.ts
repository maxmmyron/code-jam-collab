import { create } from "zustand"

interface ToastState {
  toasts: Array<{
    message: string,
    timeoutID: number
  }>
  addToast: (message: string) => void
}

export const toastStore = create<ToastState>()((set) => ({
  toasts: [],
  addToast: (message: string) => set((state) => ({
    toasts: [...state.toasts, {
      message,
      timeoutID: 37461378947189,
    }]
  }))
}))

