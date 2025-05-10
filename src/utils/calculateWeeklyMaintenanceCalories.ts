export const calculateWeeklyMaintenanceCalories = (daily: string): string => {
    const d = parseFloat(daily);
    if (!d) return '';
    return (d * 7).toFixed(2);
  };
  