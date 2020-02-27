import Sansation from '../../assets/fonts/sansation/Sansation_Light.ttf';
import TitilliumWebLight from '../../assets/fonts/TitilliumWeb/TitilliumWeb-Light.ttf';
import TitilliumWebRegular from '../../assets/fonts/TitilliumWeb/TitilliumWeb-Regular.ttf';
import TitilliumWebBold from '../../assets/fonts/TitilliumWeb/TitilliumWeb-Bold.ttf';

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
    url(${titilliumWebLight});
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000'
};

@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 400;
  src: local('TitilliumWeb'), local('TitilliumWeb-Regular'), url(../fonts/TitilliumWeb/TitilliumWeb-Regular.ttf);
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 600;
  src: local('TitilliumWeb Bold'), local('TitilliumWeb-Bold'), url(../fonts/TitilliumWeb/TitilliumWeb-Bold.ttf);
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}
