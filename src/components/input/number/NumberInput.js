import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default class NumberInput extends React.Component {

  render() {
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{this.props.symbol}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          placeholder={this.props.name}
          min={this.props.min || "0"}
          max={this.props.max} 
          disabled={this.props.disabled || false} >
        </FormControl>
      </InputGroup>
    );
  }

}