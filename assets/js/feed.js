---
---
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

  function getTopicFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('topic');
  }

  function topicExists(topicId) {
    return !!document.querySelector(`.topic-button[data-topic="${topicId}"]`);
  }

  if (topicButtons.length > 0) {
    let topicToLoad = null;
    const urlTopic = getTopicFromURL();

    // Priority 1: URL parameter
    if (urlTopic && topicExists(urlTopic)) {
      topicToLoad = urlTopic;
      sessionStorage.setItem(storageKey, topicToLoad);
      // Clean the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    } else {
      // Priority 2: Session Storage
      const savedTopic = sessionStorage.getItem(storageKey);
      if (savedTopic && topicExists(savedTopic)) {
        topicToLoad = savedTopic;
      } else {
        // Priority 3: Default (first topic)
        topicToLoad = topicButtons[0].dataset.topic;
      }
    }
    
    showFeed(topicToLoad);

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