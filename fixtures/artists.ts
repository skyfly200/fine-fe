import { Artist } from '../types'

export const Far: Artist = {
  _id: 'far',
  id: 'far',
  slug: {
    current: 'far',
    _type: 'slug'
  },
  name: 'Far',
  body: {},
  bioSummary: {},
  discord: 'discord.com',
  instagram: 'instagram.com',
  twitter: 'twitter.com',
  image: {
    asset: {
      _ref: 'string',
      _type: 'string'
    },
    type: 'image'
  }
}

export const AdamFerris: Artist = {
  _id: 'cool-artist',
  id: 'cool-artist',
  slug: {
    current: 'cool-artist',
    _type: 'slug'
  },
  name: 'cool artist ',
  body: {},
  bioSummary: {},
  instagram: 'instagram.com',
  twitter: 'twitter.com',
  image: {
    asset: {
      _ref: 'string',
      _type: 'string'
    },
    type: 'image'
  }
}

const artists = [Far, AdamFerris]

export default artists
