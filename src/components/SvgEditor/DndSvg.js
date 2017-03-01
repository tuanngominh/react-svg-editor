import React, {Component} from 'react';
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

class DndSvg extends Component {
  state = {
    items: [
    {
      key: 'key1', width: 30, height: 30
    },
    {
      key: 'key2', width: 40, height: 40
    }
    ]
  }

  addElement = () => {
    this.setState(prevState => {
      return {
        items: [...prevState.items, {
          key: 'key' + Math.random(), width: 40, height: 40
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
            return (
              <Rect
                key={item.key}
                width={item.width}
                height={item.height}
                stroke="blue" 
                strokeWidth="1"
              />
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