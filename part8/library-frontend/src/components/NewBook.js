import React, { useState } from 'react';
import { useApolloClient, useMutation, useSubscription } from '@apollo/client';
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const client = useApolloClient();

  const [addBook] = useMutation(ADD_BOOK, {
    update: (store, response) => {
      updateCacheWith(response.data.addBook);
    },
  });

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, obj) => set.map((b) => b.id).includes(obj.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });

      const authorsInStore = client.readQuery({ query: ALL_AUTHORS });

      if (!includedIn(authorsInStore.allAuthors, addedBook.author)) {
        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            allAuthors: authorsInStore.allAuthors.concat({
              ...addedBook.author,
            }),
          },
        });
      } else {
        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            allAuthors: authorsInStore.allAuthors.map((a) =>
              a.id === addedBook.author.id
                ? { ...a, bookCount: a.bookCount + 1 }
                : a
            ),
          },
        });
      }
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      updateCacheWith(addedBook);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({ variables: { title, author, published: +published, genres } });

    setTitle('');
    setPublished('');
    setAuhtor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
