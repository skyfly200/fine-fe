import Cors from 'cors'
import { projects } from '../../fixtures'
// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD']
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
  res.status(200).json({ projects: projects })
}
