import React, { useEffect, useState } from "react"
import Footer from "../hooks/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faChevronLeft,
    faSearch,
    faPlus,
    faPen,
    faXmark,
    faTrash,
} from "@fortawesome/free-solid-svg-icons"
const Foods = (props) => {
    const [showMyFood, setShowMyFood] = useState(props.showMyFood)
    const [showProducts, setShowProducts] = useState(props.showProducts)
    const [showAll, setShowAll] = useState(props.showAll)
    useEffect(() => {
        props.setShowMyFood(showMyFood)
    }, [showMyFood])
    useEffect(() => {
        props.setShowProducts(showProducts)
    }, [showProducts])
    useEffect(() => {
        props.setShowAll(showAll)
    }, [showAll])
    const products = props.products.map((el, index) => {
        return (
            <>
                {index <= 3 || showProducts ? (
                    <div
                        className="nutritionPlaner__page__foods__food"
                        id={showProducts ? "nutritionPlaner__page__foods__food__width" : ""}
                        onClick={() => {
                            props.setFoodSelected(el)
                        }}
                        key={index}
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
                ) : (
                    ""
                )}
                {index == 4 && !showProducts ? <p className="foods__points">...</p> : ""}
            </>
        )
    })
    const myFood = props.myfood.map((el, index) => {
        return (
            <>
                {index <= 3 || showMyFood ? (
                    <div
                        className="nutritionPlaner__page__foods__food"
                        id={showMyFood ? "nutritionPlaner__page__foods__food__width" : ""}
                        onClick={() => {
                            if (!props.editFoods) {
                                props.setFoodSelected(el)
                            }
                        }}
                        key={index}
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
                        {props.editFoods ? (
                            <FontAwesomeIcon
                                alt="icon"
                                icon={faTrash}
                                className="faTrash"
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
                ) : (
                    ""
                )}
                {index == 4 && !showMyFood ? <p className="foods__points">...</p> : ""}
            </>
        )
    })
    const recipes = props.recipes.map((el, index) => {
        return (
            <>
                <div className="nutritionPlaner__page__foods__recipes" key={index}>
                    <div className="nutritionPlaner__page__foods__recipes__img">
                        <img src={el.image}></img>
                    </div>
                    <h1>{el.title}</h1>
                    <h2>{el.calories} Kalorien</h2>
                    <hr></hr>
                    <div className="nutritionPlaner__page__foods__recipes__info">
                        <div>
                            <p>Zeit</p>
                            <h3>{el.time} mins</h3>
                        </div>
                        <div>
                            <p className="text-right">Portionen</p>
                            <h3 className="text-right">{el.portions} Personen</h3>
                        </div>
                    </div>
                </div>
            </>
        )
    })
    return (
        <>
            <div className="nutritionPlaner__page page">
                <div className="nutritionPlaner__page__row nutritionPlaner__page__foods">
                    {showAll || showProducts ? (
                        <div
                            className="nutritionPlaner__page__products"
                            id={showProducts ? "nutritionPlaner__page__products__width" : ""}
                        >
                            {showProducts ? (
                                <FontAwesomeIcon
                                    alt="icon"
                                    icon={faChevronLeft}
                                    className="faReturn"
                                    onClick={() => {
                                        setShowAll(true)
                                        setShowMyFood(false)
                                        setShowProducts(false)
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    alt="icon"
                                    icon={faChevronLeft}
                                    className="faReturn"
                                    onClick={() => {
                                        props.setShowFoods(false)
                                        props.setShowHome(true)
                                    }}
                                />
                            )}

                            <div
                                className="nutritionPlaner__page__title"
                                onClick={() => {
                                    setShowAll(false)
                                    setShowMyFood(false)
                                    setShowProducts(true)
                                }}
                            >
                                <h1>Alle Produkte</h1>
                                {!showProducts ? (
                                    <FontAwesomeIcon
                                        alt="icon"
                                        icon={faSearch}
                                        className="faSearch"
                                    />
                                ) : (
                                    ""
                                )}{" "}
                            </div>
                            <div
                                className="nutritionPlaner__page__foods__foods"
                                id={
                                    showProducts
                                        ? "nutritionPlaner__page__foods__foods__width"
                                        : ""
                                }
                            >
                                {products}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {showAll || showMyFood ? (
                        <div
                            className="nutritionPlaner__page__myfood"
                            id={showMyFood ? "nutritionPlaner__page__products__width" : ""}
                        >
                            {" "}
                            {showMyFood ? (
                                <FontAwesomeIcon
                                    alt="icon"
                                    icon={faChevronLeft}
                                    className="faReturn"
                                    onClick={() => {
                                        setShowAll(true)
                                        setShowMyFood(false)
                                        setShowProducts(false)
                                    }}
                                />
                            ) : (
                                ""
                            )}
                            {!props.editFoods ? (
                                <FontAwesomeIcon
                                    alt="icon"
                                    icon={faPen}
                                    className="faEdit"
                                    onClick={() => {
                                        props.setEditFoods(true)
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    alt="icon"
                                    icon={faPlus}
                                    className="faCancel"
                                    onClick={() => {
                                        props.setEditFoods(false)
                                    }}
                                />
                            )}
                            <FontAwesomeIcon
                                alt="icon"
                                icon={faPlus}
                                className="faPlus"
                                onClick={() => {
                                    props.setShowFoods(false)
                                    props.setShowUpload(true)
                                    props.setEditFoods(false)
                                    props.setShowFoodsCategory("myfood")
                                }}
                            />
                            <div
                                className="nutritionPlaner__page__title"
                                onClick={() => {
                                    setShowAll(false)
                                    setShowMyFood(true)
                                    setShowProducts(false)
                                }}
                            >
                                <h1>All meine Essen</h1>
                                {!showMyFood ? (
                                    <FontAwesomeIcon
                                        alt="icon"
                                        icon={faSearch}
                                        className="faSearch"
                                    />
                                ) : (
                                    ""
                                )}{" "}
                            </div>
                            <div
                                className="nutritionPlaner__page__foods__foods"
                                id={showMyFood ? "nutritionPlaner__page__foods__foods__width" : ""}
                            >
                                {myFood}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {showAll ? (
                        <div className="nutritionPlaner__page__recipes">
                            <h1>Einfach und tolle Rezepte</h1>
                            {
                                <div className="nutritionPlaner__page__recipes__recipes">
                                    {recipes}
                                </div>
                            }{" "}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Foods
