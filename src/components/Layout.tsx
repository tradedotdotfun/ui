import { Outlet } from 'react-router-dom';
import FloatingMusicPlayer from '../components/FloatingMusicPlayer';

export default function Layout() {

  const musicMap = {
    "/": "/home_music.mp3",
    "/trade": "/trading_music.mp3",
    "/close": "/close_music.mp3",
    "/terms": "/home_music.mp3",
    "*": "/default_music.mp3",
  }

  return (
    <>
      <FloatingMusicPlayer musicMap={musicMap} />
      <Outlet />
    </>
  );
}
