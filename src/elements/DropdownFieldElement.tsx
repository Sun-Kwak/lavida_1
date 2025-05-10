// src/elements/DropdownFieldElement.tsx

import styled from "styled-components";
import { DeviceType } from "../types/device";
import { InputStyles } from "../constants/componentConstants";

interface Props {
  $device: DeviceType;
}

const DropdownFieldElement = styled.div<Props>`
  display: flex;
  flex-direction: column;
  max-width: ${({ $device }) => InputStyles.containerMaxWidth[$device]};
  width: 100%;
  padding: ${({ $device }) => InputStyles.containerPadding[$device]};
  background-color: '#fff'
`;

export default DropdownFieldElement;
