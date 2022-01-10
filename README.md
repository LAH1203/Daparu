# Daparu

React, Node.js로 만드는 쇼핑몰 웹

<hr>
<br>

## 화면 소개

### 💻 메인 화면

- 검색어를 입력하거나 카테고리를 선택하여 상품을 검색할 수 있음
  - 실시간 검색 가능
  - 검색 경우
    - 검색어만 입력하였을 경우 👉 모든 카테고리 내에서 해당 검색어를 포함한 이름을 가진 상품만 나타남
    - 카테고리만 선택하였을 경우 👉 해당 카테고리에 있는 모든 상품이 나타남
    - 검색어를 입력하고 카테고리를 선택하였을 경우 👉 해당 카테고리 내에서 해당 검색어를 포함한 이름을 가진 상품만 나타남
- 로고를 클릭하면 입력된 검색어나 카테고리를 초기화할 수 있음
- 배너 이미지는 일정 시간마다 다음 이미지로 넘어가며 반복됨
- 로그인 전과 후에는 오른쪽 위의 버튼 구성이 달라짐

#### 🐬 로그인 전

![image](https://user-images.githubusercontent.com/57928612/148707739-8735e0a8-d747-4d9f-9ca8-1085b0550602.png)

#### 🐬 로그인 후

![image](https://user-images.githubusercontent.com/57928612/148708115-c84f3787-ea62-42a8-808f-78a5eb23014d.png)

<br>

### 💻 로그인 및 회원가입 화면

- 로그인 및 회원가입 시 각각의 경우에 맞춰 경고 메시지 또는 alert가 나타남

#### 🐬 로그인 화면

![image](https://user-images.githubusercontent.com/57928612/148708022-56a70c55-b9ef-45d2-8a78-259c77c871f0.png)

#### 🐬 회원가입 화면

![image](https://user-images.githubusercontent.com/57928612/148707988-5eb7081f-223c-4037-ac05-b13744a5db4a.png)

<br>

### 💻 상품 상세 정보 화면

- 각 상품에 대한 정보를 볼 수 있음
  - 가격, 판매량, 재고
  - 상세 이미지
  - 리뷰 게시판
  - Q&A 게시판
- `Add to Cart` 버튼 클릭 시 장바구니에 해당 상품이 한 개씩 추가됨
- 해당 상품에 대한 재고가 없을 시, 품절 버튼이 나타나며 상품을 구매할 수 없음
- 해당 상품의 판매자라면, 수정 및 삭제 버튼이 나타남
- 상세 이미지, 리뷰 게시판, Q&A 게시판을 클릭하면 각각에 맞게 밑의 화면이 바뀜

#### 🐬 상세 이미지 (Default)

![image](https://user-images.githubusercontent.com/57928612/148708228-aff227cc-99a4-4103-8420-a24863e264b9.png)

#### 🐬 리뷰 게시판

![image](https://user-images.githubusercontent.com/57928612/148711983-e236dd43-bf60-4ea8-b823-5697943489fe.png)

#### 🐬 Q&A 게시판

![image](https://user-images.githubusercontent.com/57928612/148712129-dd6a7c09-f18f-464b-827b-c071b4b9dff8.png)

#### 🐬 Q&A 작성 모달

![image](https://user-images.githubusercontent.com/57928612/148712155-fca08665-e33a-4120-bedd-25a621ee8221.png)

<br>

### 💻 마이페이지

- 나와 관련된 각종 정보를 보고 관리할 수 있음
  - 내 정보
  - 판매자 정보
    - 아직 판매자로 등록되지 않았을 경우에는 판매자 등록 버튼이 존재
    - 판매자로 등록되어 있을 경우에는 판매자 정보 및 판매 상품 정보, 판매 물품 등록과 판매자 해지 버튼이 존재
  - 결제 내역
    - 결제한 정보에 대해 상품이 뜨고, 해당 상품의 리뷰를 남길 수 있는 버튼이 존재

![image](https://user-images.githubusercontent.com/57928612/148712193-1254b525-5f6a-4dbf-be55-590abb2cd2ab.png)

<br>

### 💻 리뷰 남기기

- 결제한 상품에 대해 리뷰를 남길 수 있음

![image](https://user-images.githubusercontent.com/57928612/148712339-3d0d0338-a315-4ccd-a345-a4a65be5e89b.png)

<br>

### 💻 장바구니 화면

- 원하는 상품만 선택하거나 삭제하고, 결제를 진행할 수 있음

![image](https://user-images.githubusercontent.com/57928612/148712407-f22b8c3b-f7f5-4681-9fa4-1726ba06cee1.png)

<br>

### 💻 결제 정보 입력

- 장바구니 화면에서 결제 버튼 클릭 시, 밑에 결제 정보를 입력하는 부분이 나타남
- 구매에 성공하였을 경우
  - 장바구니에서 해당 상품이 사라지고 해당 상품의 재고가 감소하고 판매량이 증가함
  - 결제 내역에 구매한 정보가 추가됨

![image](https://user-images.githubusercontent.com/57928612/148712462-998f5ede-ed22-44b6-bb45-d5c7222bc257.png)
