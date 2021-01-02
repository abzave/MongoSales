import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export default class NumberInput extends React.Component {

  state = {
    value: this.props.value || ""
  };

  setValue = (event, callback) => {
    this.setState({ value: event.target.value });
    if (callback) {
      callback(event);
    }
  }

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
          disabled={this.props.disabled || false} 
          value={this.props.value || this.state.value}
          onChange={(event) => this.setValue(event, this.props.onChange)} >
        </FormControl>
      </InputGroup>
    );
  }

}