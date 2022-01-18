import { Artwork } from '../types'
import { getArrayWithSequence } from '../utils'

export const solids: Artwork[] = getArrayWithSequence(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map(
  (i, index) => {
    return {
      id: `${i}-${index}`,
      minted: true,
      name: `SLKXN-${index}`,
      artistId: 'far',
      project: { id: '1', name: 'Solids' },
      image: {
        src: `https://res.cloudinary.com/dhrwv7wvb/image/upload/v1641324878/fine/solid-${i}_fine.png`
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
  }
)

export const dummy: Artwork[] = getArrayWithSequence(30, [1, 2, 3]).map((i, index) => ({
  id: `SQRANDTR-${index}`,
  minted: true,
  name: `SQR&TR-${index}`,
  artistId: 'adamFerris',
  project: { id: '2', name: 'Squares and Triangles' },
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
  type: 'iframe',
  src: `/solids/${i}.glb`
}))

const artworks: Artwork[] = [...solids, ...dummy]

export default artworks
