import React from "react"
import { useEffect, useState } from "react"
import WeightTrackerMobile from "@/WeightTracker/WeightTrackerMobile"
import NavSettings from "@/back-end/NavSettings"
import Head from "next/head"
import {
    getCurrentDate,
    getDaysInWeek,
    getNextDayInWeek,
    getPreviousDayInWeek,
    getMonthNameGerman,
    getDayNameGerman,
    getCurrentMonthIndexAndYear,
    getMonthInfo,
} from "@/back-end/DateFunctions"
import WeightTrackerPC from "@/WeightTracker/WeightTrackerPC"
import WeightTrackerTablet from "@/WeightTracker/WeighTrackerTablet"
const Weight = () => {
    const [selectedTime, setSelectedTime] = useState("week") /* month, year -> for the chart*/
    const [today, setToday] = useState(true) /* checks if currentDate is in the selectedTime */

    const [currentDate, setCurrentDate] = useState(getCurrentDate())
    const [week, setWeek] = useState(
        getDaysInWeek(getCurrentDate().year, getCurrentDate().month, getCurrentDate().day)
    )
    const [month, setMonth] = useState({
        month: getCurrentMonthIndexAndYear().monthIndex + 1,
        year: getCurrentMonthIndexAndYear().year,
    })
    const [year, setYear] = useState(getCurrentMonthIndexAndYear().year)

    const [monthWeightData, setMonthWeightData] = useState([])
    const [monthWeightInfo, setMonthWeightInfo] = useState([])
    const [monthLabel, setMonthLabel] = useState([])
    const [yearWeightData, setYearWeightData] = useState([])
    const [yearWeightInfo, setYearWeightInfo] = useState([])
    const [weekWeightData, setWeekWeightData] = useState([])
    const [weekWeightInfo, setWeekWeightInfo] = useState([])
    const [weight, setWeight] = useState([]) /* Local Testing purpose rn */
    const [height, setHeight] = useState("")
    const [bmi, setBmi] = useState("")
    const [weightNumbers, setWeightNumbers] = useState(() => {
        /* We Show from 40 to 140kg */
        let array = []
        for (let i = 40; i < 140; i++) {
            array.push(i)
        }
        return array
    })
    const [monthCalenderDays, setMonthCalenderDays] = useState([])
    const [monthCalender, setMonthCalender] = useState({
        year: getCurrentDate().year,
        month: getCurrentDate().month,
    })
    /* Calender */
    useEffect(() => {
        const firstDay = new Date(monthCalender.year, monthCalender.month - 1, 1).getDay() // 0: Sunday, 1: Monday, ...
        const lastDay = new Date(monthCalender.year, monthCalender.month - 0, 0).getDate()
        const lastDayWeekDay = new Date(monthCalender.year, monthCalender.month - 0, 0).getDay()

        const calendarArray = []

        // Fill in empty strings for days before the first day of the month
        for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
            calendarArray.push("")
        }

        // Fill in the days of the month
        for (let i = 1; i <= lastDay; i++) {
            calendarArray.push(i)
        }
        for (let i = lastDayWeekDay === 0 ? 7 : lastDayWeekDay; i <= 6; i++) {
            calendarArray.push("")
        }
        setMonthCalenderDays(calendarArray)
    }, [monthCalender])
    /* Set Week Weight Data / Info */
    useEffect(() => {
        if (week.length !== 0) {
            let weightArrayChart = []
            for (let i = 0; i < week.length; i++) {
                let weekWeightDayFound = false

                for (let k = 0; k < weight.length; k++) {
                    if (
                        week[i].year == weight[k].year &&
                        week[i].month == weight[k].month &&
                        week[i].day == weight[k].day
                    ) {
                        weekWeightDayFound = true
                        weightArrayChart.push(weight[k].weight)
                    }
                }
                if (!weekWeightDayFound) {
                    weightArrayChart.push(NaN)
                }
            }
            setWeekWeightData(weightArrayChart)
        }
    }, [week, weight])
    useEffect(() => {
        if (weekWeightData.length !== 0) {
            let currentDateInWeek = false
            for (let i = 0; i < week.length; i++) {
                if (
                    currentDate.year == week[i].year &&
                    currentDate.month == week[i].month &&
                    currentDate.day == week[i].day
                ) {
                    currentDateInWeek = true
                }
            }
            const nonNaNValues = weekWeightData.filter((value) => !isNaN(value))
            let average
            if (nonNaNValues.length > 0) {
                const sum = nonNaNValues.reduce((acc, value) => acc + value, 0)
                average = sum / nonNaNValues.length
            } else {
                average = ""
            }
            let index,
                lastValue = "",
                beginningValue = ""

            if (currentDateInWeek) {
                index = currentDate.dayIndex
            } else {
                index = 6 /* Sunday */
            }

            let foundValue = false
            let foundBeginning = false
            while (!foundValue && index >= 0) {
                if (!isNaN(weekWeightData[index])) {
                    lastValue = weekWeightData[index]
                    foundValue = true
                } else {
                    index--
                }
            }
            let indexBeginning = 0
            while (!foundBeginning && index < 7 && nonNaNValues.length !== 0) {
                if (!isNaN(weekWeightData[indexBeginning])) {
                    beginningValue = weekWeightData[indexBeginning]
                    foundBeginning = true
                } else {
                    indexBeginning++
                }
            }
            setWeekWeightInfo({
                lastWeight: lastValue,
                beginningValue: beginningValue,
                average: average,
                difference: (lastValue - beginningValue).toFixed(1),
            })
        }
    }, [currentDate, weight, weekWeightData])
    /* Set Month Weight Data/ Info */
    useEffect(() => {
        if (month.length !== 0) {
            let allWeightsNoOrder = [] /* its a mess not the correct order */
            for (let i = 0; i < weight.length; i++) {
                if (month.month == weight[i].month && month.year == weight[i].year) {
                    allWeightsNoOrder.push(weight[i])
                }
            }
            const lastDayOfMonth = new Date(month.year, month.month, 0)
            const lastDay = lastDayOfMonth.getDate()
            let labels = []
            let arrayWeight = []
            for (let i = 1; i <= lastDay; i++) {
                labels.push(i)
                let dayWeight = NaN
                for (let k = 0; k < allWeightsNoOrder.length; k++) {
                    if (allWeightsNoOrder[k].day == i) {
                        dayWeight = allWeightsNoOrder[k].weight
                    }
                }
                arrayWeight.push(dayWeight)
            }
            setMonthLabel([...labels])
            setMonthWeightData(arrayWeight)
        }
    }, [month, weight])
    useEffect(() => {
        if (monthWeightData.length !== 0) {
            let currentDateInMonth

            if (currentDate.month == month.month) {
                currentDateInMonth = true
            } else {
                currentDateInMonth = false
            }
            const nonNaNValues = monthWeightData.filter((value) => !isNaN(value))

            let average
            if (nonNaNValues.length > 0) {
                const sum = nonNaNValues.reduce((acc, value) => acc + value, 0)

                average = sum / nonNaNValues.length
            } else {
                average = ""
            }
            let index,
                lastValue = "",
                beginningValue = ""
            if (currentDateInMonth) {
                index = currentDate.day
            } else {
                index = monthLabel.length /* 31 August for example */
            }
            let maxDays = monthLabel.length

            let foundValue = false
            let foundBeginning = false

            while (!foundValue && index >= 0) {
                if (!isNaN(monthWeightData[index])) {
                    lastValue = monthWeightData[index]
                    foundValue = true
                } else {
                    index--
                }
            }
            let indexBeginning = 0
            while (!foundBeginning && index < maxDays && nonNaNValues.length !== 0) {
                if (!isNaN(monthWeightData[indexBeginning])) {
                    beginningValue = monthWeightData[indexBeginning]
                    foundBeginning = true
                } else {
                    indexBeginning++
                }
            }
            setMonthWeightInfo({
                lastWeight: lastValue,
                beginningValue: beginningValue,
                average: average,
                difference: (lastValue - beginningValue).toFixed(1),
            })
        }
    }, [currentDate, weight, monthWeightData])
    /* Set Year Weight Data/Info */
    useEffect(() => {
        if (yearWeightData.length !== 0) {
            let currentDateInYear

            if (currentDate.year == month.year) {
                currentDateInYear = true
            } else {
                currentDateInYear = false
            }
            const nonNaNValues = yearWeightData.filter((value) => !isNaN(value))

            let average
            if (nonNaNValues.length > 0) {
                const sum = nonNaNValues.reduce((acc, value) => acc + value, 0)

                average = sum / nonNaNValues.length
            } else {
                average = ""
            }
            let index = 11 /* index max of months */,
                lastValue = "",
                beginningValue = ""
            let maxMonths = 11

            let foundValue = false
            let foundBeginning = false

            while (!foundValue && index >= 0) {
                if (!isNaN(yearWeightData[index])) {
                    lastValue = yearWeightData[index]
                    foundValue = true
                } else {
                    index--
                }
            }
            let indexBeginning = 0
            while (!foundBeginning && index <= 11 && nonNaNValues.length !== 0) {
                if (!isNaN(yearWeightData[indexBeginning])) {
                    beginningValue = yearWeightData[indexBeginning]
                    foundBeginning = true
                } else {
                    indexBeginning++
                }
            }
            setYearWeightInfo({
                lastWeight: lastValue,
                beginningValue: beginningValue,
                average: average,
                difference: (lastValue - beginningValue).toFixed(1),
            })
        }
    }, [yearWeightData, year])
    useEffect(() => {
        let array = []
        for (let k = 1; k <= 12; k++) {
            let monthData = []
            for (let i = 0; i < weight.length; i++) {
                if (year == weight[i].year && weight[i].month == k) {
                    monthData.push(weight[i])
                }
            }
            let sum = 0
            for (let i = 0; i < monthData.length; i++) {
                sum += monthData[i].weight
            }
            let average = parseInt((sum / monthData.length) * 10) / 10
            array.push(average)
        }
        setYearWeightData(array)
    }, [year, weight])
    /* Set Today */
    useEffect(() => {
        if (selectedTime == "week") {
            let todayBool = false
            for (let i = 0; i < week.length; i++) {
                if (
                    currentDate.year == week[i].year &&
                    currentDate.month == week[i].month &&
                    currentDate.day == week[i].day
                ) {
                    todayBool = true
                }
            }
            setToday(todayBool)
        }
        if (selectedTime == "month") {
            let todayBool = false
            if (month.month == currentDate.month && month.year == currentDate.year) {
                todayBool = true
            }
            setToday(todayBool)
        }
        if (selectedTime == "year") {
            let todayBool = false
            if (month.year == year) {
                todayBool = true
            }
            setToday(todayBool)
        }
    }, [week, month, year, selectedTime])
    /* Height For BMI */
    useEffect(() => {
        if (localStorage.getItem("weight-tracker-height")) {
            setHeight(JSON.parse(localStorage.getItem("weight-tracker-height")))
        } else {
            setHeight("")
        }
    }, [])

    useEffect(() => {
        if (height !== "") {
            localStorage.setItem("weight-tracker-height", height)
        }
    }, [height])
    /* Set BMI */
    useEffect(() => {
        if (height !== "") {
            let heightSquare = (height / 100) ** 2
            const bmi =
                selectedTime == "week"
                    ? weekWeightInfo.lastWeight / heightSquare
                    : selectedTime == "month"
                    ? monthWeightInfo.lastWeight / heightSquare
                    : selectedTime == "year"
                    ? yearWeightInfo.lastWeight / heightSquare
                    : ""
            setBmi(bmi.toFixed(1))
        }
    }, [height, weekWeightInfo, monthWeightInfo, yearWeightInfo, selectedTime, week])
    /* Set Local Storage */
    useEffect(() => {
        if (localStorage.getItem("weight-tracker-weight")) {
            setWeight(JSON.parse(localStorage.getItem("weight-tracker-weight")))
        }
    }, [])
    useEffect(() => {
        if (weight.length > 0) {
            localStorage.setItem("weight-tracker-weight", JSON.stringify(weight))
        }
    }, [weight])
    useEffect(() => {
        const handleScroll = () => {
            const allPages = document.querySelectorAll(".page")
            const nav = document.querySelector(".nav")
            for (let i = allPages.length - 1; i >= 0; i--) {
                allPages[i].style.top = `${nav.offsetHeight}px`
            }
        }
        window.addEventListener("resize", handleScroll)
        return () => {
            window.removeEventListener("resize", handleScroll)
        }
    }, [])
    useEffect(() => {
        const body = document.querySelector(".body")
        body.style.color = "black"
        const allPages = document.querySelectorAll(".page")
        const nav = document.querySelector(".nav")
        for (let i = allPages.length - 1; i >= 0; i--) {
            allPages[i].style.top = `${nav.offsetHeight}px`
        }
        nav.style.color = "black"
    }, [])

    return (
        <>
            <NavSettings />
            <WeightTrackerMobile
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                today={today}
                setToday={setToday}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                week={week}
                setWeek={setWeek}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                monthWeightData={monthWeightData}
                setMonthWeightData={setMonthWeightData}
                monthWeightInfo={monthWeightInfo}
                setMonthWeightInfo={setMonthWeightInfo}
                monthLabel={monthLabel}
                setMonthLabel={setMonthLabel}
                yearWeightData={yearWeightData}
                setYearWeightData={setYearWeightData}
                yearWeightInfo={yearWeightInfo}
                setYearWeightInfo={setYearWeightInfo}
                weekWeightData={weekWeightData}
                setWeekWeightData={setWeekWeightData}
                weekWeightInfo={weekWeightInfo}
                setWeekWeightInfo={setWeekWeightInfo}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                bmi={bmi}
                setBmi={setBmi}
                weightNumbers={weightNumbers}
                setWeightNumbers={setWeightNumbers}
                monthCalenderDays={monthCalenderDays}
                setMonthCalenderDays={setMonthCalenderDays}
                monthCalender={monthCalender}
                setMonthCalender={setMonthCalender}
            />
            <WeightTrackerPC
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                today={today}
                setToday={setToday}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                week={week}
                setWeek={setWeek}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                monthWeightData={monthWeightData}
                setMonthWeightData={setMonthWeightData}
                monthWeightInfo={monthWeightInfo}
                setMonthWeightInfo={setMonthWeightInfo}
                monthLabel={monthLabel}
                setMonthLabel={setMonthLabel}
                yearWeightData={yearWeightData}
                setYearWeightData={setYearWeightData}
                yearWeightInfo={yearWeightInfo}
                setYearWeightInfo={setYearWeightInfo}
                weekWeightData={weekWeightData}
                setWeekWeightData={setWeekWeightData}
                weekWeightInfo={weekWeightInfo}
                setWeekWeightInfo={setWeekWeightInfo}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                bmi={bmi}
                setBmi={setBmi}
                weightNumbers={weightNumbers}
                setWeightNumbers={setWeightNumbers}
                monthCalenderDays={monthCalenderDays}
                setMonthCalenderDays={setMonthCalenderDays}
                monthCalender={monthCalender}
                setMonthCalender={setMonthCalender}
            />
            <WeightTrackerTablet
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                today={today}
                setToday={setToday}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                week={week}
                setWeek={setWeek}
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                monthWeightData={monthWeightData}
                setMonthWeightData={setMonthWeightData}
                monthWeightInfo={monthWeightInfo}
                setMonthWeightInfo={setMonthWeightInfo}
                monthLabel={monthLabel}
                setMonthLabel={setMonthLabel}
                yearWeightData={yearWeightData}
                setYearWeightData={setYearWeightData}
                yearWeightInfo={yearWeightInfo}
                setYearWeightInfo={setYearWeightInfo}
                weekWeightData={weekWeightData}
                setWeekWeightData={setWeekWeightData}
                weekWeightInfo={weekWeightInfo}
                setWeekWeightInfo={setWeekWeightInfo}
                weight={weight}
                setWeight={setWeight}
                height={height}
                setHeight={setHeight}
                bmi={bmi}
                setBmi={setBmi}
                weightNumbers={weightNumbers}
                setWeightNumbers={setWeightNumbers}
                monthCalenderDays={monthCalenderDays}
                setMonthCalenderDays={setMonthCalenderDays}
                monthCalender={monthCalender}
                setMonthCalender={setMonthCalender}
            />
        </>
    )
}
export default Weight
