const totalDaysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate()
const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
const totalDaysInYear = (year: number) => (isLeapYear(year) ? 366 : 365)
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const getYMD = (date: Date) => date.toISOString().split('T')[0]

export { totalDaysInMonth, isLeapYear, totalDaysInYear, MONTH_NAMES, getYMD }
