import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'

dayjs.locale(ja)

export const getCurrentHourMinute = () => {
  return dayjs().format('HH:mm')
}
