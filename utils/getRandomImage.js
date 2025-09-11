// backend/utils/getRandomImage.js
export const getRandomImage = (title, fallback = "education") => {
  const keyword = encodeURIComponent(title || fallback);

  // Unsplash static link so DB stores a stable URL
  return `https://source.unsplash.com/800x600/?${keyword},${fallback},career,job`;
};
