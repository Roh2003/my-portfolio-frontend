import React from 'react'
import { Timeline } from './ui/timeline'



function Experience() {

    const data = [{
        id: 1,
        title: 'full stack developer',
        company: 'Google',
        location: 'Mountain View, CA',
        description: 'Developed and maintained software applications using Java and Spring Boot.',
        startDate: '2020-01-01',
        endDate: '2022-01-01'
    },
    {
        id: 2,
        title: 'Software Engineer',
        company: 'Google',
        location: 'Mountain View, CA',
        description: 'Developed and maintained software applications using Java and Spring Boot.',
        startDate: '2020-01-01',
        endDate: '2022-01-01'
    },
    ]
    return (
        <>
        <div>
            <Timeline data={data}  />
        </div>
        </>
    )
}

export default Experience
