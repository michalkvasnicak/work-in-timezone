import { createNPointTheme, ratios } from '@byteclaw/visage';

export const theme = createNPointTheme({
  baseFontSize: 14,
  baseLineHeightRatio: 1.5,
  baselineGridSize: 8,
  colors: {
    bodyText: 'black',
    danger: {
      offset: 0,
      values: ['red'],
    },
    dangerText: 'white',
    dangerBodyText: 'red',
    primary: 'black',
    primaryText: 'white',
    neutral: 'black',
    neutralText: 'white',
    success: {
      offset: 0,
      values: ['black'],
    },
    successText: 'white',
    warning: {
      offset: 0,
      values: ['black'],
    },
    warningText: 'white',
  },
  fontFamilies: {
    body:
      '-apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif',
    heading:
      '-apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif',
  },
  fontScaleRatio: ratios.perfectFourth,
});
