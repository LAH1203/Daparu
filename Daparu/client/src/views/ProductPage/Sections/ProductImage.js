import React, { useState, useEffect } from 'react'
import { Image } from 'antd'
function ProductImage(props) {

  const [Images, setImages] = useState([])


  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = []

      props.detail.images.map(item => {
        images.push(`http://localhost:5000/${item}`)
      })
      setImages(images)
    }
  }, [props.detail])




  return (
    <div style={{ display: 'flex', width: '350px', height: '240px', overflow: 'auto' }}>
      {Images.map((image, idx) => (
        <div key={idx}>
          <img src={`http://localhost:5000/${image}`} />
        </div>
      ))}
    </div>
  )
}

export default ProductImage
