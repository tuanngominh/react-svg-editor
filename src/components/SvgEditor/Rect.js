import React, {Component} from 'react'
import enableDnd from './enableDnd'

export class RectWithoutDnD extends Component {
  render() {
    return (
      <rect
        {...this.props}
      >
      </rect>
    );
  }
}

const Rect = enableDnd(RectWithoutDnD)

export default Rect