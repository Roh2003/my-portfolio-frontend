"use client"

import { motion } from "framer-motion"
import React from "react"

interface Experience {
  role: string
  company: string
  location: string
  description: string
  startDate: string
  endDate: string
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="relative z-10 py-20 px-4 bg-gradient-to-b from-purple-900/50 to-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">My Experience</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">My professional journey and work experience</p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-purple-400 to-yellow-400 transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-slate-900 transform md:-translate-x-2 z-10 shadow-lg">
                  <div className="absolute inset-1 bg-yellow-300 rounded-full animate-pulse"></div>
                </div>

                {/* Content card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                  <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 hover:shadow-purple-500/20">
                    {/* Date badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-600/20 border border-purple-400/30 mb-4">
                      <span className="text-sm font-medium text-purple-300">
                        {experience.startDate} - {experience.endDate}
                      </span>
                    </div>

                    {/* Role and company */}
                    <h3 className="text-xl font-bold text-white mb-2">{experience.role}</h3>
                    <div className="flex items-center text-yellow-400 mb-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-semibold">{experience.company}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-400 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{experience.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">{experience.description}</p>

                    {/* Decorative element */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full opacity-60"></div>
                  </div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>

          {/* Timeline end decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-4 md:left-1/2 bottom-0 w-6 h-6 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-full transform md:-translate-x-3 shadow-lg"
          >
            <div className="absolute inset-1 bg-gradient-to-br from-yellow-300 to-purple-400 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
