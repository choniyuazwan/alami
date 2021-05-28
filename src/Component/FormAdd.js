import {Button, Col, Form, Row} from 'react-bootstrap';
import {Formik} from 'formik';
import React from 'react';

export default function FormAdd({title, schema, save, data, inputRow}) {
  return (
    <div>
      <Row>
        <Col><h5>{title} Add</h5></Col>
      </Row>
      <Formik
        validationSchema={schema}
        onSubmit={save}
        initialValues={data}
      >
        {({
            handleSubmit,
            handleChange,
            values,
            touched,
            isValid,
            errors,
          }) => {
          const disabled = !isValid || values.nama === '' || values.kota === '';
          return (
            <Form noValidate onSubmit={handleSubmit}>
              {
                inputRow.map((item, index) => {
                  return (
                    <Form.Group as={Row} key={index}>
                      <Form.Label column sm={3} className="text-right">{item.label}</Form.Label>
                      <Col sm={4}>
                        <Form.Control size="sm" type="text" name={item.field} id={item.field} placeholder={item.label} value={values[item.field]} onChange={handleChange} isValid={touched[item.field] && !errors[item.field]} isInvalid={!!errors[item.field]} />
                        <Form.Control.Feedback type="invalid">{errors[item.field] && item.type === 'basic' ? 'Harus diisi' : item.type}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  )
                })
              }
              <Form.Group as={Row}>
                <Col sm={{ offset: 3 }}>
                  <Button size="sm" type="submit" disabled={disabled} >Submit</Button> &nbsp;
                  <Button size="sm" type="button" variant="success" href="/produk">Back</Button>
                </Col>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
