import React, { useState } from 'react';
import styles from './nav.module.css';

export default function Nav() {
    const [selectedButton, setSelectedButton] = useState(2);
    return (
        <div className={styles['nav']}>
            <div className={styles['decorative-square']}></div>
            <div className={styles['button-container']}>
                {Array.from({ length: 6 }, (_, index) => (
                    <button
                        key={index}
                        className={`${styles['nav-button']} ${styles['button-' + (index + 1)]} ${
                            selectedButton === index + 1 ? styles['selected'] : ''
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
}
