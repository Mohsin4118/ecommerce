import React from 'react';
// import { AiOutlineSearch } from 'react-icons/ai';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col items-start">
          <label htmlFor="base-input" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Add Category
          </label>
          <div className="relative flex items-center w-full">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="" // Placeholder text added
            />
            {/* <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"> */}
              {/* <AiOutlineSearch className="text-gray-500 dark:text-gray-400" /> Search icon */}
            {/* </span> */}
          </div>
        </div>
        <button
        type="submit"
        className="text-white bg-yellow-400 hover:bg-white hover:text-yellow-500 border border-transparent hover:border-yellow-400 font-medium h-8 rounded-lg text-sm w-full sm:w-auto px-5  text-center transition-colors duration-300 ease-in-out"
        >
        Submit
        </button>

      </form>
    </>
  );
};

export default CategoryForm;
