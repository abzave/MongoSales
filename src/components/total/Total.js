import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

import NumberInput from '../input/number/NumberInput';

export default class Total extends React.Component {

  state = {
    total: this.props.subtotal
  }

  setTax = (event) => {
    const percentage = +event.target.value;
    const tax = (percentage / 100.0);

    this.calculateTotal(tax + 1.0);
    this.props.onTaxChange(tax);
  }

  calculateTotal = (tax) => {
    if (this.props.subtotal === "") {
      this.setState({ total: "" });
      return;
    }

    let newTotal = +this.props.subtotal;
    newTotal *= tax;

    this.setState({ total: `${newTotal}` });
    this.props.onTotalChange(newTotal);
  }

  render() {
    return (
      <Row className="mb-3">
        <Col>
          <NumberInput
            symbol="%"
            name="Impuesto de Venta"
            min="1" 
            onChange={this.setTax}>
          </NumberInput>
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Subtotal"
            disabled={true} 
            value={this.props.subtotal} >
          </NumberInput>
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Total"
            disabled={true}
            value={this.state.total} >
          </NumberInput>
        </Col>
        <Col>
          <Form.Control
            placeholder="Almacen"
            onChange={(event) => this.props.onWarehouseChange(event.target.value)} >
          </Form.Control>
        </Col>
        <Col>
          <Form.Control
            placeholder="Vendedor"
            onChange={(event) => this.props.onVendorChange(event.target.value)} >
          </Form.Control>
        </Col>
      </Row>
    );
  }

}