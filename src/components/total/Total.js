import React from 'react';
import { Col, Row } from 'react-bootstrap';

import NumberInput from '../input/number/NumberInput';

export default class Total extends React.Component {

  render() {
    return (
      <Row className="mb-3">
        <Col>
          <NumberInput
            symbol="%"
            name="Impuesto de Venta"
            min="1" >
          </NumberInput>
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Subtotal"
            disabled={true} >
          </NumberInput>
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Total"
            disabled={true} >
          </NumberInput>
        </Col>
      </Row>
    );
  }

}