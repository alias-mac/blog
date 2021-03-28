import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Styled = styled.small`
  margin-bottom: calc(0.40625rem - 1px);
  display: block;
`;

export default class TimeToRead extends PureComponent {
  render() {
    const { minutes } = this.props;
    const unit = minutes > 1 ? 'minutes' : 'minute';

    return (
      <Styled>{minutes} {unit} to read</Styled>
    );
  }
}
