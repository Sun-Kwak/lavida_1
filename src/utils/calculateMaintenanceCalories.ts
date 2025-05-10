export const calculateMaintenanceCalories = (bmr: string): string => {
    const base = parseFloat(bmr);
    if (!base) return '';
    const maintenance = base * 1.55;
    return maintenance.toFixed(2);
  };
  