import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  github,
  demo,
  image,
}) => {
  return (
    <div className="project-card group">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Project Image */}
        {image && (
          <div className="project-image relative">
            <div className="project-overlay"></div>
            <img
              src={image}
              alt={title}
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Project Details */}
        <div className={!image ? "md:col-span-2" : ""}>
          <h3 className="text-slate-100 mb-4">{title}</h3>
          <p className="text-slate-200 mb-6 leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tech.map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-6 text-slate-300">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
              >
                <Github size={24} />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
