// src/components/DropdownInput.tsx

import React from "react";
import DropdownFieldElement from "../elements/DropdownFieldElement";
import { DeviceType } from "../types/device";
import { SimpleSelect } from "../elements/RadixSelectElement";
import { AppColors } from "../styles/colors";
import { AppTextStyles } from "../styles/textStyles";
import { InputStyles } from "../constants/componentConstants";
import { useDevice } from "../contexts/DeviceContext";

interface DropdownInputProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  width?: string;
  errorMessage?: string;
  $triggerBackgroundColor?: string;
  $triggerTextColor?: string;
  $triggerFontSize?: string;
  $triggerFontWeight?: string;
  $height?: string;
  $radius?: string;
  $isShowIcon?: boolean;
  $triggerHoverBackgroundColor?: string;
  $triggerHoverTextColor?: string;
  $contentBackgroundColor?: string;
  $contentTextColor?: string;
  $contentFontSize?: string;
  $contentFontWeight?: string;
  $itemHoverBackgroundColor?: string;
  $itemHoverTextColor?: string;
  $triggerContent?: React.ReactNode;
  $triggerBorderColor?: string;
}

const DropdownInput = ({
  value,
  onChange,
  options,
  width,
  errorMessage,
  $triggerBackgroundColor,
  $triggerTextColor,
  $triggerFontSize,
  $triggerFontWeight,
  $height,
  $radius,
  $isShowIcon = true,
  $triggerHoverBackgroundColor,
  $triggerHoverTextColor,
  $contentBackgroundColor,
  $contentTextColor,
  $contentFontSize,
  $contentFontWeight,
  $itemHoverBackgroundColor,
  $triggerBorderColor,
  $itemHoverTextColor,
  $triggerContent,
}: DropdownInputProps) => {
  const device = useDevice();

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  return (
    <DropdownFieldElement $device={device} style={{ width }}>
      <SimpleSelect
        options={options.map((opt) => opt.label)}
        value={selectedLabel}
        onChange={(label) => {
          const selected = options.find((opt) => opt.label === label);
          if (selected) onChange(selected.value);
        }}
        $height={$height || InputStyles.height[device]}
        $radius={$radius || InputStyles.radius[device]}
        $triggerFontSize={$triggerFontSize || AppTextStyles.body1.fontSize}
        $triggerTextColor={$triggerTextColor || AppColors.onBackground}
        $triggerBackgroundColor={$triggerBackgroundColor || AppColors.background}
        $triggerHoverBackgroundColor={$triggerHoverBackgroundColor || AppColors.onBackground}
        $triggerHoverTextColor={$triggerHoverTextColor || AppColors.onSurface}
        $isShowIcon={$isShowIcon}
        $contentBackgroundColor={$contentBackgroundColor || AppColors.surface}
        $contentTextColor={$contentTextColor || AppColors.onSurface}
        $contentFontSize={$contentFontSize || AppTextStyles.body2.fontSize}
        $itemHoverBackgroundColor={$itemHoverBackgroundColor || AppColors.primary}
        $itemHoverTextColor={$itemHoverTextColor || AppColors.onPrimary}
        $triggerContent={$triggerContent}
        $triggerBorderColor={$triggerBorderColor || AppColors.borderLight}
      />

      {errorMessage && (
        <span
          style={{
            color: AppColors.error,
            marginTop: "4px",
            fontSize: "12px",
          }}
        >
          {errorMessage}
        </span>
      )}
    </DropdownFieldElement>
  );
};

export default DropdownInput;
