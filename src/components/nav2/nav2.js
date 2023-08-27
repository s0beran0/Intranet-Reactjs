import React from 'react';
import styles from './nav2.module.css';
import { setSwitchValue, setButtonText } from '../appReducer';
import { useSelector, useDispatch  } from 'react-redux';


export default function Nav2() {


    const dispatchApp = useDispatch(); // Usando um nome diferente para evitar conflito
    const { buttonText } = useSelector(state => state.app);
  
    const handleTextChange = (newText) => {
      dispatchApp(setButtonText(newText));
    };
    
    const buttonData = [
        { text: buttonText },
        { text: 'ITEM 2' },
        { text: 'ITEM 3' },
        { text: 'ITEM 4' },
        { text: 'ITEM 5' },
        { text: 'ITEM 6' },
        { text: 'ITEM 7' },
        { text: 'ITEM 8' },
        { text: 'ITEM 9' },
    ];

    return (
        <div className={styles['nav2']}>
            <div className={styles['second-button-container']}>
                <div className={styles['segmented-line']}></div>
                {buttonData.map((button, index) => (
                    <button className={styles['second-navbar-button']} key={index}>
                        <span className={styles['button-text']}>{button.text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
