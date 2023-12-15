import React from 'react';

const InputField = ({ label, type, value, onChange, required, placeholder,disabled}) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <input
        type={type}
        name={`floating_${label.toLowerCase()}`}
        id={`floating_${label.toLowerCase()}`}
        value={value} // Use the provided value prop
        onChange={onChange} // Use the provided onChange function
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F4CE14] peer focus:border-[#F4CE14]"
        placeholder=" "
        required={required}
        disabled={disabled}
      />
      <label
        htmlFor={`floating_${label.toLowerCase()}`}
        className="peer-focus:font-bold peer-focus:text-lg absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#F4CE14] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
