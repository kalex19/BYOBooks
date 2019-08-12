const books = require('../../../data/books');
const reviews = require('../../../data/reviews');

const seedReview = (knex,review) => {
  return knex('books').where("id", review.book_id).first()
  .then((book) => {
    return knex('reviews').insert({
      book_id: book.id,
      review: review.review,
      stars: review.stars
    })
  })
};

exports.seed = function(knex) {
  return knex("books").del()
  .then(() => {
    return knex("reviews").del();
  })
  .then(async () => {
    await knex.raw("TRUNCATE TABLE reviews RESTART IDENTITY CASCADE");
    await knex.raw("TRUNCATE TABLE books RESTART IDENTITY CASCADE");
  })
  .then(() => {
    return knex('books').insert(books)
  })
  .then(() => {
    let reviewPromises = []
    reviews.forEach(review => {
      reviewPromises.push(seedReview(knex, review))
    })
    return Promise.all(reviewPromises)
  })
  .then(() => console.log('Seeding complete!'))
  .catch(error => console.log(`Error seeding data: ${error}`))
};

