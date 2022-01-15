import { Project } from '../types'
import { AdamFerris, Far } from './artists'
import { dummy, solids } from './artworks'

const projects: Project[] = [
  {
    id: '1',
    invocations: 500,
    minted: 250,
    type: 'glb',
    artworks: solids,
    slug: 'solids',
    name: 'Solids',
    about: [
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
    ],
    projectDetails: { price: 1.2, library: 'three' },
    artist: Far,
    image: {
      src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1641324878/fine/solid-10_fine.png'
    }
  },
  {
    id: '2',
    invocations: 500,
    minted: 250,
    type: 'iframe',
    artworks: dummy,
    slug: 'squares-and-triangles',
    name: 'Squares and Triangles',
    about: [
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
    ],
    projectDetails: { price: 1.2, library: 'three' },
    artist: AdamFerris,
    image: {
      src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1639734260/fine/adamFerris-2.jpg'
    }
  }
]

export default projects
