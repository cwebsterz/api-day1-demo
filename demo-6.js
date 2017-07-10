const express = require('express')
const app = express()
const {
  find,
  propEq,
  pathOr,
  filter,
  toLower,
  take,
  compose,
  split,
  head,
  last
} = require('ramda')

const collegeFootballTeams = [
  {
    id: 1,
    university: 'Clemson',
    teamNickname: 'Fighting Tigers',
    conference: 'ACC',
    division: 'Atlantic'
  },
  {
    id: 2,
    university: 'Alabama',
    teamNickname: 'Crimson Tide',
    conference: 'SEC',
    division: 'West'
  },
  {
    id: 3,
    university: 'USC',
    teamNickname: 'Trojans',
    conference: 'Pac-12',
    division: 'South'
  },
  {
    id: 4,
    university: 'UW',
    teamNickname: 'Huskies',
    conference: 'Pac-12',
    division: 'North'
  },
  {
    id: 5,
    university: 'Ohio State',
    teamNickname: 'Buckeyes',
    conference: 'Big Ten',
    division: 'East'
  },
  {
    id: 6,
    university: 'Nebraska',
    teamNickname: 'Cornhuskers',
    conference: 'Big Ten',
    division: 'West'
  },
  {
    id: 7,
    university: 'Oklahoma',
    teamNickname: 'Sooners',
    conference: 'Big 12',
    division: 'None'
  },
  {
    id: 8,
    university: 'Michigan',
    teamNickname: 'Wolverines',
    conference: 'Big Ten',
    division: 'East'
  },
  {
    id: 9,
    university: 'Texas A&M',
    teamNickname: 'Aggies',
    conference: 'SEC',
    division: 'West'
  },
  {
    id: 10,
    university: 'Colorado',
    teamNickname: 'Buffaloes',
    conference: 'Pac-12',
    division: 'South'
  }
]

app.get('/collegeFootballTeams', (req, res) => {
  const filterCriteria = pathOr('None', ['query', 'filter'], req)

  const splitFilter = split(':', filterCriteria)

  const filterName = head(splitFilter)

  const filterValue = last(splitFilter)

  const confFilter = team => team[filterName] === filterValue
  if (filterValue != 'None') {
    const filterResults = compose(filter(confFilter), collegeFootballTeams)
    res.send(filterResults)
  } else {
    res.send(collegeFootballTeams)
  }
})

app.get('/collegeFootballTeams/:teamId', (req, res) => {
  res.send(find(propEq('id', Number(req.params.teamId)), collegeFootballTeams))
})

app.listen(3000, () => {
  console.log('app listening on port')
})
