import PropTypes from "prop-types";
import scss from "./Searchbar.module.scss";

const Searchbar = ({ handleSubmit }) => (
  <header className={scss.searchFormBox}>
    <form className={scss.searchForm} onSubmit={handleSubmit}>
      <input
        className={scss.searchForm__searcher}
        type="text"
        name="searcher"
        autoComplete="off"
        autoFocus
        placeholder="Search images..."
        required
      />
      <button className={scss.searchForm__btn} type="submit"></button>
    </form>
  </header>
);

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
