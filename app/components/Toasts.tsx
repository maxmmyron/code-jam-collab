"use client";

import { toastStore } from "../utils/zustand";

const Toasts = () => {
  const store = toastStore();

  return (
    <>
      <div className="fixed bottom-0 right-0 p-4">
        {store.toasts.map((toast) => (
          <div
            key={Number(toast.timeoutID)}
            className="bg-black text-white rounded-md p-4"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
};

export default Toasts;
