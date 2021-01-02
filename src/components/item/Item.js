import React from 'react';
import { Row, Col, Form, Button, ButtonGroup } from 'react-bootstrap';

import CodeInput from '../input/code/CodeInput';
import NumberInput from '../input/number/NumberInput';

export default class Item extends React.Component {

  state = {
    amount: "",
    price: "",
    total: "",
    profit: ""
  }

  calculateTotal = (price, amount) => {
    const hasData = amount !== "" && price !== "";
    if (!hasData) {
      this.setState({ total: "" });
      return;
    } 
    
    amount = +amount;
    price = +price;
    
    this.setState({ total: `${price * amount}` });
    this.props.onTotalChange(price * amount, this.props.id);
  }

  setPrice = (event) => {
    this.setState({ price: event.target.value });
    this.props.onPriceChange(event.target.value, this.props.id);
    this.calculateTotal(event.target.value, this.state.amount);
  }

  setAmount = (event) => {
    this.setState({ amount: event.target.value });
    this.props.onAmountChange(event.target.value, this.props.id);
    this.calculateTotal(this.state.price, event.target.value);
  }

  setProfit = (event) => {
    this.setState({profit: event.target.value});
    this.props.onProfitChange(event.target.value, this.props.id);
  }

  onGetCode = (currentValue) => {
    this.props.onGetCode(currentValue, this.props.id);
  }

  render() {
    return (
      <Row className="mb-3">
        <Col>
          <CodeInput
            code="A"
            name="Codigo de Articulo"
            fill="0"
            length={6} 
            onGet={this.onGetCode} >
          </CodeInput>
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Cantidad"
            min="1"
            value={this.state.amout}
            onChange={this.setAmount} />
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Precio Unitario" 
            value={this.state.price}
            onChange={this.setPrice} >
          </NumberInput>
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Ganancia" 
            onChange={this.setProfit}>
          </NumberInput>
        </Col>
        <Col>
          <NumberInput
            symbol="$"
            name="Monto"
            disabled={true}
            value={this.state.total} >
          </NumberInput>
        </Col>
        <Col>
          <ButtonGroup>
            <Button 
              className="btn btn-success mr-4 rounded" 
              onClick={ (event) => this.props.onAdd(this.props.index) } >
                Agregar
            </Button>
            <Button 
              className="btn btn-danger rounded"
              onClick={(event) => this.props.onDelete(this.props.id) } 
              disabled={!this.props.canAdd}>
                Eliminar
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }

}