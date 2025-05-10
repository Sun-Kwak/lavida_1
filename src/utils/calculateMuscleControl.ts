export const calculateMuscleControl = (
    gender: 'male' | 'female',
    idealWeight: string
  ): string => {
    const iw = parseFloat(idealWeight);
    if (!iw) return '';
  
    let muscle = 0;
  
    if (gender === 'male') {
      muscle = ((iw * 0.47 * 0.9) + (iw * 0.47 * 1.1)) / 2;
    } else {
      muscle = ((iw * 0.42 * 0.9) + (iw * 0.42 * 1.1)) / 2;
    }
  
    return muscle.toFixed(2);
  };
  