import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

export default class CodeInput extends React.Component {

  formatCode(value) {
    let code = this.props.code;
    const padding = this.props.length;
    const fill = this.props.fill;

    code += value.padStart(padding, fill);
    return code
  }

  render() {
    return (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{this.props.code}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl 
          placeholder={this.props.name}
          maxLength={this.props.length}
          onChange={(event) => this.props.onGet(this.formatCode(event.target.value))}>
        </FormControl>
      </InputGroup>
    );
  }

}