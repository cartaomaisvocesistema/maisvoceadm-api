import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './slider.module.scss';
import transition from './transition.module.scss';
import banner1 from '../../../../public/images/banner1.png';
import banner2 from '../../../../public/images/banner2.png';
import bannerlogin from '../../../../public/images/bannerlogin.png';

import b1 from '../../../../public/images/carousel/banner1.png';
import b2 from '../../../../public/images/carousel/banner2.png';
import b3 from '../../../../public/images/carousel/banner3.png';
import b4 from '../../../../public/images/carousel/banner4.png';
import b5 from '../../../../public/images/carousel/banner5.png';
import b6 from '../../../../public/images/carousel/banner6.png';
import b7 from '../../../../public/images/carousel/banner7.png';
import b8 from '../../../../public/images/carousel/banner8.png';
import b9 from '../../../../public/images/carousel/banner9.png';
import b10 from '../../../../public/images/carousel/banner10.png';
import b11 from '../../../../public/images/carousel/banner11.png';
import b12 from '../../../../public/images/carousel/banner12.png';

export default function Carousel() {

    const images = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12];

    const [index, setIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const handlePrev = () => {
        setIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    }

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }


    const moveDot = index => {
        setIndex(index)
        setAutoplay(!autoplay);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(autoplay){
                setIndex((index + 1) % images.length);
            }
        }, 6000);
        return () => clearInterval(interval);
    }, [index]);

    return (<>

        <div className={styles.carousel}>
            <Image src={images[index]} className={styles.carouselitemimg} alt={`${'banner'}${index}`} />
            {/*<button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>*/}
            <div className={styles.containerdots}>
                {images.map((item, i) => (
                    <div
                        key={i}
                        onClick={() => moveDot(i)}
                        className={index === i ? styles.dotActive : styles.dot}
                    ></div>
                ))}
            </div>
        </div>
    </>);
}