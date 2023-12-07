import React from 'react';

const Button = ({ text, colorVariant, textColor, borderColorVariant, onClick,  }) => {
  // Define CSS classes based on the colorVariant prop
  const getButtonClasses = () => {
    switch (colorVariant) {
      case 'yellow':
        return 'bg-yellow-400 hover:bg-yellow-300';
      case 'green':
        return 'bg-green-400 hover:bg-green-300 text-white';
      // Add more color variants as needed
      default:
        return 'bg-[#F4CE14] hover:bg-white';
    }
  };

  // Define text color classes based on the textColor prop
  const getTextClasses = () => {
    if (textColor === 'white') {
      return 'text-white';
    } else if (textColor === 'black') {
      return 'text-black';
    } else {
      return ''; // No additional text color styling
    }
  };
  
  // Define border color classes based on the borderColorVariant prop
  const getBorderColorClasses = () => {
    switch (borderColorVariant) {
      case 'blue':
        return 'border-blue-500';
      case 'red':
        return 'border-red-500';
      // Add more border color variants as needed
      default:
        return 'border-transparent';
    }
  };

  return (
    <button
      className={`font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center ${getButtonClasses()} ${getBorderColorClasses()}`}
      onClick={onClick}
    >
      <span className={`font-medium ${getTextClasses()}`}>{text}</span>
    </button>
  );
};

export default Button;
