export const calculateEnergyBalanceStatus = (
    dailyRequiredEnergy: string
  ): '부족' | '과잉' | '' => {
    const energy = parseFloat(dailyRequiredEnergy);
    if (isNaN(energy)) return '';
    return energy > 0 ? '부족' : '과잉';
  };
  