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
  img: string
  alt?: string
}
export interface Event {
  date: string
  title: string
  img: string
  alt?: string
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
  name: string
  artistId: string
  attributes: Attribute[]
  previewImg: Img
  about: string[]
  src: SrcType
  tokenData: TokenData
  script: string
  size: Size
}

export type Artist = {
  id: string
  name: string
  bio: string[]
}

export type Collection = {
  id: string
  name: string
  artworks: string[]
  about: string[]
}

export type ToastType = 'success' | 'info' | 'error' | 'warning'

export interface IParams extends ParsedUrlQuery {
  id: string
}
