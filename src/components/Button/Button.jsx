import PropTypes from "prop-types";
import scss from "./Button.module.scss";

const Button = ({ getNextPage }) => (
  <footer className={scss.btnBox}>
    <button className={scss.btn} type="submit" onClick={getNextPage}>
      Load more
    </button>
  </footer>
);

Button.propTypes = {
  getNextPage: PropTypes.func.isRequired,
};

export default Button;
