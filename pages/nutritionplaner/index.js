import React from "react"
import { useState, useEffect } from "react"
import NavSettings from "@/back-end/NavSettings"
import NutritionPlaner from "@/Nutritionplaner/NutritionPlaner"
import NutritionPlanerMobile from "@/Nutritionplaner/NutritionPlanerMobile"
import {
    getCurrentDate,
    getDaysInWeek,
    getNextDayInWeek,
    getPreviousDayInWeek,
} from "@/back-end/DateFunctions"
import Foods from "@/Nutritionplaner/Foods"
import FoodsMobile from "@/Nutritionplaner/FoodsMobile"
import FoodsUpload from "@/Nutritionplaner/FoodsUpload"
import FoodsUploadMobile from "@/Nutritionplaner/FoodsUploadMobile"
import PlanerUpload from "@/Nutritionplaner/PlanerUpload"
import PlanerUploadMobile from "@/Nutritionplaner/PlanerUploadMobile"
import FoodsEditMobile from "@/Nutritionplaner/FoodsEditMobile"
import FoodsEdit from "@/Nutritionplaner/FoodsEdit"
const Nutritionplaner = () => {
    /* Nutritionplaner Home Variables for Mobile and PC version */
    const [total, setTotal] = useState({
        daily: {
            calories: 0,
            proteins: 0,
            carbs: 0,
            fat: 0,
            percentage: { calories: 0, fat: 0, proteins: 0, carbs: 0 },
        },
        weekly: {
            calories: 0,
            proteins: 0,
            carbs: 0,
            fat: 0,
            percentage: {
                calories: 0,
                fat: 0,
                proteins: 0,
                carbs: 0,
            },
        },
    })

    const [caloriesCalculator, setCaloriesCalculator] = useState("")
    const [resultsSelector, setResultsSelector] = useState("daily")
    const [showInfo, setShowInfo] = useState(false)
    const [data, setData] = useState([])
    const [foods, setFoods] = useState([])
    const [selectedDate, setSelectedDate] = useState(getCurrentDate())
    const [daysInWeek, setDaysInWeek] = useState([])
    const [dayInWeek, setDayInWeek] = useState(selectedDate)
    const [actualWeek, setActualWeek] = useState(true)
    const [timeSelector, setTimeSelector] = useState("all")
    const [showEditFood, setShowEditFood] = useState("")

    /* Pages */
    const [showHome, setShowHome] = useState(true)
    const [showFoods, setShowFoods] = useState(false)
    const [showFoodsCategory, setShowFoodsCategory] =
        useState("myfood") /* we have myfood and products */

    const [showPlanerUpload, setShowPlanerUpload] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const [foodSelected, setFoodSelected] = useState("")
    const [showEditFoodPage, setShowEditFoodPage] = useState(false)
    const [selectedEditFood, setSelectedEditFood] = useState("")
    /* Foods Variables for Mobile and PC version */
    const [products, setProducts] = useState([
        {
            title: "Apfel",
            name: "Apfel",
            brand: "",
            image: "https://image.jimcdn.com/app/cms/image/transf/dimension=1920x10000:format=jpg/path/s773f0b7acb31ce72/image/i5045e01be101ed17/version/1536146530/roter-apfel-mit-gr%C3%BCnem-blatt-vor-wei%C3%9Fem-hintergrund.jpg",
            weight: 100,
            calories: 52,
            proteins: 0.4,
            fat: 0.3,
            carbs: 25,
        },
        {
            title: "Ceasar Salat mit Hünchen",
            name: "Salat",
            brand: "",
            image: "https://img.chefkoch-cdn.de/rezepte/956701201250684/bilder/1512860/crop-960x540/caesar-salad.jpg",
            weight: 125,
            calories: 338,
            proteins: 20,
            fat: 10,
            carbs: 50,
        },
        {
            title: "Protein Bar Schokolade",
            name: "Riegel",
            brand: "Prozis",
            image: "https://static.sscontent.com/thumb/500/500/products/124/v891918_prozis_protein-snack-30-g_belgian-chocolate_newin_flavor.jpg",
            weight: 35,
            calories: 110,
            proteins: 13,
            fat: 3,
            carbs: 20,
        },
    ])
    const [myfood, setMyfood] = useState([])
    const [recipes, setRecipes] = useState([
        {
            title: "Frischer Salat",
            calories: 60,
            time: 5,
            portion: 2,
            image: "https://cleanfoodcrush.com/wp-content/uploads/2019/03/Healthy-Chopped-Salad-by-Rachel-Maser.jpg",
        },
        {
            title: "Frischer Salat",
            calories: 60,
            time: 5,
            portion: 2,
            image: "https://cleanfoodcrush.com/wp-content/uploads/2019/03/Healthy-Chopped-Salad-by-Rachel-Maser.jpg",
        },
        {
            title: "Frischer Salat",
            calories: 60,
            time: 5,
            portion: 2,
            image: "https://cleanfoodcrush.com/wp-content/uploads/2019/03/Healthy-Chopped-Salad-by-Rachel-Maser.jpg",
        },
    ])
    const [showMyFood, setShowMyFood] = useState(false)
    const [showProducts, setShowProducts] = useState(false)
    const [showAll, setShowAll] = useState(true)
    const [editFoods, setEditFoods] = useState("")
    /* Food Selected On Change */
    useEffect(() => {
        if (foodSelected !== "") {
            setShowFoods(false)
            setShowPlanerUpload(true)
            setShowUpload(false)
        }
    }, [foodSelected])

    /* Upload  */
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
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // This provides a smooth scrolling effect (optional)
        })
    }, [showHome, showFoods])
    useEffect(() => {
        if (selectedEditFood !== "") {
            setShowHome(false)
            setShowEditFoodPage(true)
            setShowEditFood(false)
        }
    }, [selectedEditFood])
    useEffect(() => {
        setMyfood(
            localStorage.getItem("food-user") ? JSON.parse(localStorage.getItem("food-user")) : []
        )

        setData(
            localStorage.getItem("nutrition-data")
                ? JSON.parse(localStorage.getItem("nutrition-data"))
                : []
        )
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            localStorage.setItem("nutrition-data", JSON.stringify(data))
        }
    }, [data])
    useEffect(() => {
        if (myfood.length > 0 || editFoods !== "") {
            localStorage.setItem("food-user", JSON.stringify(myfood))
        }
    }, [myfood])
    return (
        <>
            <NavSettings />
            {showHome ? (
                <>
                    <NutritionPlaner
                        total={total}
                        setTotal={setTotal}
                        caloriesCalculator={caloriesCalculator}
                        setCaloriesCalculator={setCaloriesCalculator}
                        resultsSelector={resultsSelector}
                        setResultsSelector={setResultsSelector}
                        showInfo={showInfo}
                        setShowInfo={setShowInfo}
                        data={data}
                        setData={setData}
                        foods={foods}
                        setFoods={setFoods}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        daysInWeek={daysInWeek}
                        setDaysInWeek={setDaysInWeek}
                        dayInWeek={dayInWeek}
                        setDayInWeek={setDayInWeek}
                        actualWeek={actualWeek}
                        setActualWeek={setActualWeek}
                        timeSelector={timeSelector}
                        setTimeSelector={setTimeSelector}
                        showEditFood={showEditFood}
                        setShowEditFood={setShowEditFood}
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        setSelectedEditFood={setSelectedEditFood}
                    />
                    <NutritionPlanerMobile
                        total={total}
                        setTotal={setTotal}
                        caloriesCalculator={caloriesCalculator}
                        setCaloriesCalculator={setCaloriesCalculator}
                        resultsSelector={resultsSelector}
                        setResultsSelector={setResultsSelector}
                        showInfo={showInfo}
                        setShowInfo={setShowInfo}
                        data={data}
                        setData={setData}
                        foods={foods}
                        setFoods={setFoods}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        daysInWeek={daysInWeek}
                        setDaysInWeek={setDaysInWeek}
                        dayInWeek={dayInWeek}
                        setDayInWeek={setDayInWeek}
                        actualWeek={actualWeek}
                        setActualWeek={setActualWeek}
                        timeSelector={timeSelector}
                        setTimeSelector={setTimeSelector}
                        showEditFood={showEditFood}
                        setShowEditFood={setShowEditFood}
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        setSelectedEditFood={setSelectedEditFood}
                    />
                </>
            ) : (
                ""
            )}
            {showFoods ? (
                <>
                    <Foods
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        products={products}
                        myfood={myfood}
                        setMyfood={setMyfood}
                        recipes={recipes}
                        setShowPlanerUpload={setShowPlanerUpload}
                        setShowUpload={setShowUpload}
                        setShowFoodsCategory={setShowFoodsCategory}
                        setFoodSelected={setFoodSelected}
                        showMyFood={showMyFood}
                        setShowMyFood={setShowMyFood}
                        showProducts={showProducts}
                        setShowProducts={setShowProducts}
                        showAll={showAll}
                        setShowAll={setShowAll}
                        editFoods={editFoods}
                        setEditFoods={setEditFoods}
                    />
                    <FoodsMobile
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        products={products}
                        myfood={myfood}
                        setMyfood={setMyfood}
                        recipes={recipes}
                        setShowPlanerUpload={setShowPlanerUpload}
                        setShowUpload={setShowUpload}
                        setShowFoodsCategory={setShowFoodsCategory}
                        setFoodSelected={setFoodSelected}
                        editFoods={editFoods}
                        setEditFoods={setEditFoods}
                    />
                </>
            ) : (
                ""
            )}
            {showUpload ? (
                <>
                    <FoodsUpload
                        myfood={myfood}
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        setShowFoodsCategory={setShowFoodsCategory}
                        setShowUpload={setShowUpload}
                        setFoodSelected={setFoodSelected}
                        setMyfood={setMyfood}
                        setShowPlanerUpload={setShowPlanerUpload}
                    />
                    <FoodsUploadMobile
                        myfood={myfood}
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        setShowFoodsCategory={setShowFoodsCategory}
                        setShowUpload={setShowUpload}
                        setMyfood={setMyfood}
                    />
                </>
            ) : (
                ""
            )}
            {showPlanerUpload ? (
                <>
                    <PlanerUpload
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        setShowPlanerUpload={setShowPlanerUpload}
                        setShowUpload={setShowUpload}
                        foodSelected={foodSelected}
                        setFoodSelected={setFoodSelected}
                        selectedDate={selectedDate}
                        data={data}
                        setData={setData}
                        setFoods={setFoods}
                        foods={foods}
                    />
                    <PlanerUploadMobile
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        setShowPlanerUpload={setShowPlanerUpload}
                        setShowUpload={setShowUpload}
                        foodSelected={foodSelected}
                        setFoodSelected={setFoodSelected}
                        selectedDate={selectedDate}
                        data={data}
                        setData={setData}
                        setFoods={setFoods}
                    />
                </>
            ) : (
                ""
            )}

            {showEditFoodPage ? (
                <>
                    <FoodsEdit
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        setShowPlanerUpload={setShowPlanerUpload}
                        setShowUpload={setShowUpload}
                        selectedEditFood={selectedEditFood}
                        setShowEditFoodPage={setShowEditFoodPage}
                        data={data}
                        setData={setData}
                        selectedDate={selectedDate}
                    />
                    <FoodsEditMobile
                        setShowFoods={setShowFoods}
                        setShowHome={setShowHome}
                        setShowPlanerUpload={setShowPlanerUpload}
                        setShowUpload={setShowUpload}
                        selectedEditFood={selectedEditFood}
                        setShowEditFoodPage={setShowEditFoodPage}
                        data={data}
                        setData={setData}
                        selectedDate={selectedDate}
                    />
                </>
            ) : (
                ""
            )}
        </>
    )
}
export default Nutritionplaner
