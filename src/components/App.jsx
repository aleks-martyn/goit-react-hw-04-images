import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { Gallery } from './ImageGallery';
import imagesAPI from '../services/images-api';
import { LoadMoreBtn } from './Button';
import { Spinner } from './Loader';
import { Container, Wrap } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hits, setHits] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery === '') return;

    setStatus('pending');
    imagesAPI
      .fetchImages(searchQuery, page)
      .then(({ hits, total }) => {
        setHits(prev => [...prev, ...hits]);
        setStatus('resolved');
        setTotal(total);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchQuery, page]);

  const formSubmitHandler = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setTotal(0);
    setError(null);
    setHits([]);
    setStatus('idle');
  };

  const btnClickHandler = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={formSubmitHandler} />
      {status === 'idle' && <h2>Enter a search query.</h2>}
      {status === 'pending' && <Spinner />}
      {status === 'rejected' && <h1>{error.message}</h1>}
      {status === 'resolved' && (
        <Wrap>
          {hits && hits.length === 0 && (
            <h2>Nothing was found for this query.</h2>
          )}
          <Gallery hits={hits} />
          {hits && total / 12 > page && (
            <LoadMoreBtn onClick={btnClickHandler} />
          )}
        </Wrap>
      )}
    </Container>
  );
};
