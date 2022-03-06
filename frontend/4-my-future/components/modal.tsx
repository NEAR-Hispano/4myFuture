import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { top: '-50%', transition: { type: 'spring' } },
  isOpen: { top: '50%' },
  exit: { top: '-50%' },
};

function Modal({ children, isOpen }: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-y-hidden');
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="overlay"
          initial="initial"
          animate="isOpen"
          exit="exit"
          variants={modalVariant}
          className="bg-black bg-opacity-40 fixed top-0 -left-8 w-screen h-screen flex items-center z-50 justify-center flex-col"
          style={{
            zIndex: 150,
          }}
        >
          <motion.div
            variants={containerVariant}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            id="modal"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;