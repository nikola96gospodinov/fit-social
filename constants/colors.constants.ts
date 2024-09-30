export const slate = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
  950: "#020617",
};

export const indigo = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81",
  950: "#1e1b4b",
};

export const red = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d",
  950: "#450a0a",
};

const green = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d",
  950: "#052e16",
};

export const colors = {
  light: {
    text: slate[900],
    invertedText: slate[50],
    supportingText: slate[600],
    tintText: indigo[700],
    tintBackgroundText: indigo[50],

    background: slate[50],
    cardBackground: slate[100],
    sectionBackground: slate[200],
    oppositeBackground: slate[950],
    tintBackground: indigo[700],
    tintActiveBackground: indigo[50],

    icon: slate[500],
    textIcon: slate[950],
    activeIcon: indigo[800],

    buttonFill: slate[800],
    buttonFillDisabled: slate[500],
    buttonTextColor: slate[100],
    buttonFillOnTap: slate[950],

    destructiveText: red[800],
    destructiveBackground: red[100],
    destructiveIcon: red[700],
    destructiveBorder: red[700],

    border: slate[300],
    borderFocused: indigo[500],

    success: green[600],
    successBackground: green[100],
  },
  dark: {
    text: slate[100],
    invertedText: slate[950],
    supportingText: slate[400],
    tintText: indigo[300],
    tintBackgroundText: indigo[950],

    background: slate[950],
    cardBackground: slate[900],
    sectionBackground: slate[800],
    oppositeBackground: slate[50],
    tintBackground: indigo[500],
    tintActiveBackground: indigo[950],

    icon: slate[400],
    textIcon: slate[50],
    activeIcon: indigo[500],

    buttonFill: slate[100],
    buttonFillDisabled: slate[400],
    buttonTextColor: slate[900],
    buttonFillOnTap: slate[50],

    destructiveText: red[100],
    destructiveBackground: red[950],
    destructiveIcon: red[400],
    destructiveBorder: red[400],

    border: slate[700],
    borderFocused: indigo[500],

    success: green[500],
    successBackground: green[950],
  },
};
