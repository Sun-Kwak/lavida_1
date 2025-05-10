// src/components/StyledDatePicker.tsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { DeviceType } from "../types/device";
import { InputStyles } from "../constants/componentConstants";
import { AppTextStyles } from "../styles/textStyles";
import { AppColors } from "../styles/colors";

interface Props {
  initialDate?: string;
  onDateChange?: (dateStr: string) => void;
  device?: DeviceType; // 디바이스 타입 (기본: desktop)
  label?: string;
}

const Wrapper = styled.div<{ $device: DeviceType }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: ${(props) => InputStyles.containerMaxWidth[props.$device]};
  padding: ${(props) => InputStyles.containerPadding[props.$device]};
`;

const Label = styled.label<{ $device: DeviceType }>`
  font-size: ${({ $device }) => AppTextStyles.body2.fontSize};
  color: ${AppColors.onBackground};
  margin-bottom: ${({ $device }) => InputStyles.padding[$device]};
`;

const StyledDateInput = styled.div<{ $device: DeviceType }>`
  .react-datepicker-wrapper {
    width: 100%;
  }

  input {
    width: 100%;
    padding: ${({ $device }) => InputStyles.padding[$device]};
    height: ${({ $device }) => InputStyles.height[$device]};
    font-size: ${AppTextStyles.body1.fontSize};
    border: 1px solid ${AppColors.borderLight};
    border-radius: ${({ $device }) => InputStyles.radius[$device]};
    box-sizing: border-box;

    &:focus {
      border-color: ${AppColors.onSurface};
      outline: none;
    }

    &::placeholder {
      color: ${AppColors.iconDisabled};
    }
  }
`;

const StyledDatePicker: React.FC<Props> = ({
  initialDate,
  onDateChange,
  device = "desktop",
  label = "날짜",
}) => {
  const [selected, setSelected] = useState<Date | null>(
    initialDate ? new Date(initialDate) : null
  );

  useEffect(() => {
    if (initialDate) setSelected(new Date(initialDate));
  }, [initialDate]);

  const handleChange = (date: Date | null) => {
    setSelected(date);
    if (date) {
      const iso = date.toISOString().split("T")[0];
      onDateChange?.(iso);
    }
  };

  return (
    <Wrapper $device={device}>
      <StyledDateInput $device={device}>
        <DatePicker
          selected={selected}
          onChange={handleChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택하세요"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
        />
      </StyledDateInput>
    </Wrapper>
  );
};

export default StyledDatePicker;
