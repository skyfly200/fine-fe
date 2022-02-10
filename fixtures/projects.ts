import { Project, SanityImage } from '../types'
import { AdamFerris, Far } from './artists'
import { dummy, solids } from './artworks'

const dummyImage: SanityImage = {
  asset: {
    _ref: 'string',
    _type: 'string'
  },
  type: 'image'
}

const projects: Project[] = [
  {
    id: '1',
    _id: '1',
    invocations: 500,
    minted: 250,
    type: 'glb',
    artworks: solids,
    slug: { current: 'solids', _type: 'slug' },
    title: 'Solids',
    body: {},
    projectDetails: { price: 1.2, library: 'three' },
    artist: Far,
    image: dummyImage,
    galleryImages: [dummyImage, dummyImage, dummyImage, dummyImage]
  },
  {
    _id: '2',
    id: '2',
    invocations: 500,
    minted: 250,
    type: 'p5',
    artworks: dummy,
    slug: { current: 'squares-and-triangles', _type: 'slug' },
    title: 'Squares and Triangles',
    body: {},
    projectDetails: { price: 1.2, library: 'three' },
    artist: AdamFerris,
    image: dummyImage,
    galleryImages: [dummyImage, dummyImage, dummyImage, dummyImage]
  }
]

export default projects
