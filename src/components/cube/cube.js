import React from 'react';
import styles from './cube.module.css';

export default function Cube({ text }) {
    return (
        <div className={styles['cube']}>
            <div className={styles['image']}>
                <img src="/assets/Frame.png" alt="person" />
            </div>
            <div className={styles['texto']}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit
                 suscipit porttitor. Suspendisse ex lorem, rhoncus nec ante eu, venenatis
                  aliquam turpis. Nulla facilisi. Curabitur nec mattis dolor. Nulla finibus
                   bibendum ligula tempus vehicula. Ut at tristique libero, nec efficitur dui.
                    Aliquam erat volutpat. Fusce quam sem, tempus nec justo eget, luctus scelerisque
                     velit. Nam sollicitudin purus urna, vitae ornare neque tincidunt vel. Proin ac lacinia
                      erat, et commodo felis. Phasellus tempor tellus eu vulputate tempus.

                </p>
            </div>
        </div>
    );
}
