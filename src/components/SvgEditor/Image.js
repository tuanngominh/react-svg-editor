import React, {Component} from 'react'
import enableDnd from './enableDnd'

export class ImageWithoutDnD extends Component {
  render() {
    const xlinkHref = this.props['xlink:href']
    let props = Object.assign({}, this.props)
    delete props['xlink:href']
    return (
      <image
        xlinkHref={xlinkHref}
        {...props}
      >
      </image>
    );
  }
}

const Image = enableDnd(ImageWithoutDnD)

export default Image