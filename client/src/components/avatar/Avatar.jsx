import React from 'react';

const Avatar = ({ src, alt }) => {
  return (
    <img 
      src={src} 
      alt={alt || 'User Avatar'} // Provide a fallback alt text
      className="w-10 h-10 rounded-full" // Tailwind CSS for styling
    />
  );
};

export default Avatar;
