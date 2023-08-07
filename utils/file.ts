/**
 * 파일 확장자를 반환하는 함수
 * @param src 확장자를 포함하는 파일 경로
 */
export const getFileExtension = (src: string) => {
  const fileName = src.slice(src.lastIndexOf('/'))
  const lastDotIndex = fileName.lastIndexOf('.')

  return fileName.slice(lastDotIndex + 1)
}

/**
 * 파일 확장자를 매칭하는 함수
 * @param src 확장자를 포함하는 파일 경로
 * @param compareExtension 비교하고자 하는 확장자명
 */
export const validFileExtension = (src: string, compareExtension: string) => {
  const fileExtension = getFileExtension(src)

  return fileExtension === compareExtension
}
