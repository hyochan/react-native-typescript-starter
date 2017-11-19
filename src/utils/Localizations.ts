import LocalizedStrings from 'react-native-localization';

const Strings = new LocalizedStrings({
  kr: {
    facebookLogin: '페이스북으로 로그인하기',
    googleLogin: '구글 로그인하기',
    emailLogin: '이메일로 로그인하기',
    not_a_member_yet: '아직 회원이 아니신가요?',
    settings: '설정',
    monthly: '월별보기',
    list: '리스트',
  },
  en: { },
});

export {
  Strings,
};
