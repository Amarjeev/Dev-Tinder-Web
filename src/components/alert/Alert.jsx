import React from 'react'
import { motion } from 'framer-motion'

function Alert() {
  return (
    <div className="flex justify-center mt-7">
      <motion.div
        role="alert"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="alert alert-success max-w-sm w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Login successful!</span>
      </motion.div>
    </div>
  )
}

export default Alert
