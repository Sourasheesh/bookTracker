// Load the TBR list when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTBRList();
  });
  
  function loadTBRList() {
    const tbrList = JSON.parse(localStorage.getItem('tbrList')) || [];
    const tbrListContainer = document.getElementById('tbr-list');
    
    tbrListContainer.innerHTML = ''; // Clear existing list
    
    if (tbrList.length === 0) {
      tbrListContainer.innerHTML = '<p>Your To Be Read list is empty.</p>';
    } else {
      tbrList.forEach(book => {
        const listItem = document.createElement('li');
        
        // Book Image
        const bookImage = document.createElement('img');
        bookImage.src = book.image || 'default-image.jpg';
        listItem.appendChild(bookImage);
  
        // Book Title
        const bookTitle = document.createElement('h3');
        bookTitle.textContent = book.title;
        listItem.appendChild(bookTitle);
  
        // Remove Button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          removeFromTBR(book.id);
        });
        listItem.appendChild(removeButton);
  
        // Append to the list
        tbrListContainer.appendChild(listItem);
      });
    }
  }
  
  function removeFromTBR(bookId) {
    let tbrList = JSON.parse(localStorage.getItem('tbrList')) || [];
  
    // Filter out the book to remove
    tbrList = tbrList.filter(book => book.id !== bookId);
  
    // Update localStorage with the new list
    localStorage.setItem('tbrList', JSON.stringify(tbrList));
  
    // Reload the TBR list on the page
    loadTBRList();
  }
  