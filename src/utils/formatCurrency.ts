/**
 * 숫자를 통화 형식으로 포맷팅하는 함수 (내림 적용)
 * - 1 미만의 값은 소수점 4자리까지 표시 (예: $0.1355)
 * - 1 이상 1000 미만의 값은 소수점 2자리까지 표시 (예: $145.21)
 * - 1000 이상의 값은 천 단위 구분자와 소수점 2자리까지 표시 (예: $89,012.12)
 * - 모든 소수점 자리는 반올림 대신 내림(floor)으로 처리
 * 
 * @param value 포맷팅할 숫자
 * @param currency 통화 코드 (기본값: 'USD')
 * @returns 포맷팅된 문자열
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  // 포맷팅 옵션 설정
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
  };

  // 값의 범위에 따라 소수점 자릿수 조정
  let multiplier: number;
  if (value < 1) {
    options.minimumFractionDigits = 5;
    options.maximumFractionDigits = 5;
    multiplier = 100000; // 5자리 소수점
  } else {
    options.minimumFractionDigits = 2;
    options.maximumFractionDigits = 2;
    multiplier = 100; // 2자리 소수점
  }

  // 내림(floor) 적용하기 - 소수점을 곱하고 내림한 후 다시 나누기
  const roundedDownValue = Math.floor(value * multiplier) / multiplier;
  
  // 통화 포맷터 생성 및 포맷팅 적용
  return new Intl.NumberFormat('en-US', options).format(roundedDownValue);
}; 
