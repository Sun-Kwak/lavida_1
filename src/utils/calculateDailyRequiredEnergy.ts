export const calculateDailyRequiredEnergy = (
    estimatedEnergy: string,
    bmr: string
  ): string => {
    const energy = parseFloat(estimatedEnergy);
    const baseMetabolism = parseFloat(bmr);
  
    if (!energy || !baseMetabolism) return '';
  
    const result = energy - baseMetabolism * 1.2;
    return result.toFixed(2);
  };
  