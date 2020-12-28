import React from 'react';
import { Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';

import CodeInput from '../input/code/CodeInput';
import NumberInput from '../input/number/NumberInput';

export default class Item extends React.Component {

  render() {
    return (
      <Row className="mb-3">
        <Col>
          <CodeInput
            code="A"
            name="Codigo de Articulo"
            length={6} >
          </CodeInput>
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Cantidad"
            min="1" />
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Precio Unitario" >
          </NumberInput>
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Monto"
            disabled={true} >
          </NumberInput>
        </Col>
        <Col>
          <ButtonGroup>
            <Button className="btn btn-success mr-4 rounded">Agregar</Button>
            <Button className="btn btn-danger rounded">Eliminar</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }

}