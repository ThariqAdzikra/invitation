import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3.5,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`relative inline-block bg-clip-text ${
        disabled
          ? 'text-gold'
          : 'bg-gradient-to-r from-[#C5A059] via-[#FFF3D1] to-[#C5A059] bg-[length:200%_100%] animate-shiny text-transparent'
      } ${className}`}
      style={{
        animationDuration,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
