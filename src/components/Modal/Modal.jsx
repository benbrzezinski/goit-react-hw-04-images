import { useEffect } from "react";
import PropTypes from "prop-types";
import scss from "./Modal.module.scss";
import clsx from "clsx";

const Modal = ({
  largeImageURL,
  tags,
  isModalOpen,
  closeModalOnClick,
  closeModalOnEsc,
}) => {
  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", closeModalOnEsc);
    }

    return () => {
      window.removeEventListener("keydown", closeModalOnEsc);
    };
  }, [isModalOpen, closeModalOnEsc]);

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
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModalOnClick: PropTypes.func.isRequired,
  closeModalOnEsc: PropTypes.func.isRequired,
};

export default Modal;
