/**
 * 일자를 한국어로 포매팅 하여 반환
 */
export const getKoreanDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  return `${year}년 ${month + 1}월 ${day}일`
}
