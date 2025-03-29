import { useCallback, useEffect, useRef, useState } from "react";

type DividerProps = {
  char?: string;
  color?: string; // Tailwind CSS의 색상 클래스 예시: "text-yellow-500"
  width?: string; // 예시: "100%", "300px"
};

export default function Divider({
  char = "=",
  color = "text-white",
  width = "100%",
}: DividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(0);

  const calculateRepeatCount = useCallback(() => {
    if (ref.current) {
      const charWidth = getCharWidth(char, ref.current);
      const containerWidth = ref.current.offsetWidth;
      setRepeatCount(Math.floor(containerWidth / charWidth));
    }
  }, [char]);

  useEffect(() => {
    calculateRepeatCount();
    window.addEventListener("resize", calculateRepeatCount);
    return () => window.removeEventListener("resize", calculateRepeatCount);
  }, [calculateRepeatCount, char]);

  // 문자 너비 계산
  const getCharWidth = (character: string, container: HTMLDivElement) => {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    span.textContent = character;
    container.appendChild(span);
    const width = span.getBoundingClientRect().width;
    container.removeChild(span);
    return width;
  };

  return (
    <div
      ref={ref}
      className={`overflow-hidden text-[12px] sm:text-[24px] ${color}`}
      style={{ width }}
    >
      {char.repeat(repeatCount)}
    </div>
  );
}
