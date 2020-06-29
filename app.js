let imageID = 1.
let imageURL = `http://localhost:3000/movies/${imageID}`
let upvotesURL = `http://localhost:3000/upvotes`
let reviewsURL = 'http://localhost:3000/reviews'


const $upvoteButton = document.querySelector('#upvote')
const $movieName = document.querySelector('#movie-name');
const $movieImage = document.querySelector('#movie-image');
const $movieUpvotes = document.querySelector('#movie-upvotes');
const $movieReviews = document.querySelector('#movie-reviews');
const $form = document.querySelector('form');

$upvoteButton.addEventListener('click', addUpvote);
$form.addEventListener('submit', submitReview)

fetch(imageURL)
  .then(renderJson)
  .then(renderPage)

function renderJson(response) {
  return response.json()
}

function postFetch(url, body) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
}

function renderPage(movieData) {
  $movieName.textContent = movieData.name;
  $movieImage.src = movieData.image_url;
  $movieUpvotes.textContent = movieData.upvotes_count;
  movieData.reviews.forEach(review => {
    createReviewLi(review.content)
  })
}

function addUpvote(event) {
  $movieUpvotes.textContent = +$movieUpvotes.textContent + 1;
  postFetch(upvotesURL, { upvote: { movie_id: imageID } })
}

function submitReview(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const content = formData.get('content')
  createReviewLi(content)
  postFetch(reviewsURL, { review: { content } })
  event.target.reset();
}

function createReviewLi(review) {
  const $li = document.createElement('li');
  $li.textContent = review;
  $movieReviews.append($li);
}