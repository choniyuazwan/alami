import React, { useState } from 'react';
import axios from 'axios';
import { Card} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";
import * as yup from "yup";
import {toast} from 'react-toastify';
import Loading from '../../Component/Loading';
import {alert} from '../../Util/Handler';
import FormAdd from '../../Component/FormAdd';

function ProdukAdd(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [produk, setProduk] = useState({
    nama: '',
    satuan: '',
    hargaSatuan: '',
    deskripsi: '',
    sellerId: ''
  })
  const apiUrl = url.addProduct;

  const save = async (data) => {
    setShowLoading(true);
    const payload = {
      nama: data.nama,
      satuan: data.satuan,
      hargaSatuan: data.hargaSatuan,
      deskripsi: data.deskripsi,
      sellerId: data.sellerId,
    };
    setProduk({...produk, ...payload});
    let toastMessage, toastType;
    toast.configure();
    try {
      const response = await axios.post(apiUrl, payload, options);
      if(response.data.code === 200) {
        props.history.push({
          pathname: '/produk',
          state: {type: 'success', message: 'Produk berhasil ditambahkan'}
        });
        toastMessage = 'Produk berhasil ditambahkan';
        toastType = toast.TYPE.SUCCESS;
      } else {
        toastMessage = response.data.message;
        toastType = toast.TYPE.ERROR;
      }
    } catch (error) {
      toastMessage = error;
      toastType = toast.TYPE.ERROR;
    }
    alert(toastMessage, toastType);
    setShowLoading(false);
  };

  const schema = yup.object({
    nama: yup.string().required(),
    satuan: yup.string().required(),
    hargaSatuan: yup.number().required().positive().integer(),
    deskripsi: yup.string().required(),
    sellerId: yup.number().required().positive().integer()
  });

  const inputRow = [
    {
      field: Object.keys(produk)[0],
      label: 'Nama',
      type: 'basic'
    },
    {
      field: Object.keys(produk)[1],
      label: 'Satuan',
      type: 'basic'
    },
    {
      field: Object.keys(produk)[2],
      label: 'Harga Satuan',
      type: 'Harus diisi berupa angka bulat positif'
    },
    {
      field: Object.keys(produk)[3],
      label: 'Deskripsi',
      type: 'basic'
    },
    {
      field: Object.keys(produk)[4],
      label: 'Id Penjual',
      type: 'Harus diisi berupa angka bulat positif'
    }
  ]

  const title = 'Produk';

  return (
    <div>
      <Card body>
        { showLoading ? <Loading/> : <FormAdd title={title} schema={schema} save={save} data={produk} inputRow={inputRow}/> }
      </Card>
    </div>
  );
}

export default withRouter(ProdukAdd);
