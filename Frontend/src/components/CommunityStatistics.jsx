import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const CommunityStatistics = () => {
    const host = "http://localhost:5000";
    const [stats, setStats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (endpoint, setDataCallback) => {
            try {
                const result = await fetch(`${host}${endpoint}`, { credentials: "include" });

                if (result.status === 401 || result.status === 403) {
                    const data = await fetch(`${host}/refresh`, { credentials: "include" });
                    if (data.status === 401 || data.status === 403) {
                        navigate("/login");
                    } else {
                        navigate("/home");
                    }
                } else if (result.status === 200) {
                    const json = await result.json();
                    setDataCallback(json);
                } else {
                    navigate("/E404");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData("/communities/stats", setStats);

    }, [navigate]);

    const barOptions = {
        xaxis: {
            categories: stats.map(entry => entry.community_name),
        },
        yaxis: [
            {
                title: {
                    text: 'Likes',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Followers',
                },
            },
        ],
    };

    const series = [
        {
            name: 'Likes',
            data: stats.map(entry => entry.nb_likes),
        },
        {
            name: 'Followers',
            data: stats.map(entry => entry.nb_followers),
        },
    ];

    const animationVariants = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1 },
    };

    return (
        <div className='overflow-y-scroll w-full p-8 flex flex-col justify-center items-center gap-6'>
            <MotionDiv
                className='w-full shadow-md p-8 rounded-lg flex flex-col justify-center items-center gap-4'
                variants={ animationVariants }
                initial='initial'
                animate='animate'
            >
                <h2>Likes and Followers for each community</h2>
                <div className='w-full'>
                    <ApexCharts
                        options={ barOptions }
                        series={ series }
                        type="bar"
                        height={ 400 }
                    />
                </div>
            </MotionDiv>
        </div>
    );
};

export default CommunityStatistics;
