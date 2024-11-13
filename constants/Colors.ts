/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0072b1'; // Richer blue for main action buttons
const tintColorDark = '#80c3e0'; // Light blue tint for dark mode

export const Colors = {
  light: {
    text: '#212529', // Darker text for readability on light background
    background: '#f5f5f5', // Soft grayish background for a smoother look
    tint: tintColorLight,
    icon: '#495057', // Neutral gray for icons
    tabIconDefault: '#adb5bd', // Lighter gray for unselected tab icons
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#f1f3f5', // Soft white text for readability on dark background
    background: '#1c1e21', // Darker background for true dark mode
    tint: tintColorDark,
    icon: '#ced4da', // Light gray icons to blend well in dark mode
    tabIconDefault: '#868e96', // Softer gray for unselected tabs
    tabIconSelected: tintColorDark,
  },
};

