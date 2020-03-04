import Sansation from '../../assets/fonts/sansation/Sansation_Light.ttf';
import TWLight from '../../assets/fonts/TitilliumWeb/TitilliumWeb-Light.ttf';
import TWRegular from '../../assets/fonts/TitilliumWeb/TitilliumWeb-Regular.ttf';
import TWBold from '../../assets/fonts/TitilliumWeb/TitilliumWeb-Bold.ttf';

export const sansation = {
  fontFamily: 'Sansation',
  fontDisplay: 'normal',
  fontStyle: 'normal',
  fontWeight: 300,
  src: `
    local('Sansation'), 
    url(${Sansation})
  `
};

export const titilliumWebLight = {
  fontFamily: 'Titillium Web',
  fontStyle: 'normal',
  fontDisplay: 'normal',
  fontWeight: 300,
  src: `
    local('TitilliumWeb Light'),
    url(${TWLight});
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
};

export const titilliumWebRegular = {
  fontFamily: 'Titillium Web',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('TitilliumWeb Regular'),
    url(${TWRegular})
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
};

export const titilliumWebBold = {
  fontFamily: 'Titillium Web',
  fontStyle: 'normal',
  fontWeight: 600,
  src: `
    local('TitilliumWeb Bold'),
    url(${TWBold})
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
};
