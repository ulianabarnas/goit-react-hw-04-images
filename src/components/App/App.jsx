import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "components/Button/Button";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Loader from "components/Loader/Loader";
import Searchbar from "components/Searchbar/Searchbar";
import { AppStyled } from "./App.styles";
import { fetchImages } from "services/api";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    };

    setLoading(true);

    fetchImages(query, page)
    .then(images => {
      const totalPages = Math.ceil(images.totalHits / 12);
      setTotalPages(totalPages);

      if (images.totalHits === 0) {
        return toast.info(
          "No photo with such request."
        );
      };

      if (page >= totalPages) {
        toast.info(
          "Sorry, but we have no more photos for you."
        );
      };

      setImages(prevImages => [...prevImages, ...images.hits]);
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false));
  }, [page, query]);

  const handleSearchbarSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
    setTotalPages(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleSearchbarSubmit}/>
      {loading && <Loader />}
      {error && <p>{error.message}</p>}
      {images.length > 0 && <ImageGallery images={images} />}
      {page < totalPages && <Button onClick={loadMore} />}
      <ToastContainer
        autoClose={4000}
        hideProgressBar
      />
    </AppStyled>
  );
};
