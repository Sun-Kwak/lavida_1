export const calculateWeightControl = (
    weight: string,
    idealWeight: string
  ): string => {
    const w = parseFloat(weight);
    const i = parseFloat(idealWeight);
    if (!w || !i) return '';
  
    const control = w - i;
    return control.toFixed(2); // 양수면 감량 필요, 음수면 증량 필요
  };
  