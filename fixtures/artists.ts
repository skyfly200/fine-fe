import { Artist } from '../types'

export const Far: Artist = {
  id: 'far',
  slug: {
    current: 'far',
    _type: 'slug'
  },
  name: 'Far',
  bio: [
    'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
    'Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
    'Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros. Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla.',
    'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
  ],

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
  id: 'adamFerris',
  slug: {
    current: 'adamFerris',
    _type: 'slug'
  },
  name: 'Adam Ferris',
  bio: [
    'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
  ],

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
