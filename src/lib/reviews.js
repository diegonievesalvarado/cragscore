const KEY = "cragscore_reviews_v1";

export function loadReviews() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReviews(reviews) {
  localStorage.setItem(KEY, JSON.stringify(reviews));
}

export function getReviewsForGym(gymId) {
  return loadReviews().filter((r) => r.gymId === gymId);
}

export function addReview(review) {
  const reviews = loadReviews();
  reviews.unshift(review);
  saveReviews(reviews);
}