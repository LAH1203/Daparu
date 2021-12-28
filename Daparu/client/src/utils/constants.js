const USER = {
  passwordLengthMax: 8,
};

const ALERT_MSG = {
  wrongEmail: '이메일을 제대로 입력해주세요.',
  wrongEmailSmall: '이메일 형식에 맞지 않습니다.',
  wrongPassword: '비밀번호를 제대로 입력해주세요.',
  wrongPasswordSmall: `비밀번호는 ${USER.passwordLengthMax}자 이상이어야 합니다.`,
  wrongName: '이름을 입력해주세요.',
  wrongQna: '제목과 내용을 모두 입력해주세요.',
  wrongReview: '내용을 입력해주세요.',
  wrongSellerNumber: '사업자 등록 번호를 제대로 입력해주세요.',
  wrongSellerName: '상호명을 입력해주세요.',
  wrongPurchaseItems: '구매할 상품을 선택해주세요.',
  needEveryValue: '모든 값을 넣어주셔야 합니다.',
  successBuy: '상품 구매에 성공하였습니다.',
  successAddCart: '장바구니에 상품이 추가되었습니다. 장바구니로 이동하시겠습니까?',
  failBuy: '상품 구매에 실패하였습니다.',
  failSignUp: '회원가입에 실패하였습니다.',
  failImageUpload: '이미지 업로드에 실패하였습니다.',
  failProductUpload: '상품 업로드에 실패하였습니다.',
  failProductUpdate: '상품 수정에 실패하였습니다.',
  failLoadProducts: '상품 정보를 가져오는데 실패하였습니다.',
  failDeleteUser: '탈퇴에 실패하였습니다.',
  failDeleteSeller: '판매자 정보 삭제에 실패하였습니다.',
  failDeleteProduct: '상품 삭제에 실패하였습니다.',
  failWriteQna: 'Q&A 작성에 실패하였습니다.',
  failWriteReview: '리뷰 작성에 실패하였습니다.',
  failGetPurchaseHistory: '구매 내역을 가져오는데 실패하였습니다.',
  failGetCart: '장바구니 정보를 가져오는데 실패하였습니다.',
  failDeleteCartProduct: '해당 상품을 삭제하는데 실패하였습니다.',
};

const API_ADDRESS = 'http://localhost:5000/api';

const BANNER_IMAGES = [
  "upload/1629864100536_루루애오.jfif",
  "upload/1629864075511_logo_title.png",
];

const CATEGORIES = [
  '의류',
  '뷰티',
  '식품',
  '생활',
  '반려동물',
  '홈인테리어',
  '가전/디지털',
  '취미',
  '문구/오피스',
];

export { USER, ALERT_MSG, API_ADDRESS, BANNER_IMAGES, CATEGORIES };
