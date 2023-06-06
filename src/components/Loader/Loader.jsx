import PropTypes from "prop-types";
import scss from "./Loader.module.scss";
import { MagnifyingGlass } from "react-loader-spinner";

const Loader = ({ isLoading }) => (
  <MagnifyingGlass
    visible={isLoading}
    width="160"
    height="160"
    ariaLabel="MagnifyingGlass-loading"
    wrapperClass={scss.loader}
    glassColor="#c0efff"
    color="#3a3ab7"
  />
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
