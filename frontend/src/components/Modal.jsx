import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black/20 bg-opacity-50 px-4'>
      <div className='relative w-full p-4 max-w-3xl max-h-full'>
        <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700 w-full'>
          <div className='flex justify-between items-center p-4 border-b md:p-5 rounded-t dark:border-gray-600 border-gray-200'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>{title}</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
              onClick={onClose}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1l12 12M13 1 1 13'
                />
              </svg>
            </button>
          </div>
          <div className='p-4 md:p-5 space-y-4 w-full'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
