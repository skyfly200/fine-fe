import { Artist } from '../types'

export const Far: Artist = {
  id: 'far',
  slug: 'far',
  name: 'Far',
  bio: [
    'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
    'Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
    'Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros. Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla.',
    'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
  ],
  socialNetworks: {
    discord: { url: 'discord.com' },
    instagram: { url: 'instagram.com' },
    twitter: { url: 'twitter.com' }
  },
  image: {
    src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640618962/fine/dospunk_ypftd5.png',
    alt: 'far-avatar',
    width: 400,
    height: 400
  }
}

export const AdamFerris: Artist = {
  id: 'adamFerris',
  slug: 'adam-ferris',
  name: 'Adam Ferris',
  bio: [
    'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
  ],
  socialNetworks: {
    discord: {},
    instagram: { url: 'instagram.com' },
    twitter: { url: 'twitter.com' }
  },
  image: {
    src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1642505564/fine/Screenshot_2022-01-11_at_19.58.08_cznhct.png',
    alt: 'adam-ferris-avatar',
    width: 857,
    height: 871
  }
}

const artists: Artist[] = [Far, AdamFerris]

export default artists
