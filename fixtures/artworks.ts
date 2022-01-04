import { Artwork } from '../types'

export const solids: Artwork[] = Array.from({ length: 30 }, (_, i) => i + 1).map(i => {
  let ni
  if (i < 11) {
    ni = i
  } else {
    ni = i > 20 ? i - 20 : i - 10
  }

  return {
    id: `${i}`,
    minted: true,
    name: 'SLKXN-1',
    artistId: 'far',
    project: { id: '1', name: 'name' },
    image: {
      src: `https://res.cloudinary.com/dhrwv7wvb/image/upload/v1641324878/fine/solid-${ni}_fine.png`
    },
    attributes: {
      Base: 'Metacity',
      ['Type of Painting']: ' Abstraction',
      ['Augmentation Type']: ' Landscape',
      ['Residual Style']: 'Still-Life',
      ['Base Speed']: 0.06,
      ['Noise Scale']: 4.2,
      ['Fluidity']: ' Medium',
      ['Body']: ' Heavy'
    },
    size: {
      height: 400,
      width: 400
    },
    about: [
      'In efficitur arcu et urna efficitur, non placerat mi dignissim. Donec eget ante ut enim auctor sollicitudin at eu lectus. Aenean finibus massa lectus, vel suscipit lectus dictum vel. Etiam eu eros dui. Nullam at ullamcorper odio. Sed eu cursus est. Etiam elementum lectus sed justo tincidunt, eget gravida mi vulputate.'
    ],
    type: 'glb',
    src: `/solids/${ni}.glb`
  }
})

const artworks: Artwork[] = [...solids]

export default artworks
