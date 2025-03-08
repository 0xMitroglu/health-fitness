import Head from "next/head"
import Image from "next/image"
/* Hooks */
import Navbar from "@/hooks/Navbar"
import HomePage from "@/hooks/HomePage"
import NutritionPlaner from "@/Nutritionplaner/NutritionPlaner"
import { useEffect, useState } from "react"
import ExportedImage from "next-image-export-optimizer"
import CaloriesCalculator from "@/hooks/CaloriesCalculator"
export default function Home() {
    useEffect(() => {
        const body = document.querySelector(".body")
        body.style.color = "white"
    }, [])
    return (
        <>
            <HomePage />
            <div className="container">
                <a href="https://github.com/0xMitroglu?tab=repositories" target="_blank">
                    Github
                </a>
            </div>
        </>
    )
}
