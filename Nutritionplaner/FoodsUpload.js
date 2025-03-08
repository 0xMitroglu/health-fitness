import React, { useEffect, useState } from "react"
import Footer from "../hooks/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons"
import ExportedImage from "next-image-export-optimizer"
import uploadImage from "../public/imageUpload.png"
import pako from "pako"
const FoodsUpload = (props) => {
    const [uploadedImage, setUploadedImage] = useState("")
    const [proteins, setProteins] = useState("")
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [weight, setWeight] = useState("")
    const [calories, setCalories] = useState("")
    const [carbs, setCarbs] = useState("")
    const [fat, setFat] = useState("")
    const [proteinsPercentage, setProteinsPercentage] = useState("")
    const [carbsPercentage, setCarbsPercentage] = useState("")
    const [fatPercentage, setFatPercentage] = useState("")

    useEffect(() => {
        if (weight !== "") {
            if (proteins !== "") {
                let proteins100g = (proteins / weight) * 100
                let percentageProteins = (proteins100g / 30) * 100
                setProteinsPercentage(
                    percentageProteins > 100 ? 100 : parseInt(percentageProteins)
                )
            }
            if (carbs !== "") {
                let carbs100g = (carbs / weight) * 100
                let percentageCarbs = (carbs100g / 70) * 100
                setCarbsPercentage(percentageCarbs > 100 ? 100 : parseInt(percentageCarbs))
            }
            if (fat !== "") {
                let fat100g = (fat / weight) * 100
                let percentageFat = (fat100g / 50) * 100
                setFatPercentage(percentageFat > 100 ? 100 : parseInt(percentageFat))
            }
        }
    }, [proteins, carbs, fat, weight])

    const myFood = props.myfood.map((el, index) => {
        return (
            <>
                <div
                    className="nutritionPlaner__page__foods__food"
                    onClick={() => {
                        props.setShowUpload(false)
                        props.setShowPlanerUpload(true)
                        props.setFoodSelected(el)
                    }}
                >
                    <div className="nutritionPlaner__page__foods__food__img">
                        <img src={el.image}></img>
                    </div>
                    <div className="nutritionPlaner__page__foods__food__info">
                        <h2>{el.title}</h2>
                        <p>
                            {el.calories}kcal * {el.name} ({el.weight}g) {el.brand}
                        </p>
                    </div>
                </div>
            </>
        )
    })
    async function isValidImageUrl(url) {
        /*     console.log(url)
        try {
            const response = await fetch(url, { method: "HEAD" })

            const contentType = response.headers.get("Content-Type")
            const imageTrue = contentType.startsWith("image/")
            console.log(response, imageTrue)

            return response.ok && imageTrue ? true : false
        } catch (error) {
            console.log(error)
            return false
        } */
        return true
    }
    const isValidImage = (url) => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
            img.src = url
        })
    }

    return (
        <>
            <div className="nutritionPlaner__page page">
                <div className="nutritionPlaner__page__foodsUpload">
                    <div className="nutritionPlaner__page__sidebar">
                        <FontAwesomeIcon
                            alt="icon"
                            icon={faChevronLeft}
                            className="faReturn"
                            onClick={() => {
                                props.setShowFoods(true)
                                props.setShowUpload(false)
                                props.setShowFoodsCategory("")
                            }}
                        />
                        <div className="nutritionPlaner__page__sidebar__title">
                            <h1>Mein Essen</h1>
                            {/*     <FontAwesomeIcon alt="icon" icon={faSearch} className="faSearch" /> */}
                        </div>
                        <div className="nutritionPlaner__page__sidebar__foods">{myFood}</div>
                    </div>
                    <div className="nutritionPlaner__page__uploadBox">
                        <div className="nutritionPlaner__page__uploadBox__text">
                            <div className="nutritionPlaner__page__uploadBox__text__info">
                                <h2>Essen Info ausfüllen</h2>
                                <div className="nutritionPlaner__page__uploadBox__text__info__inputText">
                                    <p>Titel</p>
                                    <input
                                        placeholder="zb. Ceasar Salat mit Hünchen"
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                    ></input>
                                </div>
                                <div className="nutritionPlaner__page__uploadBox__text__info__inputText">
                                    <p>Kategorie</p>
                                    <input
                                        placeholder="zb. Salat"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    ></input>
                                </div>
                                <div className="nutritionPlaner__page__uploadBox__text__info__inputText">
                                    <p>Marke</p>
                                    <input
                                        placeholder="Optional"
                                        onChange={(e) => {
                                            setBrand(e.target.value)
                                        }}
                                    ></input>
                                </div>
                                <div className="nutritionPlaner__page__uploadBox__text__info__inputAmount">
                                    <p>Nährwertinformationen per</p>{" "}
                                    <input
                                        onChange={(e) => {
                                            setWeight(e.target.value)
                                        }}
                                    ></input>{" "}
                                    <div>g</div>
                                </div>
                                <div className="nutritionPlaner__page__uploadBox__text__info__inputValue">
                                    <p>Kalorien</p>{" "}
                                    <input
                                        id="inputValue__calories"
                                        onChange={(e) => {
                                            setCalories(e.target.value)
                                        }}
                                    ></input>
                                    <div>kcal</div>
                                </div>
                                <div className="nutritionPlaner__page__uploadBox__text__info__inputValue">
                                    <p>Proteine</p>{" "}
                                    <input
                                        onChange={(e) => {
                                            setProteins(e.target.value)
                                        }}
                                    ></input>
                                    <div>g</div>
                                </div>
                                <div className="nutritionPlaner__page__uploadBox__text__info__inputValue">
                                    <p>Kohlenhydrate</p>{" "}
                                    <input
                                        onChange={(e) => {
                                            setCarbs(e.target.value)
                                        }}
                                    ></input>
                                    <div>g</div>
                                </div>
                                <div className="nutritionPlaner__page__uploadBox__text__info__inputValue">
                                    <p>Fett</p>{" "}
                                    <input
                                        onChange={(e) => {
                                            setFat(e.target.value)
                                        }}
                                    ></input>
                                    <div>g</div>
                                </div>
                            </div>
                            <div className="nutritionPlaner__page__uploadBox__text__image">
                                <h2>Bild auswählen</h2>
                                <div className="nutritionPlaner__page__uploadBox__text__image__input">
                                    <input
                                        type="text"
                                        onChange={async (e) => {
                                            const isImageValid = await isValidImage(e.target.value)
                                            if (isImageValid) {
                                                setUploadedImage(e.target.value)
                                            } else {
                                                setUploadedImage("")
                                            }
                                        }}
                                        placeholder="Bild URL (Optional)"
                                    />
                                    {uploadedImage !== "" ? (
                                        <img src={uploadedImage}></img>
                                    ) : (
                                        <img src="https://cdn-icons-png.flaticon.com/512/135/135161.png"></img>
                                    )}
                                </div>
                                <div className="nutritionPlaner__page__uploadBox__text__image__display">
                                    <h2>Review Essen</h2>
                                    <div
                                        className="nutritionPlaner__page__uploadBox__text__image__display__proteins"
                                        style={{
                                            background: `conic-gradient(rgba(196, 52, 58, 1) ${
                                                proteinsPercentage * 3.6 + "deg"
                                            }, rgba(196, 52, 58, 0.1) 0deg)`,
                                        }}
                                    >
                                        <div className="nutritionPlaner__page__uploadBox__text__image__display__proteins__hide">
                                            <div
                                                className="nutritionPlaner__page__uploadBox__text__image__display__carbs"
                                                style={{
                                                    background: `conic-gradient(rgba(196, 52, 58, 0.7) ${
                                                        carbsPercentage * 3.6 + "deg"
                                                    }, rgba(196, 52, 58, 0.1) 0deg)`,
                                                }}
                                            >
                                                <div className="nutritionPlaner__page__uploadBox__text__image__display__carbs__hide">
                                                    <div
                                                        className="nutritionPlaner__page__uploadBox__text__image__display__fat"
                                                        style={{
                                                            background: `conic-gradient(rgba(196, 52, 58, 0.4) ${
                                                                fatPercentage * 3.6 + "deg"
                                                            }, rgba(196, 52, 58, 0.1) 0deg)`,
                                                        }}
                                                    >
                                                        <div className="nutritionPlaner__page__uploadBox__text__image__display__fat__hide">
                                                            {/* <div className="nutritionPlaner__page__uploadBox__text__image__display__hideCircle">

                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nutritionPlaner__page__uploadBox__text__image__display__legend">
                                        <p id="proteinsLegend">Proteins</p>{" "}
                                        <p id="carbsLegend">Kohlenhydrate</p>
                                        <p id="fatLegend">Fett</p>
                                    </div>
                                </div>
                                {title !== "" &&
                                name !== "" &&
                                weight !== "" &&
                                calories !== "" &&
                                proteins !== "" &&
                                carbs !== "" &&
                                fat !== "" ? (
                                    <button
                                        onClick={() => {
                                            let array = props.myfood
                                            const obj = {
                                                title: title,
                                                name: name,
                                                brand: brand,
                                                image:
                                                    uploadedImage !== "" &&
                                                    isValidImageUrl(uploadedImage)
                                                        ? uploadedImage
                                                        : "https://cdn-icons-png.flaticon.com/512/135/135161.png",
                                                weight: parseInt(weight),
                                                calories: parseInt(calories),
                                                proteins: parseInt(proteins),
                                                fat: parseInt(fat),
                                                carbs: parseInt(carbs),
                                            }
                                            array.unshift(obj)
                                            props.setShowFoods(true)
                                            props.setShowUpload(false)
                                            props.setMyfood([...array])
                                        }}
                                    >
                                        Speichern
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
} /*  <input type="file" id="imageInput" accept="image/*" />
<button
    type="submit"
    onClick={() => {
        const form = document.getElementById("imageForm")
        const imageInput = document.getElementById("imageInput")
        event.preventDefault()

        // Get the uploaded image file
        const imageFile = imageInput.files[0]

        if (imageFile) {
            // Convert the image file to a data URL
            const reader = new FileReader()
            reader.onload = function (e) {
                const dataURL = e.target.result

                // Save the dataURL to local storage
                localStorage.setItem("uploadedImage", dataURL)
                alert("Image uploaded and saved to local storage!")
            }
            reader.readAsDataURL(imageFile)
        } else {
            alert("Please select an image to upload.")
        }
    }}
>
    Upload
</button> */
export default FoodsUpload
