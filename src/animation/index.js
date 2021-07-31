import React from 'react';
import Lottie from "react-lottie";

export default function Animate({lottie, width, height}) {
    const options = {
        loop:true,
        autoplay:true,
        animationData:lottie,
        rendererSettings:{
            preserveAscpectRatio: "xMidYMid slice",
        },
    };
    return (
        <div>
            <Lottie options={options} height={height} width={width}/>
        </div>
    )
}