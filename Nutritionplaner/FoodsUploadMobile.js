import React, { useEffect, useState } from "react"
import Footer from "../hooks/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons"
import ExportedImage from "next-image-export-optimizer"
import uploadImage from "../public/imageUpload.png"

const FoodsUploadMobile = (props) => {
    const [uploadedImage, setUploadedImage] = useState("")
    const [imageUpdated, setImageUpdated] = useState(false)
    const [proteins, setProteins] = useState("")
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [weight, setWeight] = useState("")
    const [calories, setCalories] = useState("")
    const [carbs, setCarbs] = useState("")
    const [fat, setFat] = useState("")

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
            <div className="nutritionPlaner__page__mobile page">
                <div className="nutritionPlaner__page__mobile__foods__row nutritionPlaner__page__foods">
                    <div className="nutritionPlaner__page__mobile__uploadBox">
                        {" "}
                        <FontAwesomeIcon
                            alt="icon"
                            icon={faChevronLeft}
                            className="faReturnMobile"
                            onClick={() => {
                                props.setShowFoods(true)
                                props.setShowUpload(false)
                                props.setShowFoodsCategory("")
                            }}
                        ></FontAwesomeIcon>{" "}
                        <div className="nutritionPlaner__page__mobile__uploadBox__title">
                            <h2>Essen Info ausfüllen</h2>
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__image__image">
                            {uploadedImage !== "" ? (
                                <img src={uploadedImage}></img>
                            ) : (
                                <img src="https://cdn-icons-png.flaticon.com/512/135/135161.png"></img>
                            )}
                        </div>
                        <h3 className="nutritionPlaner__page__mobile__uploadBox__text__image__image__title">
                            {uploadedImage !== "" ? <>Ausgewähltes Bild</> : <> Standard Bild</>}
                        </h3>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputText">
                            <p>Titel</p>
                            <input
                                placeholder="zb. Ceasar Salat mit Hünchen"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            ></input>
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputText">
                            <p>Kategorie</p>
                            <input
                                placeholder="zb. Salat"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            ></input>
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputText">
                            <p>Marke</p>
                            <input
                                placeholder="Optional"
                                onChange={(e) => {
                                    setBrand(e.target.value)
                                }}
                            ></input>
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputText">
                            <p>Bild</p>
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
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputAmount">
                            <p>Nährwertinformationen per</p>{" "}
                            <input
                                onChange={(e) => {
                                    setWeight(e.target.value)
                                }}
                                type="number"
                            ></input>{" "}
                            <div>g</div>
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputValue">
                            <p>Kalorien</p>{" "}
                            <input
                                type="number"
                                id="inputValue__calories"
                                onChange={(e) => {
                                    setCalories(e.target.value)
                                }}
                            ></input>
                            <div>kcal</div>
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputValue">
                            <p>Proteine</p>{" "}
                            <input
                                type="number"
                                onChange={(e) => {
                                    setProteins(e.target.value)
                                }}
                            ></input>
                            <div>g</div>
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputValue">
                            <p>Kohlenhydrate</p>{" "}
                            <input
                                type="number"
                                onChange={(e) => {
                                    setCarbs(e.target.value)
                                }}
                            ></input>
                            <div>g</div>
                        </div>
                        <div className="nutritionPlaner__page__mobile__uploadBox__text__info__inputValue">
                            <p>Fett</p>{" "}
                            <input
                                type="number"
                                onChange={(e) => {
                                    setFat(e.target.value)
                                }}
                            ></input>
                            <div>g</div>
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
                                            uploadedImage !== ""
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
                <Footer />
            </div>
        </>
    )
}
export default FoodsUploadMobile
