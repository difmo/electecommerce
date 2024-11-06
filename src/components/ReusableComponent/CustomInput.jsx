import React from "react";

const CustomInput = ({name,type,value,onChange,placeholder,onBlur,error}) => {
  return (
    <div>
      <input
      name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        // required
      />
          {error && <p className="text-sm text-red-500">{error}</p>}

    </div>
  );
};

export default CustomInput;
