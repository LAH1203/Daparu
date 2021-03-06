## Versions
### 로그인 화면
#### Version 1.0
- 이메일, 비밀번호를 입력받아 로그인
- Redux를 사용하여 로그인한 사용자 정보 저장 

#### Version 1.1
- 로그인 시 해당 이메일의 판매자 정보가 있을 시 이 또한 Redux에 저장하도록 추가

### 회원가입 화면
#### Version 1.0
- 이메일, 비밀번호, 이름을 입력받아 회원가입

### 마이페이지 화면
#### Version 1.0
- 내 정보(이메일, 이름)를 보고, 로그아웃 및 탈퇴 가능
    - 탈퇴 시 사용자 정보와 (존재 시) 판매자 정보 모두 삭제
- 해당 이메일의 판매자 정보가 없을 시 판매자 등록 버튼이 보임
- 해당 이메일의 판매자 정보가 있을 시 판매자 정보가 보임
- 판매자 정보(사업자 등록 번호, 상호명)를 보고, 판매 물품 등록 및 판매자 해지 가능
- (후 버전에서 등록 상품 정보와 구매/결제 내역, 후기 모아보기 부분 추가 예정)

#### Version 1.1
- 내가 등록한 상품 보기 추가
    - 수정 시 쿼리로 해당 상품의 id 전달
        - 업로드 페이지에서 이를 사용하여 수정
    - 마찬가지로 삭제 시 id를 사용하여 삭제
- 판매자 해지 시 해당 판매자가 등록한 상품 또한 모두 삭제하도록 추가

#### Version 1.2
- 내가 구매한 내역을 보는 부분 추가
  - 구매한 날짜
  - 구매한 상품 정보 및 리뷰 버튼
  - 구매한 가격

### 업로드 화면
#### Version 1.0
- 상품 정보(작성자, 상품 이름, 설명, 가격, 재고, 이미지)를 입력하여 업로드
- 한 번 클릭하면 썸네일 이미지 선택(이미지 인덱스가 0으로 변경)
- 더블클릭하면 이미지 삭제

#### Version 1.1
- 상품 수정ver1 
- 기존에 업로드한 상품 정보를 업로드 페이지로 다시 이동하여 수정 

### 메인 화면
#### Version 1.0
- 검색어를 입력하고 카테고리를 선택하여 상품 검색 가능
- 로그인이 되어 있지 않을 때는 로그인 버튼, 로그인이 되어 있을 때는 마이페이지 버튼이 나타남
    - 후에 장바구니 이동 버튼 추가 예정
- 처음에는 모든 상품이 나오고, 검색할 때마다 조건에 맞는 상품으로 바뀜

### 상품 상세 화면
#### Version 1.0
- 상품 카드 클릭 시 상품 정보가 나타남
- 로그인 되어 있지 않으면 장바구니 버튼을 클릭하면 로그인 화면으로 이동
- 로그인 되어있으면 장바구니 버튼을 클릭하면 DB에 cart로 상품 id가 들어감
- 상품을 업로드한 seller의 경우 수정 삭제 버튼이 추가되어 보임

#### Version 1.1
- 장바구니 버튼 클릭 시 상품 정보도 DB로 들어감

#### Version 1.2
- 각 상품 상세 화면에서 Q&A 버튼 클릭 시 Q&A 게시판으로 이동

#### Version 1.3
- 내비게이션 바가 존재
  - 상품 이미지, 리뷰 게시판, Q&A 게시판을 볼 수 있음

#### Version 1.4
- 상품 이미지를 볼 수 있음
- 화면 좀 더 깔끔하게 정리

### 리뷰 화면
#### Version 1.0
- 리뷰 작성란

#### Version 1.1
- 리뷰 페이지 분리
- 리뷰 별점 추가

### Q&A 화면
#### Version 1.0
- 게시판 화면에서는 해당 상품에 대한 Q&A를 모두 볼 수 있음
- 작성 버튼 클릭 시
  - 로그인이 되어있지 않을 경우 로그인 창으로 이동
  - 로그인이 되어있을 경우, Q&A 작성 모달이 뜸
  - 작성 완료 시 백엔드로 데이터가 넘어가고 자동으로 다시 Q&A 목록 검색
- 아직 판매자가 댓글을 달 수 있는 부분을 구현하지 않았음
  - 이 부분은 다음 버전에서 구현 예정

### 장바구니 화면
#### Version 1.0
- 장바구니에 넣은 상품을 확인하고 구매할 상품만 선택하여 구매할 수 있음
- 장바구니에 담긴 상품명을 클릭 시 해당 상품의 페이지로 이동
- 상품 옆에 삭제 버튼 클릭 시 해당 상품만 삭제 가능
- 아직 결제 시 로직을 어떻게 할지 정하지 않았기 때문에 결제 버튼 클릭 시 구매 상품이 하나도 선택되지 않았을 경우를 제외하고는 구현하지 않음. 다음 버전에서 구현 예정.

#### Version 1.1
- 상품 정보는 상품 페이지에서 보도록 변경
- 테이블 css 생성 및 적용

#### Version 1.2
- (상품 정보 비동기 로직 동기화 시키는 코드 추가)
- 원래는 위의 버전이었으나, 다른 컴퓨터에서의 오류로 인해 원래대로 상품의 정보를 카트에 넣는 것으로 변경

### 결제 화면
### Version 1.0
- 장바구니 화면에서 결제 버튼을 누르면 수령인 이름, 전화번호, 주소(API 사용)를 입력하고 결제하도록 함
- 결제 후 결제한 상품의 재고와 판매량이 변화함
- 재고가 0이 된 상품은 상품 상세 페이지에서 품절 버튼이 뜸
