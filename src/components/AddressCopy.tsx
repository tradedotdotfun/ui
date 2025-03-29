import { useState, useEffect } from 'react';

import { formatAddress } from '../utils/address';

import RetroBox from './RetroBox';

type AddressCopyProps = {
  address: string;
  label?: string;
  shortenAddress?: boolean;
  className?: string;
};

/**
 * 주소를 표시하고 클릭 시 클립보드에 복사하는 컴포넌트
 */
export default function AddressCopy({
  address,
  label = '',
  shortenAddress = true,
  className = '',
}: AddressCopyProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  // 주소를 축약 형태로 표시 (abCD...5678)
  const displayAddress = shortenAddress
    ? formatAddress(address)
    : address;

  // 복사 상태 리셋 타이머
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // 주소 복사 기능
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      
      // 소리 재생 (옵션)
      const audio = new Audio("/sonic-ring-sound-1.mp3");
      audio.play();
    } catch (err) {
      console.error('주소 복사 실패:', err);
    }
  };

  return (
    <div className={`inline-block ${className}`}>
      <RetroBox className="px-2 py-1">
        <div 
          className={`flex items-center cursor-pointer select-none transition-all duration-200
                    ${copied ? 'text-green-400' : hovered ? 'text-yellow-300' : 'text-white'}`}
          onClick={copyToClipboard}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {label && <span className="mr-2 text-sm">{label}</span>}
          
          <span>
            {displayAddress}
          </span>
          
          <div className="ml-2 text-xs">
            {copied ? (
              <span className="text-green-400">copied</span>
            ) : (
              <span className={`opacity-40 ${hovered ? 'opacity-100' : ''}`}>
                copy
              </span>
            )}
          </div>
        </div>
      </RetroBox>
    </div>
  );
} 