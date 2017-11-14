
import React, { PureComponent } from 'react';

export default class MinutesToRead extends PureComponent {

  render() {

    const { minutes } = this.props;
    const unit = minutes > 1 ? 'minutes' : 'minute';

    return (
      <small>{this.props.minutes} {unit} to read</small>
    );
  }

}
