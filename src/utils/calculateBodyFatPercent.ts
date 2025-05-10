export const calculateBodyFatPercent = (bodyFat: string, weight: string): string => {
    const bf = parseFloat(bodyFat);
    const w = parseFloat(weight);
    if (!bf || !w) return '';
    return ((bf / w) * 100).toFixed(2);
  };
  