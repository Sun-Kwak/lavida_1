import React, { useState } from 'react';
import styled from 'styled-components';
import UserInputForm, { ComputedValues } from './UserInputForm';
import UserOutputPanel from './UserOutputForm';
import ReportLayout from './ReportLayout';
import { PopupContainer } from './components/PopupContainer';
import ColorConfigDialog from './components/ColorConfigDialog';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;

  &:hover {
    opacity: 0.6;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const App = () => {
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [computed, setComputed] = useState<ComputedValues>({
    name: '',
    gender: '',
    birthDate: '',
    measureDate: '',
    height: '',
    weight: '',
    muscleMass: '',
    bodyFatMass: '',
    systolic: '',
    diastolic: '',
    age: '',
    bmi: '',
    bodyFatPercent: '',
    metabolicAge: '',
    bmr: '',
    idealWeight: '',
    weightControl: '',
    fatControl: '',
    muscleControl: '',
    dailyProtein: '',
    estimatedEnergy: '',
    dailyRequiredEnergy: '',
    energyStatus: '',
    maintenanceCalories: '',
    weeklyMaintenanceCalories: '',
    bloodPressureStatus: '',
    systolicValue: 0,
    diastolicValue: 0,
  });

  const handleViewPopup = () => {
    setPopupOpen(true);
  };

  return (
    <Container>
<HeaderRow>
  <Title>라비다 신진대사 측정</Title>
  <div style={{ display: 'flex', gap: '12px' }}>
  <TextButton onClick={() => setColorDialogOpen(true)}>🎨</TextButton>
    <Button onClick={handleViewPopup}>측정지 보기</Button>
    {colorDialogOpen && <ColorConfigDialog onClose={() => setColorDialogOpen(false)} />}
  </div>
</HeaderRow>
      <UserInputForm onComputedChange={setComputed} />
      {/* <UserOutputPanel computed={computed} /> */}

      <PopupContainer
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        selectedIndex={0}
        padding={0}
        heightPercent={100}
      >
          <ReportLayout computed={computed} />
      </PopupContainer>
    </Container>
  );
};

export default App;
