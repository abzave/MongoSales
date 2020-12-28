import React from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';

import CodeInput from './input/code/CodeInput';
import Item from './item/Item';
import Total from './total/Total';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      items: [{id: 0, amount: 0, price: 0, amount: 0}],
      idCount: 1,
      clientCode: 'C000000',
    }
  }

  getClient(currentValue) {
    this.setState({ clientCode: currentValue });
  }

  render() {
    return (
      <Container className="bg-dark my-4 py-4 border rounded">
        <h1 className="text-white text-center">Datos de Ventas</h1>
        <Form className="mt-3">
          <Row className="mb-3">
            <Col>
              <CodeInput 
                code="C"
                name="Codigo de Cliente" 
                length={6} 
                fill="0"
                onGet={this.getClient}>
              </CodeInput>
            </Col>
          </Row>
          {
            this.state.items.map(item =>
              <Item key={ item.id }></Item>
            )
          }
          <Total></Total>
          <Row>
            <Col>
              <Button className="btn btn-primary w-100">Enviar</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }

}