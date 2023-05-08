import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-zinc-700 opacity-70">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-gray-300 
      border-t-transparent"
      ></div>
    </div>
  )
}

export default Loader
