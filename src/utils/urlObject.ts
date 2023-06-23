const encodeURL = (object: object): string =>
  encodeURIComponent(JSON.stringify(object))

const decodeURL = (string: string): { [key: string]: any } =>
  JSON.parse(decodeURIComponent(string.replace(/^\?/, '')))


export {
  encodeURL,
  decodeURL
}