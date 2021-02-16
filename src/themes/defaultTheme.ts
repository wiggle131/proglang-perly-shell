
const colors = {
  // primary
  primaryBase: '#522DD9',
  primaryDark20: '#351D8B',
  primaryLight95: '#F6F4FD',
  primaryLight97: '#FAF9FE',

  darkBase: '#FFFFFF',
};

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const fontSizes = {
  h1: '87px',
  h2: '67px',
  h3: '50px',
  h4: '38px',
  h5: '24px',
  h6: '18px',
};

const parts = {
  // theme
  body: colors.primaryLight97,
  text: colors.darkBase,
  button: {
    text: '#000000',
    background: '#FFFFFF',
  },
  link: {
    text: 'teal',
    opacity: 1,
  },
};

const defaultTheme = {
  colors,
  fontSizes,
  fontWeights,
  parts,
};

export default defaultTheme;