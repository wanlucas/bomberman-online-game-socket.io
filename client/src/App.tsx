import io from 'socket.io-client';
import Game from './components/Game';

function App() {
  const socket = io('localhost:3000');

  return <Game />
}

export default App
