import React from 'react'
import { motion } from 'framer-motion'
import { useLocation } from "react-router-dom";

function Alert() {
   const location = useLocation();
  const message = location.state?.message;
    if (!message) return null;
  return (
     <div className="fixed top-0 left-0 w-full flex justify-center z-50">
      <motion.div
        role="alert"
        initial={{ y: -150, scale: 0.5, opacity: 0 }}
        animate={{ y: 100, scale: [1, 1.4, 1], opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          scale: { duration: 0.4, delay: 0.3 },
        }}
        className="alert alert-success max-w-sm w-full mt-7 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-lg font-semibold"> {message} successful!</span>
      </motion.div>
    </div>

  )
}

export default Alert
