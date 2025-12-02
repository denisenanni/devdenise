import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCard from "../components/ProjectCard";

const projects = Object.freeze([
  {
    title: "COVID Stats App",
    description:
      "React app displaying COVID statistics with charts and API integration.",
    tech: ["React", "TypeScript", "API", "Charts"],
    github: "https://github.com/denisenanni/covid-stats",
    demo: "https://denisenanni.github.io/covid-stats",
    image: "/assets/covid.png",
  },
  {
    title: "Pubbliufficio",
    description: "React + ChakraUI app for office management tasks.",
    tech: ["React", "ChakraUI", "TypeScript"],
    github: "https://github.com/denisenanni/pubbliufficio",
    demo: "https://pubbliufficio.com",
    image: "/assets/pubbliufficio.png",
  },
  {
    title: "Leader Clinique",
    description: "Static website hosted on AWS S3.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "",
    demo: "https://leaderclinique.fr",
    image: "/assets/leaderclinique.png",
  },
]);

const Projects = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={ref}
      className="section bg-navy-900 overflow-x-hidden"
    >
      <div className="section-content">
        {/* <BehindTheScenesButton /> */}
        <div className="flex items-center mb-8 md:mb-12 min-w-0">
          <span className="section-number">03.</span>
          <h2 className="section-title">Things I've Built</h2>
          <div className="section-divider"></div>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tech={project.tech}
                github={project.github}
                demo={project.demo}
                image={project.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
