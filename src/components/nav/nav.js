import React, { useEffect, useRef } from 'react';
import styles from './nav.module.css';

export default function Nav() {
    const indicatorRef = useRef(null);
    const buttonsRef = useRef([]);

    const updateIndicatorPosition = (button) => {
        const buttonRect = button.getBoundingClientRect();
        const indicatorHeight = indicatorRef.current.clientHeight;
        const buttonCenter = buttonRect.top + buttonRect.height / 2;
        let indicatorTop = buttonCenter - indicatorHeight / 2;

        if (buttonRect.top < indicatorTop) {
            indicatorTop = buttonRect.top;
        }

        indicatorRef.current.style.display = "block";
        indicatorRef.current.style.top = `${indicatorTop}px`;
    };

    useEffect(() => {
        buttonsRef.current = buttonsRef.current.slice(0, 6);

        buttonsRef.current.forEach((button, index) => {
            button.addEventListener("mouseover", () => {
                button.style.transform = "translateY(-3px)"; // Aplica o salto para cima
            });

            button.addEventListener("mouseout", () => {
                button.style.transform = "translateY(0)"; // Remove o salto
            });

            button.addEventListener("click", () => {
                buttonsRef.current.forEach((otherButton) => {
                    otherButton.classList.remove(styles['selected']);
                });
                button.classList.add(styles['selected']);
                updateIndicatorPosition(button);
            });

            // Esconde o indicador inicialmente
            indicatorRef.current.style.display = "none";
        });

        // Configura o ouvinte de redimensionamento da janela
        window.addEventListener("resize", () => {
            const selectedButton = document.querySelector(`.${styles['selected']}`);
            if (selectedButton) {
                updateIndicatorPosition(selectedButton);
            }
        });

        return () => {
            window.removeEventListener("resize", () => {
                const selectedButton = document.querySelector(`.${styles['selected']}`);
                if (selectedButton) {
                    updateIndicatorPosition(selectedButton);
                }
            });
        };
    }, []);

    return (
        <div className={styles['nav']}>
        <div className={styles['button-container']}>
            {Array.from({ length: 6 }, (_, index) => (
                <button
                    ref={element => buttonsRef.current[index] = element}
                    key={index}
                    className={`${styles['nav-button']} ${styles['button-' + (index + 1)]}`}
                >
                    {index === 3 && (
                        <div className={`${styles['button-content']} ${styles['no-transform']}`}>
                        </div>
                    )}
                </button>
            ))}
        </div>
        <div ref={indicatorRef} className={styles['indicator']}></div>
    </div>
);
}