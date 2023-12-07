import React from 'react';

const Card = ({type, name, email, contact}) => {
    return (
        // <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:m">
        //     <div className="md:flex">
        //         <div className="md:flex-shrink-0">
        //             <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/150" alt="Card" />
        //         </div>
        //         <div className="p-8">
        //             <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Tailwind CSS</div>
        //             <p className="mt-2 text-gray-500">Build fast, modern websites with Tailwind CSS.</p>
        //             <a href="#" className="mt-4 block text-left text-indigo-600 hover:underline">Learn more</a>
        //         </div>
        //     </div>
        // </div>
        <div className='flex flex-col md:w-72 w-72 bg-[white] h-32 rounded-md p-3 shadow-md transition duration-300 ease-in-out transform hover:scale-105 '>
        <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'><h1>{type} Name: <span className='text-black'>{name}</span></h1></div>
        <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'><p>{type} Email: <span className='text-black'>{email}</span></p></div>
        <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'><p>{type} Contact: <span className='text-black'>{contact}</span></p></div>
        </div>
    );
};

export default Card;
