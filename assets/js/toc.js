document.addEventListener('DOMContentLoaded', function () {
    const tocContainer = document.getElementById('toc-container');
    const article = document.querySelector('.prose');

    if (!tocContainer || !article) return;

    const headers = article.querySelectorAll('h1, h2, h3');
    if (headers.length === 0) return;

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headers.forEach((header, index) => {
        const id = header.id || `header-${index}`;
        header.id = id;

        const li = document.createElement('li');
        li.className = `toc-item toc-${header.tagName.toLowerCase()}`;

        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = header.textContent;
        a.className = 'toc-link';

        li.appendChild(a);
        tocList.appendChild(li);
    });

    const title = document.createElement('h4');
    title.textContent = 'Indice';
    title.className = 'toc-title';

    tocContainer.appendChild(title);
    tocContainer.appendChild(tocList);

    // Scroll spy
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    headers.forEach(header => observer.observe(header));
});
