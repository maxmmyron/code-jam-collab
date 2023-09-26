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
            className="bg-red-500 rounded-md p-2"
          >
            {toast.message}
          </div>
        ))}
      </div>
      <button onClick={() => store.addToast("hello")}>Toast</button>
    </>
  );
};

export default Toasts;
