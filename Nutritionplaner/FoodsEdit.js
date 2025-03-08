import React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons"
import Footer from "@/hooks/Footer"
import dumbbell from "../public/dumbbell.png"
import bicycle from "../public/bicycle.png"
import walk from "../public/walk.png"
import ExportedImage from "next-image-export-optimizer"
const FoodsEdit = (props) => {
    const [amount, setAmount] = useState(props.selectedEditFood.element.amount)
    const [weight, setWeight] = useState(props.selectedEditFood.element.weight)
    const [time, setTime] = useState(props.selectedEditFood.element.time)
    const walking1Calorie = 0.3 /* Minutes */
    const cycling1Calorie = 0.2 /* Minutes */
    const gym1Calorie = 0.1 /* Minutes */

    return (
        <>
            {" "}
            <div className="nutritionPlaner__page page">
                <div className="nutritionPlaner__page__planerUpload">
                    <FontAwesomeIcon
                        alt="icon"
                        icon={faChevronLeft}
                        className="faReturnPlanerUpload"
                        onClick={() => {
                            props.setShowFoods(false)
                            props.setShowHome(true)
                            props.setShowPlanerUpload(false)
                            props.setShowUpload(false)
                            props.setShowEditFoodPage(false)
                        }}
                    />
                    <div className="nutritionPlaner__page__planerUpload__box">
                        <div className="nutritionPlaner__page__planerUpload__box__col1">
                            <div className="nutritionPlaner__page__planerUpload__box__image">
                                <img src={props.selectedEditFood.element.image}></img>
                                <h1>{props.selectedEditFood.element.title}</h1>
                            </div>
                            <div className="nutritionPlaner__page__planerUpload__box__info">
                                <div className="nutritionPlaner__page__planerUpload__box__info__value">
                                    <h3>
                                        {Math.round(
                                            (props.selectedEditFood.element.calories /
                                                props.selectedEditFood.element.weight) *
                                                weight *
                                                10
                                        ) / 10}
                                    </h3>
                                    <p>Kalorien</p>
                                </div>
                                <div className="nutritionPlaner__page__planerUpload__box__info__value">
                                    <h3>
                                        {Math.round(
                                            (props.selectedEditFood.element.proteins /
                                                props.selectedEditFood.element.weight) *
                                                weight *
                                                10
                                        ) / 10}
                                    </h3>
                                    <p>Proteine</p>
                                </div>
                                <div className="nutritionPlaner__page__planerUpload__box__info__value">
                                    <h3>
                                        {Math.round(
                                            (props.selectedEditFood.element.carbs /
                                                props.selectedEditFood.element.weight) *
                                                weight *
                                                10
                                        ) / 10}
                                    </h3>
                                    <p>Kohlenhydrate</p>
                                </div>
                                <div className="nutritionPlaner__page__planerUpload__box__info__value">
                                    <h3>
                                        {Math.round(
                                            (props.selectedEditFood.element.fat /
                                                props.selectedEditFood.element.weight) *
                                                weight *
                                                10
                                        ) / 10}
                                    </h3>
                                    <p>Fett</p>
                                </div>
                            </div>
                            <div className="nutritionPlaner__page__planerUpload__box__weight">
                                <div className="nutritionPlaner__page__planerUpload__box__weight__amount">
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
                                    value={weight}
                                    placeholder="Pro Portion (g)"
                                    onChange={(e) => {
                                        setWeight(e.target.value)
                                    }}
                                ></input>
                                {weight !== "" ? <p>g</p> : ""}
                            </div>
                            <div className="nutritionPlaner__page__planerUpload__box__select">
                                <select
                                    value={time}
                                    onChange={(e) => {
                                        setTime(e.target.value)
                                    }}
                                >
                                    <option value="morning">Morgen</option>
                                    <option value="midday">Mittag</option>
                                    <option value="evening">Abend</option>
                                </select>
                            </div>
                        </div>
                        <div className="nutritionPlaner__page__planerUpload__box__col2">
                            <h2>
                                Wie kann man{" "}
                                {Math.round(
                                    (props.selectedEditFood.element.calories /
                                        props.selectedEditFood.element.weight) *
                                        weight *
                                        parseInt(amount)
                                )}{" "}
                                Kalorien verbrennen
                            </h2>
                            <div className="nutritionPlaner__page__planerUpload__box__col2__images">
                                <div className="nutritionPlaner__page__planerUpload__box__col2__images__box">
                                    <ExportedImage src={walk} unoptimized={true} alt="walk" />
                                    <p>
                                        {Math.round(
                                            (props.selectedEditFood.element.calories /
                                                props.selectedEditFood.element.weight) *
                                                weight *
                                                parseInt(amount) *
                                                walking1Calorie
                                        )}{" "}
                                        mins
                                    </p>
                                </div>
                                <div className="nutritionPlaner__page__planerUpload__box__col2__images__box">
                                    <ExportedImage
                                        src={bicycle}
                                        unoptimized={true}
                                        alt="bicycle"
                                    />
                                    <p>
                                        {Math.round(
                                            (props.selectedEditFood.element.calories /
                                                props.selectedEditFood.element.weight) *
                                                weight *
                                                parseInt(amount) *
                                                cycling1Calorie
                                        )}{" "}
                                        mins
                                    </p>
                                </div>
                                <div className="nutritionPlaner__page__planerUpload__box__col2__images__box">
                                    <ExportedImage
                                        src={dumbbell}
                                        unoptimized={true}
                                        alt="dumbbell"
                                    />
                                    <p>
                                        {Math.round(
                                            (props.selectedEditFood.element.calories /
                                                props.selectedEditFood.element.weight) *
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
                            <div className="nutritionPlaner__page__planerUpload__box__button">
                                <button
                                    onClick={() => {
                                        let array = props.data
                                        let newArray = []
                                        for (let i = 0; i < array.length; i++) {
                                            const day = array[i]
                                            newArray.push(day)
                                            if (
                                                day.day == props.selectedDate.day &&
                                                day.month == props.selectedDate.month &&
                                                day.year == props.selectedDate.year
                                            ) {
                                                const index = props.selectedEditFood.index
                                                const foodOld = newArray[i].foods[index]
                                                let food = {
                                                    amount: parseInt(amount),
                                                    calories: Math.round(
                                                        (props.selectedEditFood.element.calories /
                                                            props.selectedEditFood.element
                                                                .weight) *
                                                            weight
                                                    ),
                                                    carbs: Math.round(
                                                        (props.selectedEditFood.element.carbs /
                                                            props.selectedEditFood.element
                                                                .weight) *
                                                            weight
                                                    ),
                                                    fat: Math.round(
                                                        (props.selectedEditFood.element.fat /
                                                            props.selectedEditFood.element
                                                                .weight) *
                                                            weight
                                                    ),
                                                    image: foodOld.image,
                                                    proteins: Math.round(
                                                        (props.selectedEditFood.element.proteins /
                                                            props.selectedEditFood.element
                                                                .weight) *
                                                            weight
                                                    ),
                                                    time: time,
                                                    title: foodOld.title,
                                                    weight: parseInt(weight),
                                                }
                                                newArray[i].foods[index].amount = food.amount
                                                newArray[i].foods[index].calories = food.calories
                                                newArray[i].foods[index].carbs = food.carbs
                                                newArray[i].foods[index].fat = food.fat
                                                newArray[i].foods[index].image = food.image
                                                newArray[i].foods[index].proteins = food.proteins
                                                newArray[i].foods[index].time = food.time
                                                newArray[i].foods[index].title = food.title
                                                newArray[i].foods[index].weight = food.weight
                                            }
                                        }

                                        props.setData([...newArray])
                                        props.setShowEditFoodPage(false)
                                        props.setShowHome(true)
                                    }}
                                >
                                    Änderungen speichern
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default FoodsEdit
