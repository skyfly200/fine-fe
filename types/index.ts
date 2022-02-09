import { ParsedUrlQuery } from 'querystring'

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
  _type: 'post'
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
  _type: 'event'
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
  publishedAt: string
}

export type SrcType = 'three' | 'glb' | 'p5'

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
  artist: Partial<Artist>
  attributes: Attribute[]
  image: Img
  about: string[]
  type: SrcType
  size: Size
  src?: string
  project: Partial<Project>
}

export type SocialNetwork = 'instagram' | 'discord' | 'twitter'
export type SocialNetworkInfo = {
  url?: string
}

export type SocialNetworks = Record<SocialNetwork, SocialNetworkInfo>
export type Artist = {
  _id: string
  id: string
  slug: SanitySlug
  name: string
  bioSummary: any
  bio: any
  image: SanityImage
  discord?: string
  instagram?: string
  twitter?: string
}

export type Project = {
  id: string
  _id: string
  slug: SanitySlug
  title: string
  body: any
  projectDetails: Attribute
  artist: Artist
  image: SanityImage
  invocations: number
  minted: number
  type: SrcType
  artworks: Artwork[]
  galleryImages: SanityImage[]
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
  name: string
  dropDate: string
  overview: string
  image: SanityImage
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

export type HomeDetails = {
  projectSlug: string
  upcomingProjectTitle: string
  upcomingProjectArtist: string
  upcomingProjectDrop: string
  upcomingProjectImage: SanityImage
}
