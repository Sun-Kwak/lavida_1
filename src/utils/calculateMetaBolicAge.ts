export const calculateMetabolicAge = (
    gender: 'male' | 'female',
    height: string,
    weight: string,
    bodyFatPercent: string
  ): string => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const bf = parseFloat(bodyFatPercent);
  
    if (!h || !w || !bf) return '';
  
    const leanMass = (1 - bf / 100) * w;
    const bmrEstimate = 370 + 21.6 * leanMass;
  
    let metabolicAge = 0;
  
    if (gender === 'male') {
      metabolicAge =
        (88.362 + 13.397 * w + 4.799 * h - Math.round(bmrEstimate * 100) / 100) /
        5.677;
    } else {
      metabolicAge =
        (447.593 + 9.247 * w + 3.098 * h - Math.round(bmrEstimate * 100) / 100) /
        4.33;
    }
  
    return Math.round(metabolicAge).toFixed(2);
  };
  