import React from 'react';

const EducationCard = ({ image, title, subtitle, year, status,branch }) => {
  return (


        <div className=" bg-gray-300 rounded-lg shadow-md flex flex-col md:flex-row sm:mx-28 mx-5  gap-4
        hover:scale-105 hover:shadow-white shadow-md transition-all 1s">
        <img
            src={image}
            alt={title}
            className="w-full md:w-1/4 h-32 md:h-40 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-center items-center gap-2 ">
            <h3 className="text-2xl font-bold text-blue-700 ">{title}</h3>
            <p className="text-lg text-black font-semibold">{branch}</p>
            <p className="text-black font-serif">{subtitle}</p>
            <p className="text-lg text-green-700 font-bold">
            {year} | {status}
            </p>
        </div>
        </div>
    
  );
};

const EducationCards = () => {
  const educationData = [
    {
      image: 'ucoe.jpg', 
      title: 'Bachelor Of Engineering ',
      branch: "( Information Technology )",
      subtitle: 'Universal College Of Engineering | UCOE',
      year: '2022-2026',
      status: 'Pursuing',
    },
    {
      image: 'vartak.jpg', 
      title: 'HSC Science',
      subtitle: 'Vartak Collage, Vasai',
      year: '2020-2022',
      status: 'Completed',
    },
  ];

  return (
    <div className="bg-slate-900 min-h-screen sm:p-4 md:p-8 space-y-6 pt-20">
        <h1 className='text-4xl text-yellow-600 font-bold text-center pb-10'> My Education </h1>
      {educationData.map((edu, index) => (
        <EducationCard
          key={index}
          image={edu.image}
          title={edu.title}
          branch={edu.branch}
          subtitle={edu.subtitle}
          year={edu.year}
          status={edu.status}
        />
      ))}
    </div>
  );
};

export default EducationCards;
