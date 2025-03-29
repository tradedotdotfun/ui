type CoinIconProps = {
  symbol: string;
  className?: string;
};

export default function CoinIcon({ symbol, className }: CoinIconProps) {
  return (
    <img
      src={`${symbol}.png`}
      alt="coin"
      className={`retro-blink-coin ${className}`}
    />
  );
}
