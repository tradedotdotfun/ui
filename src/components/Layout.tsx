

import { Outlet } from 'react-router-dom';
import FloatingMusicPlayer from '../components/FloatingMusicPlayer';

export default function Layout() {

  const musicMap = {
    "/": "/sonic-ost-1.mp3",
    "/trade": "/sonic-ost-2.mp3",
    "/close": "/close_music.mp3",
    "*": "/default_music.mp3",
  }

  return (
    <>
      <FloatingMusicPlayer musicMap={musicMap} />
      <Outlet />
    </>
  );
}
