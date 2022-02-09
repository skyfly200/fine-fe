import { Artwork } from '../types'
import { getArrayWithSequence } from '../utils'

let num: number = 0
export const solids: Artwork[] = Array.from({ length: 100 }, (_, i) => i + 1).map((i, index) => {
  num = num > 9 ? num - 9 : num + 1
  return {
    id: `solid-${i}`,
    minted: true,
    name: `SOLID #${i}`,
    artist: { slug: { current: 'far', _type: 'slug' } },
    project: { slug: { current: 'solids', _type: 'slug' }, name: 'Solids' },
    image: {
      src: `https://res.cloudinary.com/dhrwv7wvb/image/upload/v1641324878/fine/solids-${num}_fine.png`,
      alt: `solid-${num}`
    },
    attributes: [
      { title: 'Base', description: 'Metacity' },
      { title: 'Type of Painting', description: ' Abstraction' },
      { title: 'Augmentation Type', description: ' Landscape' },
      { title: 'Residual Style', description: 'Still-Life' },
      { title: 'Base Speed', description: 0.06 },
      { title: 'Noise Scale', description: 4.2 },
      { title: 'Fluidity', description: ' Medium' },
      { title: 'Body', description: ' Heavy' }
    ],
    size: {
      height: 400,
      width: 400
    },
    about: [
      'In efficitur arcu et urna efficitur, non placerat mi dignissim. Donec eget ante ut enim auctor sollicitudin at eu lectus. Aenean finibus massa lectus, vel suscipit lectus dictum vel. Etiam eu eros dui. Nullam at ullamcorper odio. Sed eu cursus est. Etiam elementum lectus sed justo tincidunt, eget gravida mi vulputate.'
    ],
    type: 'glb',
    src: `/solids/${i}.glb`
  }
})

export const dummy: Artwork[] = getArrayWithSequence(30, [1, 2, 3]).map((i, index) => ({
  id: `SQRANDTR-${index}`,
  minted: true,
  name: `SQR&TR-${index}`,
  artist: { slug: { current: 'cool-artist', _type: 'slug' } },
  project: {
    slug: { current: 'squares-and-triagles', _type: 'slug' },
    name: 'Squares and Triangles'
  },
  image: {
    src: `https://res.cloudinary.com/dhrwv7wvb/image/upload/v1642157278/fine/adamFerris-${i}.png`
  },
  attributes: [
    { title: 'Base', description: 'Metacity' },
    { title: 'Type of Painting', description: ' Abstraction' },
    { title: 'Augmentation Type', description: ' Landscape' },
    { title: 'Residual Style', description: 'Still-Life' },
    { title: 'Base Speed', description: 0.06 },
    { title: 'Noise Scale', description: 4.2 },
    { title: 'Fluidity', description: ' Medium' },
    { title: 'Body', description: ' Heavy' }
  ],
  size: {
    height: 400,
    width: 400
  },
  about: [
    'In efficitur arcu et urna efficitur, non placerat mi dignissim. Donec eget ante ut enim auctor sollicitudin at eu lectus. Aenean finibus massa lectus, vel suscipit lectus dictum vel. Etiam eu eros dui. Nullam at ullamcorper odio. Sed eu cursus est. Etiam elementum lectus sed justo tincidunt, eget gravida mi vulputate.'
  ],
  type: 'p5',
  src: `/solids/${i}.glb`
}))

const artworks: Artwork[] = [...solids, ...dummy]

export default artworks
