import fs from 'fs'
import dotenv from 'dotenv'

const parsedEnv = dotenv.parse(fs.readFileSync('.env'))
const envExample = Object.keys(parsedEnv)
  .map((key) => '# ' + key + '=')
  .join('\n')

fs.writeFileSync('.env.example', envExample)
