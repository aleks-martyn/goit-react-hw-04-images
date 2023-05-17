import { useState, useEffect } from 'react';
//import { Searchbar } from './Searchbar';
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


  return (
    <Container>
      <Wrap></Wrap>
    </Container>
  );
};
