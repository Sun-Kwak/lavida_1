import React, { useState } from 'react';
import styled from 'styled-components';
import {
  calculateAge,
  calculateBMI,
  calculateBodyFatPercent,
  calculateMetabolicAge,
  calculateBMR,
  calculateIdealWeight,
  calculateWeightControl,
  calculateFatControl,
  calculateMuscleControl,
  calculateDailyProtein,
  calculateEstimatedEnergy,
  calculateDailyRequiredEnergy,
  calculateEnergyBalanceStatus,
  calculateMaintenanceCalories,
  calculateWeeklyMaintenanceCalories,
  classifyBloodPressure,
} from './utils/allCalculations'; // 묶어두면 편리

import { TextField } from './components/TextField';
import DropdownInput from './components/DropdownInput';
import StyledDatePicker from './components/SimpleDatePicker';

export type ComputedValues = {
  name: string;
  gender: string;
  birthDate: string;
  measureDate: string;

  height: string;
  weight: string;
  muscleMass: string;
  bodyFatMass: string;
  systolic: string;
  diastolic: string;

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
  bloodPressureStatus: string;

  systolicValue: number;
  diastolicValue: number;
};


interface Props {
  onComputedChange: (values: ComputedValues) => void;
}

const Section = styled.div`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const genderOptions = [
  { label: '여성', value: 'female' },
  { label: '남성', value: 'male' },
];

const todayISO = new Date().toISOString().split('T')[0];
const isValidDouble = (value: string) => /^\d*(\.\d*)?$/.test(value);

const UserInputForm: React.FC<Props> = ({ onComputedChange }) => {
  const [form, setForm] = useState({
    name: '',
    gender: 'female',
    birthDate: '',
    measureDate: todayISO,
    height: '',
    weight: '',
    muscleMass: '',
    bodyFat: '',
    systolic: '',
    diastolic: '',
  });

  const handleChange = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };

      const age = calculateAge(updated.birthDate);
      const bmi = calculateBMI(updated.height, updated.weight);
      const bodyFatPercent = calculateBodyFatPercent(updated.bodyFat, updated.weight);
      const metabolicAge = calculateMetabolicAge(updated.gender as 'male' | 'female', updated.height, updated.weight, bodyFatPercent);
      const bmr = calculateBMR(updated.gender as 'male' | 'female', updated.height, updated.weight, age);
      const idealWeight = calculateIdealWeight(updated.gender as 'male' | 'female', updated.height);
      const weightControl = calculateWeightControl(updated.weight, idealWeight);
      const fatControl = calculateFatControl(updated.gender as 'male' | 'female', idealWeight);
      const muscleControl = calculateMuscleControl(updated.gender as 'male' | 'female', idealWeight);
      const dailyProtein = calculateDailyProtein(idealWeight);
      const estimatedEnergy = calculateEstimatedEnergy(updated.gender as 'male' | 'female', age);
      const dailyRequiredEnergy = calculateDailyRequiredEnergy(estimatedEnergy, bmr);
      const energyStatus = calculateEnergyBalanceStatus(dailyRequiredEnergy);
      const maintenanceCalories = calculateMaintenanceCalories(bmr);
      const weeklyMaintenanceCalories = calculateWeeklyMaintenanceCalories(maintenanceCalories);
      const bloodPressureStatus = classifyBloodPressure(updated.systolic, updated.diastolic);
      const systolicValue = parseFloat(updated.systolic);
      const diastolicValue = parseFloat(updated.diastolic);

      onComputedChange({
        name: updated.name,
        gender: updated.gender,
        birthDate: updated.birthDate,
        measureDate: updated.measureDate,
        height: updated.height,
        weight: updated.weight,
        muscleMass: updated.muscleMass,
        bodyFatMass: updated.bodyFat,
        systolic: updated.systolic,
        diastolic: updated.diastolic,
        age,
        bmi,
        bodyFatPercent,
        metabolicAge,
        bmr,
        idealWeight,
        weightControl,
        fatControl,
        muscleControl,
        dailyProtein,
        estimatedEnergy,
        dailyRequiredEnergy,
        energyStatus,
        maintenanceCalories,
        weeklyMaintenanceCalories,
        bloodPressureStatus,
        systolicValue,
diastolicValue,
      });
      

      return updated;
    });
  };

  return (
    <>
      <Section>
        <h2>기본정보</h2>
        <Row>
          <FieldWrapper>
            <Label>이름</Label>
            <TextField
              value={form.name}
              onChange={(e) => handleChange('name')(e.target.value)}
              placeholder="이름"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label>성별</Label>
            <DropdownInput
              value={form.gender}
              onChange={handleChange('gender')}
              options={genderOptions}
              $triggerBackgroundColor="#fff"
              $triggerBorderColor="#ccc"
              $triggerTextColor="#000"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label>생년월일</Label>
            <StyledDatePicker
              initialDate={form.birthDate}
              onDateChange={handleChange('birthDate')}
            />
          </FieldWrapper>
        </Row>
      </Section>

      <Section>
        <h2>건강측정</h2>
        <Row>
          <FieldWrapper>
            <Label>신장 (cm)</Label>
            <TextField
              value={form.height}
              onChange={(e) => {
                if (isValidDouble(e.target.value)) handleChange('height')(e.target.value);
              }}
              placeholder="신장"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label>체중 (kg)</Label>
            <TextField
              value={form.weight}
              onChange={(e) => {
                if (isValidDouble(e.target.value)) handleChange('weight')(e.target.value);
              }}
              placeholder="체중"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label>골격근량 (kg)</Label>
            <TextField
              value={form.muscleMass}
              onChange={(e) => {
                if (isValidDouble(e.target.value)) handleChange('muscleMass')(e.target.value);
              }}
              placeholder="골격근량"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label>체지방량 (kg)</Label>
            <TextField
              value={form.bodyFat}
              onChange={(e) => {
                if (isValidDouble(e.target.value)) handleChange('bodyFat')(e.target.value);
              }}
              placeholder="체지방량"
            />
          </FieldWrapper>
        </Row>
      </Section>

      <Section>
        <h2>혈압정보</h2>
        <Row>
          <FieldWrapper>
            <Label>수축기 혈압</Label>
            <TextField
              value={form.systolic}
              onChange={(e) => {
                if (isValidDouble(e.target.value)) handleChange('systolic')(e.target.value);
              }}
              placeholder="수축기 혈압"
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label>이완기 혈압</Label>
            <TextField
              value={form.diastolic}
              onChange={(e) => {
                if (isValidDouble(e.target.value)) handleChange('diastolic')(e.target.value);
              }}
              placeholder="이완기 혈압"
            />
          </FieldWrapper>
        </Row>
      </Section>
    </>
  );
};

export default UserInputForm;
