declare module '*.png' {
  const src: string
  export default src
}
declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}
