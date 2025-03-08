import React, { useEffect, useState } from "react"
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ExportedImage from "next-image-export-optimizer"
import {
    faChevronLeft,
    faChevronRight,
    faArrowUp,
    faArrowDown,
    faXmark,
    faPlus,
    faMinus,
    faPen,
    faTrash,
} from "@fortawesome/free-solid-svg-icons"
import ChartWeek from "./ChartWeek"
import ChartMonth from "./ChartMonth"
import ChartYear from "./ChartYear"
import commaLine from "../public/commaLine.png"
import fullLine from "../public/fullLine.png"
import lineValue from "../public/lineValue.png"
import Footer from "@/hooks/Footer"
const WeightTrackerTablet = (props) => {
    const {
        selectedTime,
        setSelectedTime,
        today,
        setToday,
        currentDate,
        setCurrentDate,
        week,
        setWeek,
        month,
        setMonth,
        year,
        setYear,
        monthWeightData,
        setMonthWeightData,
        monthWeightInfo,
        setMonthWeightInfo,
        monthLabel,
        setMonthLabel,
        yearWeightData,
        setYearWeightData,
        yearWeightInfo,
        setYearWeightInfo,
        weekWeightData,
        setWeekWeightData,
        weekWeightInfo,
        setWeekWeightInfo,
        weight,
        setWeight,
        height,
        setHeight,
        bmi,
        setBmi,
        weightNumbers,
        setWeightNumbers,
        monthCalenderDays,
        setMonthCalenderDays,
        monthCalender,
        setMonthCalender,
    } = props
    const [heightInput, setHeightInput] = useState("")
    const [viewHistory, setViewHistory] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")

    const [newWeight, setNewWeight] = useState("")
    const [isDown, setIsDown] = useState(false)
    const [startX, setStartX] = useState("")
    const [scrollLeft, setScrollLeft] = useState("")
    const [editWeight, setEditWeight] = useState(false)
    const [weightSelected, setWeightSelected] = useState(false)
    useEffect(() => {
        if (!viewHistory) {
            setEditWeight(false)
        }
    }, [viewHistory])
    useEffect(() => {
        if (weight.length == 0) {
            setSelectedDate({
                year: currentDate.year,
                month: currentDate.month,
                day: currentDate.day,
            })
        } else {
            setSelectedDate("")
        }
    }, [weight])
    const historyWeek = weekWeightData
        .filter((value) => typeof value === "number")
        .reverse()
        .map((el, index) => {
            if (!isNaN(el)) {
                const weightBefore = (indexMap) => {
                    for (let i = indexMap - 1; i >= -1; i--) {
                        if (i == -1) {
                            return weekWeightData[indexMap]
                        }
                        if (!isNaN(weekWeightData[i])) {
                            return weekWeightData[i]
                        }
                    }
                }
                const number = weightBefore(6 - index)
                return (
                    <>
                        <div
                            className="weight__page__tablet__history__box__item"
                            onClick={() => {
                                if (!editWeight) {
                                    setViewHistory(false)
                                    setSelectedDate({
                                        year: week[6 - index].year,
                                        month: week[6 - index].month,
                                        day: week[6 - index].day,
                                    })
                                    setWeightSelected(false)
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                    })
                                }
                            }}
                        >
                            <div className="weight__page__tablet__history__box__item__col1">
                                {6 - index == currentDate.dayIndex && today ? (
                                    <p>Heute</p>
                                ) : 6 - index == currentDate.dayIndex - 1 &&
                                  currentDate.dayIndex - 1 >= 0 &&
                                  today ? (
                                    <p>Gestern</p>
                                ) : (
                                    <p>
                                        {week[6 - index].day}/{week[6 - index].month}
                                    </p>
                                )}
                                <div>
                                    {" "}
                                    <FontAwesomeIcon
                                        alt="icon"
                                        icon={el - number < 0 ? faArrowDown : faArrowUp}
                                        className="faArrow"
                                    ></FontAwesomeIcon>
                                    {Math.abs(parseInt((el - number) * 10) / 10)}
                                    <span>kg</span>
                                </div>
                            </div>
                            <div className="weight__page__tablet__history__box__item__col2">
                                <div>
                                    <h3>{el}</h3>
                                    <p>kg</p>
                                </div>
                                {editWeight ? (
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            let array = weight
                                            let newArray = []
                                            for (let i = 0; i < weight.length; i++) {
                                                if (
                                                    weight[i].year == week[6 - index].year &&
                                                    weight[i].month == week[6 - index].month &&
                                                    weight[i].day == week[6 - index].day
                                                ) {
                                                } else {
                                                    newArray.push(weight[i])
                                                }
                                            }
                                            localStorage.setItem(
                                                "weight-tracker-weight",
                                                JSON.stringify(newArray)
                                            )
                                            setWeight(newArray)
                                            if (newArray.length == 0) {
                                                setViewHistory(false)
                                            }
                                        }}
                                        alt="icon"
                                        icon={faTrash}
                                        className="weight__page__tablet__history__box__item__col2__fa"
                                    ></FontAwesomeIcon>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </>
                )
            }
        })
    const historyMonth = monthWeightData
        .filter((value) => typeof value === "number")
        .reverse()
        .map((el, index) => {
            if (!isNaN(el)) {
                const weightBefore = (indexMap) => {
                    for (let i = indexMap - 1; i >= -1; i--) {
                        if (i == -1) {
                            return monthWeightData[indexMap]
                        }
                        if (!isNaN(monthWeightData[i])) {
                            return monthWeightData[i]
                        }
                    }
                }
                const number = weightBefore(monthWeightData.length - 1 - index)

                return (
                    <>
                        <div
                            className="weight__page__tablet__history__box__item"
                            onClick={() => {
                                if (!editWeight) {
                                    setViewHistory(false)
                                    setSelectedDate({
                                        year: month.year,
                                        month: month.month,
                                        day: monthWeightData.length - index,
                                    })
                                    setWeightSelected(false)
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                    })
                                }
                            }}
                        >
                            <div className="weight__page__tablet__history__box__item__col1">
                                {monthWeightData.length - index == currentDate.day && today ? (
                                    <p>Heute</p>
                                ) : monthWeightData.length - index == currentDate.day - 1 &&
                                  currentDate.day - 1 > 0 &&
                                  today ? (
                                    <p>Gestern</p>
                                ) : (
                                    <p>
                                        {[monthWeightData.length - index]}/{month.month}
                                    </p>
                                )}
                                <div>
                                    {" "}
                                    <FontAwesomeIcon
                                        alt="icon"
                                        icon={el - number < 0 ? faArrowDown : faArrowUp}
                                        className="faArrow"
                                    ></FontAwesomeIcon>
                                    {Math.abs(parseInt((el - number) * 10) / 10)}
                                    <span>kg</span>
                                </div>
                            </div>
                            <div className="weight__page__tablet__history__box__item__col2">
                                <div>
                                    <h3>{el}</h3>
                                    <p>kg</p>
                                </div>
                                {editWeight ? (
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            let array = weight
                                            let newArray = []
                                            console.log(weight)
                                            for (let i = 0; i < weight.length; i++) {
                                                if (
                                                    weight[i].year == month.year &&
                                                    weight[i].month == month.month &&
                                                    weight[i].day == monthWeightData.length - index
                                                ) {
                                                } else {
                                                    newArray.push(weight[i])
                                                }
                                            }
                                            localStorage.setItem(
                                                "weight-tracker-weight",
                                                JSON.stringify(newArray)
                                            )
                                            setWeight(newArray)
                                            if (newArray.length == 0) {
                                                setViewHistory(false)
                                            }
                                        }}
                                        alt="icon"
                                        icon={faTrash}
                                        className="weight__page__tablet__history__box__item__col2__fa"
                                    ></FontAwesomeIcon>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </>
                )
            }
        })
    const historyYear = yearWeightData
        .filter((value) => typeof value === "number")
        .reverse()
        .map((el, index) => {
            if (!isNaN(el)) {
                const weightBefore = (indexMap) => {
                    for (let i = indexMap - 1; i >= -1; i--) {
                        if (i == -1) {
                            return yearWeightData[indexMap]
                        }
                        if (!isNaN(yearWeightData[i])) {
                            return yearWeightData[i]
                        }
                    }
                }
                const number = weightBefore(yearWeightData.length - 1 - index)

                return (
                    <>
                        <div className="weight__page__tablet__history__box__item">
                            <div className="weight__page__tablet__history__box__item__col1">
                                <p>
                                    {[yearWeightData.length - index]}/{year}
                                </p>
                                <div>
                                    {" "}
                                    <FontAwesomeIcon
                                        alt="icon"
                                        icon={el - number < 0 ? faArrowDown : faArrowUp}
                                        className="faArrow"
                                    ></FontAwesomeIcon>
                                    {Math.abs(parseInt((el - number) * 10) / 10)}
                                    <span>kg</span>
                                </div>
                            </div>
                            <div className="weight__page__tablet__history__box__item__col2">
                                <div>
                                    <h3>{el}</h3>
                                    <p>kg</p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        })
    const calender = monthCalenderDays.map((el, index) => {
        return (
            <>
                <p
                    className={
                        selectedDate.year == monthCalender.year &&
                        selectedDate.month == monthCalender.month &&
                        selectedDate.day == el
                            ? "calenderSelectedDay"
                            : currentDate.year == monthCalender.year &&
                              currentDate.month == monthCalender.month &&
                              currentDate.day < el
                            ? "calenderDayFuture"
                            : ""
                    }
                    onClick={() => {
                        if (
                            currentDate.year == monthCalender.year &&
                            currentDate.month == monthCalender.month &&
                            currentDate.day < el
                        ) {
                        } else if (el !== "") {
                            let found = false
                            setSelectedDate({
                                year: monthCalender.year,
                                month: monthCalender.month,
                                day: el,
                            })
                            setWeightSelected(false)
                        }
                    }}
                >
                    {el}
                </p>
            </>
        )
    })
    const setSwipeNumbers = (year, month, day) => {
        let found = false
        for (let i = 0; i < weight.length; i++) {
            if (weight[i].year == year && weight[i].month == month && weight[i].day == day) {
                found = true
                setNewWeight(weight[i].weight)
                const slider = document.querySelector(
                    ".weight__page__tablet__newWeight__setWeight__select"
                )
                slider.style.left = `${-(weight[i].weight - 40) * 130 + 150}px`
            }
        }
        if (!found) {
            setNewWeight("")
            const slider = document.querySelector(
                ".weight__page__tablet__newWeight__setWeight__select"
            )
            slider.style.left = `${-(70 - 40) * 130 + 150}px`
        }
    }
    useEffect(() => {
        if (selectedDate !== "") {
            setSwipeNumbers(selectedDate.year, selectedDate.month, selectedDate.day)
        }
    }, [selectedDate])

    const selectWeight = weightNumbers.map((el, index) => {
        const imagesComma = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((element, index2) => {
            return <div className="commaLine"></div>
        })
        return (
            <div className="weight__page__tablet__newWeight__setWeight__select__number">
                <div className="fullLine"></div>
                {imagesComma}
                <div></div>
                {<p>{el}</p>}
            </div>
        )
    })
    const calcCurrentNumber = (number, e) => {
        let minNumber = 40
        let step = 130
        let beginning = 150

        const numberNew = (beginning - number) / step + minNumber
        let numberRounded = numberNew.toFixed(1)
        setNewWeight(numberRounded)
    }
    return (
        <>
            {" "}
            <div className="weight__page__tablet page">
                <div className="weight__page__tablet__row">
                    {selectedDate == "" ? (
                        <>
                            <div className="weight__page__tablet__col1">
                                <h1 id="weight__page__tablet__col1__title">Gewicht Tracker</h1>
                                <div className="weight__page__tablet__selectTime">
                                    <p
                                        className={
                                            selectedTime == "week"
                                                ? "weight__page__tablet__selectTime__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setSelectedTime("week")
                                        }}
                                    >
                                        Woche
                                    </p>
                                    <p
                                        className={
                                            selectedTime == "month"
                                                ? "weight__page__tablet__selectTime__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setSelectedTime("month")
                                        }}
                                    >
                                        Monat
                                    </p>
                                    <p
                                        className={
                                            selectedTime == "year"
                                                ? "weight__page__tablet__selectTime__selected"
                                                : ""
                                        }
                                        onClick={() => {
                                            setSelectedTime("year")
                                        }}
                                    >
                                        Jahr
                                    </p>
                                </div>
                                <div className="weight__page__tablet__nextprev">
                                    <FontAwesomeIcon
                                        alt="icon"
                                        icon={faChevronLeft}
                                        className="weight__page__tablet__nextprev__left"
                                        onClick={() => {
                                            if (selectedTime == "week") {
                                                const nextDay = getPreviousDayInWeek(
                                                    week[0].year,
                                                    week[0].month,
                                                    week[0].day
                                                )
                                                const previousWeek = getDaysInWeek(
                                                    nextDay.year,
                                                    nextDay.month,
                                                    nextDay.day
                                                )
                                                setWeek(previousWeek)
                                            }
                                            if (selectedTime == "month") {
                                                setMonth((el) => {
                                                    return {
                                                        month:
                                                            el.month - 1 < 1 ? 12 : el.month - 1,
                                                        year:
                                                            el.month - 1 < 1
                                                                ? el.year - 1
                                                                : el.year,
                                                    }
                                                })
                                            }
                                            if (selectedTime == "year") {
                                                setYear((el) => {
                                                    return el - 1
                                                })
                                            }
                                        }}
                                    />
                                    {selectedTime == "week" ? (
                                        <>
                                            {
                                                <p>
                                                    {getDayNameGerman(week[0].index).substring(
                                                        0,
                                                        3
                                                    )}
                                                    , {week[0].day}.{" "}
                                                    {getMonthNameGerman(week[0].month).substring(
                                                        0,
                                                        3
                                                    )}{" "}
                                                    {" - "}
                                                    {getDayNameGerman(week[6].index).substring(
                                                        0,
                                                        3
                                                    )}
                                                    , {week[6].day}.{" "}
                                                    {getMonthNameGerman(week[6].month).substring(
                                                        0,
                                                        3
                                                    )}
                                                </p>
                                            }
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {selectedTime == "month" ? (
                                        <>
                                            <p>
                                                {getMonthNameGerman(month.month)} {month.year}
                                            </p>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {selectedTime == "year" ? (
                                        <>
                                            <p>{year}</p>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {!today ? (
                                        <FontAwesomeIcon
                                            alt="icon"
                                            icon={faChevronRight}
                                            className="weight__page__tablet__nextprev__right"
                                            onClick={() => {
                                                if (selectedTime == "week") {
                                                    const nextDay = getNextDayInWeek(
                                                        week[0].year,
                                                        week[0].month,
                                                        week[0].day
                                                    )
                                                    const nextWeek = getDaysInWeek(
                                                        nextDay.year,
                                                        nextDay.month,
                                                        nextDay.day
                                                    )
                                                    setWeek(nextWeek)
                                                }
                                                if (selectedTime == "month") {
                                                    setMonth((el) => {
                                                        return {
                                                            month:
                                                                el.month + 1 > 12
                                                                    ? 1
                                                                    : el.month + 1,
                                                            year:
                                                                el.month + 1 > 12
                                                                    ? el.year + 1
                                                                    : el.year,
                                                        }
                                                    })
                                                }
                                                if (selectedTime == "year") {
                                                    setYear((el) => {
                                                        return el + 1
                                                    })
                                                }
                                            }}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                {selectedTime == "week" ? (
                                    <div className="weight__page__tablet__chartWeek">
                                        <ChartWeek weekWeightData={weekWeightData} />
                                    </div>
                                ) : (
                                    ""
                                )}
                                {selectedTime == "month" ? (
                                    <div className="weight__page__tablet__chartWeek">
                                        <ChartMonth
                                            monthWeightData={monthWeightData}
                                            monthLabel={monthLabel}
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                                {selectedTime == "year" ? (
                                    <div className="weight__page__tablet__chartWeek">
                                        <ChartYear yearWeightData={yearWeightData} />
                                    </div>
                                ) : (
                                    ""
                                )}
                                {selectedTime == "week" ? (
                                    <div className="weight__page__tablet__chartInfo">
                                        {weekWeightInfo.lastWeight !== "" &&
                                        weekWeightInfo.beginningValue !== "" ? (
                                            <>
                                                <h2>{weekWeightInfo.lastWeight} kg</h2>
                                                <p>
                                                    {weekWeightInfo.difference >= 0 ? "+" : ""}
                                                    {weekWeightInfo.difference} kg in dieser Woche
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h2>Keine Daten</h2>
                                                <h6 style={{ fontWeight: "300" }}>
                                                    Gewicht eingeben
                                                </h6>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                                {selectedTime == "month" ? (
                                    <div className="weight__page__tablet__chartInfo">
                                        {monthWeightInfo.lastWeight !== "" &&
                                        monthWeightInfo.beginningValue !== "" ? (
                                            <>
                                                <h2>{monthWeightInfo.lastWeight} kg</h2>
                                                <p>
                                                    {monthWeightInfo.difference >= 0 ? "+" : ""}
                                                    {monthWeightInfo.difference} kg in diesem Monat
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h2>Keine Daten</h2>
                                                <h6 style={{ fontWeight: "300" }}>
                                                    Gewicht eingeben
                                                </h6>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                                {selectedTime == "year" ? (
                                    <div className="weight__page__tablet__chartInfo">
                                        {yearWeightInfo.lastWeight !== "" &&
                                        yearWeightInfo.beginningValue !== "" ? (
                                            <>
                                                <h2>{yearWeightInfo.lastWeight} kg</h2>
                                                <p>
                                                    {yearWeightInfo.difference >= 0 ? "+" : ""}
                                                    {yearWeightInfo.difference} kg in diesem Jahr
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h2>Keine Daten</h2>
                                                <h6 style={{ fontWeight: "300" }}>
                                                    Gewicht eingeben
                                                </h6>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="weight__page__tablet__col2">
                                {!viewHistory ? (
                                    <>
                                        <div className="weight__page__tablet__BMI">
                                            <h2>BMI</h2>
                                            <div className="weight__page__tablet__box">
                                                {height !== "" && bmi !== "" ? (
                                                    <div className="weight__page__tablet__results">
                                                        <div className="weight__page__tablet__box__text">
                                                            <h2>{bmi}</h2>
                                                            <p>
                                                                {bmi <= 0
                                                                    ? "BMI konnte nicht berechnet werden."
                                                                    : bmi < 16
                                                                    ? "Starkes Untergewicht!"
                                                                    : bmi >= 16 && bmi < 17
                                                                    ? "Mäßiges Untergewicht!"
                                                                    : bmi >= 17 && bmi < 18.5
                                                                    ? "Leichtes Untergewicht!"
                                                                    : bmi >= 18.5 && bmi <= 24.9
                                                                    ? "Gesunder BMI. Gut gemacht!"
                                                                    : bmi >= 25 && bmi < 30
                                                                    ? "Übergewicht!"
                                                                    : bmi >= 30
                                                                    ? "Mögliche Adipositas!"
                                                                    : "BMI konnte nicht berechnet werden."}
                                                            </p>
                                                        </div>
                                                        <div className="weight__page__tablet__box__info">
                                                            <div className="weight__page__tablet__box__info__box underweight">
                                                                <p>Untergewicht</p>
                                                                {bmi < 18.5 ? (
                                                                    <div
                                                                        className="weight__page__tablet__box__info__box__value"
                                                                        style={{
                                                                            left:
                                                                                (81 / 8.5) *
                                                                                    (bmi - 10) >=
                                                                                78
                                                                                    ? "78px"
                                                                                    : (81 / 8.5) *
                                                                                          (bmi -
                                                                                              10) <=
                                                                                      0
                                                                                    ? "0px"
                                                                                    : `${
                                                                                          (81 /
                                                                                              8.5) *
                                                                                          (bmi -
                                                                                              10)
                                                                                      }px`,
                                                                        }}
                                                                    ></div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            <div className="weight__page__tablet__box__info__box normal">
                                                                {" "}
                                                                <p>Normal</p>
                                                                {bmi >= 18.5 && bmi <= 24.9 ? (
                                                                    <div
                                                                        className="weight__page__tablet__box__info__box__value"
                                                                        style={{
                                                                            left:
                                                                                (81 / 6.4) *
                                                                                    (bmi - 18.5) >=
                                                                                78
                                                                                    ? "78px"
                                                                                    : `${
                                                                                          (81 /
                                                                                              6.4) *
                                                                                          (bmi -
                                                                                              18.5)
                                                                                      }px`,
                                                                        }}
                                                                    ></div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            <div className="weight__page__tablet__box__info__box overweight">
                                                                <p>Übergewicht</p>
                                                                {bmi >= 25 && bmi < 30 ? (
                                                                    <div
                                                                        className="weight__page__tablet__box__info__box__value"
                                                                        style={{
                                                                            left:
                                                                                (81 / 5) *
                                                                                    (bmi - 25) >=
                                                                                78
                                                                                    ? "78px"
                                                                                    : `${
                                                                                          (81 /
                                                                                              5) *
                                                                                          (bmi -
                                                                                              25)
                                                                                      }px`,
                                                                        }}
                                                                    ></div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            <div className="weight__page__tablet__box__info__box obese">
                                                                <p>Adipositas</p>
                                                                {bmi >= 30 ? (
                                                                    <div
                                                                        className="weight__page__tablet__box__info__box__value"
                                                                        style={{
                                                                            left:
                                                                                (81 / 20) *
                                                                                    (bmi - 30) >=
                                                                                78
                                                                                    ? "78px"
                                                                                    : `${
                                                                                          (81 /
                                                                                              20) *
                                                                                          (bmi -
                                                                                              30)
                                                                                      }px`,
                                                                        }}
                                                                    ></div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="weight__page__tablet__box__input">
                                                            <input
                                                                placeholder="Körpergrösse (cm)"
                                                                type="number"
                                                                value={heightInput}
                                                                onChange={(e) => {
                                                                    setHeightInput(e.target.value)
                                                                }}
                                                            ></input>
                                                            <button
                                                                onClick={() => {
                                                                    setHeight(heightInput)
                                                                }}
                                                            >
                                                                Berechnen
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                                {height !== "" ? (
                                                    <p
                                                        id="weight__page__tablet__box__change"
                                                        onClick={() => {
                                                            setHeight("")
                                                        }}
                                                    >
                                                        bearbeiten
                                                    </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                                {(weekWeightData.filter((item) => !isNaN(item)).length > 0 &&
                                    selectedTime == "week") ||
                                (monthWeightData.filter((item) => !isNaN(item)).length > 0 &&
                                    selectedTime == "month") ||
                                (yearWeightData.filter((item) => !isNaN(item)).length > 0 &&
                                    selectedTime == "year") ? (
                                    <>
                                        <div
                                            className="weight__page__tablet__history"
                                            style={{ marginTop: viewHistory ? "0px" : "20px" }}
                                        >
                                            <div
                                                className="weight__page__tablet__history__title"
                                                style={{
                                                    marginBottom: viewHistory ? "20px" : "0",
                                                }}
                                            >
                                                {viewHistory ? (
                                                    <>
                                                        {selectedTime == "year" ? (
                                                            <h1>Durchschnitt</h1>
                                                        ) : (
                                                            <h1>Verlauf</h1>
                                                        )}
                                                        <div className="weight__page__tablet__history__title__fas">
                                                            <FontAwesomeIcon
                                                                alt="icon"
                                                                icon={faPen}
                                                                id="weight__page__tablet__history__title__pen"
                                                                onClick={() => {
                                                                    setEditWeight((el) => {
                                                                        return !el
                                                                    })
                                                                }}
                                                            ></FontAwesomeIcon>
                                                            <FontAwesomeIcon
                                                                alt="icon"
                                                                icon={faXmark}
                                                                id="weight__page__tablet__history__title__return"
                                                                onClick={() => {
                                                                    setViewHistory(false)
                                                                }}
                                                            ></FontAwesomeIcon>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {selectedTime == "year" ? (
                                                            <h2>Durchschnitt</h2>
                                                        ) : (
                                                            <h2>Verlauf</h2>
                                                        )}
                                                    </>
                                                )}
                                                <p
                                                    id="weight__page__tablet__history__viewAll"
                                                    onClick={() => {
                                                        setViewHistory(true)
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                                        })
                                                    }}
                                                    style={{
                                                        display: viewHistory ? "none" : "block",
                                                    }}
                                                >
                                                    Siehe alle
                                                </p>
                                            </div>{" "}
                                            <div
                                                className="weight__page__tablet__history__box"
                                                id={
                                                    viewHistory
                                                        ? "weight__page__tablet__history__box__history"
                                                        : "weight__page__tablet__history__box__notHistory"
                                                }
                                            >
                                                {selectedTime == "week"
                                                    ? historyWeek
                                                    : selectedTime == "month"
                                                    ? historyMonth
                                                    : selectedTime == "year"
                                                    ? historyYear
                                                    : ""}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                                <div className="weight__page__tablet__newWeight__save">
                                    <button
                                        onClick={() => {
                                            setViewHistory(false)

                                            setSelectedDate({
                                                year: currentDate.year,
                                                month: currentDate.month,
                                                day: currentDate.day,
                                            })
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                            })
                                        }}
                                    >
                                        Neues Gewicht
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="weight__page__tablet__newWeight">
                            <div
                                className="weight__page__tablet__newWeight__title"
                                style={{
                                    justifyContent:
                                        weight.length == 0 ? "center" : "space-between",
                                }}
                            >
                                <h1>Neues Gewicht</h1>
                                {weight.length !== 0 ? (
                                    <FontAwesomeIcon
                                        alt="icon"
                                        icon={faXmark}
                                        id="weight__page__tablet__history__title__return"
                                        onClick={() => {
                                            setSelectedDate("")
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                            })
                                        }}
                                    ></FontAwesomeIcon>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="weight__page__tablet__newWeight__calender">
                                <div className="weight__page__tablet__newWeight__calender__nav">
                                    <FontAwesomeIcon
                                        alt="icon"
                                        icon={faChevronLeft}
                                        className="weight__page__tablet__newWeight__calender__nav__fa"
                                        onClick={() => {
                                            setMonthCalender((el) => {
                                                return {
                                                    month: el.month - 1 < 1 ? 12 : el.month - 1,
                                                    year: el.month - 1 < 1 ? el.year - 1 : el.year,
                                                }
                                            })
                                        }}
                                    ></FontAwesomeIcon>
                                    <h3>
                                        {getMonthNameGerman(monthCalender.month)}{" "}
                                        {monthCalender.year}
                                    </h3>
                                    {monthCalender.month == currentDate.month &&
                                    monthCalender.year == currentDate.year ? (
                                        <div className="weight__page__tablet__newWeight__calender__nav__fa"></div>
                                    ) : (
                                        <FontAwesomeIcon
                                            alt="icon"
                                            icon={faChevronRight}
                                            className="weight__page__tablet__newWeight__calender__nav__fa"
                                            onClick={() => {
                                                setMonthCalender((el) => {
                                                    return {
                                                        month:
                                                            el.month + 1 > 12 ? 1 : el.month + 1,
                                                        year:
                                                            el.month + 1 > 12
                                                                ? el.year + 1
                                                                : el.year,
                                                    }
                                                })
                                            }}
                                        ></FontAwesomeIcon>
                                    )}
                                </div>
                                <div className="weight__page__tablet__newWeight__calender__dayTitle">
                                    <p>M</p>
                                    <p>D</p>
                                    <p>M</p>
                                    <p>D</p>
                                    <p>F</p>
                                    <p>S</p>
                                    <p>S</p>
                                </div>
                                <div className="weight__page__tablet__newWeight__calender__calender">
                                    {calender}
                                </div>
                            </div>
                            <div className="weight__page__tablet__newWeight__setWeight">
                                <div className="weight__page__tablet__newWeight__setWeight__number"></div>
                                <div
                                    className="weight__page__tablet__newWeight__setWeight__select"
                                    onMouseDown={(e) => {
                                        const slider = document.querySelector(
                                            ".weight__page__tablet__newWeight__setWeight__select"
                                        )
                                        setIsDown(true)
                                        slider.classList.add("active")
                                        setStartX(e.pageX - slider.offsetLeft)
                                        setScrollLeft(parseFloat(getComputedStyle(slider).left))
                                    }}
                                    onMouseLeave={(e) => {
                                        const slider = document.querySelector(
                                            ".weight__page__tablet__newWeight__setWeight__select"
                                        )
                                        if (
                                            e.pageX <= (window.innerWidth - 300) / 2 + 100 ||
                                            e.pageX >= 300 + (window.innerWidth - 300) / 2 - 100
                                        ) {
                                            setIsDown(false)
                                            slider.classList.remove("active")
                                        }
                                    }}
                                    onMouseUp={(e) => {
                                        setIsDown(false)
                                        const slider = document.querySelector(
                                            ".weight__page__tablet__newWeight__setWeight__select"
                                        )
                                        slider.classList.remove("active")
                                    }}
                                    onMouseMove={(e) => {
                                        if (!isDown) return
                                        setWeightSelected(true)
                                        const slider = document.querySelector(
                                            ".weight__page__tablet__newWeight__setWeight__select"
                                        )
                                        e.preventDefault()
                                        const x =
                                            e.pageX - parseFloat(getComputedStyle(slider).left) + 5
                                        let walk = (x - startX) * 1.5
                                        if (scrollLeft + walk < -100 * 130 + 150) {
                                            slider.style.left = `${-100 * 130 + 150}px`
                                            calcCurrentNumber(-100 * 130 + 150, e)
                                        } else if (scrollLeft + walk > 150) {
                                            slider.style.left = `${150}px`
                                            calcCurrentNumber(150, e)
                                        } else {
                                            let total = scrollLeft + walk
                                            let distance =
                                                150 - Math.round((150 - total) / 13) * 13
                                            slider.style.left = `${distance}px`
                                            calcCurrentNumber(distance, e)
                                        }
                                    }}
                                    onTouchStart={(e) => {
                                        const slider = document.querySelector(
                                            ".weight__page__tablet__newWeight__setWeight__select"
                                        )
                                        setIsDown(true)
                                        slider.classList.add("active")
                                        setStartX(e.touches[0].pageX)
                                        setScrollLeft(parseFloat(getComputedStyle(slider).left))
                                    }}
                                    onTouchMove={(e) => {
                                        if (!isDown) return
                                        setWeightSelected(true)
                                        const slider = document.querySelector(
                                            ".weight__page__tablet__newWeight__setWeight__select"
                                        )
                                        e.preventDefault()
                                        const x = e.touches[0].pageX + 5
                                        let walk = (x - startX) * 1.5
                                        if (scrollLeft + walk < -100 * 130 + 150) {
                                            slider.style.left = `${-100 * 130 + 150}px`
                                            calcCurrentNumber(-100 * 130 + 150, e)
                                        } else if (scrollLeft + walk > 150) {
                                            slider.style.left = `${150}px`
                                            calcCurrentNumber(150, e)
                                        } else {
                                            let total = scrollLeft + walk
                                            let distance =
                                                150 - Math.round((150 - total) / 13) * 13
                                            slider.style.left = `${distance}px`
                                            calcCurrentNumber(distance, e)
                                        }
                                    }}
                                    onTouchEnd={(e) => {
                                        setIsDown(false)
                                        const slider = document.querySelector(
                                            ".weight__page__tablet__newWeight__setWeight__select"
                                        )
                                        slider.classList.remove("active")
                                    }}
                                >
                                    {selectWeight}
                                </div>
                                <div class="box__select__value">
                                    <ExportedImage
                                        draggable="false"
                                        src={lineValue}
                                        unoptimized={true}
                                        alt="fullLine"
                                        class="weight__page__tablet__newWeight__setWeight__select__number__commaLine"
                                    />
                                </div>
                                <div className="weight__page__PC__newWeight__setWeight__number">
                                    <div>
                                        <input
                                            id="weight__page__PC__newWeight__setWeight__number__value"
                                            value={newWeight}
                                            style={{ marginLeft: newWeight !== "" ? "20px" : "" }}
                                            onChange={(e) => {
                                                if (!Number.isNaN(e.target.value / 1)) {
                                                    let value = e.target.value / 1
                                                    setNewWeight(e.target.value)
                                                    if (value == 0) {
                                                        setNewWeight("")
                                                    }
                                                    const slider = document.querySelector(
                                                        ".weight__page__tablet__newWeight__setWeight__select"
                                                    )
                                                    if (value < 40) {
                                                        slider.style.left = `${
                                                            -(40 - 40) * 130 + 150
                                                        }px`
                                                        setWeightSelected(false)
                                                    } else if (value > 140) {
                                                        slider.style.left = `${
                                                            -(140 - 40) * 130 + 150
                                                        }px`
                                                        setWeightSelected(false)
                                                    } else {
                                                        slider.style.left = `${
                                                            -(value - 40) * 130 + 150
                                                        }px`
                                                        setWeightSelected(true)
                                                    }
                                                }
                                            }}
                                        ></input>
                                        <span id="weight__page__PC__newWeight__setWeight__number__prefix">
                                            {newWeight !== "" ? "kg" : ""}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {weightSelected ? (
                                <div className="weight__page__tablet__newWeight__save">
                                    <button
                                        onClick={() => {
                                            if (newWeight !== "") {
                                                let array = weight
                                                const element = {
                                                    year: selectedDate.year,
                                                    month: selectedDate.month,
                                                    day: selectedDate.day,
                                                    weight: newWeight / 1,
                                                }
                                                let alreadyIn = false
                                                for (let i = 0; i < array.length; i++) {
                                                    if (
                                                        array[i].year == element.year &&
                                                        array[i].month == element.month &&
                                                        array[i].day == element.day
                                                    ) {
                                                        alreadyIn = true
                                                        array[i].weight = element.weight
                                                    }
                                                }
                                                if (!alreadyIn) {
                                                    array.push(element)
                                                }

                                                setWeight([...array])
                                                setWeek(
                                                    getDaysInWeek(
                                                        element.year,
                                                        element.month,
                                                        element.day
                                                    )
                                                )
                                                setMonth({
                                                    month: element.month,
                                                    year: element.year,
                                                })
                                                setYear(element.year)
                                                setSelectedDate("")
                                                setWeightSelected(false)
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                                })
                                            }
                                        }}
                                        style={{ opacity: newWeight !== "" ? 1 : 0.4 }}
                                    >
                                        Speichern
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
}
export default WeightTrackerTablet
