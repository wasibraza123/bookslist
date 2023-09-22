import React, { useState, useEffect } from 'react';
import './Booklist.css';

function Booklist(){
    
    const [books, setBooks] =useState([]);  
    const [newBook, setNewBook] = useState({ author: '', title: '', year: '' });


    useEffect (()=> {

        fetchBooks();
    },[]);

    const fetchBooks=()=>{
        fetch ('http://192.168.3.48:8080/books')
        .then ((response) => {
            if (!response.ok){
                throw new Error ("Network was not ok");
            }
            return response.json();
        })

        .then((data)=> {
            setBooks(data);
        })
        .catch((error)=> {
            console.error("Error fetching data:", error);
        });
    };

    const handleAddBook = () => {
        fetch('http://192.168.3.48:8080/books/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network was not ok");
        }
        return response.json();
      })
      .then(() => {
        fetchBooks();
        setNewBook({ author: '', title: '' });
      })
      .catch((error) => {
        console.error('Error adding book:', error);
      });
  };

    return (
        <div>
          <h2>Book List</h2>
          <div className="booklist-container">
          
          <table className='book-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Author</th>
                <th>Title</th>
                <th>Year</th>

              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.author}</td>
                  <td>{book.title}</td>
                  <td>{book.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-book-form">
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
           <input
            type="text"
            placeholder="Year"
            value={newBook.year}
            onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
          />
          <button onClick={handleAddBook} className='add-button'>Add Book</button>
          </div>
          </div>
        </div>
      );
              }

export default Booklist;