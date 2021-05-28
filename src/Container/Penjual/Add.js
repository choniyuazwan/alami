import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Card} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { options, url } from "../../Util/Api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Component/Loading';
import {alert} from '../../Util/Handler';
import FormAdd from '../../Component/FormAdd';

function PenjualAdd(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [penjual, setPenjual] = useState({
    nama: '',
    kota: ''
  })

  const apiUrl = url.addSeller;

  const save = async (data) => {
    setShowLoading(true);
    const payload = {
      nama: data.nama,
      kota: data.kota
    };
    setPenjual({...penjual, ...payload})
    let toastMessage, toastType;
    toast.configure();
    try {
      const response = await axios.post(apiUrl, payload, options);
      if(response.data.code === 200) {
        setPenjual({...penjual, nama: '', kota: ''})
        toastMessage = 'Penjual berhasil ditambahkan';
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
    kota: yup.string().required()
  });

  const inputRow = [
    {
      field: Object.keys(penjual)[0],
      label: 'Nama',
      type: 'basic'
    },
    {
      field: Object.keys(penjual)[1],
      label: 'Kota',
      type: 'basic'
    }
  ]

  const title = 'Penjual';

  return (
    <div>
      <Card body>
        { showLoading ? <Loading/> : <FormAdd title={title} schema={schema} save={save} data={penjual} inputRow={inputRow}/> }
      </Card>
    </div>
  );
}

export default withRouter(PenjualAdd);
