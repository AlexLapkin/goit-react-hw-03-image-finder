import React, {Component} from "react";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
state = {
largeImageURL: 'largeImageURL',
};

componentDidMount() {
  window.addEventListener('keydown', this.handleKeyDown);
  document.body.style.overflow = 'hidden';
}

componentWillUnmount() {
  window.removeEventListener('keydown', this.handleKeyDown);
  document.body.style.overflow = 'auto';
}

handleOverlayClick = event => {
  console.log(456)
  if (event.target === event.currentTarget) {
    this.props.closeModal();
  }
}

handleKeyDown = event => {
  if (event.code === 'Escape') {
    this.props.closeModal();
  }
}

    render() {
        return (
            <div className={css.overlay}
            onClick={this.handleOverlayClick}>
            <div class="modal">
            <img src={this.props.largeImageURL} alt="" />
            </div>
          </div> 
        )
    }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  largeImageURL: PropTypes.string,
}

export default Modal;