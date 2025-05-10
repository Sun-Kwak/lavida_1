import React from 'react';
import styled from 'styled-components';
import { TextField } from './components/TextField';

interface Props {
  computed: {
    age: string;
    bmi: string;
    bodyFatPercent: string;
    metabolicAge: string;
    bmr: string;
    idealWeight: string;
    weightControl: string;
    fatControl: string;
    muscleControl: string;
    dailyProtein: string;
    estimatedEnergy: string;
    dailyRequiredEnergy: string;
    energyStatus: string;
    maintenanceCalories: string;
    weeklyMaintenanceCalories: string;
  };
}

const Section = styled.section`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 8px;
  font-size: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const FieldWrapper = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 4px;
`;

const labelMap: Record<keyof Props["computed"], string> = {
  age: '나이',
  bmi: 'BMI',
  bodyFatPercent: '체지방률 (%)',
  metabolicAge: '대사연령',
  bmr: '기초대사율',
  idealWeight: '적정체중',
  weightControl: '체중조절',
  fatControl: '지방조절',
  muscleControl: '근육조절',
  dailyProtein: '하루섭취 단백질량',
  estimatedEnergy: '영양소 필요추정량',
  dailyRequiredEnergy: '1일 필요 에너지량',
  energyStatus: '에너지 상태',
  maintenanceCalories: '하루 유지 칼로리',
  weeklyMaintenanceCalories: '주당 유지 칼로리',
};


const UserOutputPanel: React.FC<Props> = ({ computed }) => {
  return (
    <Section>
      <SectionTitle>계산 결과</SectionTitle>
      <Row>
      {Object.entries(computed).map(([key, value]) => (
  <FieldWrapper key={key}>
    <Label>{labelMap[key as keyof Props["computed"]]}</Label>
    <TextField value={value} readOnly onChange={() => {}} placeholder={labelMap[key as keyof Props["computed"]]} />
  </FieldWrapper>
))}

      </Row>
    </Section>
  );
};

export default UserOutputPanel;
