import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["About", "Services", "Testimonials", "Contact"];

const NavBar = () => {
  // State for audio & visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true); // 👈 overlay control

  // Refs
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Enable audio on button click
  const handleEnableAudio = () => {
    const audio = audioElementRef.current;
    if (audio) {
      audio.play()
        .then(() => {
          setIsAudioPlaying(true);
          setIsIndicatorActive(true);
          setShowAudioPrompt(false);
        })
        .catch((err) => {
          console.error("Autoplay failed:", err);
        });
    }
  };

  // Toggle audio manually
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Sync audio play/pause with state
  useEffect(() => {
    if (audioElementRef.current) {
      if (isAudioPlaying) {
        audioElementRef.current.play();
      } else {
        audioElementRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  // Scroll hide/show navbar
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate nav
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      {/* 🔊 AUDIO OVERLAY */}
      {showAudioPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md">
          <button
            onClick={handleEnableAudio}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-500 transition"
          >
            🎵 Enable Audio
          </button>
        </div>
      )}

      {/* 🔈 AUDIO element */}
      <audio
        ref={audioElementRef}
        className="hidden"
        src="/audio/loop.mp3"
        loop
        preload="auto"
      />

      {/* 🧭 NAVBAR */}
      <div
  ref={navContainerRef}
  className="fixed inset-x-0 top-4 z-40 h-16 border border-white/20 bg-black/50 backdrop-blur-md transition-all duration-700 sm:inset-x-6"
>

        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center gap-7">
              <a href="" className="logof">
                FRK <span> PRODUCTIONS</span>
              </a>
            </div>

            {/* Links and Audio Button */}
            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item, index) => {
  if (item === "Services") {
    return (
      <div key={index} className="relative group inline-block">
        <a
          href="#services"
          className="nav-hover-btn"
        >
          {item}
        </a>

        {/* Dropdown styled to match navbar */}
        <div className="absolute left-0 top-full z-40 mt-2 hidden w-64 flex-col rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-md shadow-xl group-hover:flex transition-all duration-300">
  <a href="#media-editing" className="px-4 py-3 hover:bg-white/10 transition shine-effect">Media Editing</a>
  <a href="#cinematography" className="px-4 py-3 hover:bg-white/10 transition shine-effect">Cinematography</a>
  <a href="#web-development" className="px-4 py-3 hover:bg-white/10 transition shine-effect">Full Stack Web Development</a>
  <a href="#social-media" className="px-4 py-3 hover:bg-white/10 transition shine-effect">Social Media Content</a>
</div>
      </div>
    );
  }

  return (
    <a
      key={index}
      href={`#${item.toLowerCase()}`}
      className="nav-hover-btn"
    >
      {item}
    </a>
  );
})}

              </div>

              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5"
              >
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavBar;
