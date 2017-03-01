import React, {Component} from 'react'
import enableDnd from './enableDnd'

export class WithoutDnD extends Component {
  render() {
    return (      
      <text
        {...this.props}
      >
        {this.props.children}
      </text>
    );
  }
}

const Text = enableDnd(WithoutDnD)

export default Text