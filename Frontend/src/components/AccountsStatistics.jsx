import React, { useState, useEffect } from 'react'
import ApexCharts from 'react-apexcharts';

import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
const AnimatedDiv = motion.div;

const AccountsStatistics = () => {

    const host = "http://localhost:5000";
    const picturesUrl = `${host}/picture/`;
    const [statsAdmin, setStatsAdmin] = useState([]);
    const [statsCategory, setStatsCategory] = useState([]);

    useEffect(() => {
        const fetchStatsAdmin = async () => {
            var result = await fetch(`${host}/user/stats/admin`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                const data = await fetch(`${host}/refresh`, { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            } else {
                if (result.status === 200) {
                    result.json().then(json => {
                        setStatsAdmin(json);
                        console.log(json)

                    });
                } else {
                    navigate("/E404");
                }
            }
        };



        const fetchStatsCategory = async () => {
            var result = await fetch(`${host}/user/stats/category`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                const data = await fetch(`${host}/refresh`, { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            } else {
                if (result.status === 200) {
                    result.json().then(json => {
                        setStatsCategory(json);
                        console.log(json)

                    });
                } else {
                    navigate("/E404");
                }
            }
        };

        fetchStatsAdmin();
        fetchStatsCategory();

    }, []);

    const pieOptions = {

        colors: ["#1C64F2", "#9061F9",],
        chart: {
            height: 420,
            width: "100%",
            type: "pie",
        },
        stroke: {
            colors: ["white"],
            lineCap: "",
        },
        plotOptions: {
            pie: {
                labels: {
                    show: true,
                },
                size: "100%",
                dataLabels: {
                    offset: -25
                }
            },
        },
        labels: statsAdmin.map(entry=>entry.user_category),
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: "Inter, sans-serif",
            },
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%"
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%"
                },
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },

    };


    const donutOptions = {
        labels: statsCategory.map(entry=>entry.category),
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
        chart: {
            height: 320,
            width: "100%",
            type: "donut",
        },
        stroke: {
            colors: ["transparent"],
            lineCap: "",
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: 20,
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: "Visitors",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                                return `${sum}`
                            },
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: -20,
                            formatter: function (value) {
                                return value
                            },
                        },
                    },
                    size: "80%",
                },
            },
        },
        grid: {
            padding: {
                top: -2,
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value 
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value 
                },
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
    }



    return (
        <div className="overflow-y-scroll p-8 mb-8 flex flex-row gap-4">
            <AnimatedDiv
                className="shadow-md p-8 rounded-lg flex flex-col justify-center items-center gap-4 w-1/2"
                initial={ { opacity: 0, y: -20 } } // Initial animation values
                animate={ { opacity: 1, y: 0 } } // Animation values to reach
                transition={ { duration: 0.5 } } // Animation duration
            >
                <h2>Admins / users distribution</h2>
                <ApexCharts
                    options={ pieOptions }
                    series={ statsCategory.map(entry => entry.user_count) }
                    type="pie"
                    height={ 400 }
                    className="text-lg"
                />
            </AnimatedDiv>

            <AnimatedDiv
                className="shadow-md p-8 rounded-lg flex flex-col justify-center items-center gap-4 w-1/2"
                initial={ { opacity: 0, y: -20 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.5 } }
            >
                <h2>Users distribution by category</h2>
                <ApexCharts
                    options={ donutOptions }
                    series={ statsAdmin.map(entry => entry.user_count) }
                    type="donut"
                    height={ 300 }
                />
            </AnimatedDiv>
        </div>
    );
};

export default AccountsStatistics;
