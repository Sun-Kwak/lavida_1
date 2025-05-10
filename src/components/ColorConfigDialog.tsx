import React, { useState } from 'react';
import styled from 'styled-components';

const DEFAULT_COLOR_ZONES: [string, number, number][] = [
  ['#CC0000', 21, 11],
  ['#FF4500', 18, 9],
  ['#FF8C00', 15, 8],
  ['#FFD700', 13, 7],
  ['#F4A460', 11, 6],
  ['#3CB371', 9, 5],
  ['#B0D9F8', 6, 3],
];

const DialogBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const DialogBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  min-width: 360px;
`;

const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const ColorInput = styled.input`
  width: 80px;
  height: 32px;
  border: 1px solid #ccc;
`;

const SaveButton = styled.button`
  margin-top: 16px;
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

interface ColorConfigDialogProps {
  onClose: () => void;
}

const ColorConfigDialog: React.FC<ColorConfigDialogProps> = ({ onClose }) => {
  const [colors, setColors] = useState<[string, number, number][]>(() => {
    try {
      const stored = localStorage.getItem('bloodPressureColors');
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_COLOR_ZONES;
  });

  const handleChange = (index: number, newColor: string) => {
    const updated = [...colors];
    updated[index][0] = newColor;
    setColors(updated as [string, number, number][]);
  };

  const handleSave = () => {
    localStorage.setItem('bloodPressureColors', JSON.stringify(colors));
    onClose();
    window.location.reload(); // 색상 바로 반영
  };

  return (
    <DialogBackdrop onClick={onClose}>
      <DialogBox onClick={(e) => e.stopPropagation()}>
        <h3>혈압 색상 설정</h3>
        {colors.map(([color], i) => (
          <ColorRow key={i}>
            <span>{i + 1}단계:</span>
            <ColorInput type="color" value={color} onChange={(e) => handleChange(i, e.target.value)} />
            <span>{color}</span>
          </ColorRow>
        ))}
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </DialogBox>
    </DialogBackdrop>
  );
};

export default ColorConfigDialog;
