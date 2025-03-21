import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, label, type, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="relative flex items-center border border-slate-300 rounded-md px-3 py-2">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-sm text-slate-700"
        />

        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className='text-primary cursor-pointer'
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className='text-slate-400 cursor-pointer'
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
                
          

export default Input;
