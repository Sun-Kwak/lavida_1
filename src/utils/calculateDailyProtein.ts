export const calculateDailyProtein = (idealWeight: string): string => {
    const iw = parseFloat(idealWeight);
    if (!iw) return '';
  
    const protein = iw * 1.4;
    return protein.toFixed(2);
  };
  