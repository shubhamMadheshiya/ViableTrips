import React from "react";
import { useLottie } from "lottie-react";
import loadingAnimation from "./loading.json";

const Loading = () => {
  const options = {
    animationData: loadingAnimation,
    loop: true,
    autoplay: true, // Autoplay the animation
  };

  const { View } = useLottie(options);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Set minimum height to full viewport height
      }}
    >
      <div style={{ width: "200px", height: "200px" }}>{View}</div>{" "}
      {/* Set the size of the animation */}
    </div>
  );
};

export default Loading;
