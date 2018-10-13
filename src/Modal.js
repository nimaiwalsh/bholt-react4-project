import React from 'react'
import { createPortal } from 'react-dom'

//React Portals
//Good use for using Modals in your Apps and Webpages
const modalRoot = document.getElementById('modal')

class Modal extends React.Component {
  constructor(props) {
    super(props)

    //Element to stick in side modal div in index.js
    this.el = document.createElement('div')
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  //This lifecycle methods is used to clearn up memory
  //i.e removing event listeners, extraneous document stuff
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return createPortal(this.props.children, this.el)
  }
}

export default Modal

//Wrap Modal component around any children that are to be part of the Modal.
//See Details page for an example
