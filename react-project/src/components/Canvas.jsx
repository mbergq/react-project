import { useEffect, useRef, useState } from "react";
import proptypes from "prop-types";
import { StyledCanvas } from "../styled-components/Canvas.styled";

function Canvas({ props }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  // const [lineWidth, setLineWidth] = useState(2.8);
  // const [lineOpacity, setLineOpacity] = useState(0.1);

  let selectedColor = props.activeColor;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = selectedColor;
    // ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [selectedColor]);

  const startDrawing = (event) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };
  return (
    <>
      <StyledCanvas
        height="360"
        width="720"
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </>
  );
}

Canvas.propTypes = {
  props: proptypes.object,
  activeColor: proptypes.string,
};

export default Canvas;
