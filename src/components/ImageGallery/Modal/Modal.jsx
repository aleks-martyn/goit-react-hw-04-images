import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWin } from './Modal.styled';

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Overlay
      onClick={event => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <ModalWin>{children}</ModalWin>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
