let bookList = [];

// Add book function
function addBook() {
  // Get the form values
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
  const isbn = document.getElementById("isbn").value;

  // Create a new book object
  const book = {
    title,
    author,
    category,
    isbn,
  };

  // Add the book to the book list
  bookList.push(book);

  // Clear the form values
  document.getElementById("bookTitle").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
  document.getElementById("isbn").value = "";

  // Update the book table
  updateBookTable();
}

// Remove all books function
function removeBook() {
  bookList = [];
  updateBookTable();
}

// Search book function
function searchBook() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredBookList = bookList.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm) ||
      book.isbn.toLowerCase().includes(searchTerm)
    );
  });
  updateBookTable(filteredBookList);
}

// Update the book table function
function updateBookTable(bookListToUpdate = bookList) {
  const bookTableBody = document.getElementById("bookList");
  bookTableBody.innerHTML = "";

  bookListToUpdate.forEach((book) => {
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.isbn}</td>
    `;
    bookTableBody.appendChild(tableRow);
  });
}

// Initialize the book table
updateBookTable();
