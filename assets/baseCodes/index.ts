import { SrcType } from '../../types'

type BaseCodes = { [key in SrcType]: string }

const baseCodes: BaseCodes = {
  three: `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`,
  p5: '<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>'
}

export default baseCodes
