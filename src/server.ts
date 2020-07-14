import express from 'express';
import morgan from 'morgan';
import { Client } from '@elastic/elasticsearch';

process.on('uncaughtException', console.error);

const app = express();
app.esClient = new Client({ node: 'http://es01:9200' });

app.use(morgan('dev'));

app.get('/changes', (req, res) => {
	// change index
});

app.get('/characters', (req, res) => {
	// character index
});

app.get('/search', (req, res) => {
	const { q } = req.params;

	req.app.esClient.search({
		body: {
			size: 500,
			query: {
				match: {
					'*name': {
						query: q
					}
				}
			}
		}
	});
});

app.use((err, req, res, next) => {
	console.error(err);
	res.sendStatus(500);
});

app.listen(3000, () => console.info('listening on port 3000'));
