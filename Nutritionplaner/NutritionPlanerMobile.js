import React, { createElement } from "react"
import { useState, useEffect } from "react"
import {
    getCurrentDate,
    getDaysInWeek,
    getNextDayInWeek,
    getPreviousDayInWeek,
} from "@/back-end/DateFunctions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ExportedImage from "next-image-export-optimizer"
import {
    faChevronLeft,
    faChevronRight,
    faEdit,
    faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons"
import flame from "../public/flame.png"
import points from "../public/3points.png"
import Footer from "../hooks/Footer"
import info from "../public/info.png"
import infoRed from "../public/infoRed.png"
import { useRouter } from "next/router"
const NutritionPlanerMobile = (props) => {
    const router = useRouter()
    const [showResults, setShowResults] = useState(false)
    const {
        total,
        setTotal,
        caloriesCalculator,
        setCaloriesCalculator,
        resultsSelector,
        setResultsSelector,
        showInfo,
        setShowInfo,
        data,
        setData,
        foods,
        setFoods,
        selectedDate,
        setSelectedDate,
        daysInWeek,
        setDaysInWeek,
        dayInWeek,
        setDayInWeek,
        actualWeek,
        setActualWeek,
        timeSelector,
        setTimeSelector,
        showEditFood,
        setShowEditFood,
        setShowHome,
        setShowFoods,
    } = props
    useEffect(() => {
        let foodWeek = []
        for (let i = 0; i < daysInWeek.length; i++) {
            for (let k = 0; k < data.length; k++) {
                if (
                    data[k].year == daysInWeek[i].year &&
                    data[k].month == daysInWeek[i].month &&
                    data[k].day == daysInWeek[i].day
                ) {
                    for (let l = 0; l < data[k].foods.length; l++) {
                        foodWeek.push(data[k].foods[l])
                    }
                }
            }
        }
        let proteinsWeek = 0,
            caloriesWeek = 0,
            carbsWeek = 0,
            fatWeek = 0
        let proteinsDaily = 0,
            caloriesDaily = 0,
            carbsDaily = 0,
            fatDaily = 0

        for (let i = 0; i < foodWeek.length; i++) {
            proteinsWeek += foodWeek[i].proteins * foodWeek[i].amount
            caloriesWeek += foodWeek[i].calories * foodWeek[i].amount
            carbsWeek += foodWeek[i].carbs * foodWeek[i].amount
            fatWeek += foodWeek[i].fat * foodWeek[i].amount
        }
        for (let i = 0; i < foods.length; i++) {
            proteinsDaily += foods[i].proteins * foods[i].amount
            caloriesDaily += foods[i].calories * foods[i].amount
            carbsDaily += foods[i].carbs * foods[i].amount
            fatDaily += foods[i].fat * foods[i].amount
        }

        let caloriesPercentageWeekly,
            caloriesPercentageDaily,
            proteinsPercentageWeekly,
            proteinsPercentageDaily,
            carbsPercentageWeekly,
            carbsPercentageDaily,
            fatPercentageWeekly,
            fatPercentageDaily
        if (caloriesCalculator == "") {
            caloriesPercentageDaily =
                (caloriesDaily / 3000) * 100 < 100 ? (caloriesDaily / 3000) * 100 : 100
            caloriesPercentageWeekly =
                (caloriesWeek / 21000) * 100 < 100 ? (caloriesWeek / 21000) * 100 : 100
            proteinsPercentageDaily =
                (proteinsDaily / 120) * 100 < 100 ? (proteinsDaily / 120) * 100 : 100
            proteinsPercentageWeekly =
                (proteinsWeek / (120 * 7)) * 100 < 100 ? (proteinsWeek / (120 * 7)) * 100 : 100

            carbsPercentageDaily = (carbsDaily / 400) * 100 < 100 ? (carbsDaily / 400) * 100 : 100
            carbsPercentageWeekly =
                (carbsWeek / (400 * 7)) * 100 < 100 ? (carbsWeek / (400 * 7)) * 100 : 100

            fatPercentageDaily = (fatDaily / 100) * 100 < 100 ? (fatDaily / 100) * 100 : 100
            fatPercentageWeekly =
                (fatWeek / (100 * 7)) * 100 < 100 ? (fatWeek / (100 * 7)) * 100 : 100
        } else {
            caloriesPercentageDaily =
                (caloriesDaily / caloriesCalculator.calories) * 100 < 100
                    ? (caloriesDaily / caloriesCalculator.calories) * 100
                    : 100
            caloriesPercentageWeekly =
                (caloriesWeek / (caloriesCalculator.calories * 7)) * 100 < 100
                    ? (caloriesWeek / (caloriesCalculator.calories * 7)) * 100
                    : 100
            proteinsPercentageDaily =
                (proteinsDaily / caloriesCalculator.proteins) * 100 < 100
                    ? (proteinsDaily / caloriesCalculator.proteins) * 100
                    : 100
            proteinsPercentageWeekly =
                (proteinsWeek / (caloriesCalculator.proteins * 7)) * 100 < 100
                    ? (proteinsWeek / (caloriesCalculator.proteins * 7)) * 100
                    : 100
            carbsPercentageDaily =
                (carbsDaily / caloriesCalculator.carbs) * 100 < 100
                    ? (carbsDaily / caloriesCalculator.carbs) * 100
                    : 100
            carbsPercentageWeekly =
                (carbsWeek / (caloriesCalculator.carbs * 7)) * 100 < 100
                    ? (carbsWeek / (caloriesCalculator.carbs * 7)) * 100
                    : 100
            fatPercentageDaily =
                (fatDaily / caloriesCalculator.fat) * 100 < 100
                    ? (fatDaily / caloriesCalculator.fat) * 100
                    : 100
            fatPercentageWeekly =
                (fatWeek / (caloriesCalculator.fat * 7)) * 100 < 100
                    ? (fatWeek / (caloriesCalculator.fat * 7)) * 100
                    : 100
        }

        setTotal({
            weekly: {
                calories: parseInt(caloriesWeek),
                proteins: parseInt(proteinsWeek),
                carbs: parseInt(carbsWeek),
                fat: parseInt(fatWeek),
                percentage: {
                    calories: parseInt(caloriesPercentageWeekly),
                    proteins: parseInt(proteinsPercentageWeekly),
                    carbs: parseInt(carbsPercentageWeekly),
                    fat: parseInt(fatPercentageWeekly),
                },
            },
            daily: {
                calories: parseInt(caloriesDaily),
                proteins: parseInt(proteinsDaily),
                carbs: parseInt(carbsDaily),
                fat: parseInt(fatDaily),
                percentage: {
                    calories: parseInt(caloriesPercentageDaily),
                    proteins: parseInt(proteinsPercentageDaily),
                    carbs: parseInt(carbsPercentageDaily),
                    fat: parseInt(fatPercentageDaily),
                },
            },
        })
    }, [data, foods, dayInWeek, caloriesCalculator])

    useEffect(() => {
        let array = []
        for (let i = 0; i < data.length; i++) {
            if (
                data[i].year == selectedDate.year &&
                data[i].month == selectedDate.month &&
                data[i].day == selectedDate.day
            ) {
                for (let l = 0; l < data[i].foods.length; l++) {
                    if (data[i].foods[l].time == timeSelector || timeSelector == "all") {
                        array.push(data[i].foods[l])
                    }
                }
            }
        }
        setFoods(array)
    }, [data, timeSelector, selectedDate])
    const foodsMapping = foods.map((el, index) => {
        let proteinHeight, carbsHeight, fatHeight
        let proteins = (el.proteins / 30) * 50

        if (30 < el.proteins) {
            proteinHeight = "50px"
        } else {
            proteinHeight = proteins + "px"
        }
        let carbs = (el.carbs / 70) * 50
        if (70 < el.carbs) {
            carbsHeight = "50px"
        } else {
            carbsHeight = carbs + "px"
        }

        if (50 < el.fat) {
            fatHeight = "50px"
        } else {
            fatHeight = el.fat + "px"
        }

        return (
            <>
                <div className="nutritionPlaner__page__mobile__daily__food" key={index}>
                    <img src={el.image} alt="img"></img>
                    <div className="nutritionPlaner__page__mobile__daily__food__info">
                        <h1 title="This is the complete text of the h1 element with overflow">
                            {el.amount > 1 ? el.amount + "x " : ""}
                            {el.title}
                        </h1>
                        <div>
                            <ExportedImage src={flame} unoptimized={true} alt="flame" />
                            <p>
                                {el.calories} kcal * {el.weight}g
                            </p>
                        </div>
                    </div>
                    {showEditFood !== index ? (
                        <>
                            <div className="nutritionPlaner__page__mobile__daily__food__details">
                                <div className="nutritionPlaner__page__mobile__daily__food__details__protein">
                                    <div className="nutritionPlaner__page__mobile__daily__food__details__bar">
                                        <div
                                            className="nutritionPlaner__page__mobile__daily__food__details__value"
                                            style={{ height: proteinHeight }}
                                        ></div>
                                    </div>
                                    <div className="nutritionPlaner__page__mobile__daily__food__details__text">
                                        <h2>{el.proteins}g</h2>
                                        <p>Protein</p>
                                    </div>
                                </div>
                                <div className="nutritionPlaner__page__mobile__daily__food__details__carb">
                                    <div className="nutritionPlaner__page__mobile__daily__food__details__bar">
                                        <div
                                            className="nutritionPlaner__page__mobile__daily__food__details__value"
                                            style={{ height: carbsHeight }}
                                        ></div>
                                    </div>
                                    <div className="nutritionPlaner__page__mobile__daily__food__details__text">
                                        <h2>{el.carbs}g</h2>
                                        <p>KH</p>
                                    </div>
                                </div>
                                <div className="nutritionPlaner__page__mobile__daily__food__details__fat">
                                    <div className="nutritionPlaner__page__mobile__daily__food__details__bar">
                                        <div
                                            className="nutritionPlaner__page__mobile__daily__food__details__value"
                                            style={{ height: fatHeight }}
                                        ></div>
                                    </div>
                                    <div className="nutritionPlaner__page__mobile__daily__food__details__text">
                                        <h2>{el.fat}g</h2>
                                        <p>Fett</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="nutritionPlaner__page__mobile__daily__food__edit">
                            <button
                                onClick={() => {
                                    props.setSelectedEditFood({
                                        element: el,
                                        date: selectedDate,
                                        index: index,
                                    })
                                }}
                            >
                                {" "}
                                <FontAwesomeIcon alt="icon" icon={faEdit} className="fa" />
                                Bearbeiten
                            </button>
                            <button
                                onClick={() => {
                                    let array = data
                                    let newArray = []
                                    for (let i = 0; i < array.length; i++) {
                                        const day = array[i]
                                        if (
                                            day.day == props.selectedDate.day &&
                                            day.month == props.selectedDate.month &&
                                            day.year == props.selectedDate.year
                                        ) {
                                            let foodsDay = day.foods
                                            day.foods = []
                                            for (let k = 0; k < foodsDay.length; k++) {
                                                if (k == index) {
                                                } else {
                                                    day.foods.push(foodsDay[k])
                                                }
                                            }
                                            newArray.push(day)
                                        } else {
                                            newArray.push(day)
                                        }
                                    }
                                    props.setData([...newArray])
                                }}
                            >
                                <FontAwesomeIcon alt="icon" icon={faDeleteLeft} className="fa" />
                                Löschen
                            </button>
                        </div>
                    )}
                    <div
                        className="nutritionPlaner__page__mobile__daily__food__points"
                        onClick={() => {
                            if (showEditFood !== index) {
                                setShowEditFood(index)
                            } else {
                                setShowEditFood("")
                            }
                        }}
                    >
                        <div className="nutritionPlaner__page__mobile__daily__food__point"></div>
                        <div className="nutritionPlaner__page__mobile__daily__food__point"></div>
                        <div className="nutritionPlaner__page__mobile__daily__food__point"></div>
                    </div>
                </div>
            </>
        )
    })
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    const week = daysInWeek.map((el, index) => {
        /* "nutritionPlaner__page__daily__week__day" */
        return (
            <div className="nutritionPlaner__page__mobile__daily__day" key={index}>
                <div
                    className={
                        el.year == selectedDate.year &&
                        el.month == selectedDate.month &&
                        el.day == selectedDate.day
                            ? "nutritionPlaner__page__mobile__daily__week__day nutritionPlaner__page__mobile__daily__week__this"
                            : "nutritionPlaner__page__mobile__daily__week__day"
                    }
                    key={index}
                    onClick={() => {
                        setSelectedDate({ year: el.year, month: el.month, day: el.day })
                    }}
                >
                    <h3>{months[el.month - 1]}</h3>
                    <p> {el.day}</p>
                </div>
                {index == 0 ? (
                    <FontAwesomeIcon
                        alt="icon"
                        icon={faChevronLeft}
                        className="fa chevronLeft"
                        onClick={() => {
                            setDayInWeek(
                                getPreviousDayInWeek(
                                    dayInWeek.year,
                                    dayInWeek.month,
                                    dayInWeek.day
                                )
                            )
                        }}
                    />
                ) : (
                    ""
                )}
                {index == daysInWeek.length - 1 ? (
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="fa chevronRight"
                        alt="icon"
                        onClick={() => {
                            setDayInWeek(
                                getNextDayInWeek(dayInWeek.year, dayInWeek.month, dayInWeek.day)
                            )
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        )
    })
    useEffect(() => {
        if (dayInWeek) {
            setDaysInWeek(getDaysInWeek(dayInWeek.year, dayInWeek.month, dayInWeek.day))
        }
    }, [dayInWeek])
    useEffect(() => {
        if (daysInWeek.length !== 0) {
            let bol = false
            const day = getCurrentDate()
            for (let i = 0; i < daysInWeek.length; i++) {
                if (
                    day.year == daysInWeek[i].year &&
                    day.month == daysInWeek[i].month &&
                    day.day == daysInWeek[i].day
                ) {
                    bol = true
                    setActualWeek(true)
                }
            }
            if (!bol) {
                setActualWeek(false)
            }
            if (
                selectedDate.year == day.year &&
                selectedDate.month == day.month &&
                selectedDate.day == day.day &&
                bol
            ) {
                setActualWeek(true)
            } else {
                setActualWeek(false)
            }
        }
    }, [daysInWeek, selectedDate])
    useEffect(() => {
        if (
            document.querySelector(".nutritionPlaner__page__mobile__daily__results__button__layer")
        ) {
            const layer = document.querySelector(
                ".nutritionPlaner__page__mobile__daily__results__button__layer"
            )
            if (resultsSelector == "daily") {
                layer.style.left = "5px"
            } else {
                layer.style.left = "155px"
            }
        }
    }, [resultsSelector])
    useEffect(() => {
        if (localStorage.getItem("calories-calculator")) {
            setCaloriesCalculator(JSON.parse(localStorage.getItem("calories-calculator")))
        } else if (caloriesCalculator.length !== 0) {
            setCaloriesCalculator("")
        }
    }, [])
    useEffect(() => {
        const resultsDiv = document.querySelector(".nutritionPlaner__page__mobile__daily__results")
        const foodDiv = document.querySelector(".nutritionPlaner__page__mobile__daily")
        if (showResults) {
            foodDiv.style.display = "none"
            resultsDiv.style.display = "flex"
        } else if (!showResults) {
            foodDiv.style.display = "flex"
            resultsDiv.style.display = "none"
        }
    }, [showResults])
    useEffect(() => {
        setShowInfo(false)
    }, [resultsSelector, showResults])
    return (
        <div className="nutritionPlaner__page__mobile page">
            <div className="nutritionPlaner__page__mobile__row">
                <div className="nutritionPlaner__page__mobile__home__box">
                    <div className="nutritionPlaner__page__mobile__daily__results">
                        <div className="nutritionPlaner__page__mobile__daily__results__title">
                            <FontAwesomeIcon
                                alt="icon"
                                icon={faChevronLeft}
                                className="fa"
                                onClick={() => {
                                    setShowResults(false)
                                }}
                            />
                            <h1
                                onClick={() => {
                                    setShowResults(false)
                                }}
                            >
                                Resultate
                            </h1>{" "}
                            <div className="nutritionPlaner__page__mobile__daily__results__button__info">
                                {caloriesCalculator !== "" ? (
                                    <ExportedImage
                                        src={info}
                                        unoptimized={true}
                                        alt="info"
                                        onClick={() => {
                                            setShowInfo((prev) => {
                                                return !prev
                                            })
                                        }}
                                    />
                                ) : (
                                    <ExportedImage
                                        src={infoRed}
                                        unoptimized={true}
                                        alt="info"
                                        onClick={() => {
                                            setShowInfo((prev) => {
                                                return !prev
                                            })
                                        }}
                                    />
                                )}
                                {showInfo ? (
                                    <div className="nutritionPlaner__page__mobile__daily__results__button__info__box">
                                        {caloriesCalculator !== "" ? (
                                            <>
                                                <p id="connected">Verbunden</p>
                                                <p>Daten vom Kalorien Rechner</p>
                                                <p
                                                    id="edit"
                                                    onClick={() => {
                                                        router.push({
                                                            pathname: `/calories-calculator`,
                                                        })
                                                    }}
                                                >
                                                    Bearbeite Ziele
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p id="notConnected">Fehler</p>
                                                <p>Keine Daten vom Kalorien Rechner</p>
                                                <p
                                                    id="edit"
                                                    onClick={() => {
                                                        router.push({
                                                            pathname: `/calories-calculator`,
                                                        })
                                                    }}
                                                >
                                                    Erstelle Ziele
                                                </p>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="nutritionPlaner__page__mobile__daily__results__buttons">
                            <button
                                onClick={() => {
                                    setResultsSelector("daily")
                                }}
                            >
                                Täglich
                            </button>
                            <button
                                onClick={() => {
                                    setResultsSelector("weekly")
                                }}
                            >
                                Wöchentlich
                            </button>
                            <div className="nutritionPlaner__page__mobile__daily__results__button__layer"></div>
                        </div>
                        <div className="nutritionPlaner__page__mobile__daily__results__calories">
                            {resultsSelector == "daily" ? (
                                <>
                                    {caloriesCalculator == "" ? (
                                        <>
                                            <p>
                                                Du hast{" "}
                                                <span className="nutritionPlaner__page__mobile__daily__results__calories__underline">
                                                    {total.daily.calories}{" "}
                                                </span>
                                                Kalorien gegessen
                                            </p>
                                            <div className="nutritionPlaner__page__mobile__daily__results__calories__bar">
                                                <div
                                                    className="nutritionPlaner__page__mobile__daily__results__calories__value"
                                                    style={{
                                                        width: `${
                                                            parseInt(
                                                                total.daily.percentage.calories
                                                            ) + "%"
                                                        } `,
                                                    }}
                                                ></div>
                                                <p id="calories__eaten">
                                                    {total.daily.calories} kcal
                                                </p>
                                                <p id="calories__indicator">3000 kcal</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {caloriesCalculator.calories >=
                                            total.daily.calories ? (
                                                <p>
                                                    Du kannst noch{" "}
                                                    <span className="nutritionPlaner__page__mobile__daily__results__calories__underline">
                                                        {caloriesCalculator.calories -
                                                            total.daily.calories}{" "}
                                                    </span>
                                                    Kalorien essen
                                                </p>
                                            ) : (
                                                <p>
                                                    Du hast{" "}
                                                    <span className="nutritionPlaner__page__mobile__daily__results__calories__underline">
                                                        {total.daily.calories -
                                                            caloriesCalculator.calories}{" "}
                                                    </span>
                                                    Kalorien mehr gegessen
                                                </p>
                                            )}
                                            <div className="nutritionPlaner__page__mobile__daily__results__calories__bar">
                                                <div
                                                    className="nutritionPlaner__page__mobile__daily__results__calories__value"
                                                    style={{
                                                        width: `${
                                                            parseInt(
                                                                total.daily.percentage.calories
                                                            ) + "%"
                                                        } `,
                                                    }}
                                                ></div>
                                                <p id="calories__eaten">
                                                    {total.daily.calories} kcal gegessen
                                                </p>
                                                <p id="calories__indicator">
                                                    Ziel: {caloriesCalculator.calories} kcal
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : resultsSelector == "weekly" ? (
                                <>
                                    {caloriesCalculator == "" ? (
                                        <>
                                            <p>
                                                Du hast{" "}
                                                <span className="nutritionPlaner__page__mobile__daily__results__calories__underline">
                                                    {total.weekly.calories}{" "}
                                                </span>
                                                Kalorien gegessen
                                            </p>
                                            <div className="nutritionPlaner__page__mobile__daily__results__calories__bar">
                                                <div
                                                    className="nutritionPlaner__page__mobile__daily__results__calories__value"
                                                    style={{
                                                        width: `${
                                                            parseInt(
                                                                total.weekly.percentage.calories
                                                            ) + "%"
                                                        } `,
                                                    }}
                                                ></div>
                                                <p id="calories__eaten">
                                                    {total.weekly.calories} kcal
                                                </p>
                                                <p id="calories__indicator">21000 kcal</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {caloriesCalculator.calories * 7 >=
                                            total.weekly.calories ? (
                                                <p>
                                                    Du kannst noch{" "}
                                                    <span className="nutritionPlaner__page__mobile__daily__results__calories__underline">
                                                        {caloriesCalculator.calories * 7 -
                                                            total.weekly.calories}{" "}
                                                    </span>
                                                    Kalorien essen
                                                </p>
                                            ) : (
                                                <p>
                                                    Du hast{" "}
                                                    <span className="nutritionPlaner__page__mobile__daily__results__calories__underline">
                                                        {total.weekly.calories -
                                                            caloriesCalculator.calories * 7}{" "}
                                                    </span>
                                                    Kalorien mehr gegessen
                                                </p>
                                            )}
                                            <div className="nutritionPlaner__page__mobile__daily__results__calories__bar">
                                                <div
                                                    className="nutritionPlaner__page__mobile__daily__results__calories__value"
                                                    style={{
                                                        width: `${
                                                            parseInt(
                                                                total.weekly.percentage.calories
                                                            ) + "%"
                                                        } `,
                                                    }}
                                                ></div>
                                                <p id="calories__eaten">
                                                    {total.weekly.calories} kcal gegessen
                                                </p>
                                                <p id="calories__indicator">
                                                    Ziel: {caloriesCalculator.calories * 7} kcal
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="nutritionPlaner__page__mobile__daily__results__info">
                            {caloriesCalculator == "" ? (
                                <>
                                    {resultsSelector == "daily" ? (
                                        <>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__proteins"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.daily.percentage.proteins * 3.6 +
                                                        "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(total.daily.percentage.proteins)}
                                                        %
                                                    </h3>{" "}
                                                    <p>Proteine</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    {total.daily.proteins}g
                                                </div>
                                            </div>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__carbs"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.daily.percentage.carbs * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {" "}
                                                        {parseInt(total.daily.percentage.carbs)}%
                                                    </h3>
                                                    <p>Kohlenhydrate</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    {total.daily.carbs}g
                                                </div>
                                            </div>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__fat"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.daily.percentage.fat * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(total.daily.percentage.fat)}%
                                                    </h3>
                                                    <p>Fett</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    {total.daily.fat}g
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__proteins"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.weekly.percentage.proteins * 3.6 +
                                                        "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(
                                                            total.weekly.percentage.proteins
                                                        )}
                                                        %
                                                    </h3>{" "}
                                                    <p>Proteine</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    {total.weekly.proteins}g
                                                </div>
                                            </div>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__carbs"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.weekly.percentage.carbs * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {" "}
                                                        {parseInt(total.weekly.percentage.carbs)}%
                                                    </h3>
                                                    <p>Kohlenhydrate</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    {total.weekly.carbs}g
                                                </div>
                                            </div>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__fat"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.weekly.percentage.fat * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(total.weekly.percentage.fat)}%
                                                    </h3>
                                                    <p>Fett</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    {total.weekly.fat}g
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {resultsSelector == "daily" ? (
                                        <>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__proteins"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.daily.percentage.proteins * 3.6 +
                                                        "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(total.daily.percentage.proteins)}
                                                        %
                                                    </h3>{" "}
                                                    <p>Proteine</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    <h5>{total.daily.proteins}g</h5>
                                                    <p>Ziel: {caloriesCalculator.proteins}g</p>
                                                </div>
                                            </div>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__carbs"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.daily.percentage.carbs * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {" "}
                                                        {parseInt(total.daily.percentage.carbs)}%
                                                    </h3>
                                                    <p>Kohlenhydrate</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    <h5>{total.daily.carbs}g</h5>
                                                    <p>Ziel: {caloriesCalculator.carbs}g</p>
                                                </div>
                                            </div>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__fat"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.daily.percentage.fat * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(total.daily.percentage.fat)}%
                                                    </h3>
                                                    <p>Fett</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    <h5>{total.daily.fat}g</h5>
                                                    <p>Ziel: {caloriesCalculator.fat}g</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__proteins"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.weekly.percentage.proteins * 3.6 +
                                                        "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(
                                                            total.weekly.percentage.proteins
                                                        )}
                                                        %
                                                    </h3>{" "}
                                                    <p>Proteine</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    <h5>{total.weekly.proteins}g</h5>
                                                    <p>Ziel: {caloriesCalculator.proteins * 7}g</p>
                                                </div>
                                            </div>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__carbs"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.weekly.percentage.carbs * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(total.weekly.percentage.carbs)}%
                                                    </h3>
                                                    <p>Kohlenhydrate</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    <h5>{total.weekly.carbs}g</h5>
                                                    <p>Ziel: {caloriesCalculator.carbs * 7}g</p>
                                                </div>
                                            </div>
                                            <div
                                                className="nutritionPlaner__page__mobile__daily__results__info__fat"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                        total.weekly.percentage.fat * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.3) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__text">
                                                    <h3>
                                                        {parseInt(total.weekly.percentage.fat)}%
                                                    </h3>
                                                    <p>Fett</p>
                                                </div>
                                                <div className="nutritionPlaner__page__mobile__daily__results__info__amount">
                                                    <h5>{total.weekly.fat}g</h5>
                                                    <p>Ziel: {caloriesCalculator.fat * 7}g</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="nutritionPlaner__page__mobile__daily">
                        <h1>Tägliche Mahlzeiten</h1>
                        <div className="nutritionPlaner__page__mobile__daily__week">
                            {week}
                            {/*    {!actualWeek ? (
                            <p
                                className="nutritionPlaner__page__mobile__daily__week__return"
                                onClick={() => {
                                    const currentDate = getCurrentDate()
                                    setDayInWeek(currentDate)
                                    setSelectedDate(currentDate)
                                }}
                            >
                                heute auswählen
                            </p>
                        ) : (
                            ""
                        )} */}
                        </div>
                        <div className="nutritionPlaner__page__mobile__daily__results__button">
                            <button
                                onClick={() => {
                                    setShowResults(true)
                                }}
                            >
                                Siehe Ergebnisse
                            </button>
                        </div>
                        <div className="nutritionPlaner__page__mobile__daily__select">
                            <select
                                onChange={(e) => {
                                    setTimeSelector(e.target.value)
                                }}
                            >
                                <option value="all">Alle</option>
                                <option value="morning">Morgen</option>
                                <option value="midday">Mittag</option>
                                <option value="evening">Abend</option>
                            </select>
                            <button
                                onClick={() => {
                                    setShowFoods(true)
                                    setShowHome(false)
                                }}
                            >
                                Essen hinzufügen
                            </button>
                        </div>
                        <div className="nutritionPlaner__page__mobile__daily__foods">
                            {foodsMapping}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NutritionPlanerMobile
