import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };
  return (
  <div id="testimonials" className="w-screen bg-black text-blue-50">
    <div className="flex w-full flex-col items-center px-4 pt-16 pb-1 md:px-8 lg:px-16">
      {/* Top label */}
      <p className="font-general text-sm uppercase md:text-[10px]">
        the multiversal ip world
      </p>

      {/* Animated title */}
      <div className="relative w-full text-center">
        <AnimatedTitle
          title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
          containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
        />
      </div>

      {/* Testimonials */}
      <div className="mb-20 w-full mt-20">
        <div className="grid max-w-7xl mx-auto grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              img: "/testimonials/",
              name: "John Carter",
              title: "Creative Director, Mythos Studio",
              quote:
                "Farhan's work feels like watching a story unfold across dimensions. Pure creative genius.",
            },
            {
              img: "/testimonials/amira.png",
              name: "Amira Velasquez",
              title: "Founder, Astral Agency",
              quote:
                "He didn’t just edit our content — he transformed it into a legend.",
            },
            {
              img: "/testimonials/daniel.jpg",
              name: "Daniel Rhee",
              title: "Art Director, VaultFX",
              quote:
                "Every frame he delivers breathes with intention. Cinematic brilliance.",
            },
            {
              img: "/testimonials/arnuvamburle.jpg",
              name: "Arnuv Amburle",
              title: "CEO & Co-Founder, Rivant Media",
              quote:
                "Farhan is incredibly talented—not just in video editing but also in offering valuable business insights.",
            },
            {
              img: "/testimonials/tc.jpg",
              name: "Tania Chatterjee",
              title: "Teacher, Hill Top School",
              quote:
                "A true magician when it comes to his art form.",
            },
            {
              img: "/testimonials/cd.jpeg",
              name: "Chinmaya Daroga",
              title: "Hip-Hop Artist",
              quote:
                "I highly recommend him. His dedication and professionalism stand out.",
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner backdrop-blur-md transition-all duration-300 hover:scale-[0.97]"
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100" />
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="text-sm font-semibold text-blue-100">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-blue-300">{testimonial.title}</p>
                </div>
              </div>

              <p className="mt-5 text-sm text-white leading-relaxed opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                “{testimonial.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  </div>
);
};

export default FloatingImage;
