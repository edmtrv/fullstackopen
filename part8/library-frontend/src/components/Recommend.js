import { useQuery, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ALL_BOOKS, CURRENT_USER } from '../queries';
import BooksTable from './BooksTable';

const Recommend = (props) => {
  const { data: user } = useQuery(CURRENT_USER);
  const [books, setBooks] = useState(null);
  const [
    allBooks,
    { loading: loadingBooks, data: returnedBooks },
  ] = useLazyQuery(ALL_BOOKS, { fetchPolicy: 'cache-and-network' });

  useEffect(() => {
    if (user && user.me) {
      allBooks({ variables: { genre: user.me.favoriteGenre } });
    }

    if (returnedBooks) {
      setBooks(returnedBooks.allBooks);
    }
  }, [user, returnedBooks]);

  if (!props.show) {
    return null;
  }

  console.log(returnedBooks);

  if (loadingBooks) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <BooksTable books={books} genre={user.me.favoriteGenre} />
    </div>
  );
};

export default Recommend;
