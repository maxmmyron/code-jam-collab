"use client";

import { toastStore } from "../utils/zustand";
import { motion, AnimatePresence } from "framer-motion";

const Toasts = () => {
  const store = toastStore();

  return (
    <>
      <div className="fixed bottom-0 right-0 p-4 max-w-md space-y-4">
        <AnimatePresence>
          {store.toasts.map((toast) => (
            <motion.article
              key={Number(toast.timeoutID)}
              className="flex flex-nowrap gap-4 rounded-xl p-4 border shadow bg-white"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
            >
              <p className="text-neutral-700">{toast.message}</p>
              <button
                className="w-6 h-6 flex justify-center items-center p-2 rounded bg-neutral-700 text-white"
                onClick={() => toast.remove()}
              >
                ✖
              </button>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Toasts;
