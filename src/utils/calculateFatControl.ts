export const calculateFatControl = (
    gender: 'male' | 'female',
    idealWeight: string
  ): string => {
    const iw = parseFloat(idealWeight);
    if (!iw) return '';
  
    const ratio = gender === 'male' ? 0.15 : 0.23;
    const fat = iw * ratio;
  
    return fat.toFixed(2);
  };
  