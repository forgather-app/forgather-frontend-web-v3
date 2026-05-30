export const theme = {
  typography: {
    title1: {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "120%",
      letterSpacing: "-0.02em",
    },
    heading1: {
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "130%",
      letterSpacing: "-0.02em",
    },
    heading2: {
      fontWeight: 600,
      fontSize: "18px",
      lineHeight: "130%",
      letterSpacing: "-0.02em",
    },
    heading3: {
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: "130%",
      letterSpacing: "-0.02em",
    },
    body1: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "160%",
      letterSpacing: "-0.02em",
    },
    body2: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "160%",
      letterSpacing: "-0.02em",
    },
    body3: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "160%",
      letterSpacing: "-0.02em",
    },
    body4: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "160%",
      letterSpacing: "-0.02em",
    },
    subBody: {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "160%",
      letterSpacing: "-0.02em",
    },
    subBody2: {
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: "140%",
      letterSpacing: "-0.02em",
    },
    button: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "160%",
      letterSpacing: "-0.02em",
    },
    label: {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "160%",
      letterSpacing: "-0.02em",
    },
    caption: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "160%",
      letterSpacing: "-0.02em",
    },
  },
  colors: {
    main: {
      purple: "#6247FF",
      purple50: "#8974FF",
      purple100: "#DAD4FF",
    },
    gray: {
      white: "#FFFFFF",
      gray50: "#EFF1F4",
      gray100: "#E0E2E6",
      gray200: "#C2C8CF",
      gray300: "#A1A9B2",
      gray400: "#6D7684",
      gray500: "#414855",
      gray600: "#252930",
      gray700: "#1B1D1F",
    },
    semantic: {
      alertRed: "#FF4B4B",
      black: "#111111",
    },
    button: {
      primaryHover: "#5439F0",
      secondaryText: "#3B19FF",
      secondaryHover: "#C7BDFF",
      tertiaryHover: "#DCDEE1",
    },
    gradient: {
      grayStroke:
        "linear-gradient(to right, rgba(65, 72, 85, 0.80), rgba(65, 72, 85, 0.25))",
      grayFill: "linear-gradient(to right, #292D32, #252930)",
      purple: "linear-gradient(to right, #665BE1, #5647FF)",
    },
    skeleton: {
      skeleton50:
        "linear-gradient(to right, rgba(214, 214, 216, 0.50), rgba(245, 245, 247, 0.50))",
      skeleton20:
        "linear-gradient(to right, rgba(194, 220, 246, 0.20) 69%, rgba(245, 245, 247, 0.15) 100%)",
    },
  },
  layout: {
    maxWidth: "400px",
    zIndex: {
      backdrop: 1,
      modalContent: 2,
      bottomSheet: 10,
      modal: 20,
    },
  },
} as const;
