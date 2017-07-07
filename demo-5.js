const express = require('express')
const app = express()
const {
	find,
	propEq,
	pathOr,
	filter,
	toLower,
	take,
	compose
} = require('ramda')

const albums = [
	{
		id: 1,
		title: 'The Devil and God Are Raging Inside Me',
		artist: 'Brand New',
		genre: 'rock'
	},
	{ id: 2, title: 'Lateralus', artist: 'Tool', genre: 'metal' },
	{
		id: 3,
		title: 'This is a Long Drive for Someone with Nothing to Think About',
		artist: 'Modest Mouse',
		genre: 'indie'
	},
	{
		id: 4,
		title: 'Songs for the Deaf',
		artist: 'Queens of the Stone Age',
		genre: 'rock'
	},
	{
		id: 5,
		title: 'Transatlanticism',
		artist: 'Death Cab for Cutie',
		genre: 'indie'
	},
	{
		id: 6,
		title: 'Grace',
		artist: 'Jeff Buckley',
		genre: 'rock'
	},
	{
		id: 7,
		title: 'Favourite Worst Nightmare',
		artist: 'Arctic Monkeys',
		genre: 'rock'
	},
	{
		id: 8,
		title: 'Teens of Denial',
		artist: 'Carseat Headrest',
		genre: 'indie'
	},
	{
		id: 9,
		title: 'Metallica',
		artist: 'Metallica',
		genre: 'metal'
	},
	{
		id: 10,
		title: 'Pretty Hate Machine',
		artist: 'Nine Inch Nails',
		genre: 'rock'
	},
	{
		id: 11,
		title: 'And The War Came',
		artist: 'Shakey Graves',
		genre: 'indie'
	},
	{
		id: 12,
		title: 'In The Mountain In The Cloud',
		artist: 'Portugal. The Man',
		genre: 'indie'
	}
]

app.get('/albums', (req, res) => {
	const filterCriteria = pathOr('None', ['query', 'genre'], req)
	const limit = pathOr(10, ['query', 'limit'], req)

	if (filterCriteria != 'None') {
		const albumFilter = a => a.genre === filterCriteria
		const composeResult = compose(take(limit), filter(albumFilter))(albums)

		res.send(composeResult)
	} else {
		res.send(albums)
	}
})

app.get('/albums/:albumId', (req, res) => {
	res.send(find(propEq('id', Number(req.params.albumId)), albums))
	console.log(albumId)
})

app.listen(3000, () => {
	console.log('app listening on port')
})
