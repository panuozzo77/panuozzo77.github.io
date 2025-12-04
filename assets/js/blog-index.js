---
  ---
  document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const postsContainer = document.getElementById('posts-container');
    const paginationContainer = document.querySelector('.pagination');
    let allPosts = [];
    let initialPostsHTML = postsContainer ? postsContainer.innerHTML : '';

    if (searchInput) {
      // Fetch all posts from search.json
      fetch('{{ "/blog/search.json" | relative_url }}')
        .then(response => response.json())
        .then(data => {
          allPosts = data;
        });

      searchInput.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm.length > 0) {
          // Filter posts
          const filteredPosts = allPosts.filter(post => {
            return (
              post.title.toLowerCase().includes(searchTerm) ||
              post.excerpt.toLowerCase().includes(searchTerm) ||
              post.tags.toLowerCase().includes(searchTerm)
            );
          });

          // Display filtered posts
          displayPosts(filteredPosts);
          if (paginationContainer) paginationContainer.style.display = 'none';
        } else {
          // If search is cleared, show paginated posts
          postsContainer.innerHTML = initialPostsHTML;
          if (paginationContainer) paginationContainer.style.display = 'flex';
        }
      });
    }

    function displayPosts(posts) {
      postsContainer.innerHTML = '';
      if (posts.length > 0) {
        posts.forEach(post => {
          const postTags = post.tags ? post.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('') : '';
          const postElement = `
          <article class="card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
              <h2 style="margin:0;font-size:28px;word-wrap:break-word;hyphens:auto;line-height:1.3">
                <a style="color:var(--text-primary)" href="${post.url}">${post.title}</a>
              </h2>
            </div>
            <p style="margin-bottom:16px;font-size:16px">${post.excerpt}</p>
            <div class="tags-container">${postTags}</div>
            <a class="btn-primary" href="${post.url}">Leggi</a>
          </article>
        `;
          postsContainer.innerHTML += postElement;
        });
      } else {
        postsContainer.innerHTML = '<p>Nessun post trovato.</p>';
      }
    }
  });