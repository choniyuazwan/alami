import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Card,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { url, options } from "../../Util/Api";
import Loading from '../../Component/Loading';

function Produk(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [sellerId, setSellerId] = useState('');

  const apiUrl = url.productByKeyword;

  const fetchData = async () => {
    options.params = {'keyword': ''};
    const result = await axios(apiUrl, options);
    await setData(result.data.data);
    setShowLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showListBySearch = async (keyword) => {
    options.params = {'keyword': keyword};
    const result = await axios(apiUrl, options);
    setData(result.data.data);
  };

  const showListBySellerId = async (sellerId) => {
    if (sellerId) {
      const sellerIdUrl = url.productBySellerId;
      options.params = {'seller_id': sellerId};
      const result = await axios(sellerIdUrl, options);
      setData(result.data.data);
    } else {
      fetchData();
    }
  };

  const onChange = (e) => {
    e.persist();
    setKeyword(e.target.value);
    showListBySearch(e.target.value);
    setSellerId('');
  };

  const onChangeSeller = (e) => {
    e.persist();
    setSellerId(e.target.value);
    showListBySellerId(e.target.value);
    setKeyword('');
  };

  const resetKeyword = () => {
    setKeyword('');
    setSellerId('');
    fetchData();
  };

  const resetKeywordSeller = () => {
    setKeyword('');
    setSellerId('');
    fetchData();
  };

  const content = () => (
    <div>
      <Row>
        <Col xs={12} sm={4} md={8}><h5>Produk</h5></Col>
        <Col>
          <Row>
            <Col xs={2} sm={2}>
              <h5><Button size="sm" variant="success" href="/produk/add">Add</Button></h5>
            </Col>
            <Col>
              <h5>
                <InputGroup>
                  <FormControl size="sm" placeholder="Search by Nama" type="text" name="keyword" id="keyword" value={keyword} onChange={onChange} />
                  <InputGroup.Append><Button size="sm" variant="outline-danger" onClick={resetKeyword}>X</Button></InputGroup.Append>
                </InputGroup>
              </h5>
              <h5>
                <InputGroup>
                  <FormControl size="sm" placeholder="Search by Id Penjual" type="text" name="sellerId" id="sellerId" value={sellerId} onChange={onChangeSeller} />
                  <InputGroup.Append><Button size="sm" variant="outline-danger" onClick={resetKeywordSeller}>X</Button></InputGroup.Append>
                </InputGroup>
              </h5>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table striped bordered hover size="sm"  className="text-center">
        <thead>
        <tr>
          <th>Id</th>
          <th>Nama</th>
          <th>Satuan</th>
          <th>Harga Satuan</th>
          <th>Deskripsi</th>
          <th>Id Penjual</th>
        </tr>
        </thead>
        <tbody>
        {
          data && data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.satuan}</td>
                <td>{item.hargaSatuan}</td>
                <td>{item.deskripsi}</td>
                <td>{item.sellerId}</td>
              </tr>
            )
          )
        }
        </tbody>
      </Table>
    </div>
  );

  return (
    <div>
      <Card body>
        { showLoading ? <Loading/> : content() }
      </Card>
    </div>
  );
}

export default withRouter(Produk);
