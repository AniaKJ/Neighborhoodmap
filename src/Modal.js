import React, { Component } from 'react';

class Modal extends Component {
  // state = {
  //   modalIsVisible: false,
  // }
  //
  // changeState = ()=>{
  //   this.setState({
  //     modalIsVisible:true
  //   });
  // };
  //
  //   const styleVisible ={
  //     display: 'block',
  //     width:'50%',
  //     position:'fixed'
  //   }


    //   modal = <div className='modal' style={styleVisible}>
    //           <span>Name</span>
    //           <p>Details</p>
    //           </div>
    //
    // }

  render (){
      const style ={
        width:'50%',
        position:'fixed'
      }

    return(
      <div className='modal' style={style}>
              <span>Name</span>
              <p>Details</p>
              </div>
    )
  }
}
export default Modal
