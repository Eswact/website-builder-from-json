/** @type {import('tailwindcss').Config} */
import siteData from './siteData.json';
let colorObject = {
  bg: siteData.theme.colors.bg || "#FFF",
  text: siteData.theme.colors.text || "#333",
  darkBg: siteData.theme.colors.darkBg || "#091625",
  darkText: siteData.theme.colors.darkText || "#FFF",
  accept: siteData.theme.colors.accept || "#4CAF50",
  cancel: siteData.theme.colors.cancel || "#DC3545",
  main: siteData.theme.colors.main || "#77567A",
  second: siteData.theme.colors.second || "#2F323A",
  third: siteData.theme.colors.third || "#E3D26F",
  fourth: siteData.theme.colors.fourth || "#347FC4",
};
colorObject = {...colorObject, ...siteData.theme.colors.customColors};

let fontFamilyObject = {
  base: siteData.theme.fonts.family || "monospace",
}
let customFonts = {};
if (siteData.theme.fonts.custom) {
  siteData.theme.fonts.custom.forEach(font => { customFonts[font.name] = font.name; });
}
fontFamilyObject = {...fontFamilyObject, ...customFonts};

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './siteData.json'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: colorObject,
      fontFamily: fontFamilyObject,
      fontSize: { base: siteData.theme.fonts.size || "16px", },
    },
    screens: {
      '2xl': {'max': '1600px'},
      'xl': {'max': '1280px'},
      'lg': {'max': '1000px'},
      'md': {'max': '850px'},
      'sm': {'max': '650px'},
    }
  },
  plugins: [],
}
