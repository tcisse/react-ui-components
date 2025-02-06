import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useClickOutside } from '../../hooks/useClickOutside';
import { cn } from '../../utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  overlay?: boolean;
  title: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = 'md',
  className,
  closeOnClickOutside = true,
  closeOnEsc = true,
  overlay = true,
  title,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useClickOutside(drawerRef, () => {
    if (closeOnClickOutside) {
      onClose();
    }
  });

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: position === 'left' || position === 'right' ? 'w-64' : 'h-64',
    md: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
    lg: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    xl: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    full: position === 'left' || position === 'right' ? 'w-screen' : 'h-screen',
  };

  const positionClasses = {
    left: 'left-0 top-0 h-full transform -translate-x-full',
    right: 'right-0 top-0 h-full transform translate-x-full',
    top: 'top-0 left-0 w-full transform -translate-y-full',
    bottom: 'bottom-0 left-0 w-full transform translate-y-full',
  };

  return createPortal(
    <div className="fixed inset-0 z-50" data-testid="drawer-container" role="presentation">
      {overlay && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}
      <div
        ref={drawerRef}
        data-testid="drawer-content"
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out',
          positionClasses[position],
          sizeClasses[size],
          className
        )}
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              color="#000000"
              fill="none"
            >
              <path
                d="M15.5 15.5L8.50076 8.5M8.50151 15.5L15.5008 8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Drawer content */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};
