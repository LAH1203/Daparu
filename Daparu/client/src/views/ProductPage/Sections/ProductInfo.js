import React from 'react'
import { Button, Descriptions } from 'antd'


function ProductInfo({detail}) {
 
  //상품 아이디, 개수, 상품 정보를 카트에 넣어준다

  

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



  )
}

export default ProductInfo

