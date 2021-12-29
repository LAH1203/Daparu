import React from 'react';
import { Descriptions } from 'antd';

const ProductInfo = ({ detail }) => {
  return (
    <div style={{ width: '50%' }}>
      <Descriptions title="상품정보">
        <Descriptions.Item label="가격">{detail.price} 원</Descriptions.Item>
        <Descriptions.Item label="판매량">{detail.sold} 개</Descriptions.Item>
        <Descriptions.Item label="재고">{detail.stock} 개</Descriptions.Item>
      </Descriptions>
      <br />
      <br />
    </div>
  );
};

export default ProductInfo;
