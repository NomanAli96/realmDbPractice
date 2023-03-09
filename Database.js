
import Realm from 'realm';

// Declare Book Schema
class BookSchema extends Realm.Object {}
BookSchema.schema = {
  name: 'Book',
  properties: {
    title: 'string',
    pages: 'int',
    edition: 'int?',
    author: 'Author?',
  },
};

// Author schema
class AuthorSchema extends Realm.Object {}
AuthorSchema.schema = {
  name: 'Author',
  primaryKey: 'id',
  properties: {
    id: 'int',
    firstName: 'string',
    lastName: 'string',
  },
};

// Create realm
let realm = new Realm({schema: [BookSchema, AuthorSchema], schemaVersion: 4});

// Functions
// Return all books
let getAllBooks = () => {
  return realm.objects('Book');
};

// Add a single book using parameters  author: _author
let addBook = (_title, _pages, _edition = null) => {
  realm.write(() => {
    const book = realm.create('Book', {
      title: _title,
      pages: _pages,
      edition: _edition,
    });
  });
};

let deletebyEdition = selectedBook => {
  realm.write(() => {
    const allBooks = getAllBooks();
    const filteredBook = allBooks.filter(
      bookEdition => bookEdition.edition === selectedBook.edition,
    );
    realm.delete(filteredBook);
  });
};
// Remove all books from Realm database
let deleteAllBooks = () => {
  realm.write(() => {
    realm.delete(getAllBooks());
  });
};

// Update all books that have a null value as edition and update it to 1
let updateAllBookEditions = () => {
  realm.write(() => {
    let books = getAllBooks();
    books.map((item, index) => {
      item.edition = Math.floor(Math.random() * 500);
    });
  });
};

// Get all books with more than 400 pages using .filtered()
let getBigBooks = () => {
  return realm.objects('Book').filtered('pages > 400');
};

// Get all authors
let getAllAuthors = () => {
  return realm.objects('Author');
};

// Add a single author using parameters
let addAuthor = (_firstName, _lastName) => {
  realm.write(() => {
    let _id = 0;
    if (getAllAuthors().length > 0) _id = realm.objects('Author').max('id') + 1;

    const book = realm.create('Author', {
      id: _id,
      firstName: _firstName,
      lastName: _lastName,
    });
  });
};

// Remove all authors from Realm database
let deleteAllAuthors = () => {
  realm.write(() => {
    realm.delete(getAllAuthors());
  });
};

// Get author by id
let getAuthorById = _id => {
  return realm.objects('Author').filtered(`id = ${_id}`);
};

// Exports
// Export the realm so other files can access it
export default realm;

// Export other functions so other files can access it
export {
  getAllBooks,
  addBook,
  deleteAllBooks,
  updateAllBookEditions,
  getBigBooks,
  getAllAuthors,
  addAuthor,
  getAuthorById,
  deleteAllAuthors,
  deletebyEdition,
};
