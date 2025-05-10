import { createGlobalStyle } from 'styled-components';

export const PrintOnlyStyles = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden !important;
    }

    #printable-report, #printable-report * {
      visibility: visible !important;
    }

    #printable-report {
      position: absolute !important;
      top: 0;
      left: 0;
      width: 794px !important;
      height: 1123px !important;
      padding: 0 !important;
      margin: 0 !important;
      background: white !important;
      z-index: 99999;
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 794px;
      height: 1123px;
    }
  }
`;
