export const calculateIdealWeight = (
    gender: 'male' | 'female',
    height: string
  ): string => {
    const h = parseFloat(height);
    if (!h) return '';
  
    const heightInMeter = h / 100;
    const h2 = heightInMeter * heightInMeter;
  
    let idealWeight = 0;
  
    if (gender === 'male') {
      idealWeight = h2 * 22;
    } else {
      // 여성: 평균 BMI = (18.5 + 22.9) / 2 = 20.7
      const bmiLow = 18.5;
      const bmiHigh = 22.9;
      idealWeight = h2 * (bmiLow + bmiHigh) / 2;
    }
  
    return idealWeight.toFixed(2);
  };
  