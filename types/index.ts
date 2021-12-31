import { ParsedUrlQuery } from 'querystring'

// TODO: update with rich text schema

export interface Img {
  src: string | StaticImageData
  alt?: string
  height?: number
  width?: number
}

export type Size = {
  height: number
  width: number
}

export interface News {
  title: string
  mainImage: SanityImage
  subtitle: string
  publishedAt: string
  body: string[]
  slug: SanitySlug
}

export type EventDetail = {
  title: string
  detail: string
}
export interface Event {
  id: string
  date: string
  title: string
  subtitle?: string
  images: Img[]
  body?: string[]
  dates?: EventDetail[]
  contacts?: EventDetail[]
  locations?: EventDetail[]
}

export type SrcType = 'three' | 'p5'

export type TokenData = {
  tokenId: string
  hash: string
}
export interface Attribute {
  [key: string]: string | number
}
export interface Artwork {
  id: string
  minted: boolean
  name: string
  artistId: string
  attributes: Attribute[]
  previewImg: Img
  about: string[]
  src: SrcType
  tokenData: TokenData
  script: string
  size: Size
  project: Partial<Project>
}

export type Artist = {
  id: string
  name: string
  bio: string[]
  image?: Img
}

export type PartialArtwork = {
  id: string
  previewImg: Img
  name: string
  minted: boolean
  mintedPrice: number
}

export type Project = {
  id: string
  name: string
  total?: number
  artworks?: PartialArtwork[]
  about: string[]
}

export type UpcomingProject = {
  title: string
  artist: Partial<Artist>
  dropDate: string
  overview: string[]
  image: Img
}

export type ToastType = 'success' | 'info' | 'error' | 'warning'

export interface IParams extends ParsedUrlQuery {
  id: string
}

export type SanityAsset = {
  _ref: string
  _type: string
}

export type SanityImage = {
  asset: SanityAsset
  type: string
}

export type SanitySlug = {
  current: string
  _type: string
}
