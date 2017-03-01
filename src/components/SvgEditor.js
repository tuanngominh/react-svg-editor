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
        x: 40, y: 40, width: 30, height: 30, stroke: "blue", strokeWidth: "1"
      },
      {
        type: 'text',
        x: 100, y: 100, 
        'text': 'sample text'
      },
      {
        type: 'image',
        width: 100, 
        height: 100,
        x: 50,
        y: 150,
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

  render () {
    return (
      <div>
        <button onClick={this.handleAddRect}>Add rect</button><br/>
        <button onClick={this.handleAddImage}>Add Image</button><br/>
        <button onClick={this.handleAddText}>Add Text</button><br/>
        <Svg ref={node => this.dndSvg = node}/>
      </div>
    );
  }
}

export default SvgEditor