'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PopupContainerProps {
  open: boolean;
  onClose: () => void;
  padding?: number;
  heightPercent?: number;
  appBarHeight?: number;
  selectedIndex: number;
  children: React.ReactNode | React.ReactNode[];
}

export const PopupContainer: React.FC<PopupContainerProps> = ({
  open,
  onClose,
  // padding = 20,
  heightPercent = 80,
  selectedIndex,
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setCurrentIndex(selectedIndex);
    }
  }, [open, selectedIndex]);

  if (!open) return null;

  const childArray = React.Children.toArray(children);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Popup $heightPercent={heightPercent}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Content id="printable-report">{childArray[currentIndex]}</Content>
      </Popup>
    </Overlay>
  );
};

// ==========================
// Styled Components
// ==========================

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 1200px;
`;

const Popup = styled.div<{
  $heightPercent: number;
}>`
  background: #fff;
  padding: 0;
  width: 800px;
  min-width: 800px;
  height: ${({ $heightPercent }) => $heightPercent}vh;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    z-index: -1;
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;