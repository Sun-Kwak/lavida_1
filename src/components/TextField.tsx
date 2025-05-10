import React, { useState } from 'react';
import styled from 'styled-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DeviceType } from '../types/device';
import { InputStyles } from '../constants/componentConstants';
import { AppColors } from '../styles/colors';
import { useDevice } from '../contexts/DeviceContext';
import InputElement from '../elements/InputElement';

const Container = styled.div<{ $device: DeviceType }>`
  display: flex;
  flex-direction: column;
  max-width: ${({ $device }) => InputStyles.containerMaxWidth[$device]};
  width: 100%;
  padding: ${({ $device }) => InputStyles.containerPadding[$device]};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const SuffixIconWrapper = styled.div<{
  $isPasswordVisible?: boolean;
  $device: DeviceType;
}>`
  position: absolute;
  right: ${({ $device }) => InputStyles.suffixIconRight[$device]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ $isPasswordVisible }) =>
    $isPasswordVisible ? AppColors.iconPrimary : AppColors.iconDisabled};
`;

interface TextFieldProps {
  // 기능 관련 props
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  showSuffixIcon?: boolean;
  type?: 'text' | 'password';
  readOnly?: boolean; // ✅ readOnly prop 추가

  // 스타일 관련 props
  radius?: string;
  fontSize?: string;
  height?: string;
  padding?: string;
  paddingRight?: string;
}

export const TextField = ({
  value,
  onChange,
  placeholder,
  errorMessage,
  showSuffixIcon,
  type = 'text',
  readOnly = false, // ✅ 기본값 설정
  radius,
  fontSize,
  height,
  padding,
  paddingRight,
}: TextFieldProps) => {
  const device = useDevice();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleToggleVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <Container $device={device}>
      <InputWrapper>
        <InputElement
          type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly} // ✅ 전달
          radius={radius}
          fontSize={fontSize}
          height={height}
          padding={padding}
          paddingRight={paddingRight}
          $hasSuffix={!!(showSuffixIcon && type === 'password')}
          $device={device}
        />
        {showSuffixIcon && type === 'password' && (
          <SuffixIconWrapper
            onClick={handleToggleVisibility}
            $isPasswordVisible={isPasswordVisible}
            $device={device}
          >
            {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
          </SuffixIconWrapper>
        )}
      </InputWrapper>
      {errorMessage && (
        <span style={{ color: AppColors.error }}>{errorMessage}</span>
      )}
    </Container>
  );
};
