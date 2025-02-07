document.addEventListener("DOMContentLoaded", function() {
  const postsContainer = document.getElementById('postsContainer');
  const paginationElement = document.getElementById('pagination');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  let currentPage = 1;
  const postsPerPage = 5;
  if (!postsContainer) {
    console.error("Error: postsContainer not found.");
    return;
  }
  let allPosts = Array.from(postsContainer.getElementsByClassName('post-item'));

  console.log('Found posts:', allPosts.length);

  // Add debug logging for dates
  allPosts.forEach(post => {
    console.log('Post:', post);
    console.log('Post date raw:', post.dataset.date);
    console.log('Parsed date:', new Date(parseInt(post.dataset.date) * 1000));
  });

  // Rest of your code remains the same until updateDisplay()

  function updateDisplay() {
    const filteredPosts = allPosts.filter(post => {
      const keywords = (post.dataset.keywords || "").toLowerCase();
      const searchTerm = searchInput.value.toLowerCase();
      return searchTerm === "" || keywords.includes(searchTerm);
    });
  
    const sortedPosts = filteredPosts.sort((a, b) => {
      const dateA = new Date(parseInt(a.dataset.date) * 1000);
      const dateB = new Date(parseInt(b.dataset.date) * 1000);
      return sortSelect.value === 'newest' ? dateB - dateA : dateA - dateB;
    });
  
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
    currentPage = Math.min(currentPage, totalPages);
  
    // Calculate posts shown on the current page
    const start = (currentPage - 1) * postsPerPage;
    const end = Math.min(start + postsPerPage, sortedPosts.length);
    const postsOnPage = sortedPosts.slice(start, end);
  
    // Update post count display
    const postCountElement = document.getElementById('postCount');
    postCountElement.textContent = `Showing ${postsOnPage.length} of ${filteredPosts.length} posts`;
  
    renderPagination(totalPages);
    renderPosts(sortedPosts, currentPage);
  }

  function renderPosts(posts, page) {
    postsContainer.innerHTML = "";
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    posts.slice(start, end).forEach(post => postsContainer.appendChild(post));
  }

  function renderPagination(totalPages) {
    paginationElement.innerHTML = "";
  
    // Previous Button
    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous">&laquo;</a>`;
    prevLi.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        updateDisplay();
      }
    });
    paginationElement.appendChild(prevLi);
  
    // Numbered Pages
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? "active" : ""}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = i;
        updateDisplay();
      });
      paginationElement.appendChild(li);
    }
  
    // Next Button
    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next">&raquo;</a>`;
    nextLi.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        updateDisplay();
      }
    });
    paginationElement.appendChild(nextLi);
  }



  // Event listeners
  searchInput.addEventListener('input', () => {
    currentPage = 1;
    updateDisplay();
  });

  sortSelect.addEventListener('change', () => {
    currentPage = 1;
    updateDisplay();
  });

  // Initial display
  updateDisplay();
});