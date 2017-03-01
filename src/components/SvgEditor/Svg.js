import React, {Component} from 'react';
import uuid from 'uuid'

import Background from './Background'

import Rect from './Rect'
import Image from './Image'
import Text from './Text'

const typeMapping = {
  'rect': Rect,
  'image': Image,
  'text': Text
}

class Svg extends Component {
  state = {
    matrix: [1, 0, 0, 1, 0, 0],
    showGrid: true,
    items: []
  }

  addElement = (element) => {
    let elementConfig
    switch(element.type) {
      case 'text':
        elementConfig = this.getTextConfig(element)
        break
      case 'image':
        elementConfig = this.getImageConfig(element)
        break
      case 'rect':
        elementConfig = this.getRectConfig(element)
        break
      default:
        throw new Error('unrecognize element type')
    }

    this.setState(prevState => {
      return {
        items: [...prevState.items, {
          type: elementConfig.type,
          props: Object.assign({
            key: uuid(),
          }, elementConfig.props),
          children: elementConfig.children
        }]
      }
    })
  }

  getTextConfig = (elementConfig) => {
    const config = {
      type: 'text',
      props: {
        x: elementConfig.x,
        y: elementConfig.y
      },
      children: elementConfig.text
    }
    return config
  }

  getImageConfig = (elementConfig) => {
    const config = {
      type: 'image',
      props: {
        width: elementConfig.width, 
        height: elementConfig.height,
        'xlink:href': elementConfig['xlink:href'],
        x: elementConfig.x,
        y: elementConfig.y
      }
    }
    return config
  }

  getRectConfig = (elementConfig) => {
    const config = {
      type: 'rect',
      props: {
        width: elementConfig.width, 
        height: elementConfig.height,
        stroke: elementConfig.stroke, 
        strokeWidth: elementConfig.strokeWidth,
        x: elementConfig.x,
        y: elementConfig.y
      }
    }
    return config
  }

  zoom(scale) {
    const m = this.state.matrix;
    const len = m.length;
    for (let i = 0; i < len; i++) {
      m[i] *= scale;
    }
    m[4] += (1 - scale) * this.props.width / 2;
    m[5] += (1 - scale) * this.props.height / 2;
    this.setState({ matrix: m });
  }

  toggleGrid = () => {
    this.setState(prevState => {
      return {
        showGrid: !prevState.showGrid
      }
    })
  }

  render() {
    const { height, width } = this.props;
    return (
      <svg
        height={height}
        width={width}
      >
        <Background 
          height={height}
          width={width}
          showGrid={this.state.showGrid}
        />
        <g transform={`matrix(${this.state.matrix.join(' ')})`}>
        {
          this.state.items.map((item) => {
            return React.createElement(
              typeMapping[item.type],
              item.props,
              item.children
            )
          })
        }
        </g>
      </svg>
    );
  }
}

Svg.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};

Svg.defaultProps = {
  width: 401,
  height: 401,
};

export default Svg