import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const ratio = (16 * (width / height));
const screenRatio = (ratio < 9 ? width / 9 : height / 18) / (360 / 9);
console.log(`\n   Screen: ${width}x${height} screenRatio : ${screenRatio}`);

export {
  screenRatio as ratio,
  width as screenWidth,
  height as screenHeight,
};
