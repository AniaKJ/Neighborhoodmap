import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ModalOverlay extends Component {

  static propTypes = {
    showDetails: PropTypes.func.isRequired,
  }

  render (){
    const {showDetails}=this.props

    return(
      <div className='modal-overlay' onClick={()=> showDetails()}>
      </div>
    )
  }
}
export default ModalOverlay
