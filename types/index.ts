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
export type EventDate = {
  date: string
  eventName: string
}
export type EventLocation = {
  locationDetail: string
  locationName: string
}
export type EventContact = {
  contactDetail: string
  contactName: string
}
export type SanityGallery = {
  _type: string
  images: SanityImage[]
}
export interface Event {
  id: string
  slug: SanitySlug
  date: string
  title: string
  subtitle?: string
  mainImage: SanityImage
  gallery: SanityGallery
  body?: string[]
  dates?: EventDate[]
  contacts?: EventContact[]
  locations?: EventLocation[]
}

export type SrcType = 'iframe' | 'glb'

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
  attributes: Attribute
  image: Img
  about: string[]
  type: SrcType
  size: Size
  src?: string
  project: Partial<Project>
}

export type Artist = {
  id: string
  name: string
  bio: string[]
  image?: Img
}

export type Project = {
  id: string
  slug: string
  name: string
  about: string[]
  projectDetails: Attribute
  artist: Partial<Artist>
  image: Img
  invocations: number
  minted: number
  type: SrcType
  artworks: Artwork[]
}

export type ProjectDetails = {
  id: string
  invocations: number
  minted: number
  type: SrcType
  artworks: Artwork[]
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
