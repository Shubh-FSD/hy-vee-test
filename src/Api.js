import React, { useState } from 'react';

const BookSearchComponent = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Write string');
      return;
    }

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  const handleTitleClick = (title, publishYear) => {
    alert(`Latest publish year of "${title}" is ${publishYear}`);
   
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search term"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {books.length > 0 && (
          <ul>
            {books.map((book) => (
              <li key={book.key}>
                <div onClick={() => handleTitleClick(book.title, book.publish_year)}>
                  {book.title}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookSearchComponent;
