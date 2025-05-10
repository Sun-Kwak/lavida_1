import styled from "styled-components";
import { InputStyles } from "../constants/componentConstants";
import { AppColors } from "../styles/colors";
import { AppTextStyles } from "../styles/textStyles";
import { DeviceType } from "../types/device";

interface InputElementProps {
  radius?: string;
  padding?: string;
  height?: string;
  fontSize?: string;
  paddingRight?: string;
  $hasSuffix?: boolean;
  $device: DeviceType;
  readOnly?: boolean; // ✅ readOnly prop 추가
}

const InputElement = styled.input<InputElementProps>`
  padding: ${({ padding, $device }) => 
    padding || InputStyles.padding[$device]};
  border: 1px solid ${AppColors.borderLight};
  border-radius: ${({ radius, $device }) => 
    radius || InputStyles.radius[$device]};
  font-size: ${({ fontSize }) => 
    fontSize || AppTextStyles.body1.fontSize};
  width: 100%;
  height: ${({ height, $device }) => 
    height || InputStyles.height[$device]};
  box-sizing: border-box;
  padding-right: ${({ paddingRight, $hasSuffix, $device }) =>
    paddingRight ||
    ($hasSuffix
      ? InputStyles.paddingRightWithSuffix[$device]
      : InputStyles.padding[$device])};

  background-color: ${({ readOnly }) =>
    readOnly ? AppColors.inputDisabled : AppColors.input}; // ✅ readOnly 배경색 처리

  &:focus {
    border-color: ${AppColors.onSurface};
    outline: none;
  }

  &::placeholder {
    color: ${AppColors.iconDisabled};
  }
`;

export default InputElement;
