import { create } from "zustand";

interface ToastState {
  toasts: Array<{
    message: string;
    timeoutID: NodeJS.Timeout;
    remove: () => void;
  }>;
  addToast: (message: string) => void;
}

export const toastStore = create<ToastState>()((set) => ({
  toasts: [],
  addToast: (message: string) =>
    set((state) => {
      const timeoutID = setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.timeoutID !== timeoutID),
        }));
      }, 3000);

      return {
        toasts: [
          ...state.toasts,
          {
            message,
            timeoutID,
            remove: () => {
              set((state) => ({
                toasts: state.toasts.filter(
                  (toast) => toast.timeoutID !== timeoutID
                ),
              }));
            }
          },
        ],
      };
    }),
}));
