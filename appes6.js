class Book {
  constructor(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
//  Create tr Element
const row = document.createElement('tr');
// insert cols
row.innerHTML = `
 <td>${book.title}</td>
 <td>${book.author}</td>
 <td>${book.isbn}</td>
 <td><a href="#" class="delete">X<a></td>
`;

list.appendChild(row);
  }

  showAlert(message, className) {
    // create div
  const div = document.createElement('div');
  // Add Classes
  div.className =  `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);
  // timeout after 3sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
      }
  }

  clearfields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit',function(e){
  // Get form values
const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;

// Instantiate book
const book = new Book(title, author, isbn);

// Instantiate UI
const ui = new UI();

// validate
if(title === '' || author === '' || isbn === '') {
  // Error alert
 ui.showAlert('please fill in all fields', 'error');
}else {
  // Add book to list
ui.addBookToList(book);

// Show success
ui.showAlert('book added!', 'success')

// Clear fields
ui.clearfields();
}

 e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){

// instantiate UI
const ui = new UI();

// Delete Book
ui.deleteBook(e.target);

// Show Alert message
ui.showAlert('book Removed!', 'success');

e.preventDefault();
});