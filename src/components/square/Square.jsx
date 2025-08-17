import React from 'react';
import styles from './Square.module.scss';

function Square({ value, onSquareClick, isWinning }) {
    return (
        <button
            className={`${styles.square} ${isWinning ? styles.winningSquare : ''}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default Square;
