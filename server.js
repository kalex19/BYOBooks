const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const cors = require('cors');
const port = process.env.NODE_ENV || 3000;

app.use(express.json());
app.use(cors());
app.set('port', port);

app.listen(app.get('port'), () => {
	console.log(`App is running on http://localhost/${app.get('port')}.`);
});

app.get('/', (req, res) => {
	res.status(200).json('TEST');
});

app.get('/api/v1/books', (req, res) => {
	database('books')
		.select()
		.then(books => {
			books.length
				? res.status(200).json(books)
				: res.status(404).json({ error: 'No book data exists.' });
		})
		.catch(error => res.status(500).json({ error }));
});

app.get('/api/v1/books/:id', (req, res) => {
	database('books')
		.where('id', req.params.id)
		.select()
		.then(books => {
			books.length
				? res.status(200).json(books)
				: res.status(404).json({ error: 'No data exists for that book id.' });
		})
		.catch(error => res.status(500).json({ error }));
});

app.get('/api/v1/reviews', (req, res) => {
	database('reviews')
		.select()
		.then(reviews => {
			reviews.length ? res.status(200).json(reviews) : res.status(404).json({ error: 'No review data exists.' });
		})
		.catch(error => res.status(500).json({ error }));
});

app.get('/api/v1/reviews/:id', (req, res) => {
	database('reviews')
		.where('id', req.params.id)
		.select()
		.then(reviews => {
			reviews.length ? res.status(200).json(reviews) : res.status(404).json({ error: 'No data exists for that review id.' });
		})
		.catch(error => res.status(500).json({ error }));
});

app.post('/api/v1/books', (req, res) => {
	const book = req.body;

	for (let requiredParameter of [ 'title', 'author', 'year_published', 'genre' ]) {
		if (!book[requiredParameter]) {
			return res.status(422).json({
				error: `Expected format: { title: <String>, author: <String>, year_published: <Number>, genre: <String> }. A "${requiredParameter}" property is missing.`
			});
		}
	}

	database('books')
		.insert(book, 'id')
		.then(book => res.status(201).json({ id: book[0] }))
		.catch(error => res.status(500).json({ error }));
});

app.post('/api/v1/reviews', (req, res) => {
	const review = req.body;

	for (let requiredParameter of [ 'review', 'star', 'book_id' ]) {
		if (!review[requiredParameter]) {
			return res.status(422).json({
				error: `Expected format: { review: <String>, star: <Number>, book_id: <Number> }. A "${requiredParameter}" property is missing.`
			});
		}
	}

	database('reviews')
		.insert(review, 'id')
		.then(review => res.status(201).json({ id: review[0] }))
		.catch(error => res.status(500).json({ error }));
});

app.delete('/api/v1/:table/:id', (req, res) => {
	const { table, id } = req.params;

	database(table)
		.where('id', id)
		.select()
		.del()
		.then(result => {
			!result
				? res.status(404).json(`Nothing found for ${id} in ${table}.`)
				: res.status(200).json('Entry successfully deleted.');
		})
		.catch(error => res.status(500).json({ error }));
});