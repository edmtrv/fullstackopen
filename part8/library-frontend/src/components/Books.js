import React, { useState } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import BooksTable from './BooksTable';

const Books = (props) => {
  const [genre, setGenre] = useState('all');
  const { loading, data } = useQuery(ALL_BOOKS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  let books = data.allBooks;
  const genres = _.chain(books)
    .map((b) => b.genres)
    .flatten()
    .uniq()
    .value()
    .concat('all');

  if (genre !== 'all') {
    books = books.filter((b) => b.genres.includes(genre));
  }

  return (
    <div>
      <h2>Books</h2>
      <BooksTable books={books} genre={genre} />
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
