import React from 'react';

const ProjectPage = () => {
  const projects = [
    {
      name: 'TravelOne',
      description: 'This is a brief description of Project One. It showcases amazing features and functionalities.',
      image: 'rajasthan.jpg',
      link: 'https://example.com/project1',
    },
    {
      name: 'SpaceSnap',
      description: 'This is a brief description of Project Two. It includes state-of-the-art solutions.',
      image: './pic21.jpg',
      link: 'https://example.com/project2',
    },
    {
      name: 'Project Three',
      description: 'This is a brief description of Project Three. It demonstrates modern technologies.',
      image: './project3.jpg',
      link: 'https://example.com/project3',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 pb-24">
      
      <h1 className="text-4xl font-bold text-white mb-8 text-center py-10">My Projects</h1>

      {/* Projects Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-0 sm:mx-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative rounded-2xl shadow-xl overflow-hidden bg-zinc-700 group hover:scale-105 hover:shadow-2xl transform transition-all duration-500 ease-in-out"
          >
            {/* Hover Overlay with a gradient and opacity change */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

            {/* Background Image */}
            <div
              className="h-56 bg-cover bg-center group-hover:scale-110 transform transition-all duration-500"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>

            {/* Project Info */}
            <div className="p-6 relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">{project.name}</h2>
              <p className="text-sm text-gray-100 mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-black py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
