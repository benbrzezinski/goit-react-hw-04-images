import { useState, useEffect } from "react";
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

const App = () => {
  const PER_PAGE = 12;
  const [searchQuery, setSearchQuery] = useState("");
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [areThereMorePhotos, setAreThereMorePhotos] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isInitialMount) {
      (async () => {
        try {
          setIsLoading(true);

          const { hits: photos, totalHits: totalPhotos } =
            await Api.fetchPhotosByQuery(searchQuery, page, PER_PAGE);

          if (!totalPhotos) {
            setImages([]);
            setAreThereMorePhotos(false);

            return toast.error("No photos found 🔍");
          }

          const areThereMorePhotos = Math.ceil(totalPhotos / PER_PAGE) > page;
          setAreThereMorePhotos(areThereMorePhotos);

          if (page === 1) {
            setImages(photos);
            setTimeout(
              () => window.scrollTo({ top: 0, behavior: "smooth" }),
              0
            );
          }

          if (page > 1) {
            setImages(images => [...images, ...photos]);
            setTimeout(
              () => window.scrollBy({ top: 500, behavior: "smooth" }),
              0
            );
          }
        } catch (err) {
          console.error(err.stack);
        } finally {
          setIsLoading(false);
        }
      })();
    } else {
      setIsInitialMount(false);
    }
  }, [searchQuery, page, isInitialMount]);

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const searcher = form.elements.searcher.value;

    setSearchQuery(searcher.toLowerCase().trim());
    setPage(1);
  };

  const getNextPage = () => {
    setPage(page + 1);
  };

  const openModal = e => {
    const largeImageURL = e.currentTarget.dataset.src;
    const tags = e.currentTarget.getAttribute("alt");

    disableBodyScroll(document.body);
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setIsModalOpen(true);
  };

  const closeModalOnClick = e => {
    if (e.currentTarget === e.target) {
      enableBodyScroll(document.body);
      setLargeImageURL("");
      setTags("");
      setIsModalOpen(false);
    }
  };

  const closeModalOnEsc = e => {
    if (e.code === "Escape") {
      enableBodyScroll(document.body);
      setLargeImageURL("");
      setTags("");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery>
        <ImageGalleryItem images={images} openModal={openModal} />
      </ImageGallery>
      {areThereMorePhotos && <Button getNextPage={getNextPage} />}
      <Modal
        largeImageURL={largeImageURL}
        tags={tags}
        isModalOpen={isModalOpen}
        closeModalOnClick={closeModalOnClick}
        closeModalOnEsc={closeModalOnEsc}
      />
      <Loader isLoading={isLoading} />
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
};

export default App;
