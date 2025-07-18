import React, { useRef, useMemo, useEffect } from "react";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// Full gallery list — 9 images + 12 videos
const galleryItems = [
  { type: "image", src: "/gallery/photo1.jpg" },
  { type: "image", src: "/gallery/photo2.jpg" },
  { type: "image", src: "/gallery/photo3.jpg" },
  { type: "image", src: "/gallery/photo4.jpg" },
  { type: "image", src: "/gallery/photo5.jpg" },
  { type: "image", src: "/gallery/photo6.jpg" },
  { type: "image", src: "/gallery/photo7.jpg" },
  { type: "image", src: "/gallery/photo8.jpg" },
  { type: "image", src: "/gallery/photo9.jpg" },

  { type: "video", src: "/gallery/video1.mp4" },
  { type: "video", src: "/gallery/video2.mp4" },
  { type: "video", src: "/gallery/video3.mp4" },
  { type: "video", src: "/gallery/video4.mp4" },
  { type: "video", src: "/gallery/video5.mp4" },
  { type: "video", src: "/gallery/video6.mp4" },
  { type: "video", src: "/gallery/video7.mp4" },
  { type: "video", src: "/gallery/video8.mp4" },
  { type: "video", src: "/gallery/video9.mp4" },
  { type: "video", src: "/gallery/video10.mp4" },
  { type: "video", src: "/gallery/video11.mp4" },
  { type: "video", src: "/gallery/video12.mp4" },
  { type: "video", src: "/gallery/video13.mp4" },
  { type: "video", src: "/gallery/video14.mp4" },
  { type: "video", src: "/gallery/video15.mp4" },
  { type: "video", src: "/gallery/video16.mp4" },
  { type: "video", src: "/gallery/video17.mp4" },
  { type: "video", src: "/gallery/video18.mp4" },
  { type: "video", src: "/gallery/video19.mp4" },
  // { type: "video", src: "/gallery/video20.mp4" },
];

// Shuffle function (memoized on first render)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Gallery = () => {
  const shuffledItems = useMemo(() => shuffleArray(galleryItems), []);

  return (
    <div className="p-4 max-w-[1400px] mx-auto">
      <AnimatedTitle
          title=" G<b>alle</b>ry "
          containerClass="mb-5  !text-black text-center"
        />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {shuffledItems.map((item, index) => (
          <FlyInItem key={index} index={index}>
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={`gallery-item-${index}`}
                loading="lazy"
                className="w-full h-auto object-cover rounded-xl shadow-lg"
              />
            ) : (
              <VideoOnHover src={item.src} />
            )}
          </FlyInItem>
        ))}
      </Masonry>
    </div>
  );
};

// Component with scroll-triggered fly-in animation
const FlyInItem = ({ children, index }) => {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  return <div ref={ref}>{children}</div>;
};

// Video component that plays on hover and pauses otherwise
const VideoOnHover = ({ src }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;

    const handleScroll = () => {
      if (!video) return;
      const rect = video.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

      if (!isVisible) video.pause(); // Auto pause when not visible
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => videoRef.current?.pause()}
      className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform"
    />
  );
};

export default Gallery;
