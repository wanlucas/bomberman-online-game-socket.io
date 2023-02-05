import Game from './components/Game';
import styled from 'styled-components';

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <Wrapper> 
      <Game />
    </Wrapper>
  );
}

export default App
