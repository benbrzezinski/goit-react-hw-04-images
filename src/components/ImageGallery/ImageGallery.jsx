import PropTypes from "prop-types";
import scss from "./ImageGallery.module.scss";

const ImageGallery = ({ children }) => (
  <main>
    <ul className={scss.gallery}>{children}</ul>
  </main>
);

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
