import PropTypes from "prop-types";
import scss from "./ImageGallery.module.scss";

const ImageGalleryItem = ({ images, openModal }) =>
  images.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li className={scss.gallery__card} key={id}>
      <img
        className={scss.gallery__img}
        src={webformatURL}
        data-src={largeImageURL}
        onClick={openModal}
        alt={tags}
        loading="lazy"
      />
    </li>
  ));

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
