import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const AnimatedDiv = motion.div;

const ArticlesStatistics = () => {
    const host = "http://localhost:5000";
    const [stats, setStats] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            var result = await fetch(`${host}/articles/stats`, { credentials: "include" });
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
                        setStats(json);
                        setIsLoaded(true); // Data is loaded, trigger animation
                        console.log(json);
                    });
                } else {
                    navigate("/E404");
                }
            }
        };

        fetchStats();
    }, []);

    const areaOptions = {
        xaxis: {
            categories: stats.map(entry => entry.community_name),
        },
    };

  

    return (
        <div className='overflow-y-scroll w-full p-8 flex flex-col justify-center items-center gap-6' >
            <AnimatedDiv
                className='w-full shadow-md p-8 rounded-lg flex flex-col justify-center items-center gap-4'
                initial={ { opacity: 0 } }
                animate={ { opacity: isLoaded ? 1 : 0 } } // Animate opacity when data is loaded
                transition={ { duration: 0.5 } }
            >
                
                    <h2>Number of articles per community</h2>
                    <ApexCharts
                    className='w-full'
                        options={ areaOptions }
                        series={ [{ name: 'Number of Articles', data: stats.map(entry => entry.num_articles) }] }
                        type="area"
                        height={ 400 }
                        width='100%' // Set the width to 100%
                    />
               
            </AnimatedDiv>
        </div>
    );
};

export default ArticlesStatistics;
