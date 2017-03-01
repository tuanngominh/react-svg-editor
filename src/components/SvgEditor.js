import React, {Component} from 'react'

import DndSvg from './SvgEditor/DndSvg'

class SvgEditor extends Component {
  handleAddElement = () => {
    this.dndSvg.addElement()
  }
  render () {
    return (
      <div>
        <button onClick={this.handleAddElement}>{'+1'}</button><br/>
        <DndSvg ref={node => this.dndSvg = node}/>
      </div>
    );
  }
}

export default SvgEditor