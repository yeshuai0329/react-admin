/**
 * 元素滚动到顶部
 * @param traget id 选择器
 */
export const scrollIntoView = (traget: string) => {
  const tragetElem = document.querySelector(traget)
  tragetElem!.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
