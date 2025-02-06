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
    <div 
      className="fixed inset-0 z-50"
      data-testid="drawer-container"
      role="presentation"
    >
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
          'fixed bg-white dark:bg-gray-800 shadow-xl',
          'transform transition-transform duration-300 ease-in-out',
          isOpen && 'translate-x-0 translate-y-0',
          sizeClasses[size],
          positionClasses[position],
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
