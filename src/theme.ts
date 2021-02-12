export type ThemeBoth = {
  dark: Theme;
  light: Theme;
};

export type Theme = {
  background: string;
  color: string;
  iconColor: string;
};

export const theme: ThemeBoth = {
  dark: {
    background: "#2c3e50",
    color: "#ecf0f1",
    iconColor: "#bdc3c7",
  },

  light: {
    background: "#f4f4f4",
    color: "#000",
    iconColor: "#777",
  },
};
