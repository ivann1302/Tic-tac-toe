import styles from './Modal.module.scss';
import { IModalProps} from "../../types/types.ts";
import { createPortal } from "react-dom";
import { useEffect } from "react";

function Modal({ isOpen, onClose, children }: IModalProps) {
    const modalRoot = document.getElementById("modal-root");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !modalRoot) return null;

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        modalRoot
    )
}

export default Modal;