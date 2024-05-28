import styled from 'styled-components';
import Colors from './Colors';

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: solid 2px black;
  justify-content: center;
  align-items: center;
  background-color: #dbc3e5;
  min-height: 100vh;
`;

function App() {
  return (
    <Div>
      <Colors />
    </Div>
  );
}
export default App;
