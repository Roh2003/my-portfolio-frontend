import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./ui/dragablecard";

function Skills() {
  const skills = [
    { name: "Python", image: "Python-2.png", className: "absolute top-10 left-[10%] rotate-[-5deg]" },
    { name: "C", image: "c2.webp", className: "absolute top-32 left-[15%] rotate-[4deg]" },
    { name: "JavaScript", image: "js2.png", className: "absolute top-24 left-[25%] rotate-[6deg]" },
    { name: "C++", image: "c++.png", className: "absolute top-5 left-[30%] rotate-[-8deg]" },
    { name: "HTML5", image: "html.jpg", className: "absolute top-40 left-[40%] rotate-[7deg]" },
    { name: "Css3", image: "css.png", className: "absolute top-16 left-[50%] rotate-[-3deg]" },
    { name: "Django", image: "dj.jpg", className: "absolute top-28 left-[60%] rotate-[5deg]" },
    { name: "ReactJS", image: "react.webp", className: "absolute top-10 left-[70%] rotate-[-6deg]" },
    { name: "Node.js", image: "node.png", className: "absolute top-36 left-[20%] rotate-[9deg]" },
    { name: "Express.js", image: "exp.webp", className: "absolute top-12 left-[35%] rotate-[-4deg]" },
    { name: "Tailwind", image: "tail.webp", className: "absolute top-44 left-[55%] rotate-[3deg]" },
    { name: "Bootstrap", image: "boot2.png", className: "absolute top-20 left-[65%] rotate-[-2deg]" },
    { name: "Next.js", image: "next3.png", className: "absolute top-32 left-[75%] rotate-[7deg]" },
    { name: "MySQL", image: "sql.png", className: "absolute top-8 left-[80%] rotate-[-5deg]" },
    { name: "MongoDB", image: "mongo3.png", className: "absolute top-24 left-[85%] rotate-[4deg]" },
    { name: "PostgreSQL", image: "post.png", className: "absolute top-16 left-[90%] rotate-[2deg]" },
    { name: "Git", image: "git.png", className: "absolute top-36 left-[10%] rotate-[-4deg]" },
    { name: "Figma", image: "figma.png", className: "absolute top-5 left-[45%] rotate-[6deg]" },
    { name: "Docker", image: "doc2.png", className: "absolute top-28 left-[30%] rotate-[-7deg]" },
    { name: "Linux", image: "linux.png", className: "absolute top-40 left-[70%] rotate-[4deg]" },
  ];

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col justify-center items-center relative pb-24 overflow-hidden">
      <h1 className="text-4xl font-bold text-white mb-8 text-center py-10 z-50">My Skills</h1>

      <DraggableCardContainer className="relative w-full min-h-screen">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800 z-10">
          If it’s your first day at Fight Club, you have to fight.
        </p>

        {skills.map((item, index) => (
          <DraggableCardBody
            key={index}
            className={item.className + " w-40 h-40 rounded-xl bg-white shadow-md overflow-hidden flex items-center justify-center p-2 border border-neutral-700 z-20"}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </div>
  );
}

export default Skills;
