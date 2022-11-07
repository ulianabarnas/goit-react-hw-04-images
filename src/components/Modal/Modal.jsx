import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from "react-dom";
import { ModalStyled, Overlay } from "./Modal.styles";

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClick, children}) {
    useEffect(() => {
        window.addEventListener('keydown', closeModal);

        return () => {
            window.removeEventListener('keydown', closeModal);
        };
    });

    const closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            onClick();
        }
    };

    return createPortal(
        <Overlay onClick={closeModal}>
            <ModalStyled>
                {children}
            </ModalStyled>
        </Overlay>, modalRoot
    );
};

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};