const express = require('express');
//import express
const app = express();
//use express
const environment = process.env.NODE_ENV || 'development';
//set environement to the node environment or developement in migrations
const configuration = require('./knexfile')[environment];
//config the environment by using the knexfile environment
const database = require('knex')(configuration);
//use knex and the config aka knex environment
const cors = require('cors');
//import cors
const port = process.env.PORT || 3000;
//set the port to the port default env or 3000

app.use(express.json());
//use express in the app
app.use(cors());
//use cors
app.set('port', port);
//set the port

app.listen(app.get('port'), () => {
	console.log(`App is running on http://localhost/${app.get('port')}.`);
});
//listen for the port, get the port, and console log which port the app is running on

app.get('/', (req, res) => {
	res.status(200).json('TEST');
});
//get the root route and print 'TEST' when the request is fulfilled

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

//get that data at this route (/api/v1/books) in the books database, select it, .then the promise or catch it. If the promise returns data => request fulfilled otherwise the data could not be found and a 404 is returned. If the promise fails, a 500 server error is returned.

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

//get that data at this route (/api/v1/books/:id) in the books database, select it, .then the promise or catch it. If the promise returns data => request fulfilled otherwise the data could not be found and a 404 is returned. If the promise fails, a 500 server error is returned.

app.get('/api/v1/reviews', (req, res) => {
	database('reviews')
		.select()
		.then(reviews => {
			reviews.length ? res.status(200).json(reviews) : res.status(404).json({ error: 'No review data exists.' });
		})
		.catch(error => res.status(500).json({ error }));
});

//get that data at this route (/api/v1/reviews) in the reviews database, select it, .then the promise or catch it. If the promise returns data => request fulfilled otherwise the data could not be found and a 404 is returned. If the promise fails, a 500 server error is returned.

app.get('/api/v1/reviews/:id', (req, res) => {
	database('reviews')
		.where('id', req.params.id)
		.select()
		.then(reviews => {
			reviews.length ? res.status(200).json(reviews) : res.status(404).json({ error: 'No data exists for that review id.' });
		})
		.catch(error => res.status(500).json({ error }));
});

//get that data at this route (/api/v1/reviews/:id) in the reviews database, select it, .then the promise or catch it. If the promise returns data => request fulfilled otherwise the data could not be found and a 404 is returned. If the promise fails, a 500 server error is returned.

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

//A post request is made to (/api/v1/books) the server. In order to make sure the post has everything the database needs, the required parameters are checked. If it does not contain the correct parameters, a 422 (inprocessable entity) is returned with a message of the required parameters and the missing parameter(s). The post is made to the books database, given an id, and either the promise responds with 201 with the post's new id to show that the entry has been created or catches with a 500 error, the server had an internal issue.

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

//A post request is made to (/api/v1/reviews) the server. In order to make sure the post has everything the database needs, the required parameters are checked. If it does not contain the correct parameters, a 422 (inprocessable entity) is returned with a message of the required parameters and the missing parameter(s). The post is made to the reviews database, given an id, and either the promise responds with 201 with the post's new id to show that the entry has been created or catches with a 500 error, the server had an internal issue.

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

//A request to delete data is made at this route (/api/v1/:table/:id). Depending on the requests' table and id, the server processes the request in the appropraite table and selects the id. It deletes the entry and then returns a promise with either a 404, no entry found for the id in the table, or a 200 successfully deleted message. Otherwise if the promise failed it catches with a 500 internal server error response message.