import React from 'react';
import { Col, Container, Form, Row, Button, Dropdown } from 'react-bootstrap';

import CodeInput from './input/code/CodeInput';
import Item from './item/Item';
import Total from './total/Total';

export default class App extends React.Component {
  
  state = {
    items: [
      {
        id: 0,
        code: '',
        amount: 0, 
        price: 0, 
        total: 0,
        profit: 0,
      }
    ],
    idCount: 1,
    clientCode: "",
    subtotal: "",
    tax: "",
    total: "",
    currency: "Moneda",
    date: "",
    expireDate: "",
    invoice: "",
    warehouse: "",
    vendor: "",
    totalUSD: "",
    taxUSD: ""
  }

  getClient = (currentValue) => {
    this.setState({ clientCode: currentValue })
  }

  getItemCode = (currentValue, index) => {
    this.state.items[index].code = currentValue;
  }

  getItemAmount = (currentValue, index) => {
    this.state.items[index].amount = currentValue;
  }

  getItemPrice = (currentValue, index) => {
    this.state.items[index].price = currentValue;
  }

  getItemTotal = (currentValue, index) => {
    this.state.items[index].total = currentValue;
    this.calculateSubtotal();
  }

  getItemProfit = (currentValue, index) => {
    this.state.items[index].profit = currentValue;
  }

  addItem = (index) => {
    const emptyItem = {
      id: this.state.idCount,
      code: '',
      amount: 0,
      price: 0,
      total: 0
    };

    this.state.items.splice(index + 1, 0, emptyItem);
    this.setState({ idCount: this.state.idCount + 1 });
  }

  deleteItem = (index) => {
    const remainingItems = this.state.items.filter(item => {
      return item.id !== index;
    });

    this.setState({ items: remainingItems });
  }

  calculateSubtotal = () => {
    let subtotal = 0;

    this.state.items.map(item => {
      subtotal += +item.total;
    });

    this.setState({ subtotal: `${subtotal}` });
    if (this.state.currency === "Dolares") {
      this.setState({ totalUSD: `${subtotal}` });
    }
  }

  onSubmit = (event) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      client: this.state.clientCode,
      items: this.formatItems(),
      tax: +this.state.tax,
      total: +this.state.subtotal,
      currency: this.state.currency,
      date: this.state.date,
      expireDate: this.state.expireDate,
      invoice: this.state.invoice,
      warehouse: this.state.warehouse,
      vendor: this.state.vendor,
      totalUSD: +this.state.totalUSD,
      taxUSD: (+this.state.tax * +this.state.totalUSD)
    });

    const options = {
      method: "POST",
      headers: headers,
      body: body
    };

    fetch("http://localhost:4242/sales", options)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log(error));
  }

  formatItems = () => this.state.items.map(item => {
    return {
      code: item.code,
      amount: +item.amount,
      price: +item.price,
      total: +item.total,
      profit: this.state.currency === "Colones" ? +item.profit : -1,
      profitUSD: this.state.currency === "Dolares" ? +item.profit : -1
    };
  });

  render() {
    return (
      <Container className="bg-dark my-4 py-4 border rounded">
        <h1 className="text-white text-center">Datos de Ventas</h1>
        <Form className="mt-3">
          <Row className="mb-3">
            <Col>
              <Form.Control 
              placeholder="Factura"
              onChange={(event) => this.setState({invoice: event.target.value})} >
              </Form.Control>
            </Col>
            <Col>
              <Form.Control 
              type="date" 
              placeholder="Fecha" 
              onChange={(event) => this.setState({date: event.target.value})}>
              </Form.Control>
            </Col>
            <Col>
              <Form.Control 
              type="date" 
              placeholder="Fecha de Vencimiento"
              onChange={(event) => this.setState({ expireDate: event.target.value })} >
              </Form.Control>
            </Col>
            <Col>
              <CodeInput 
                code="C"
                name="Codigo de Cliente" 
                length={6} 
                fill="0"
                onGet={this.getClient}>
              </CodeInput>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="primary" className="w-100">
                  {this.state.currency}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100">
                  <Dropdown.Item 
                    onClick={(event) => this.setState({ currency: "Colones"})} >
                      Colones
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => this.setState({ currency: "Dolares" })} >
                     Dolares
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          {
            this.state.items.map((item, index) =>
              <Item 
                key={item.id}
                id={item.id}
                index={index}
                canAdd={this.state.items.length > 1}
                onGetCode={this.getItemCode}
                onAmountChange={this.getItemAmount}
                onPriceChange={this.getItemPrice}
                onTotalChange={this.getItemTotal}
                onAdd={this.addItem} 
                onDelete={this.deleteItem}
                onProfitChange={this.getItemProfit} >
              </Item>
            )
          }
          <Total 
            subtotal={this.state.subtotal}
            onTaxChange={(value) => this.setState({tax: value})}
            onTotalChange={(value) => this.setState({total: value})}
            onWarehouseChange={(value) => this.setState({ warehouse: value })} 
            onVendorChange={(value) => this.setState({ vendor: value })}>
          </Total>
          <Row>
            <Col>
              <Button 
                className="btn btn-primary w-100" 
                onClick={this.onSubmit}>
                  Enviar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }

}