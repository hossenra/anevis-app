import React, { useState } from "react";
import "./App.css";

interface Book {
  id: number;
  title: string;
  authorName: string;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: "A Tale of Two Cities",
    authorName: "Charles Dickens",
  },
  {
    id: 2,
    title: "Harry Potter",
    authorName: "J.K. Rowling",
  },
];

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [updateState, setUpdateState] = useState<number>(-1);

  function handleEdit(id: number) {
    setUpdateState(id);
  }

  function handleDelete(id: number) {
    const newBooks = books.filter((book) => book.id !== id);
    setBooks(newBooks);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const idInput = form.elements.namedItem("id") as HTMLInputElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const authorNameInput = form.elements.namedItem(
      "authorName"
    ) as HTMLInputElement;

    const id = parseInt(idInput.value);
    const title = titleInput.value;
    const authorName = authorNameInput.value;

    if (updateState === -1) {
      // Add new book
      const newBook: Book = {
        id,
        title,
        authorName,
      };
      setBooks([...books, newBook]);
    } else {
      // Update existing book
      const updatedBooks = books.map((book) =>
        book.id === updateState ? { ...book, title, authorName } : book
      );
      setBooks(updatedBooks);
      setUpdateState(-1);
    }

    // Clear the form fields
    form.reset();
  }

  return (
    <div className="crud">
      <div>
        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) =>
                updateState === book.id ? (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>
                      <input
                        type="text"
                        name="title"
                        defaultValue={book.title}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="authorName"
                        defaultValue={book.authorName}
                      />
                    </td>
                    <td>
                      <button type="submit">Update</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.authorName}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() => handleEdit(book.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default App;
