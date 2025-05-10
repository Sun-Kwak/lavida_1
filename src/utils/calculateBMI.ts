export const calculateBMI = (height: string, weight: string): string => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return '';
    return ((w / (h * h)) * 10000).toFixed(2);
  };
  