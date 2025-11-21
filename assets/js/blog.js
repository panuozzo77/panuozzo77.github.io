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
            <div style="margin-bottom:16px;">${postTags}</div>
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

document.addEventListener('DOMContentLoaded', function () {
  const topicButtons = document.querySelectorAll('.topic-button');
  const feedWrappers = document.querySelectorAll('.feed-wrapper');
  const storageKey = 'selectedTopic';

  function showFeed(topicId) {
    // Hide all feeds
    feedWrappers.forEach(wrapper => {
      wrapper.style.display = 'none';
    });
    // Deactivate all buttons
    topicButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Show the selected feed and activate the button
    const feedToShow = document.getElementById(`feed-${topicId}`);
    const buttonToActivate = document.querySelector(`.topic-button[data-topic="${topicId}"]`);
    
    if (feedToShow && buttonToActivate) {
      feedToShow.style.display = 'block';
      buttonToActivate.classList.add('active');
    }
  }

  if (topicButtons.length > 0) {
    // Check for a saved topic in sessionStorage
    const savedTopic = sessionStorage.getItem(storageKey);

    if (savedTopic) {
      showFeed(savedTopic);
    } else {
      // Show the first feed by default if nothing is saved
      const firstTopic = topicButtons[0].dataset.topic;
      showFeed(firstTopic);
    }

    topicButtons.forEach(button => {
      button.addEventListener('click', function () {
        const topic = this.dataset.topic;
        sessionStorage.setItem(storageKey, topic); // Save the selected topic
        showFeed(topic);
      });
    });
  }
});

// Drag-to-scroll for the topic selector
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.topic-selector');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active-drag');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active-drag');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active-drag');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
});