import React, {Component} from 'react'

import Svg from './SvgEditor/Svg'

import imageSrc from '../assets/apples-214148_640.jpg'

class SvgEditor extends Component {
  handleAddRect = () => {
    this.dndSvg.addElement({
      type: 'rect',
      width: 30, height: 30, stroke: "blue", strokeWidth: "1"
    })
  }

  handleAddImage = () => {
    this.dndSvg.addElement({
      type: 'image',
      width: 100, 
      height: 100,
      'xlink:href': imageSrc  
    }) 
  }

  handleAddText = () => {
    this.dndSvg.addElement({
      type: 'text',
      x: 100, y: 100, 
      'text': 'sample text'
    }) 
  }

  addSampleContent = () => {
    const sampleContent = [
      {
        type: 'rect',
        x: 40, y: 40, width: 100, height: 100, stroke: "blue", strokeWidth: "1"
      },
      {
        type: 'text',
        x: 200, y: 150, 
        'text': 'sample text'
      },
      {
        type: 'image',
        width: 100, 
        height: 100,
        x: 60,
        y: 250,
        'xlink:href': imageSrc  
      }
    ]
    sampleContent.forEach((elementConfig) => {
      this.dndSvg.addElement(elementConfig)
    })
  }

  componentDidMount() {
    this.addSampleContent()
  }

  handleZoomIn = () => {
    this.dndSvg.zoom(1.2)
  }

  handleZoomOut = () => {
    this.dndSvg.zoom(0.8) 
  }

  render () {
    return (
      <div className="container editor">
        <div className="row">
          <div className="col-sm-12 col-md-3 toolbar">
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleZoomIn}>
                <i className="fa fa-search-plus" aria-hidden="true"></i>
              </a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleZoomOut}>
                <i className="fa fa-search-minus" aria-hidden="true"></i>
              </a>
            </div>
            <br/>
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleAddImage}><i className="fa fa-picture-o" aria-hidden="true"></i>Add image</a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleAddText}><i className="fa fa fa-font" aria-hidden="true"></i>Add text</a>
              <a href="#" className="list-group-item list-group-item-action" onClick={this.handleAddRect}><i className="fa fa-square-o" aria-hidden="true"></i>Add rect</a>
            </div>
          </div>
          <div className="col-sm-12 col-md-9">
            <Svg ref={node => this.dndSvg = node}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SvgEditor