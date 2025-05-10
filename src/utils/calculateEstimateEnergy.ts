export const calculateEstimatedEnergy = (
    gender: 'male' | 'female',
    age: string
  ): string => {
    const a = parseFloat(age);
    if (!a) return '';
  
    const energyTable = [
      { minAge: 75, female: 1500, male: 1900 },
      { minAge: 65, female: 1600, male: 2000 },
      { minAge: 50, female: 1700, male: 2200 },
      { minAge: 30, female: 1900, male: 2500 },
      { minAge: 19, female: 2000, male: 2600 },
      { minAge: 15, female: 2000, male: 2700 },
      { minAge: 12, female: 2000, male: 2500 },
      { minAge: 9,  female: 1800, male: 2000 },
    ];
  
    for (const row of energyTable) {
      if (a >= row.minAge) {
        return gender === 'male' ? row.male.toString() : row.female.toString();
      }
    }
  
    return ''; // 나이가 9 미만이면 빈 문자열 반환
  };
  