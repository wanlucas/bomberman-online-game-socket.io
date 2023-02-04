import styled from 'styled-components';
import io from 'socket.io-client'
import { useEffect } from 'react';
import Match from '../game/Match';

const Canvas = styled.canvas`
  border: 1px solid white;
`;

export default function() {
  const socket = io('localhost:3001');

  useEffect(() => {
      const canvas = document.getElementById('game') as HTMLCanvasElement;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      const match = new Match(context);
      
      match.start();
  }, []);

  return (
    <Canvas id='game' width="700px" height="400px"></Canvas>
  )
}