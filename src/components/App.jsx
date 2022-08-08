import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'components/Button/Button';
import * as ImageService from 'services/image-service';
import Searchbar from 'components/Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query !== '' || page !== 1) {
      const getImages = async (page, query) => {
        setIsLoading(true);
        await ImageService.getImages(page, query).then(
          ({ hits, totalHits }) => {
            setImages(images => [...images, ...hits]);
            setIsVisible(page < Math.ceil(totalHits / 12));
          }
        );
        setIsLoading(false);
      };
      getImages(page, query);
    }
  }, [page, query]);

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const handleFormSubmit = text => {
    let cleanText = text.trim().toLowerCase();
    if (cleanText === '' || cleanText === query) return;
    setQuery(cleanText);
    setImages([]);
    setPage(1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(prev => !prev);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  return (
    <div className="App">
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleFormSubmit} />

      {query.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}

      {isVisible && <Button onClick={onLoadMore} />}
    </div>
  );
};
