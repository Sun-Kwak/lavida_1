import React from 'react';
import styled from 'styled-components';

const CELL_WIDTH = 16.7;
const CELL_HEIGHT = 14.5;
const LABEL_SIZE = CELL_HEIGHT;

const systolicValues = Array.from({ length: 21 }, (_, i) => 30 + i * 10); // 30 ~ 230
const diastolicValues = Array.from({ length: 11 }, (_, i) => 40 + i * 10); // 40 ~ 140

// 기본 색상 구간
const DEFAULT_COLOR_ZONES: [string, number, number][] = [
  ['#CC0000', 21, 11],
  ['#FF4500', 18, 9],
  ['#FF8C00', 15, 8],
  ['#FFD700', 13, 7],
  ['#F4A460', 11, 6],
  ['#3CB371', 9, 5],
  ['#B0D9F8', 6, 3],
];

// localStorage에서 색상 구간 가져오기
const getColorZonesFromStorage = (): [string, number, number][] => {
  try {
    const stored = localStorage.getItem('bloodPressureColors');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every(item => Array.isArray(item) && item.length === 3)) {
        return parsed as [string, number, number][];
      }
    }
  } catch (e) {
    console.warn('Invalid blood pressure color data in localStorage', e);
  }
  return DEFAULT_COLOR_ZONES;
};

type ColorMatrix = Record<number, Record<number, string>>;

const generateColorMatrix = (): ColorMatrix => {
  const matrix: ColorMatrix = {};
  const colorZones = getColorZonesFromStorage();

  for (const [color, xSpan, ySpan] of colorZones) {
    for (let dx = 0; dx < Math.min(xSpan, systolicValues.length); dx++) {
      for (let dy = 0; dy < Math.min(ySpan, diastolicValues.length); dy++) {
        const x = systolicValues[dx];
        const y = diastolicValues[dy];
        if (!x || !y) continue;
        if (!matrix[y]) matrix[y] = {};
        matrix[y][x] = color;
      }
    }
  }

  return matrix;
};

const colorMatrix = generateColorMatrix();

const ChartWrapper = styled.div`
  position: relative;
  width: ${LABEL_SIZE + CELL_WIDTH * systolicValues.length}px;
  height: ${LABEL_SIZE + CELL_HEIGHT * diastolicValues.length}px;
`;

const Cell = styled.div<{ color: string }>`
  width: ${CELL_WIDTH}px;
  height: ${CELL_HEIGHT}px;
  background-color: ${({ color }) => color};
  border: 1px solid #ccc;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${LABEL_SIZE}px repeat(${systolicValues.length}, ${CELL_WIDTH}px);
`;

const Label = styled.div`
  width: ${LABEL_SIZE}px;
  height: ${LABEL_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
`;

const Marker = styled.div`
  position: absolute;
  transform: translate(-50%, -100%);
  background: orangered;
  color: white;
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 4px;
  z-index: 10;
  pointer-events: auto;
  transition: background 0.2s ease;

  &:hover {
    background: #ff6a1a;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 4px 0 4px;
    border-style: solid;
    border-color: orangered transparent transparent transparent;
  }
`;

const TooltipText = styled.div`
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -6px);
  background: white;
  color: black;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  border: 1px solid #ccc;
  z-index: 20;

  ${Marker}:hover & {
    display: block;
  }
`;

interface BloodPressureChartProps {
  systolic: number;
  diastolic: number;
}

const BloodPressureChart: React.FC<BloodPressureChartProps> = ({ systolic, diastolic }) => {
  const xIndex = systolicValues.findIndex((v, i) => {
    const next = systolicValues[i + 1] ?? v + 10;
    return systolic >= v && systolic < next;
  });

  const yIndex = diastolicValues.findIndex((v, i) => {
    const next = diastolicValues[i + 1] ?? v + 10;
    return diastolic >= v && diastolic < next;
  });

  const xRatio = xIndex >= 0 ? (systolic - systolicValues[xIndex]) / 10 : 0;
  const yRatio = yIndex >= 0 ? (diastolic - diastolicValues[yIndex]) / 10 : 0;

  const markerLeft = LABEL_SIZE + xIndex * CELL_WIDTH + xRatio * CELL_WIDTH;
  const markerTop = LABEL_SIZE + yIndex * CELL_HEIGHT + yRatio * CELL_HEIGHT;

  return (
    <ChartWrapper>
      <Grid>
        <Label />
        {systolicValues.map((s) => (
          <Label key={`x-${s}`}>{s}</Label>
        ))}
        {diastolicValues.map((d) => (
          <React.Fragment key={`row-${d}`}>
            <Label key={`y-${d}`}>{d}</Label>
            {systolicValues.map((s) => {
              const color = colorMatrix[d]?.[s] ?? '#fff';
              return <Cell key={`cell-${d}-${s}`} color={color} />;
            })}
          </React.Fragment>
        ))}
      </Grid>
      {xIndex >= 0 && yIndex >= 0 && (
        <Marker style={{ left: `${markerLeft}px`, top: `${markerTop}px` }}>
          혈압측정치{'\n'}mmHg
          <TooltipText>{`수축기: ${systolic} / 이완기: ${diastolic}`}</TooltipText>
        </Marker>
      )}
    </ChartWrapper>
  );
};

export default BloodPressureChart;
