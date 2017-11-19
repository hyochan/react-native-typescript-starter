const STATUS_CODE = {
  ERROR: 500, // 500
  NOT_FOUND: 404, // 404
  NO_CONTENT: 204, // 204
  SUCCESS: 200, // 200
  BAD_REQUEST: 400, // 400
  CONFLICT: 409, // conflict
  UNAUTHORIZED: 401, // 401
};

const data = [
  {
    pic: require('../../assets/imgs/travel1.jpg'),
    people: 0,
    area: '제주도',
    subArea: '월정리',
    title: '당신과 내가\n함께 할 제주도 해변가',
    price: 650000,
    review: 88,
    starCount: 5,
  },
  {
    pic: require('../../assets/imgs/travel2.jpg'),
    people: 0,
    area: '인천',
    subArea: '월정리',
    title: '당신과 내가\n함께 할 제주도 해변가',
    price: 650000,
    review: 11,
    starCount: 5,
  },
  {
    pic: require('../../assets/imgs/travel3.jpg'),
    people: 1,
    area: '제주도',
    subArea: '월정리',
    title: '당신과 내가\n함께 할 제주도 해변가',
    price: 650000,
    review: 32,
    starCount: 5,
  },
  {
    pic: require('../../assets/imgs/travel4.jpg'),
    people: 1,
    area: '제주도',
    subArea: '월정리',
    title: '당신과 내가\n함께 할 제주도 해변가',
    price: 650000,
    review: 32,
    starCount: 5,
  },
  {
    pic: require('../../assets/imgs/travel5.jpg'),
    people: 1,
    area: '제주도',
    subArea: '월정리',
    title: '당신과 내가\n함께 할 제주도 해변가',
    price: 12000,
    review: 1,
    starCount: 1,
  },
  {
    pic: require('../../assets/imgs/travel6.jpg'),
    people: 1,
    area: '인천',
    subArea: '인천공항',
    title: '당신과 내가\n함께 할 인천 해변가',
    price: 70000,
    review: 22,
    starCount: 4,
  },
  {
    pic: require('../../assets/imgs/travel7.jpg'),
    people: 3,
    area: '제주도',
    subArea: '월정리',
    title: '당신과 내가\n함께 할 제주도 해변가',
    price: 650000,
    review: 99,
    starCount: 5,
  },
  {
    pic: require('../../assets/imgs/travel8.jpg'),
    people: 3,
    area: '제주도',
    subArea: '월정리',
    title: '당신과 내가\n함께 할 제주도 해변가',
    price: 650000,
    review: 32,
    starCount: 1,
  },
  {
    pic: require('../../assets/imgs/travel9.jpg'),
    people: 4,
    area: '제주도',
    subArea: '월정리',
    title: '당신과 내가\n함께 할 제주도 해변가',
    price: 650000,
    review: 32,
    starCount: 5,
  },
];

export {
  STATUS_CODE,
  data,
};
