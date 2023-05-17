import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';
import { Wrap, GalleryList } from './ImageGallery.styled';

export const Gallery = ({ hits }) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(prev => !prev);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  return (
    <Wrap>
      <GalleryList>
        {hits &&
          hits.map(({ id, webformatURL, tags, largeImageURL }) => (
            <GalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
              openModal={toggleModal}
            />
          ))}
      </GalleryList>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </Wrap>
  );
};

Gallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
