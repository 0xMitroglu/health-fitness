import { useState, useEffect } from "react"

const Calendar = (props) => {
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [days, setDays] = useState([])
    const [currentDate, setCurrentDate] = useState()
    console.log(currentDate)
    useEffect(() => {
        const date = new Date()
        const currentMonth = date.getMonth()
        const currentYear = date.getFullYear()

        setMonth(currentMonth)
        setYear(currentYear)
    }, [])
    const daysCalender = days.map((el) => {
        return (
            <div
                className="day"
                onClick={() => {
                    props.setCurrentDate({
                        year: el.year,
                        month: el.month + 1,
                        day: el.day,
                        weekday: el.weekday,
                    })
                }}
            >
                {el.day}
            </div>
        )
    })
    useEffect(() => {
        const getDaysOfMonth = (year, month) => {
            const days = []
            // Get the number of days in the month
            const numberOfDays = new Date(year, month + 1, 0).getDate()
            const firstDay = new Date(year, month, 1)
            console.log(firstDay.getDay(), firstDay)
            if (firstDay.getDay() == 0) {
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
            } else if (firstDay.getDay() == 2) {
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
            } else if (firstDay.getDay() == 3) {
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
            } else if (firstDay.getDay() == 4) {
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
            } else if (firstDay.getDay() == 5) {
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
            } else if (firstDay.getDay() == 6) {
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
                days.push({ day: "", weekday: "", daysOfWeek: "", month: "", year: "" })
            }
            console.log(numberOfDays) // Iterate over each day of the month
            for (let day = 1; day <= numberOfDays; day++) {
                const date = new Date(year, month, day)
                const weekday = date.toLocaleString("en-US", { weekday: "short" })
                /*    const month2 = date.getMonth() */
                days.push({
                    day,
                    weekday,
                    dayOfWeek: date.getDay(),
                    month,
                    year,
                })
            }
            return days
        }
        const array = getDaysOfMonth(year, month)
        setDays(array)
    }, [month, year])
    const nextMonth = () => {
        const currentDate = new Date(year, month, 1)
        let date = new Date(currentDate)
        date.setMonth(date.getMonth() + 1)
        setMonth(date.getMonth())
        setYear(date.getFullYear())
    }
    const lastMonth = () => {
        const currentDate = new Date(year, month, 1)
        let date = new Date(currentDate)
        date.setMonth(date.getMonth() - 1)
        setMonth(date.getMonth())
        setYear(date.getFullYear())
    }
    return (
        <>
            <h1>
                {month + 1} {year}
            </h1>
            <button
                onClick={() => {
                    nextMonth()
                }}
            >
                Next Month
            </button>
            <button
                onClick={() => {
                    lastMonth()
                }}
            >
                Previous Month
            </button>
            <div className="calender">{daysCalender}</div>
        </>
    )
}

export default Calendar
import React from "react"
import NavSettings from "../back-end/NavSettings"
import { useState, useEffect } from "react"
import Calender from "@/back-end/Calender"
const NutritionPlaner = () => {
    const [currentDate, setCurrentDate] = useState({
        year: "",
        month: "",
        day: "",
        weekday: "",
    })
    const [currentWeek, setCurrentWeek] = useState([{ year: "", month: "", day: "", weekday: "" }])

    const [calender, setCalender] = useState([])
    const week = currentWeek.map((el) => {
        return (
            <p
                onClick={() => {
                    setCurrentDate({
                        year: el.year,
                        month: el.month,
                        day: el.day,
                        weekday: el.weekday,
                    })
                }}
            >
                {el.weekday} {el.day}
            </p>
        )
    })

    useEffect(() => {
        const date = new Date()
        const weekdayIndex = date.getDay()
        let weekday = ""

        if (weekdayIndex === 0) {
            weekday = "Sunday"
        } else if (weekdayIndex === 1) {
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
        }

        setCurrentDate({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            weekday: weekday,
        })
    }, [])

    function getWeekDays(year, month, day) {
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
            })

            currentDate.setDate(currentDate.getDate() + 1) // Move to the next day
        }

        return weekDays
    }

    useEffect(() => {
        const weekDays = getWeekDays(currentDate.year, currentDate.month, currentDate.day)
        setCurrentWeek(weekDays)
    }, [currentDate])
    const [currentTime, setCurrentTime] = useState("")
    const getNextDayInWeek = () => {
        setCurrentDate((prevDate) => {
            const currentDate = new Date(prevDate.year, prevDate.month - 1, prevDate.day) // Get the current date
            let date = new Date(currentDate) // Create a copy of the current date
            // Move forward by 7 days to reach the next occurrence of the same day of the week
            date.setDate(date.getDate() + 7)

            // Return the updated currentDate state
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                weekday: date.toLocaleString("en-US", { weekday: "long" }),
            }
        })
    }

    const getPreviousDayInWeek = () => {
        setCurrentDate((prevDate) => {
            const currentDate = new Date(prevDate.year, prevDate.month - 1, prevDate.day) // Get the current date
            let date = new Date(currentDate) // Create a copy of the current date

            const targetDayOfWeek = date.getDay() // Get the current day of the week

            let decrement = 1

            // Move backward until the previous occurrence of the same day of the week is found
            /*  while (date.getDay() !== targetDayOfWeek) {
                date.setDate(date.getDate() - decrement)
                decrement++
            } */

            // Move backward by 7 days to reach the previous occurrence of the same day of the week
            date.setDate(date.getDate() - 7)

            // Return the updated currentDate state
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                weekday: date.toLocaleString("en-US", { weekday: "long" }),
            }
        })
    }

    return (
        <div className="nutritionPlaner__page page">
            <NavSettings pageClass={"page"} />
            <h1>
                {currentDate.weekday}, {currentDate.day}/{currentDate.month} {currentDate.year}
            </h1>
            <button
                onClick={() => {
                    setCurrentDate({
                        year: 2023,
                        month: 5,
                        day: 2,
                        weekday: "Wednesday",
                    })
                }}
            >
                Submit
            </button>
            <p>Current time: {currentTime}</p>
            <input placeholder="Text..." id="text"></input>
            <button
                onClick={() => {
                    const input = document.querySelector("#text")
                    setCalender((el) => {
                        return [
                            ...el,
                            {
                                year: currentDate.year,
                                month: currentDate.month,
                                day: currentDate.day,
                                text: input.value,
                            },
                        ]
                    })
                }}
            >
                Submit
            </button>
            <button
                onClick={() => {
                    getNextDayInWeek()
                }}
            >
                Get Next Week
            </button>
            <button
                onClick={() => {
                    getPreviousDayInWeek()
                }}
            >
                Get Previous Week
            </button>
            <div>
                <h5>Week</h5>
                {week}
            </div>
            <Calender setCurrentDate={setCurrentDate} />
        </div>
    )
}

export default NutritionPlaner