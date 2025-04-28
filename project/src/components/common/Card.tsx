import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  footer,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg overflow-hidden 
        shadow-card transition-shadow
        ${hoverable ? 'hover:shadow-card-hover cursor-pointer' : ''}
        ${className}
      `}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;