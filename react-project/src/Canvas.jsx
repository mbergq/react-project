import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import proptypes from "prop-types";

const PaintArea = styled.canvas`
  height: 360px;
  width: 720px;
  border: 1px solid #000000;
`;

function Canvas({ props }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(2.8);
  const [lineOpacity, setLineOpacity] = useState(0.1);

  let selectedColor = props.activeColor;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineOpacity, lineWidth, selectedColor]);

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
      <PaintArea
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
