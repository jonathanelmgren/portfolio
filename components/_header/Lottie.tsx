"use client";
import LottieComponent from "lottie-react";
import Tilt from "react-parallax-tilt";
import animationData from "../../public/hello.json";

export const Lottie = () => {
  return (
    <Tilt
      trackOnWindow={true}
      tiltReverse={true}
      tiltMaxAngleX={25}
      tiltMaxAngleY={25}
    >
      <LottieComponent animationData={animationData} />
    </Tilt>
  );
};
