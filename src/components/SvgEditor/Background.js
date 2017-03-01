import React, {Component} from 'react'

class Background extends Component {
  defaultProps = {
    showGrid: true
  }
  render() {
    return (
      <g>
      {
        this.props.showGrid && 
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)"/>
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
          </pattern>
        </defs>
      }
      {
        this.props.showGrid && 
        <rect
          x="0" y="0" height={this.props.height} width={this.props.width} 
          fill="url(#grid)"
        ></rect>          
      }
      {
        !this.props.showGrid && 
        <rect
          x="0" y="0" height={this.props.height} width={this.props.width} 
          stroke="grey" strokeWidth="1" fillOpacity={0} 
        ></rect>          
      }
      </g>
    )
  }
}

export default Background