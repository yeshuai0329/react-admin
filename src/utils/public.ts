export const scrollIntoView = (traget: any) => {
  const tragetElem = document.querySelector(traget)
  console.log(`tragetElem`, tragetElem.scrollTop)
  tragetElem.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
