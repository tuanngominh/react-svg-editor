import React, {Component} from 'react';
import Rect from './Rect'

const typeMapping = {
  'rect': Rect
}

class DndSvg extends Component {
  state = {
    items: [
    {      
      type: 'rect',
      'props': {
        key: 'key1',
        width: 30, height: 30, stroke: "blue", strokeWidth: "1"
      }
    }
    ]
  }

  addElement = () => {
    this.setState(prevState => {
      return {
        items: [...prevState.items, {
          type: 'rect',
          'props': {
            key: 'key' + Math.random(), width: 40, height: 40,
            width: 30, height: 30, stroke: "blue", strokeWidth: "1"
          }
        }]
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
        <rect x="0" y="0" height={height} width={width} stroke="grey" strokeWidth="1" fillOpacity={0}></rect>
        <g>
        {
          this.state.items.map((item) => {
            return React.createElement(
              typeMapping[item.type],
              item.props
            )
          })
        }
        </g>
      </svg>
    );
  }
}

DndSvg.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};

DndSvg.defaultProps = {
  width: 400,
  height: 400,
};

export default DndSvg