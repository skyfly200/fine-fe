export interface Img {
  src: string | StaticImageData
  alt?: string
  height?: number
  width?: number
}

export type ToastType = 'success' | 'info' | 'error' | 'warning'
