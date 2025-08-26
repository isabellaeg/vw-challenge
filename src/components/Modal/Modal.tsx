import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export type ModalPosition = 'center' | 'right' | 'left';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: ModalPosition;
  overlay?: boolean;
  className?: string;
  headerActions?: React.ReactNode;
  triggerRef?: React.RefObject<HTMLElement>;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'center',
  overlay = true,
  className = '',
  headerActions,
  triggerRef,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (!triggerRef?.current) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
    }

    const focusFirstElement = () => {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length) {
        (focusableElements[0] as HTMLElement).focus();
      } else {
        modalRef.current?.focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button')) {
        return;
      }
      
      if (modalRef.current && !modalRef.current.contains(target)) {
        onClose();
      }
    };

    setTimeout(focusFirstElement, 50);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      
      const elementToFocus = triggerRef?.current || previousActiveElementRef.current;
      if (elementToFocus) {
        setTimeout(() => elementToFocus.focus(), 50);
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const positionClasses = {
    center: 'justify-center items-center',
    right: 'justify-end',
    left: 'justify-start'
  };

  const modalClasses = {
    center: 'rounded-lg',
    right: 'h-full max-h-screen rounded-l-lg rounded-r-none',
    left: 'h-full max-h-screen rounded-r-lg rounded-l-none'
  };

  const shouldShowHeader = headerActions || (title && showCloseButton);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {overlay && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-200"
          onClick={onClose}
        />
      )}

      <div className={`fixed inset-0 flex ${positionClasses[position]}`}>
        <div 
          ref={modalRef}
          tabIndex={-1}
          className={`
            relative bg-white shadow-xl overflow-hidden focus:outline-none
            transform transition-all duration-200 ease-in-out
            ${modalClasses[position]}
            ${className}
          `}
        >
          {shouldShowHeader && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center flex-1">
                {headerActions && (
                  <div className="flex space-x-2">
                    {headerActions}
                  </div>
                )}
                {title && !headerActions && <h2 className="text-lg font-semibold">{title}</h2>}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          <div className={`
            flex-1 overflow-y-auto
            ${position === 'center' ? 'p-6' : 'p-4'}
            ${position !== 'center' ? 'h-full' : ''}
          `}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;