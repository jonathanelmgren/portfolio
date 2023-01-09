import { useEffect, useState } from "react";

export const useMousePosition = (trigger?: () => void) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    if (trigger) {
      trigger()
    }

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, [trigger]);

  return position;
};