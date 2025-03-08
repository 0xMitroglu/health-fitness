import React from "react"
import { useEffect, useState } from "react"
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMars, faMarsAndVenus } from "@fortawesome/free-solid-svg-icons" */
import NavSettings from "../back-end/NavSettings"
import circleGraph from "../public/circle.png"
import ExportedImage from "next-image-export-optimizer"
import Footer from "@/hooks/Footer"
const CaloriesCalculator = () => {
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [age, setAge] = useState(0)
    const [gender, setGender] = useState("")
    const [activityLevel, setActivityLevel] = useState("sedentary")
    const [exerciseFrequency, setExerciseFrequency] = useState(0)
    const [goal, setGoal] = useState("")
    const [calories, setCalories] = useState(0)
    const [fatGrams, setFatGrams] = useState(0)
    const [proteinGrams, setProteinGrams] = useState(0)
    const [carbGrams, setCarbGrams] = useState(0)
    const [showMobileResult, setShowMobileResult] = useState(false)
    const [showCalculate, setShowCalculate] = useState(false)

    const reset = async () => {
        setCarbGrams(0)
        setProteinGrams(0)
        setFatGrams(0)
        setCalories(0)
        setGoal("")
        setExerciseFrequency(0)
        setActivityLevel("sedentary")
        setGender("")
        setAge(0)
        setHeight(0)
        setWeight(0)
        setShowCalculate(false)
    }
    useEffect(() => {
        if (weight !== 0 && height !== 0 && age !== 0 && gender !== "" && goal !== "") {
            setShowCalculate(true)
        }
    }, [age, weight, height, gender, goal])
    const calculateCalories = () => {
        let calculatedCalories = 0

        if (gender === "male") {
            calculatedCalories = 10 * weight + 6.25 * height - 5 * age + 5
        } else {
            calculatedCalories = 10 * weight + 6.25 * height - 5 * age - 161
        }

        switch (activityLevel) {
            case "sedentary":
                calculatedCalories *= 1.2
                break
            case "lightly_active":
                calculatedCalories *= 1.375
                break
            case "moderately_active":
                calculatedCalories *= 1.63
                break
            case "very_active":
                calculatedCalories *= 1.725
                break
            case "super_active":
                calculatedCalories *= 1.9
                break
            default:
                break
        }

        calculatedCalories += exerciseFrequency * 100

        if (goal === "lose") {
            const deficitCalories = 500 // Defizit von 500 Kalorien pro Tag für Gewichtsverlust
            calculatedCalories -= deficitCalories
        } else if (goal === "gain") {
            const surplusCalories = 250 // Überschuss von 250 Kalorien pro Tag für Gewichtszunahme
            calculatedCalories += surplusCalories
        }

        setCalories(parseInt(calculatedCalories))

        // Berechnung der Fett-, Protein- und Kohlenhydratgehalte
        const fatGrams = (calculatedCalories * 0.25) / 9 // 25% der Kalorien aus Fett, 1 g Fett enthält 9 Kalorien
        const proteinGrams = (calculatedCalories * 0.2) / 4 // 20% der Kalorien aus Protein, 1 g Protein enthält 4 Kalorien
        const carbGrams = (calculatedCalories * 0.55) / 4 // 55% der Kalorien aus Kohlenhydraten, 1 g Kohlenhydrate enthält 4 Kalorien

        setFatGrams(parseInt(fatGrams))
        setProteinGrams(parseInt(proteinGrams))
        setCarbGrams(parseInt(carbGrams))
        const data = {
            age: parseInt(age),
            gender: gender,
            weight: parseInt(weight),
            height: parseInt(height),
            calories: parseInt(calculatedCalories),
            fat: parseInt(fatGrams),
            proteins: parseInt(proteinGrams),
            carbs: parseInt(carbGrams),
        }
        localStorage.setItem("calories-calculator", JSON.stringify(data))

        document.querySelector(".calculator__page").scrollIntoView({ behavior: "smooth" })
    }
    return (
        <>
            <div className="calculator__pc">
                <div className="calculator__page page">
                    <div className="calculator__page__rows">
                        <div className="calculator__page__col1">
                            <div className="calculator__page__col1__title">
                                <h2>Kalorien berechnen</h2>
                                <p>Erstelle deinen individuellen Ernährungsplan</p>
                            </div>
                            <div className="calculator__page__col1__gender">
                                <p>
                                    Ich bin{" "}
                                    {gender == "female"
                                        ? "eine"
                                        : gender === "male"
                                        ? "ein"
                                        : "ein/eine"}
                                </p>

                                <div className="calculator__page__col1__gender__buttons">
                                    <button
                                        className={`gender-button ${
                                            gender === "male" ? "selected" : ""
                                        }`}
                                        onClick={() => setGender("male")}
                                    >
                                        Mann
                                    </button>

                                    <button
                                        className={gender == "female" ? "selected" : "button"}
                                        onClick={() => setGender("female")}
                                    >
                                        Frau
                                    </button>
                                    <div
                                        className={
                                            gender == "female"
                                                ? "calculator__page__col1__gender__layer  calculator__page__col1__gender__female"
                                                : gender == "male"
                                                ? "calculator__page__col1__gender__layer calculator__page__col1__gender__male"
                                                : "calculator__page__col1__gender__layer"
                                        }
                                    ></div>
                                </div>
                                {/* <h3>Ziel</h3>
                <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                    <option value="maintain">Gewicht halten</option>
                    <option value="lose">Abnehmen</option>
                    <option value="gain">Zunehmen</option>
                </select> */}
                                <div className="calculator__page__col1__goal">
                                    <p>Mein Gewichtziel ist </p>
                                    <div className="calculator__page__col1__goal__buttons">
                                        <button
                                            className={`goal-button ${
                                                goal === "lose" ? "selected" : ""
                                            }`}
                                            onClick={() => setGoal("lose")}
                                        >
                                            Verlieren
                                        </button>
                                        <button
                                            className={goal == "maintain" ? "selected" : "button"}
                                            onClick={() => setGoal("maintain")}
                                        >
                                            Halten
                                        </button>
                                        <button
                                            className={goal == "gain" ? "selected" : "button"}
                                            onClick={() => setGoal("gain")}
                                        >
                                            Zunehmen
                                        </button>
                                        <div
                                            className={
                                                goal == "lose"
                                                    ? "calculator__page__col1__goal__layer  calculator__page__col1__goal__lose"
                                                    : goal == "maintain"
                                                    ? "calculator__page__col1__goal__layer calculator__page__col1__goal__maintain"
                                                    : goal == "gain"
                                                    ? "calculator__page__col1__goal__layer calculator__page__col1__goal__gain"
                                                    : "calculator__page__col1__goal__layer"
                                            }
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="calculator__page__col1__age">
                                <p>
                                    Ich bin <span className="bold">{age}</span> Jahre alt
                                </p>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    id="inputAge"
                                    value={age}
                                    onChange={(e) => {
                                        setAge(e.target.value)
                                        const slider = document.querySelector("#inputAge")
                                        const progress = e.target.value

                                        slider.style.background = `linear-gradient(to right, #C4343A ${progress}%, #D9D9D9 ${progress}%)`
                                    }}
                                />
                            </div>
                            <div className="calculator__page__col1__height">
                                <p>
                                    Ich bin <span className="bold">{height}</span> cm groß
                                </p>
                                <input
                                    type="range"
                                    min="100"
                                    max="220"
                                    value={height}
                                    id="inputHeight"
                                    onChange={(e) => {
                                        setHeight(e.target.value)
                                        const slider = document.querySelector("#inputHeight")
                                        const progress =
                                            ((e.target.value - 100) / (220 - 100)) * 100

                                        slider.style.background = `linear-gradient(to right, #C4343A ${progress}%, #D9D9D9 ${progress}%)`
                                    }}
                                />
                            </div>
                            <div className="calculator__page__col1__weight">
                                <p>
                                    Ich wiege <span className="bold">{weight}</span> kg
                                </p>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    id="inputWeight"
                                    value={weight}
                                    onChange={(e) => {
                                        setWeight(e.target.value)
                                        const slider = document.querySelector("#inputWeight")
                                        const progress = ((e.target.value - 0) / (200 - 0)) * 100

                                        slider.style.background = `linear-gradient(to right, #C4343A ${progress}%, #D9D9D9 ${progress}%)`
                                    }}
                                />
                            </div>
                            <div className="calculator__page__col1__sport">
                                <p>Sport pro Woche </p>
                                <select
                                    value={exerciseFrequency}
                                    onChange={(e) =>
                                        setExerciseFrequency(parseInt(e.target.value))
                                    }
                                >
                                    <option value="0">kein Sport</option>
                                    <option value="1">1 x</option>
                                    <option value="2">2 x</option>
                                    <option value="3">3 x</option>
                                    <option value="4">4 x</option>
                                    <option value="5">5 x</option>
                                    <option value="6">6 x</option>
                                    <option value="7">7 x (oder mehr)</option>
                                </select>
                            </div>
                            <div className="calculator__page__col1__activity">
                                <p>Alltagsaktivität (ohne Sport)</p>

                                <div className="calculator__page__col1__activity__buttons">
                                    <div
                                        className="calculator__page__col1__activity__button"
                                        onClick={() => {
                                            setActivityLevel("sedentary")
                                        }}
                                    >
                                        <h3>Wenig Aktiv</h3>
                                        <p>(nur sitzend)</p>
                                    </div>
                                    <div
                                        className="calculator__page__col1__activity__button"
                                        onClick={() => {
                                            setActivityLevel("moderately_active")
                                        }}
                                    >
                                        <h3>Aktiv</h3>
                                        <p>(sitzend und laufend)</p>
                                    </div>
                                    <div
                                        className="calculator__page__col1__activity__button"
                                        onClick={() => {
                                            setActivityLevel("super_active")
                                        }}
                                    >
                                        <h3>Sehr Aktiv</h3>
                                        <p>(harte körperliche Arbeit)</p>
                                    </div>
                                    <div
                                        className={
                                            activityLevel == "sedentary"
                                                ? "calculator__page__col1__activity__layer calculator__page__col1__activity__sedentary"
                                                : activityLevel == "moderately_active"
                                                ? "calculator__page__col1__activity__layer calculator__page__col1__activity__active"
                                                : activityLevel == "super_active"
                                                ? "calculator__page__col1__activity__layer calculator__page__col1__activity__sport"
                                                : "calculator__page__col1__activity__layer"
                                        }
                                    ></div>
                                </div>
                            </div>
                            <div className="calculator__page__col1__calculate">
                                {showCalculate ? (
                                    <button onClick={calculateCalories}>Berechnen</button>
                                ) : (
                                    <button
                                        onClick={calculateCalories}
                                        disabled={true}
                                        className="calculator__page__button__disabled"
                                    >
                                        Berechnen
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="calculator__page__col2">
                            <div className="calculator__page__col2__title">
                                <h2>Dein tägliches Kalorienziel</h2>
                            </div>
                            <div className="calculator__page__col2__calories">
                                <div className="calculator__page__col2__calories__circle">
                                    <div className="calculator__page__col2__calories__info">
                                        <p>Total</p>
                                        <h1>{calories}</h1>
                                        <p>kcal</p>
                                    </div>
                                </div>
                            </div>
                            <div className="calculator__page__col2__nutriments">
                                <div className="calculator__page__col2__nutriments__proteins">
                                    <h1>{proteinGrams}g</h1>
                                    <p>Proteine </p>
                                </div>
                                <div className="calculator__page__col2__nutriments__carbs">
                                    <h1>{carbGrams}g</h1>
                                    <p>Kohlenhydrate </p>
                                </div>
                                <div className="calculator__page__col2__nutriments__fat">
                                    <h1>{fatGrams}g</h1>
                                    <p>Fette</p>
                                </div>
                            </div>
                            {proteinGrams == 0 ? (
                                ""
                            ) : (
                                <div className="calculator__page__col2__formula">
                                    <h2>Unsere Formel für dich</h2>
                                    <div className="calculator__page__col2__formula__info">
                                        <div className="calculator__page__col2__formula__info__text">
                                            <p>
                                                Probiere diesen Nährstoffbereich:{" "}
                                                <span className="bold">20%-35%</span> Fett,{" "}
                                                <span className="bold"> 10%-35%</span> Proteine,{" "}
                                                <span className="bold">45%-65%</span>{" "}
                                                Kohlenhydrate.
                                            </p>

                                            <button>
                                                <span className="nowrap">Erfahre mehr</span>
                                            </button>
                                        </div>
                                        <div className="calculator__page__col2__formula__info__image">
                                            <ExportedImage
                                                src={circleGraph}
                                                alt="Orginal, unoptimized image"
                                                width="200"
                                                height="200"
                                                unoptimized={true}
                                                id="image1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <div className="calculator__mobile page">
                <div className="calculator__mobile__rows">
                    {!showMobileResult ? (
                        <div className="calculator__mobile__calculate">
                            <div className="calculator__mobile__calculate__title">
                                <h1>Kalorien berechnen</h1>
                                <p>Erstelle deinen individuellen Ernährungsplan</p>
                            </div>
                            <div className="calculator__mobile__gender">
                                <p>
                                    Ich bin{" "}
                                    {gender == "female"
                                        ? "eine"
                                        : gender === "male"
                                        ? "ein"
                                        : "ein/eine"}
                                </p>
                                <div className="calculator__mobile__gender__buttons">
                                    <button
                                        className={`gender-button ${
                                            gender === "male" ? "selected" : ""
                                        }`}
                                        onClick={() => setGender("male")}
                                    >
                                        Mann
                                    </button>
                                    <button
                                        className={gender == "female" ? "selected" : "button"}
                                        onClick={() => setGender("female")}
                                    >
                                        Frau
                                    </button>

                                    <div
                                        className={
                                            gender == "female"
                                                ? "calculator__mobile__gender__layer  calculator__mobile__gender__female"
                                                : gender == "male"
                                                ? "calculator__mobile__gender__layer calculator__mobile__gender__male"
                                                : "calculator__mobile__gender__layer"
                                        }
                                    ></div>
                                </div>
                            </div>
                            <div className="calculator__mobile__goal">
                                <p>Mein Gewichtziel ist </p>
                                <div className="calculator__mobile__goal__buttons">
                                    <button
                                        className={`goal-button ${
                                            goal === "lose" ? "selected" : ""
                                        }`}
                                        onClick={() => setGoal("lose")}
                                    >
                                        Verlieren
                                    </button>
                                    <button
                                        className={goal == "maintain" ? "selected" : "button"}
                                        onClick={() => setGoal("maintain")}
                                    >
                                        Halten
                                    </button>
                                    <button
                                        className={goal == "gain" ? "selected" : "button"}
                                        onClick={() => setGoal("gain")}
                                    >
                                        Zunehmen
                                    </button>
                                    <div
                                        className={
                                            goal == "lose"
                                                ? "calculator__mobile__goal__layer  calculator__mobile__goal__lose"
                                                : goal == "maintain"
                                                ? "calculator__mobile__goal__layer calculator__mobile__goal__maintain"
                                                : goal == "gain"
                                                ? "calculator__mobile__goal__layer calculator__mobile__goal__gain"
                                                : "calculator__mobile__goal__layer"
                                        }
                                    ></div>
                                </div>
                            </div>
                            <div className="calculator__mobile__age">
                                <p>
                                    Ich bin <span className="bold">{age}</span> Jahre alt
                                </p>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    id="inputMobileAge"
                                    value={age}
                                    onChange={(e) => {
                                        setAge(e.target.value)
                                        const slider = document.querySelector("#inputMobileAge")
                                        const progress = e.target.value

                                        slider.style.background = `linear-gradient(to right, #C4343A ${progress}%, #D9D9D9 ${progress}%)`
                                    }}
                                />
                            </div>
                            <div className="calculator__mobile__height">
                                <p>
                                    Ich bin <span className="bold">{height}</span> cm groß
                                </p>
                                <input
                                    type="range"
                                    min="100"
                                    max="220"
                                    value={height}
                                    id="inputMobileHeight"
                                    onChange={(e) => {
                                        setHeight(e.target.value)
                                        const slider = document.querySelector("#inputMobileHeight")
                                        const progress =
                                            ((e.target.value - 100) / (220 - 100)) * 100

                                        slider.style.background = `linear-gradient(to right, #C4343A ${progress}%, #D9D9D9 ${progress}%)`
                                    }}
                                />
                            </div>
                            <div className="calculator__mobile__weight">
                                <p>
                                    Ich wiege <span className="bold">{weight}</span> kg
                                </p>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    id="inputMobileWeight"
                                    value={weight}
                                    onChange={(e) => {
                                        setWeight(e.target.value)
                                        const slider = document.querySelector("#inputMobileWeight")
                                        const progress = ((e.target.value - 0) / (200 - 0)) * 100

                                        slider.style.background = `linear-gradient(to right, #C4343A ${progress}%, #D9D9D9 ${progress}%)`
                                    }}
                                />
                            </div>
                            <div className="calculator__mobile__sport">
                                <p>Sport pro Woche </p>
                                <select
                                    value={exerciseFrequency}
                                    onChange={(e) =>
                                        setExerciseFrequency(parseInt(e.target.value))
                                    }
                                >
                                    <option value="0">kein Sport</option>
                                    <option value="1">1 x</option>
                                    <option value="2">2 x</option>
                                    <option value="3">3 x</option>
                                    <option value="4">4 x</option>
                                    <option value="5">5 x</option>
                                    <option value="6">6 x</option>
                                    <option value="7">7 x (oder mehr)</option>
                                </select>
                            </div>
                            <div className="calculator__mobile__activity">
                                <p>Alltagsaktivität (ohne Sport)</p>

                                <div className="calculator__mobile__activity__buttons">
                                    <div
                                        className="calculator__mobile__activity__button"
                                        onClick={() => {
                                            setActivityLevel("sedentary")
                                        }}
                                    >
                                        <h3>Wenig Aktiv</h3>
                                        <p>(nur sitzend)</p>
                                    </div>
                                    <div
                                        className="calculator__mobile__activity__button"
                                        onClick={() => {
                                            setActivityLevel("moderately_active")
                                        }}
                                    >
                                        <h3>Aktiv</h3>
                                        <p>(sitzend und laufend)</p>
                                    </div>
                                    <div
                                        className="calculator__mobile__activity__button"
                                        onClick={() => {
                                            setActivityLevel("super_active")
                                        }}
                                    >
                                        <h3>Sehr Aktiv</h3>
                                        <p>(harte körperliche Arbeit)</p>
                                    </div>
                                    <div
                                        className={
                                            activityLevel == "sedentary"
                                                ? "calculator__mobile__activity__layer calculator__mobile__activity__sedentary"
                                                : activityLevel == "moderately_active"
                                                ? "calculator__mobile__activity__layer calculator__mobile__activity__active"
                                                : activityLevel == "super_active"
                                                ? "calculator__mobile__activity__layer calculator__mobile__activity__sport"
                                                : "calculator__mobile__activity__layer"
                                        }
                                    ></div>
                                </div>
                                <div className="calculator__mobile__calculate__button">
                                    {showCalculate ? (
                                        <button
                                            onClick={() => {
                                                calculateCalories()
                                                setShowMobileResult(true)
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                                })

                                                // Using scrollTop property
                                                // Note: This will scroll the <body> element, adjust accordingly if you have a different scrollable element
                                                document.body.scrollTop = 0 // For Safari
                                                document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE, and Opera
                                            }}
                                        >
                                            Berechnen
                                        </button>
                                    ) : (
                                        <button
                                            disabled={true}
                                            className="calculator__page__button__disabled"
                                        >
                                            Berechnen
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="calculator__mobile__result">
                            <div className="calculator__mobile__result__title">
                                <h2>Dein tägliches Kalorienziel</h2>
                            </div>
                            <div className="calculator__mobile__result__calories">
                                <div className="calculator__mobile__result__calories__circle">
                                    <div className="calculator__mobile__result__calories__info">
                                        <p>Total</p>
                                        <h1>{calories}</h1>
                                        <p>kcal</p>
                                    </div>
                                </div>
                            </div>
                            <div className="calculator__mobile__result__nutriments">
                                <div className="calculator__mobile__result__nutriments__proteins">
                                    <h1>{proteinGrams}g</h1>
                                    <p>Proteine </p>
                                </div>
                                <div className="calculator__mobile__result__nutriments__carbs">
                                    <h1>{carbGrams}g</h1>
                                    <p>Kohlenhydrate </p>
                                </div>
                                <div className="calculator__mobile__result__nutriments__fat">
                                    <h1>{fatGrams}g</h1>
                                    <p>Fette</p>
                                </div>
                            </div>
                            {proteinGrams == 0 ? (
                                ""
                            ) : (
                                <div className="calculator__mobile__result__formula">
                                    <h2>Unsere Formel für dich</h2>
                                    <div className="calculator__mobile__result__formula__info">
                                        <div className="calculator__mobile__result__formula__info__text">
                                            <p>
                                                Probiere diesen Nährstoffbereich:{" "}
                                                <span className="bold">20%-35%</span> Fett,{" "}
                                                <span className="bold"> 10%-35%</span> Proteine,{" "}
                                                <span className="bold">45%-65%</span>{" "}
                                                Kohlenhydrate.
                                            </p>
                                        </div>
                                        <div className="calculator__mobile__result__formula__info__image">
                                            <ExportedImage
                                                src={circleGraph}
                                                alt="Orginal, unoptimized image"
                                                width="200"
                                                height="200"
                                                unoptimized={true}
                                                id="image1"
                                            />
                                        </div>
                                        <div className="calculator__mobile__result__formula__info__text__button">
                                            <button>
                                                <span className="nowrap">Erfahre mehr</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="calculator__mobile__result__buttons">
                                <button
                                    onClick={() => {
                                        setShowMobileResult(false)
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                        })

                                        // Using scrollTop property
                                        // Note: This will scroll the <body> element, adjust accordingly if you have a different scrollable element
                                        document.body.scrollTop = 0 // For Safari
                                        document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE, and Opera
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        reset()
                                        setShowMobileResult(false)

                                        // Using scrollTo method
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth", // This provides a smooth scrolling effect (optional)
                                        })

                                        // Using scrollTop property
                                        // Note: This will scroll the <body> element, adjust accordingly if you have a different scrollable element
                                        document.body.scrollTop = 0 // For Safari
                                        document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE, and Opera
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
}
export default CaloriesCalculator
