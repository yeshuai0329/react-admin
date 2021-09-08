import React from "react"

/**
 * 设置网页标题
 * @param title 网页标题
 */
export const useSetDocumentTitle = (title: string) => {
  React.useEffect(() => {
    document.title = title
  }, [])
}
