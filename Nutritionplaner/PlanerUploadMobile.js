import React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons"
import Footer from "@/hooks/Footer"
import dumbbell from "../public/dumbbell.png"
import bicycle from "../public/bicycle.png"
import walk from "../public/walk.png"
import ExportedImage from "next-image-export-optimizer"
const PlanerUploadMobile = (props) => {
    const [amount, setAmount] = useState("1")
    const [weight, setWeight] = useState("")
    const [time, setTime] = useState("morning")
    const walking1Calorie = 0.3 /* Minutes */
    const cycling1Calorie = 0.2 /* Minutes */
    const gym1Calorie = 0.1 /* Minutes */
    return (
        <>
            {" "}
            <div className="nutritionPlaner__page__mobile page">
                <div className="nutritionPlaner__page__mobile__planerUpload__row">
                    <div className="nutritionPlaner__page__mobile__planerUpload__boxDiv">
                        <FontAwesomeIcon
                            alt="icon"
                            icon={faChevronLeft}
                            className="faReturnPlanerUploadMobile"
                            onClick={() => {
                                props.setShowFoods(true)
                                props.setShowHome(false)
                                props.setShowPlanerUpload(false)
                                props.setShowUpload(false)
                                props.setFoodSelected("")
                            }}
                        />
                        <div className="nutritionPlaner__page__mobile__planerUpload__box">
                            <div className="nutritionPlaner__page__mobile__planerUpload__box__col1">
                                <div className="nutritionPlaner__page__mobile__planerUpload__box__image">
                                    <img src={props.foodSelected.image}></img>
                                    <h1>{props.foodSelected.title}</h1>
                                </div>
                                <div className="nutritionPlaner__page__mobile__planerUpload__box__info">
                                    <div className="nutritionPlaner__page__mobile__planerUpload__box__info__value">
                                        <h3>
                                            {Math.round(
                                                (props.foodSelected.calories /
                                                    props.foodSelected.weight) *
                                                    weight *
                                                    10
                                            ) / 10}
                                        </h3>
                                        <p>Kalorien</p>
                                    </div>
                                    <div className="nutritionPlaner__page__mobile__planerUpload__box__info__value">
                                        <h3>
                                            {Math.round(
                                                (props.foodSelected.proteins /
                                                    props.foodSelected.weight) *
                                                    weight *
                                                    10
                                            ) / 10}
                                        </h3>
                                        <p>Proteine</p>
                                    </div>
                                    <div className="nutritionPlaner__page__mobile__planerUpload__box__info__value">
                                        <h3>
                                            {Math.round(
                                                (props.foodSelected.carbs /
                                                    props.foodSelected.weight) *
                                                    weight *
                                                    10
                                            ) / 10}
                                        </h3>
                                        <p>Kohlenhydrate</p>
                                    </div>
                                    <div className="nutritionPlaner__page__mobile__planerUpload__box__info__value">
                                        <h3>
                                            {Math.round(
                                                (props.foodSelected.fat /
                                                    props.foodSelected.weight) *
                                                    weight *
                                                    10
                                            ) / 10}
                                        </h3>
                                        <p>Fett</p>
                                    </div>
                                </div>
                                <div className="nutritionPlaner__page__mobile__planerUpload__box__weight">
                                    <div className="nutritionPlaner__page__mobile__planerUpload__box__weight__amount">
                                        <select
                                            value={amount}
                                            onChange={(e) => {
                                                setAmount(e.target.value)
                                            }}
                                        >
                                            <option value="1">1x</option>
                                            <option value="2">2x</option>
                                            <option value="3">3x</option>
                                            <option value="4">4x</option>
                                            <option value="5">5x</option>
                                        </select>
                                    </div>
                                    <input
                                        placeholder="Pro Portion (g)"
                                        onChange={(e) => {
                                            setWeight(e.target.value)
                                        }}
                                    ></input>
                                    {weight !== "" ? <p>g</p> : ""}
                                </div>
                                <div className="nutritionPlaner__page__mobile__planerUpload__box__select">
                                    <select
                                        value={time}
                                        onChange={(e) => {
                                            setTime(e.target.value)
                                        }}
                                    >
                                        <option value="morning">Morgen</option>
                                        <option value="noon">Mittag</option>
                                        <option value="evening">Abend</option>
                                    </select>
                                </div>
                            </div>
                            <div className="nutritionPlaner__page__mobile__planerUpload__box__col2">
                                <h2>
                                    Wie kann man{" "}
                                    {Math.round(
                                        (props.foodSelected.calories / props.foodSelected.weight) *
                                            weight *
                                            parseInt(amount)
                                    )}{" "}
                                    Kalorien verbrennen
                                </h2>
                                <div className="nutritionPlaner__page__mobile__planerUpload__box__col2__images">
                                    <div className="nutritionPlaner__page__mobile__planerUpload__box__col2__images__box">
                                        <ExportedImage src={walk} unoptimized={true} alt="walk" />
                                        <p>
                                            {Math.round(
                                                (props.foodSelected.calories /
                                                    props.foodSelected.weight) *
                                                    weight *
                                                    parseInt(amount) *
                                                    walking1Calorie
                                            )}{" "}
                                            mins
                                        </p>
                                    </div>
                                    <div className="nutritionPlaner__page__mobile__planerUpload__box__col2__images__box">
                                        <ExportedImage
                                            src={bicycle}
                                            unoptimized={true}
                                            alt="bicycle"
                                        />
                                        <p>
                                            {Math.round(
                                                (props.foodSelected.calories /
                                                    props.foodSelected.weight) *
                                                    weight *
                                                    parseInt(amount) *
                                                    cycling1Calorie
                                            )}{" "}
                                            mins
                                        </p>
                                    </div>
                                    <div className="nutritionPlaner__page__mobile__planerUpload__box__col2__images__box">
                                        <ExportedImage
                                            src={dumbbell}
                                            unoptimized={true}
                                            alt="dumbbell"
                                        />
                                        <p>
                                            {Math.round(
                                                (props.foodSelected.calories /
                                                    props.foodSelected.weight) *
                                                    weight *
                                                    parseInt(amount) *
                                                    gym1Calorie
                                            )}{" "}
                                            mins
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {weight !== "" ? (
                                <div className="nutritionPlaner__page__mobile__planerUpload__box__button">
                                    <button
                                        onClick={async () => {
                                            const obj = {
                                                amount: parseInt(amount),
                                                calories: Math.round(
                                                    (props.foodSelected.calories /
                                                        props.foodSelected.weight) *
                                                        weight
                                                ),

                                                carbs:
                                                    Math.round(
                                                        (props.foodSelected.carbs /
                                                            props.foodSelected.weight) *
                                                            weight *
                                                            10
                                                    ) / 10,
                                                fat:
                                                    Math.round(
                                                        (props.foodSelected.fat /
                                                            props.foodSelected.weight) *
                                                            weight *
                                                            10
                                                    ) / 10,
                                                image: props.foodSelected.image,
                                                proteins:
                                                    Math.round(
                                                        (props.foodSelected.proteins /
                                                            props.foodSelected.weight) *
                                                            weight *
                                                            10
                                                    ) / 10,
                                                time: time,
                                                title: props.foodSelected.title,
                                                weight: parseInt(weight),
                                            }
                                            let dataAlreadyThere = false
                                            let array = props.data
                                            for (let i = 0; i < props.data.length; i++) {
                                                if (
                                                    props.data[i].year ==
                                                        props.selectedDate.year &&
                                                    props.data[i].day == props.selectedDate.day &&
                                                    props.data[i].month == props.selectedDate.month
                                                ) {
                                                    array[i].foods.unshift(obj)
                                                    dataAlreadyThere = true
                                                }
                                            }
                                            if (!dataAlreadyThere) {
                                                array.push({
                                                    year: props.selectedDate.year,
                                                    month: props.selectedDate.month,
                                                    day: props.selectedDate.day,
                                                    foods: [obj],
                                                })
                                            }
                                            props.setFoodSelected("")
                                            props.setShowHome(true)
                                            props.setData([...array])
                                            props.setShowPlanerUpload(false)
                                        }}
                                    >
                                        Zum Ernährungsplan hinzufügen
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default PlanerUploadMobile
