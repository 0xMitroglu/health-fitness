import React, { useEffect, useState } from "react"
import Footer from "../hooks/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faSearch, faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
const FoodsMobile = (props) => {
    const [selectedFilter, setSelectedFilter] = useState("myfood")
    const [showAllFoods, setShowAllFoods] = useState(false)
    const [allFoods, setAllFoods] = useState([])
    useEffect(() => {
        const layer = document.querySelector(".nutritionPlaner__page__mobile__choose__layer")
        if (selectedFilter == "products") {
            layer.style.display = "block"
            layer.style.left = "0px"
        } else if (selectedFilter == "myfood") {
            layer.style.display = "block"
            layer.style.left = "33%"
        } else if (selectedFilter == "recipes") {
            layer.style.display = "block"
            layer.style.left = "67%"
        }
        if (selectedFilter !== "") {
            setShowAllFoods(false)
        }
    }, [selectedFilter])
    const myFood = props.myfood.map((el, index) => {
        return (
            <>
                <div
                    className="nutritionPlaner__page__mobile__foods__food"
                    key={index}
                    onClick={() => {
                        if (!props.editFoods) {
                            props.setFoodSelected(el)
                        }
                    }}
                >
                    <div className="nutritionPlaner__page__mobile__foods__food__img">
                        <img src={el.image}></img>
                    </div>
                    <div className="nutritionPlaner__page__mobile__foods__food__info">
                        <h2>{el.title}</h2>
                        <p>
                            {el.calories}kcal * {el.name} ({el.weight}g) {el.brand}
                        </p>
                    </div>
                    {props.editFoods ? (
                        <FontAwesomeIcon
                            alt="icon"
                            icon={faTrash}
                            className="faTrashMobile"
                            onClick={async () => {
                                let array = props.myfood
                                let newArray = []
                                for (let i = 0; i < array.length; i++) {
                                    const item = array[i]

                                    if (
                                        item.brand === el.brand &&
                                        item.title === el.title &&
                                        item.name === el.name &&
                                        item.image === el.image &&
                                        item.weight === el.weight &&
                                        item.calories === el.calories &&
                                        item.proteins === el.proteins &&
                                        item.fat === el.fat &&
                                        item.carbs === el.carbs
                                    ) {
                                        console.log("Found")
                                    } else {
                                        newArray.push(item)
                                    }
                                }
                                await props.setMyfood([...newArray])
                                if (newArray.length == 0) {
                                    props.setEditFoods("")
                                }
                            }}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </>
        )
    })
    const products = props.products.map((el, index) => {
        return (
            <>
                <div
                    className="nutritionPlaner__page__mobile__foods__food"
                    key={index}
                    onClick={() => {
                        props.setFoodSelected(el)
                    }}
                >
                    <div className="nutritionPlaner__page__mobile__foods__food__img">
                        <img src={el.image}></img>
                    </div>
                    <div className="nutritionPlaner__page__mobile__foods__food__info">
                        <h2>{el.title}</h2>
                        <p>
                            {el.calories}kcal * {el.name} ({el.weight}g) {el.brand}
                        </p>
                    </div>
                </div>
            </>
        )
    })

    const recipes = props.recipes.map((el, index) => {
        return (
            <>
                <div className="nutritionPlaner__page__mobile__foods__recipes" key={index}>
                    <div className="nutritionPlaner__page__mobile__foods__recipes__img">
                        <img src={el.image}></img>
                    </div>
                    <h1>{el.title}</h1>
                    <h2>{el.calories} Kalorien</h2>
                    <hr></hr>
                    <div className="nutritionPlaner__page__mobile__foods__recipes__info">
                        <div>
                            <p>Zeit</p>
                            <h3>{el.time} mins</h3>
                        </div>
                        <div>
                            <p className="text-right">Portionen</p>
                            <h3 className="text-right">{el.portion} Personen</h3>
                        </div>
                    </div>
                </div>
            </>
        )
    })
    const allFoodsMap = allFoods.map((el, index) => {
        return (
            <>
                <div
                    className="nutritionPlaner__page__mobile__foods__food"
                    key={index}
                    onClick={() => {
                        props.setFoodSelected(el)
                    }}
                >
                    <div className="nutritionPlaner__page__mobile__foods__food__img">
                        <img src={el.image}></img>
                    </div>
                    <div className="nutritionPlaner__page__mobile__foods__food__info">
                        <h2>{el.title}</h2>
                        <p>
                            {el.calories}kcal * {el.name} ({el.weight}g) {el.brand}
                        </p>
                    </div>
                </div>
            </>
        )
    })
    const sortArray = (array1, array2) => {
        const combinedArray = [...array1, ...array2] // Combine array1 and array2 into one big array
        combinedArray.sort((a, b) => {
            console.log(a, b)
            // Sort by alphabet using 'title' property
            const titleA = a.title.toUpperCase() // Convert to uppercase for case-insensitive sorting
            const titleB = b.title.toUpperCase()
            if (titleA < titleB) {
                return -1
            }
            if (titleA > titleB) {
                return 1
            }
            return 0
        })
        return combinedArray
    }
    useEffect(() => {
        if (showAllFoods) {
            setSelectedFilter("")
            const layer = document.querySelector(".nutritionPlaner__page__mobile__choose__layer")
            layer.style.display = "none"
            setAllFoods(sortArray(props.products, props.myfood))
        }
    }, [showAllFoods])
    return (
        <>
            <div className="nutritionPlaner__page__mobile page">
                <div className="nutritionPlaner__page__mobile__foods__row nutritionPlaner__page__foods">
                    <div className="nutritionPlaner__page__mobile__products">
                        <FontAwesomeIcon
                            alt="icon"
                            icon={faChevronLeft}
                            className="faReturnMobile"
                            onClick={() => {
                                props.setShowFoods(false)
                                props.setShowHome(true)
                            }}
                        />
                        <div
                            className="nutritionPlaner__page__mobile__title"
                            onClick={() => {
                                setShowAllFoods(true)
                            }}
                        >
                            <h1>Alle Essen</h1>
                            <FontAwesomeIcon alt="icon" icon={faSearch} className="faSearch" />
                        </div>
                    </div>
                    <div className="nutritionPlaner__page__mobile__choose">
                        <button
                            onClick={() => {
                                setSelectedFilter("products")
                            }}
                            className={
                                selectedFilter == "products"
                                    ? "nutritionPlaner__page__mobile__choose__selected"
                                    : ""
                            }
                        >
                            Produkte
                        </button>
                        <button
                            onClick={() => {
                                setSelectedFilter("myfood")
                            }}
                            className={
                                selectedFilter == "myfood"
                                    ? "nutritionPlaner__page__mobile__choose__selected"
                                    : ""
                            }
                        >
                            Mein Essen
                        </button>
                        <button
                            onClick={() => {
                                setSelectedFilter("recipes")
                            }}
                            className={
                                selectedFilter == "recipes"
                                    ? "nutritionPlaner__page__mobile__choose__selected"
                                    : ""
                            }
                        >
                            Rezepte
                        </button>
                        {/* hi */}
                        <div className="nutritionPlaner__page__mobile__choose__layer"></div>
                    </div>
                    {selectedFilter == "myfood" ? (
                        <div className="faPlusMobileDiv">
                            <p>Hinzufügen</p>{" "}
                            {!props.editFoods ? (
                                <FontAwesomeIcon
                                    alt="icon"
                                    icon={faPen}
                                    className="faEditMobile"
                                    onClick={() => {
                                        props.setEditFoods(true)
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    alt="icon"
                                    icon={faPlus}
                                    className="faCancelMobile"
                                    onClick={() => {
                                        props.setEditFoods(false)
                                    }}
                                />
                            )}
                            <FontAwesomeIcon
                                alt="icon"
                                icon={faPlus}
                                className="faPlusMobile"
                                onClick={() => {
                                    props.setShowFoods(false)
                                    props.setShowUpload(true)
                                    props.setShowFoodsCategory("myfood")
                                }}
                            />
                        </div>
                    ) : (
                        <div className="marginFoods"></div>
                    )}
                    <div className="nutritionPlaner__page__mobile__foods">
                        {showAllFoods ? (
                            <>{allFoodsMap}</>
                        ) : selectedFilter == "myfood" ? (
                            <>{myFood}</>
                        ) : selectedFilter == "products" ? (
                            products
                        ) : selectedFilter == "recipes" ? (
                            <div className="nutritionPlaner__page__mobile__recipes__recipes">
                                {recipes}
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
export default FoodsMobile
