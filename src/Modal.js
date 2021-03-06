import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Modal extends Component {

  static propTypes = {
    clickedUni: PropTypes.string.isRequired,
    wiki: PropTypes.array.isRequired,
  }

  render (){
      const { clickedUni } = this.props;
      const { wiki } = this.props;
      const style ={
        width:'50%',
        position:'fixed'
      }

    return(
      <div className='modal' style={style}>
              <span>{clickedUni}</span>
              <p>{wiki}</p>
              </div>
    )
  }
}

export default Modal
