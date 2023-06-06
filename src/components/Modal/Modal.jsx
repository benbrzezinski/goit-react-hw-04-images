import { Component } from "react";
import PropTypes from "prop-types";
import scss from "./Modal.module.scss";
import clsx from "clsx";

class Modal extends Component {
  componentDidUpdate() {
    const { isModalOpen, closeModalOnEsc } = this.props;

    isModalOpen
      ? window.addEventListener("keydown", closeModalOnEsc)
      : window.removeEventListener("keydown", closeModalOnEsc);
  }

  render() {
    const { largeImageURL, tags, isModalOpen, closeModalOnClick } = this.props;

    return (
      <div
        className={clsx(scss.modalOverlay, isModalOpen && scss.isVisible)}
        onClick={closeModalOnClick}
      >
        <div className={scss.modal}>
          <img className={scss.modal__img} src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModalOnClick: PropTypes.func.isRequired,
  closeModalOnEsc: PropTypes.func.isRequired,
};

export default Modal;
