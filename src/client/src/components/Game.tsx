import styled from 'styled-components';
import { useEffect } from 'react';
import OnlineGame from '../game/class/SocketIoOnlineGame';

const Canvas = styled.canvas`
  border: 1px solid white;
`;

export default function() {
  useEffect(() => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const game = new OnlineGame(context, { width: canvas.width, height: canvas.height });
      
    game.run();
  }, []);

  return (
    <Canvas id='game' width="700px" height="400px"></Canvas>
  )
}