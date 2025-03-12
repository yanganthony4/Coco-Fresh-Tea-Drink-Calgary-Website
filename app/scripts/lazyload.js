

function setupLazyLoading() {
  const lazyImages = document.querySelectorAll("img.lazy-load");

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Replace placeholder src with actual URL
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver support:
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add("loaded");
    });
  }
}
