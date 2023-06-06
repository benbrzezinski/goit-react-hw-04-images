import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGallery/ImageGalleryItem";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
import Api from "../utils/services/api";

class App extends Component {
  PER_PAGE = 12;

  state = {
    searchQuery: "",
    largeImageURL: "",
    tags: "",
    page: 1,
    images: [],
    status: false,
    areThereMorePhotos: false,
    isModalOpen: false,
    isLoading: false,
  };

  async componentDidUpdate() {
    const { searchQuery, page, status } = this.state;

    if (status) {
      try {
        this.setState({ status: false, isLoading: true });

        const { hits: photos, totalHits: totalPhotos } =
          await Api.fetchPhotosByQuery(searchQuery, page, this.PER_PAGE);

        if (!totalPhotos) {
          this.setState({
            images: [],
            areThereMorePhotos: false,
          });

          return toast.error("No photos found 🔍");
        }

        const areThereMorePhotos =
          Math.ceil(totalPhotos / this.PER_PAGE) > page;
        this.setState({ areThereMorePhotos });

        if (page === 1) {
          this.setState({ images: photos });
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
        }

        if (page > 1) {
          this.setState(({ images }) => ({
            images: [...images, ...photos],
          }));

          setTimeout(
            () => window.scrollBy({ top: 500, behavior: "smooth" }),
            0
          );
        }
      } catch (err) {
        console.error(err.stack);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const searcher = form.elements.searcher.value;

    this.setState({
      searchQuery: searcher.toLowerCase().trim(),
      page: 1,
      status: true,
    });
  };

  getNextPage = () => {
    this.setState(({ page }) => ({ page: page + 1, status: true }));
  };

  openModal = e => {
    const largeImageURL = e.currentTarget.dataset.src;
    const tags = e.currentTarget.getAttribute("alt");

    disableBodyScroll(document.body);
    this.setState({ largeImageURL, tags, isModalOpen: true });
  };

  closeModalOnClick = e => {
    if (e.currentTarget === e.target) {
      enableBodyScroll(document.body);
      this.setState({ largeImageURL: "", tags: "", isModalOpen: false });
    }
  };

  closeModalOnEsc = e => {
    if (e.code === "Escape") {
      enableBodyScroll(document.body);
      this.setState({ largeImageURL: "", tags: "", isModalOpen: false });
    }
  };

  render() {
    const {
      largeImageURL,
      tags,
      images,
      areThereMorePhotos,
      isModalOpen,
      isLoading,
    } = this.state;

    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery>
          <ImageGalleryItem images={images} openModal={this.openModal} />
        </ImageGallery>
        {areThereMorePhotos && <Button getNextPage={this.getNextPage} />}
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          isModalOpen={isModalOpen}
          closeModalOnClick={this.closeModalOnClick}
          closeModalOnEsc={this.closeModalOnEsc}
        />
        <Loader isLoading={isLoading} />
        <ToastContainer autoClose={3000} theme="colored" />
      </>
    );
  }
}

export default App;
