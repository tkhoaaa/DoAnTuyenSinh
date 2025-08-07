import React from 'react';

// Default avatar SVG as base64 data URI
const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0yMCA5MEM0MCA3MCA4MCA3MCAxMDAgOTBWMTIwSDIwVjkwWiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4K";

const Avatar = ({ 
  src, 
  alt = "Avatar", 
  className = "w-24 h-24 rounded-full object-cover", 
  onError,
  ...props 
}) => {
  const handleError = (e) => {
    console.error("Avatar image failed to load:", src);
    e.target.src = DEFAULT_AVATAR;
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={src || DEFAULT_AVATAR}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default Avatar; 