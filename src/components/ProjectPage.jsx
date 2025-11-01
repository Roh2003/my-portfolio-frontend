import React from 'react';
import { motion } from 'framer-motion';
import {DraggableCardBody , DraggableCardContainer} from './ui/dragablecard'

const ProjectPage = () => {
  const projects = [
    {
      name: 'ScaleUp.in',
      className : "w-[900px] h-20 ",
      description: 'This is An Ai Powered SAAS project which provides differents type of features to customers',
      image: './image.png',
      link: 'https://example.com/project3',
    },
    {
      name: 'ReadAura.in',
      description: 'This is An Fully Functional Book Recommended system which provides books to user sas per their requirements.',
      image: './readaura.png',
      link: 'https://example.com/project3',
    },
    {
      name: 'TravelOne',
      description: 'This Is My Latest React Web Development Project Which i Made Using MERN Stack.',
      image: 'rajasthan.jpg',
      link: 'https://travel-buddy-roan.vercel.app/',
    },
    {
      name: 'SpaceSnap',
      description: 'This Is My First Ever Project That i had build when i started my Web development journey.',
      image: './pic21.jpg',
      link: 'https://example.com/project2',
    },
    {
      name: 'Zenvaitality',
      description: 'This is a yoga and Health Management project which i made using python and python verious libreries.',
      image: './yoga.jpg',
      link: 'https://example.com/project3',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 pb-24">

      
      <h1 className="text-4xl font-bold text-white mb-8 text-center py-10">My Projects</h1>

      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        If its your first day at Fight Club, you have to fight.
      </p>
      {projects.map((item) => (
       <DraggableCardBody className="w-full max-w-4xl h-56 rounded-xl bg-transparent shadow-lg overflow-hidden flex flex-col items-center justify-center gap-4 p-4 border border-neutral-700">
       <img
         src={item.image}
         alt={item.name}
         className="w-full h-40 object-cover rounded-lg"
       />
       <h3 className="text-xl font-bold text-white text-center">
         {item.name}
       </h3>
       <p className="text-neutral-300 text-center">{item.description}</p>
       <a
         href={item.link}
         target="_blank"
         rel="noopener noreferrer"
         className="text-blue-400 underline text-sm"
       >
         Visit Project
       </a>
     </DraggableCardBody>
     
     
      ))};
      </DraggableCardContainer>

     
    </div>
  );
};

export default ProjectPage;
