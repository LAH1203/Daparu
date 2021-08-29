import React from 'react';
import { Carousel } from 'antd';

const ImageSlider = ({ images }) => {
    return (
        <>
            <Carousel effect="fade" autoplay>
                {images.map((image, idx) => (
                    <div key={idx}>
                        <img style={{ width: '90%', height: '300px' }}
                            src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </Carousel>
        </>
    );
};

export default ImageSlider;