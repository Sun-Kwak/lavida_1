// 혈압 분류 기준 목록 (우선순위 높은 순서대로 정렬)
const pressureCategories = [
  {
    name: '저혈압',
    match: (s: number, d: number) => s < 90 || d < 60,
  },
  {
    name: '수축기단독고혈압',
    match: (s: number, d: number) => s >= 140 && d < 90,
  },
  {
    name: '고혈압 2기',
    match: (s: number, d: number) => s >= 160 || d >= 100,
  },
  {
    name: '고혈압 1기',
    match: (s: number, d: number) =>
      (s >= 140 && s <= 159) || (d >= 90 && d <= 99),
  },
  {
    name: '고혈압전단계',
    match: (s: number, d: number) =>
      (s >= 130 && s <= 139) || (d >= 80 && d <= 89),
  },
  {
    name: '주의혈압',
    match: (s: number, d: number) => s >= 120 && s <= 129 && d < 80,
  },
  {
    name: '정상혈압',
    match: (s: number, d: number) => s < 120 && d < 80,
  },
];

// 메인 분류 함수
export const classifyBloodPressure = (
  systolicStr: string,
  diastolicStr: string
): string => {
  const systolic = parseFloat(systolicStr);
  const diastolic = parseFloat(diastolicStr);

  if (isNaN(systolic) || isNaN(diastolic)) return '';

  const result = pressureCategories.find((cat) =>
    cat.match(systolic, diastolic)
  );

  return result?.name ?? '기타';
};
