import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

/*
function Kakao(data) {

  const [redirectUrl, setredirectUrl] = useState("");
  const [Tid, setTid] = useState("");
  const [Params, setParams] = useState(
    {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: "상품명",
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/",
      fail_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
    }
  );


  useEffect(() => {
    axios({
      url: "/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 1f5a27b79d27b1c765fb7ad1b2bf866e",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      Params,
    }).then((response) => {
      const {
        data: { next_redirect_pc_url, tid }
      } = response;

      console.log(next_redirect_pc_url);
      console.log(tid);

      setredirectUrl(next_redirect_pc_url);
      setTid(tid);

    });

  }, []);

  console.log(redirectUrl)

  const { next_redirect_pc_url } = redirectUrl;

  return (
    <div>
      <a href={next_redirect_pc_url}>
        {next_redirect_pc_url}
      </a>
    </div>
  )
}

export default Kakao

*/
class Kakao extends React.Component {
  state = {

    next_redirect_pc_url: "",
    tid: "",

    params: {
      cid: "TC0ONETIME",
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      item_name: 'DAPARU 결제',
      quantity: 1,
      total_amount: this.props.total,
      vat_amount: 200,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/",
      fail_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
    },
  };

  componentDidMount() {
    const { params } = this.state;
    axios({
      url: "/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: "KakaoAK 1f5a27b79d27b1c765fb7ad1b2bf866e",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      const {
        data: { next_redirect_pc_url, tid }
      } = response;

      console.log(next_redirect_pc_url);
      console.log(tid);

      this.setState({ next_redirect_pc_url, tid });
    });
  }

  render() {
    const { next_redirect_pc_url } = this.state;

    return (<div>
       <a href={next_redirect_pc_url}>
        {next_redirect_pc_url}
      </a>
    </div>);
  }
}
export default Kakao;