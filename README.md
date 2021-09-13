# Daparu
React, Node.js로 만드는 쇼핑몰 웹

<br>

## Versions
### 로그인 화면
#### Version 1
- 이메일, 비밀번호를 입력받아 로그인
- Redux를 사용하여 로그인한 사용자 정보 저장 
#### Version 2
- 로그인 시 해당 이메일의 판매자 정보가 있을 시 이 또한 Redux에 저장하도록 추가

### 회원가입 화면
#### Version 1
- 이메일, 비밀번호, 이름을 입력받아 회원가입

### 마이페이지 화면
#### Version 1
- 내 정보(이메일, 이름)를 보고, 로그아웃 및 탈퇴 가능
    - 탈퇴 시 사용자 정보와 (존재 시) 판매자 정보 모두 삭제
- 해당 이메일의 판매자 정보가 없을 시 판매자 등록 버튼이 보임
- 해당 이메일의 판매자 정보가 있을 시 판매자 정보가 보임
- 판매자 정보(사업자 등록 번호, 상호명)를 보고, 판매 물품 등록 및 판매자 해지 가능
- (후 버전에서 등록 상품 정보와 구매/결제 내역, 후기 모아보기 부분 추가 예정)
#### Version 2
- 내가 등록한 상품 보기 추가
    - 수정 시 쿼리로 해당 상품의 id 전달
        - 업로드 페이지에서 이를 사용하여 수정
    - 마찬가지로 삭제 시 id를 사용하여 삭제
- 판매자 해지 시 해당 판매자가 등록한 상품 또한 모두 삭제하도록 추가

### 업로드 화면
#### Version 1
- 상품 정보(작성자, 상품 이름, 설명, 가격, 재고, 이미지)를 입력하여 업로드
- 한 번 클릭하면 썸네일 이미지 선택(이미지 인덱스가 0으로 변경)
- 더블클릭하면 이미지 삭제

### 메인 화면
#### Version 1
- 검색어를 입력하고 카테고리를 선택하여 상품 검색 가능
- 로그인이 되어 있지 않을 때는 로그인 버튼, 로그인이 되어 있을 때는 마이페이지 버튼이 나타남
    - 후에 장바구니 이동 버튼 추가 예정
- 처음에는 모든 상품이 나오고, 검색할 때마다 조건에 맞는 상품으로 바뀜
    - 지금은 이미지를 경로로 올라오므로 일단 상품 나열에 이미지는 빼고 상품명과 가격만 넣음. 후에 이미지 자체가 데이터베이스에 올라오게 되면 수정할 예정.

###상품 상세 화면
#### Version 1
- 상품 카드 클릭 시 상품 정보가 나타남
- 로그인 되어 있지 않으면 장바구니 버튼을 클릭하면 로그인 화면으로 이동
- 로그인 되어있으면 장바구니 버튼을 클릭하면 DB에 cart로 상품 id가 들어감
- 상품을 업로드한 seller의 경우 수정 삭제 버튼이 추가되어 보임
