import { Project } from '../types'
import { Far } from './artists'

const projects: Project[] = [
  {
    id: '1',
    slug: 'solids',
    name: 'Solids',
    about: [
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.',
      'Praesent eu nibh a dui rutrum imperdiet eget ut tortor. Cras iaculis vehicula fringilla. Donec vestibulum est et nulla accumsan, quis semper metus ullamcorper. Praesent sagittis lorem libero, ac porta nisl tristique sed. Quisque laoreet nec mi eget hendrerit. Nulla sed iaculis est, eu rutrum tortor. Nulla a suscipit eros.'
    ],
    projectDetails: { price: 1.2, library: 'three' },
    artist: Far,
    image: {
      src: 'https://res.cloudinary.com/dhrwv7wvb/image/upload/v1639734260/fine/adamFerris-2_vistmx.jpg'
    }
  }
]

export default projects
