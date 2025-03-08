const getCurrentDate = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    let dayIndex = currentDate.getDay() // 0 for Sunday, 1 for Monday, etc.

    // Adjust dayIndex to represent Monday as 0 and Sunday as 6
    dayIndex = (dayIndex + 6) % 7

    const formattedDate = {
        year: year,
        month: month,
        day: day,
        dayIndex: dayIndex,
    }

    return formattedDate
}
function getDaysInWeek(year, month, day) {
    const startDate = new Date(year, month - 1, day)
    const weekDays = []
    const currentDate = new Date(startDate)
    const startWeekday = 1 // Monday
    const endWeekday = 0 // Sunday

    // Find the first day of the week
    while (currentDate.getDay() !== startWeekday) {
        currentDate.setDate(currentDate.getDate() - 1)
    }

    // Add each day of the week to the array
    for (let i = 0; i < 7; i++) {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1
        const day = currentDate.getDate()
        const weekdayIndex = currentDate.getDay()
        let weekday = ""

        if (weekdayIndex === 1) {
            weekday = "Monday"
        } else if (weekdayIndex === 2) {
            weekday = "Tuesday"
        } else if (weekdayIndex === 3) {
            weekday = "Wednesday"
        } else if (weekdayIndex === 4) {
            weekday = "Thursday"
        } else if (weekdayIndex === 5) {
            weekday = "Friday"
        } else if (weekdayIndex === 6) {
            weekday = "Saturday"
        } else if (weekdayIndex === 0) {
            weekday = "Sunday"
        }

        weekDays.push({
            year: year,
            month: month,
            day: day,
            weekday: weekday,
            index: weekdayIndex,
        })

        currentDate.setDate(currentDate.getDate() + 1) // Move to the next day
    }

    return weekDays
}
const getNextDayInWeek = (year, month, day) => {
    const currentDate = new Date(year, month - 1, day) // Get the current date
    let date = new Date(currentDate) // Create a copy of the current date
    // Move forward by 7 days to reach the next occurrence of the same day of the week
    date.setDate(date.getDate() + 7)

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    }
}

const getPreviousDayInWeek = (year, month, day) => {
    const currentDate = new Date(year, month - 1, day) // Get the current date
    let date = new Date(currentDate) // Create a copy of the current date

    // Move backward by 7 days to reach the previous occurrence of the same day of the week
    date.setDate(date.getDate() - 7)
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    }
}
const getDayName = (year, month, day) => {
    const date = new Date(year, month - 1, day)
    const dayIndex = date.getDay()
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return weekdays[dayIndex]
}
const getDayNameGerman = (dayIndex) => {
    const weekdaysGerman = [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
    ]

    return weekdaysGerman[dayIndex]
}
const getMonthName = (month) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    return months[month - 1]
}
const getMonthNameGerman = (month) => {
    const monthsGerman = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
    ]
    return monthsGerman[month - 1]
}
const getPreviousWeek = (year, month, day) => {
    const dateObj = getPreviousDayInWeek(year, month, day)
    const daysInWeek = getDaysInWeek(dateObj.year, dateObj.month, dateObj.day)
    return daysInWeek
}
const getNextWeek = (year, month, day) => {
    const dateObj = getNextDayInWeek(year, month, day)
    const daysInWeek = getDaysInWeek(dateObj.year, dateObj.month, dateObj.day)
    return daysInWeek
}
const getMonthInfo = (year, month) => {
    let adjustedYear = year
    let adjustedMonth = month

    while (adjustedMonth < 1) {
        adjustedMonth += 12
        adjustedYear--
    }

    while (adjustedMonth > 12) {
        adjustedMonth -= 12
        adjustedYear++
    }

    const firstDayOfMonth = new Date(adjustedYear, adjustedMonth - 1, 1)
    const lastDayOfMonth = new Date(adjustedYear, adjustedMonth, 0)

    const weekdayIndex = firstDayOfMonth.getDay()
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
        weekdayIndex
    ]

    const firstDayObject = {
        year: adjustedYear,
        month: adjustedMonth,
        day: 1,
        weekday: weekday,
        index: weekdayIndex,
    }

    const lastDayObject = {
        year: adjustedYear,
        month: adjustedMonth,
        day: lastDayOfMonth.getDate(),
        weekday: weekday,
        index: lastDayOfMonth.getDay(),
    }

    return {
        firstDay: firstDayObject,
        lastDay: lastDayObject,
    }
}
const getCurrentMonthIndexAndYear = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    let monthIndex = currentDate.getMonth() // Month index is zero-based

    while (monthIndex < 0) {
        monthIndex += 12
    }

    while (monthIndex > 11) {
        monthIndex -= 12
    }

    return {
        monthIndex: monthIndex,
        year: year,
    }
}
module.exports = {
    getCurrentDate,
    getDaysInWeek,
    getNextDayInWeek,
    getPreviousDayInWeek,
    getDayName,
    getPreviousWeek,
    getNextWeek,
    getMonthNameGerman,
    getDayNameGerman,
    getCurrentMonthIndexAndYear,
    getMonthInfo,
}
