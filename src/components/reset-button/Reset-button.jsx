import React from 'react';
import styles from './Reset-button.module.scss';

function ResetButton({ onReset }) {
    return (
        <button 
            className={styles.resetButton} 
            onClick={onReset}
        >
            Reset Game
        </button>
    );
}

export default ResetButton;