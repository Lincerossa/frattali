import React, { Component } from "react"
import { Modal } from "react-overlays"
import PropTypes from "prop-types"

import * as S from "./styles"

const modalStyle = {
  position: "fixed",
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const backdropStyle = {
  ...modalStyle,
  zIndex: "auto",
  backgroundColor: "#000",
  opacity: 0.5,
  cursor: "pointer",
  
}

class ModalOverlay extends Component {
  static defaultProps = {
    children: null,
    isSidebarVersion: null,
  }

  static propTypes = {
    children: PropTypes.element,
    isSidebarVersion: PropTypes.bool,
  }

  render() {
    const { children, handleClose } = this.props
    return (
      <Modal
        aria-labelledby="modal-label"
        style={modalStyle}
        backdropStyle={backdropStyle}
        show
        onHide={() => handleClose(false)}
      >
        <S.ModalInner>
          <S.Close  onClick={() => handleClose(false)}>X</S.Close>
          {children}
        </S.ModalInner>
      </Modal>
    )
  }
}

export default ModalOverlay
