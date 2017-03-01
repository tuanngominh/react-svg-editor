import React, {Component} from 'react'

function enableDnd(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dragging: false,
        x: props.x ? props.x : 0,
        y: props.y ? props.y : 0,
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
      const { height, width, x, y, ...passThroughProps } = this.props;

      return <WrappedComponent          
        className="draggable"
        transform={`translate(${this.state.dx}, ${this.state.dy})`}
        x={this.state.x}
        y={this.state.y}
        height={height} 
        width={width} 
        onMouseDown={this.onDragStart}
        onMouseMove={this.onDragMove}
        onMouseUp={this.onDragEnd}
        onMouseOut={this.onDragEnd}
        // onTouchStart={this.onDragStart}
        // onTouchMove={this.onDragMove}
        // onTouchEnd={this.onDragEnd}
        {...passThroughProps}
      />
    }
  };
}

export default enableDnd