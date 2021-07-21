//Book Constructor
function Book(title,author,isbn) {
  this.title = title;
  this.author = author;
  this.isbn=isbn;
}

// UI constructor

function UI(){}

//Store Constructor
function Store(){}
Store.prototype.getBooks=function(){
  let books;
    if(localStorage.getItem('books')=== null){
      books=[];
    }
    else {
      books = JSON.parse(localStorage.getItem('books'));
     
    }
    return books;
}

Store.prototype.addBook=function(book){

  const store=new Store();
  const books=store.getBooks();
  console.log(books);
  books.push(book);

  localStorage.setItem('books',JSON.stringify(books));
}

Store.prototype.displayBooks=function(book){
  const store=new Store();
  const books=store.getBooks();
    books.forEach(function(book){
        const ui = new UI;
        ui.addBookToList(book);
    });
}

Store.prototype.removeBooks=function(isbn){
  const store=new Store();
  const books=store.getBooks();
    books.forEach(function(book,index){
      if(book.isbn===isbn) {
        books.splice(index,1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books));
  }



UI.prototype.addBookToList=function(book){
  const list=document.getElementById('book-list');
  //Create tr element
  const row= document.createElement('tr');
  //Insert cols
  row.innerHTML=`
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete" id='link' style="color:red;font-weight:900; text-decoration:none;">x</a></td>
  `;

  list.appendChild(row);
}

//Show alert
UI.prototype.showAlert = function(message, className) {
  //Create div
  const div=document.createElement('div');
  //Add classes
  div.className =`alert  ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container=document.querySelector('.container');
  //get form
  const form = document.querySelector('#book-form');

  //Insert alert
  container.insertBefore(div,form);

  //timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();},3000);
  }

  //Delete
  UI.prototype.deleteBook=function(target){
    if(target.className === 'delete'){
       target.parentElement.parentElement.remove();   
     }
  }

//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}

const store=new Store();
document.addEventListener('DOMContentLoaded', store.displayBooks);

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
  
  //Get form values
  const title=document.getElementById('title').value,
  author=document.getElementById('author').value,
  isbn= document.getElementById('isbn').value;

  //Instantiate book
  const book=new Book(title,author,isbn);
 //Instantiate UI
 const ui = new UI();
 const store=new Store();

 //Validate
 if(title=== '' || author ==='' || isbn==='') {
   ui.showAlert('Please fill in all the fields', 'error');
 } else {
   //Add book to list
 ui.addBookToList(book);
 store.addBook(book);

 //Show success
 ui.showAlert('Book Added!', 'success');

 //Clear field
 ui.clearFields();
 }
  e.preventDefault();
});


// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  const ui=new UI();
  const store=new Store();
ui.deleteBook(e.target);
store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
ui.showAlert('Book Removed!','success');
});