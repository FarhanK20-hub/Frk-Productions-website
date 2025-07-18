import React from "react";

const logos = [
  "logos/ak.png",
  "/logos/challengefitness.png",
  "/logos/gpp.png",
  "/logos/kenzo.png",
  "/logos/kn.png",
  "/logos/logo4.png",
  "/logos/musclematrix.png",
  "/logos/n.png",
  "/logos/physc.png",
  "/logos/sabkadentist.png",
  "/logos/shark.png",
  "/logos/taiso.png",
  "/logos/tarnado.png",
  "/logos/velar.png",
  "/logos/rivant.png",
  "/logos/tatasteel.png",

];

const Slide = () => {
     const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="marquee bg-black my-6">
      <div className="marquee-content">
        {duplicatedLogos.map((logo, index) => (
          <img src={logo} alt={`logo-${index}`} key={index} className="logo" />
        ))}
      </div>
    </div>
  );
};

export default Slide;
