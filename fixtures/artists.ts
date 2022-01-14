import { Artist } from '../types'

export const Far: Artist = {
  id: 'far',
  name: 'Far',
  bio: [
    'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
  ],
  image: {
    src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640618962/fine/dospunk_ypftd5.png',
    alt: 'far-avatar',
    width: 400,
    height: 400
  }
}
export const AdamFerris: Artist = {
  id: 'adamFerris',
  name: 'Adam Ferris',
  bio: [
    'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
  ],
  image: {
    src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1640618962/fine/dospunk_ypftd5.png',
    alt: 'adam-ferris-avatar',
    width: 400,
    height: 400
  }
}

const artists: Artist[] = [Far, AdamFerris]

export default artists
