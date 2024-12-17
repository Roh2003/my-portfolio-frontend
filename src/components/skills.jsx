import React from 'react';

function Skills() {
    const skill = [
        { name: "Python", image: "Python-2.png" },
        { name: "C", image: "c2.webp" },
        { name: "JavaScript", image: "js2.png" },
        { name: "C++", image: "c++.png" },
        { name: "HTML5", image: "html.jpg" },
        { name: "Css3", image: "css.png" },
        { name: "django", image: "dj.jpg" },
        { name: "Reactjs", image: "react.webp" },
        { name: "nodejs", image: "node.png" },
        { name: "Expressjs", image: "exp.webp" },
        { name: "Tailwindcss", image: "tail.webp" },
        { name: "Bootstrap", image: "boot2.png" },
        { name: "Nextjs", image: "next3.png" },
        { name: "Mysql", image: "sql.png" },
        { name: "MongoDB", image: "mongo3.png" },
        { name: "postgreysql", image: "post.png" },
        { name: "git", image: "git.png" },
        { name: "figma", image: "figma.png" },
        { name: "docker", image: "doc2.png" },
        { name: "linux", image: "linux.png" },
    ];

    return (
        <>
            <div className="bg-slate-950 min-h-screen flex flex-col justify-center items-center pb-24">
                <h1 className="text-4xl font-bold text-white mb-8 text-center py-10">My Skills</h1>

                <div className="bg-gray-500 flex flex-wrap mx-10 max-w-screen-md">
                    {skill.map((project, index) => (
                        <div key={index} className="h-32 w-32 p-5 aspect-square">
                            {/* Conditionally render the image if it exists */}
                            {project.image ? (
                                <img className="hover:scale-125 transition-all ease-in 0.7s" src={project.image} alt={project.name} />
                            ) : (
                                <div className="text-white text-center">No Image</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Skills;
