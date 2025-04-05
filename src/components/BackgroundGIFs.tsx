export default function BackgroundGIFs() {
  return (
    <>
      <img
        src="/pepe-box.gif"
        alt="pepe-box"
        className="w-[180px] absolute top-[196px] left-[calc(50%-606px)]"
      />
      <img
        src="/pepe-punch.gif"
        alt="pepe-punch"
        className="w-[180px] absolute top-[240px] right-[calc(50%-606px)] transform -scale-x-100"
      />
      <img
        src="/pepe-dance.gif"
        alt="pepe-dance"
        className="w-[215px] absolute top-[410px] left-[calc(50%-380px)]"
      />
      <img
        src="/sanctum.png"
        alt="sanctum"
        className="w-[113px] absolute top-[520px] right-[calc(50%-320px)] animate-bounce"
      />
    </>
  );
}
