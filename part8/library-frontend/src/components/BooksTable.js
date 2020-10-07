import React from 'react';

const BooksTable = ({ books, genre }) => {
  return (
    <div>
      {genre === 'all' ? (
        <p>All genres</p>
      ) : (
        <p>
          Books in your favorite genre <strong>{genre}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
