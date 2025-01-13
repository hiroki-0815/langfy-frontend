import { useRef, useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

const useDraggable = (initialPosition: Position = { x: 0, y: 0 }) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      // Calculate offset between pointer and element's top-left corner
      offsetX = e.clientX - position.x;
      offsetY = e.clientY - position.y;

      // Capture the pointer to receive subsequent events
      element.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      });
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      element.releasePointerCapture(e.pointerId);
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", onPointerUp);

    // Clean up the event listeners on unmount
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", onPointerUp);
    };
  }, [position]);

  return { ref, position };
};

export default useDraggable;
