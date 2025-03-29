import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type FloatingMusicPlayerProps = {
  musicMap: Record<string, string>; // path별 음악 경로 매핑
};

export default function FloatingMusicPlayer({
  musicMap,
}: FloatingMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const musicSrc = musicMap[pathname] || musicMap.default;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = musicSrc;
      audioRef.current.load();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;

      if (playing) {
        audioRef.current.play().catch(() => {
          setPlaying(false);
        });
      }
    }
  }, [musicMap, playing, location, musicSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} />
      <div
        className={`
      fixed bottom-4 right-4 z-50 flex gap-2
      group
      ${playing ? "animate-bounce" : ""}
      `}
      >
        <div
          className="absolute 
        text-white text-[16px] opacity-0 group-hover:opacity-100
        bottom-[20px] right-[80px] w-[400px]
        "
        >
          MAX LEVEL TRADING VIBES!
        </div>
        <img
          src="/sonic-excited.gif"
          alt="music player"
          className={`
            w-20 transform -scale-x-100
            rounded-full
            transition-transform duration-150 ease-out
          `}
          onClick={togglePlay}
        />
      </div>
    </>
  );
}
