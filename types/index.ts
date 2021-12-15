import { ParsedUrlQuery } from 'querystring'

export interface Img {
  src: string | StaticImageData
  alt?: string
  height?: number
  width?: number
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

export interface Artwork {
  id: string
  name: string
  artistId: string
  previewImg: Img
  about: string[]
  src: SrcType
  tokenData: TokenData
  script: string
}

export type Artist = {
  id: string
  name: string
  bio: string[] // TODO: update with rich text schema
}

export type ToastType = 'success' | 'info' | 'error' | 'warning'

export interface IParams extends ParsedUrlQuery {
  id: string
}
