import React, {Component} from 'react';


export class DndSvgItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
      dragging: false,
      x: 0,
      y: 0,
      dx: 0,
      dy: 0
    };
  }

  onDragStart = (e) => {
    // Find start position of drag based on touch/mouse coordinates.
    const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
    // Update state with above coordinates, and set dragging to true.
    const state = {
      dragging: true,
      startX,
      startY,
    };

    this.setState(state);
  }

  onDragMove = (e) => {
    // First check if the state is dragging, if not we can just return
    // so we do not move unless the user wants to move
    if (!this.state.dragging) {
      return;
    }

    // Get the new x coordinates
    const newX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const newY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Take the delta where we are minus where we came from.
    const dx = newX - this.state.startX;
    const dy = newY - this.state.startY;

    // Move element using the deltas
    // Update the state
    this.setState({
      dx: dx,
      dy: dy,
    });
  }

  onDragEnd = () => {
    this.setState((prevState) => {
      return { 
        dragging: false,
        x: prevState.x + prevState.dx,
        y: prevState.y + prevState.dy,
        dx: 0,
        dy: 0,
        startX: 0,
        startY: 0
      }
    });
  }

  render() {
    const { height, width } = this.props;
    return (
      <rect
        className="draggable"
        transform={`translate(${this.state.dx}, ${this.state.dy})`}
        x={this.state.x}
        y={this.state.y}
        height={height} 
        width={width} 
        stroke="blue" 
        strokeWidth="1"
        onMouseDown={this.onDragStart}
        onMouseMove={this.onDragMove}
        onMouseUp={this.onDragEnd}
        onMouseOut={this.onDragEnd}
        // onTouchStart={this.onDragStart}
        // onTouchMove={this.onDragMove}
        // onTouchEnd={this.onDragEnd}
      >
      </rect>
    );
  }
}

DndSvgItem.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};

DndSvgItem.defaultProps = {
  width: 40,
  height: 40,
};

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
              <DndSvgItem 
                key={item.key}
                width={item.width}
                height={item.height}
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