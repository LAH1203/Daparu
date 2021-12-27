import React from 'react';
import { Descriptions } from 'antd';

const ProductInfo = ({ detail }) => {
  return (
    <div>
      <Descriptions title="상품정보">
        <Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{detail.sold}</Descriptions.Item>
        <Descriptions.Item label="Stock">{detail.stock}</Descriptions.Item>
      </Descriptions>
      <br />
      <br />
    </div>
  );
};

export default ProductInfo;
