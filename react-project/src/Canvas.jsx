import styled from 'styled-components';
import proptypes from 'prop-types';

const WhiteBoard = styled.canvas`
  width: 400px;
  height: 280px;
  border: 1px solid #000000;
`;

function Canvas({ activeColor }) {
  return (
    <>
      <WhiteBoard />
      <p>{activeColor.color}</p>
    </>
  );
}

Canvas.propTypes = {
  activeColor: proptypes.object,
};

export default Canvas;
