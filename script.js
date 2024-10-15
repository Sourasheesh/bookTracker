document.getElementById('search-btn').addEventListener('click', function () {
    const query = document.getElementById('search-box').value;
    fetchBooks(query);
  });
  
  async function fetchBooks(query) {
    try {
      const response = await fetch(`http://localhost:3000/api/books?q=${query}`);
      const data = await response.json();
      displayBooks(data.items);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
  
  function displayBooks(books) {
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = ''; // Clear previous results
  
    books.forEach(book => {
      const bookItem = document.createElement('li');
      
      // Create image and title
      const bookImage = document.createElement('img');
      bookImage.src = book.volumeInfo.imageLinks?.thumbnail || 'default-image.jpg';
      const bookTitle = document.createElement('h3');
      bookTitle.textContent = book.volumeInfo.title;
  
      // Add click event to the image to display details in modal
      bookImage.addEventListener('click', () => {
        showBookDetails(book);
      });
  
      // Create "Add to TBR" button
      const addToTBRButton = document.createElement('button');
      addToTBRButton.textContent = 'Add to TBR';
      addToTBRButton.className = 'add-to-tbr-btn';
      addToTBRButton.addEventListener('click', () => {
        addToTBR(book);
      });
  
      // Append items
      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookTitle);
      bookItem.appendChild(addToTBRButton); // Add the TBR button to the book item
      recommendationsList.appendChild(bookItem);
    });
  }
  
  function showBookDetails(book) {
    const modal = document.getElementById('book-modal');
    const modalContent = document.getElementById('book-details');
  
    // Populate the modal with book details
    modalContent.innerHTML = `
      <h2>${book.volumeInfo.title}</h2>
      <img src="${book.volumeInfo.imageLinks?.thumbnail || 'default-image.jpg'}" alt="${book.volumeInfo.title}">
      <p><strong>Author(s):</strong> ${book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
      <p><strong>Publisher:</strong> ${book.volumeInfo.publisher || 'N/A'}</p>
      <p><strong>Published Date:</strong> ${book.volumeInfo.publishedDate || 'N/A'}</p>
      <p><strong>Description:</strong> ${book.volumeInfo.description || 'No description available.'}</p>
    `;
  
    // Show the modal
    modal.style.display = 'block';
  }
  
  // Close the modal when the user clicks on <span> (x)
  const closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', function () {
    const modal = document.getElementById('book-modal');
    modal.style.display = 'none';
  });
  
  // Close the modal when the user clicks anywhere outside of the modal
  window.addEventListener('click', function (event) {
    const modal = document.getElementById('book-modal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
  
  // Function to add the book to the TBR list
  function addToTBR(book) {
    let tbrList = JSON.parse(localStorage.getItem('tbrList')) || []; // Use localStorage to save the TBR list
  
    // Add the book to the list if it's not already there
    if (!tbrList.some(item => item.id === book.id)) {
      tbrList.push({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        image: book.volumeInfo.imageLinks?.thumbnail
      });
  
      // Update localStorage
      localStorage.setItem('tbrList', JSON.stringify(tbrList));
  
      alert(`${book.volumeInfo.title} has been added to your To Be Read list!`);
    } else {
      alert('This book is already in your To Be Read list.');
    }
  }
  