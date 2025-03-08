import "../styles/styles.css"
import "../styles/calculator.css"
import "../styles/nutritionplaner.css"
import "../styles/footer.css"
import "../styles/nutritionplanerFoods.css"
import "../styles/foodsUpload.css"
import "../styles/planerUpload.css"
import "../styles/weighttracker.css"
import "../styles/tabata.css"
import Navbar from "@/hooks/Navbar"
import Head from "next/head"

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Health-Fitness</title>
                <meta name="description" content="All about HEALTH and FITNESS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <div className="body">
                <Navbar />
                <Component {...pageProps} />
            </div>
        </>
    )
}
