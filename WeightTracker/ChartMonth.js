import React, { useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Tooltip,
    Title,
    Legend,
} from "chart.js"
import { useState } from "react"
import { title } from "process"
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Tooltip,
    Legend,
    Title
)
const ChartMonth = (props) => {
    const [dataWeight, setDataWeight] = useState(props.monthWeightData)
    const [labelsWeight, setLabelsWeight] = useState(props.monthLabel)

    useEffect(() => {
        setDataWeight(props.monthWeightData)
        setLabelsWeight(props.monthLabel)
    }, [props.monthWeightData, props.monthLabel])
    const minNumberFunction = () => {
        const nonNaNValues = dataWeight.filter((value) => !isNaN(value))
        let minNumber = Math.min(...nonNaNValues)
        if (minNumber % parseInt(minNumber) <= 0.5) {
            return parseInt(minNumber) - 1
        } else {
            return parseInt(minNumber)
        }
    }
    const maxNumberFunction = () => {
        const nonNaNValues = dataWeight.filter((value) => !isNaN(value))
        let maxNumber = Math.max(...nonNaNValues)
        if (maxNumber % parseInt(maxNumber) >= 0.5) {
            return parseInt(maxNumber) + 2
        } else {
            return parseInt(maxNumber) + 1
        }
    }
    const [minNumber, setMinNumber] = useState(minNumberFunction())
    const [maxNumber, setMaxNumber] = useState(maxNumberFunction())

    const [stepSize, setStepSize] = useState(1)
    useEffect(() => {
        setMinNumber(minNumberFunction())
        setMaxNumber(maxNumberFunction())

        if ((maxNumberFunction() - minNumberFunction()) / 8 >= 1) {
            setStepSize(2)
        } else {
            setStepSize(1)
        }
    }, [dataWeight])
    useEffect(() => {
        setMaxNumber(
            maxNumberFunction() % 2 == 0 && stepSize == 2
                ? maxNumberFunction(9)
                : stepSize == 2
                ? maxNumberFunction() + 1
                : maxNumberFunction()
        )
        setMinNumber(
            minNumberFunction() % 2 == 0 && stepSize == 2
                ? minNumberFunction()
                : stepSize == 2
                ? minNumberFunction() - 1
                : minNumberFunction()
        )
    }, [stepSize, dataWeight])
    const data = {
        labels: labelsWeight,

        datasets: [
            {
                label: "Weight",
                data: dataWeight,
                backgroundColor: "transparent",
                fill: true,
                borderJoinStyle: "round",
                borderWidth: 2,
                borderColor: "rgba(196, 52, 58, 0.9)",
                pointBackgroundColor: "rgba(196, 52, 58, 0.9)",
                pointRadius: 2,
                pointHoverRadius: 4,
                tension: 0.3,
                fill: true,
            },
        ],
    }
    const options = {
        spanGaps: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                // Disable the on-canvas tooltip
                displayColors: false,
                backgroundColor: "#d7d7d7",
                titleColor: "black",
                bodyColor: "black",
                yAlign: "top",
                callbacks: {
                    title: (title) => {
                        if (title[0].label == "M") {
                            return "Montag"
                        } else if (title[0].label == "D") {
                            return "Dienstag"
                        } else if (title[0].label == "M") {
                            return "Mittwoch"
                        } else if (title[0].label == "D") {
                            return "Donnerstag"
                        } else if (title[0].label == "F") {
                            return "Freitag"
                        } else if (title[0].label == "S") {
                            return "Samstag"
                        } else if (title[0].label == "S") {
                            return "Sonntag"
                        }
                    },
                    beforeBody: () => {},
                    labelColor: () => {
                        return undefined
                    },
                    label: function (context) {
                        let label = context.dataset.label || ""

                        if (label) {
                            label = "Gewicht: " + context.parsed.y + "kg"
                        }
                        return label
                    },
                },
            },
        },
        scales: {
            x: {
                position: "top",
                border: {
                    display: false,
                },
                grid: {
                    display: false, // Hide x-axis grid lines
                },
                ticks: {
                    padding: 20,
                    display: true, // Hide x-axis ticks
                    font: {
                        size: 19,
                        weight: "bold",
                    },
                    color: "black",
                    callback: (value, index) => {
                        if (
                            index === 0 ||
                            index === labelsWeight.length - 1 ||
                            index === parseInt((labelsWeight.length - 1) / 2) ||
                            index === parseInt((labelsWeight.length - 1) / 4) ||
                            index === parseInt(((labelsWeight.length - 1) / 4) * 3)
                        ) {
                            return value + 1 // Hide the first and second labels
                        }
                    },
                },
            },

            y: {
                position: "right",
                min: minNumber,
                max: maxNumber,
                grid: {
                    color: "#d7d7d7",
                },

                ticks: {
                    stepSize: stepSize,
                    callback: (value, index) => {
                        if (
                            index === 0 ||
                            index === parseInt((maxNumber - minNumber) / stepSize)
                        ) {
                            return "" // Hide the first and second labels
                        }
                        return value + "kg" // Show other labels
                    },
                    color: "black",
                    font: {
                        size: 16,
                        family: "Lexend, Arial",
                        weight: "lighter",
                    },
                    padding: 20,
                },
                border: {
                    /* dash: [10], */
                    display: false,
                },
            },
        },
    }
    return <Line data={data} options={options} />
}
export default ChartMonth
