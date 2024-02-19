import React,{forwardRef,useId} from 'react'

const InputField= forwardRef ( function Input ({
    type="text",
    className="",
    label,
    errorMessage,
    ...props
    },ref) {


  return (
      <div>
        {
          label && <div className='flex items-center justify-between'>
             <label
          className={`text-base font-medium text-gray-900 ${className}`}
        > {label}
        </label>
        </div>
        }
       <div className='mt-2'>
        <input
         type={type}
         className={`flex h-10 w-full rounded-md border
         border-gray-300 bg-transparent px-3 py-2 text-sm
          placeholder:text-gray-400 focus:outline-none focus:ring-1
           focus:ring-gray-400 focus:ring-offset-1
            disabled:cursor-not-allowed disabled:opacity-50
            ${className}`
          }
        {...props}
        ref={ref}
        />
        </div>
        <p className='text-red-900'>{errorMessage}</p>
    </div>
  )
})

export default InputField