import { totalDaysInYear, getYMD } from "../../lib/helper"
import _ from 'lodash'
import { IBox } from "./GCGraph"

export interface IActivity {
  data: any,
  date: string,
  color: string,
}

interface IActivityMap {
  [key: string]: IActivity[]
}

export const getBoxesFromActivities = (activities: IActivity[]): IBox[] => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const currentDate = now.getDate()
  const endDay = now.getDay()

  const boxes: IBox[] = []

  const beginDate = currentDate - endDay + 2
  const totalDays = totalDaysInYear(currentYear) + new Date(now.getTime() - new Date(currentYear, 0, 1).getTime()).getUTCDate() + 1
  const activityMap = _.groupBy(activities, 'date') as IActivityMap

  for (let i = beginDate; i <= totalDays; i++) {
    const date = new Date(currentYear - 1, currentMonth, i)
    const ymd = getYMD(date)

    const dailyActivities = activityMap[ymd]
    if (dailyActivities) {
      // Has activity on this day
      const dailyActivityBoxes = dailyActivities.map(activity => ({
        id: `b${i}`,
        color: activity.color,
        data: activity.data,
        date: activity.date,
      }))
      // TOFIX: mixed data in one box
      boxes.push(dailyActivityBoxes[0])
    } else {
      // No activity on this day
      const noActivityBox = {
        id: `b${i}`,
        color: '#eeeeee',
        data: ymd,
        date: ymd,
      }

      boxes.push(noActivityBox)
    }
  }

  return boxes
}

export { getBoxesFromActivities as getBoxesFromResults }
