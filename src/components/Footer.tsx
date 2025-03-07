import { useEffect, useRef, useState } from "react";
import Divider from "./Divider";

type StoryImageProps = {
  index: number;
  line: string;
}

function StoryImage({ index, line }: StoryImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgWidth, setImgWidth] = useState('auto');

  useEffect(() => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.width.toString() + 'px');
    }
  }, []);

  const handleLoad = () => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.width.toString() + 'px');
    }
  };

  return (
    <div className="inline-block">
      <img
        ref={imgRef}
        onLoad={handleLoad}
        src={`/fwog${index + 1}.png`}
        alt={`fwog story ${index}`}
        className="h-[140px] rounded-[20px]"
      />
      <p
        className="text-white text-left text-[10px] break-words mt-6"
        style={{ width: imgWidth }}
      >
        {line}
      </p>
    </div>
  );
}

function FwogStoryBoard() {
  const story = [
    `"A new beginning."`,
    `"Market crash? Time to paint the chart!"`,
    `"Let it burn! The passion is unstoppable!"`,
    `"Wait… It's going up!?"`,
    `"From Fwog to Financial Mogul."`,
  ]

  return (
    <div className="flex flex-col gap-9 items-center justify-center mt-9">
      <p className="text-[#299F46] text-16px">{"Fwog’s Wild Ride: From Rags to Riches (and Back?)".toUpperCase()}</p>
      <div className="w-fit flex flex-col lg:flex-row gap-6 justify-center">
        {
          story.map((line, index) => (
            <StoryImage
              key={`fwog-story-${index + 1}`}
              index={index}
              line={line} />
          ))
        }
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center items-center pt-10">
      <Divider char="^" color="text-[#FFFF00]" width="100%" />
      <FwogStoryBoard />
      <p className="text-white text-xs my-9">
        © 2025 TradeDotFun
      </p>
    </footer>
  );
}
