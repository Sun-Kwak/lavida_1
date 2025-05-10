export const calculateBMR = (
    gender: 'male' | 'female',
    height: string,
    weight: string,
    age: string
  ): string => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
  
    if (!h || !w || !a) return '';
  
    let bmr = 0;
  
    if (gender === 'male') {
      bmr = 66.5 + 13.75 * w + 5.003 * h - 6.75 * a;
    } else {
      bmr = 655.1 + 9.563 * w + 1.85 * h - 4.676 * a;
    }
  
    return bmr.toFixed(2); // 소수점 2자리 반환
  };
  