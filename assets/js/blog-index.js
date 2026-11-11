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

    // "2026-11-08" -> "Nov 08, 2026" (stesso formato di Jekyll "%b %d, %Y")
    function formatDate(iso) {
      const [y, m, d] = iso.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(m, 10) - 1]} ${d}, ${y}`;
    }

    function displayPosts(posts) {
      postsContainer.innerHTML = '';
      if (posts.length > 0) {
        posts.forEach(post => {
          const postTags = post.tags ? post.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('') : '';
          const postElement = `
          <article class="card">
            <div class="post-card-header">
              <h2 class="post-card-title">
                <a href="${post.url}">${post.title}</a>
              </h2>
              ${post.date ? `<p class="post-card-date">${formatDate(post.date)}</p>` : ''}
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