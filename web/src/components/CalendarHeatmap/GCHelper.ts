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

  const boxes: IBox[] = []

  const beginDate = (currentDate % 7)
  const totalDays = totalDaysInYear(currentYear) + beginDate
  const activityMap = _.groupBy(activities, 'date') as IActivityMap

  console.log('currentDate:', currentDate)
  console.log('beginDate:', beginDate)
  console.log('totalDays:', totalDays)
  console.log('lol:', totalDays - beginDate)

  for (let i = beginDate; i <= totalDays; i++) {
    const date = new Date(currentYear - 1, currentMonth, currentDate + i - beginDate + 1)
    const ymd = getYMD(date)

    const dailyActivities = activityMap[ymd]
    if (dailyActivities) {
      // Has activity on this day
      const dailyActivityBoxes = dailyActivities.map(activity => ({
        id: `b${i}`,
        color: 'red',
        data: activity.data,
        ymd: activity.date,
      }))
      // TOFIX: mixed data in one box
      boxes.push(dailyActivityBoxes[0])
    } else {
      // No activity on this day
      const noActivityBox = {
        id: `b${i}`,
        color: '#eeeeee',
        data: ymd,
        ymd,
      }

      boxes.push(noActivityBox)
    }
  }

  console.log(boxes.length)

  return boxes
}

export { getBoxesFromActivities as getBoxesFromResults }
