import { motion, AnimatePresence } from "framer-motion";
import { X, Workflow, Cloud, Terminal } from "lucide-react";
import { PipelineDiagram } from "./PipelineDiagram";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const BehindTheScenesModal = ({ isOpen, onClose }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL CONTAINER */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="bg-neutral-900 text-white rounded-2xl w-full max-w-3xl shadow-xl border border-neutral-700 overflow-hidden">
              {/* HEADER */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-700">
                <h2 className="text-xl font-bold">Behind the Scenes</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="px-6 py-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* STACK OVERVIEW */}
                <Section
                  icon={<Cloud className="text-blue-400" size={22} />}
                  title="Tech Stack"
                  description="This portfolio is built with React + TypeScript, Vite, styled with TailwindCSS, animated with Framer Motion, and uses smooth scroll interactions."
                />

                {/* LOCAL DEV WORKFLOW */}
                <Section
                  icon={<Terminal className="text-green-400" size={22} />}
                  title="Local Development"
                  description="Development happens locally with Node 22. Vite provides fast builds and hot module replacement for a smooth developer experience."
                />

                {/* CI/CD WITH GITHUB ACTIONS */}
                <Section
                  icon={<Workflow className="text-purple-400" size={22} />}
                  title="CI/CD Pipeline"
                  description="On every push to the main branch, GitHub Actions builds the project and deploys the static site automatically to GitHub Pages. No servers or containers are required for deployment."
                  code={`name: Deploy
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: yarn install
      - run: yarn build
      - uses: actions/deploy-pages@v4`}
                />

                {/* PIPELINE DIAGRAM */}
                <Section
                  icon={<Workflow className="text-cyan-400" size={22} />}
                  title="Pipeline Diagram"
                  description="Visual overview of the build and deployment process."
                />
                <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 overflow-x-auto">
                  <PipelineDiagram />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ---------------- COMPONENT FOR SECTIONS ---------------- */
const Section = ({
  icon,
  title,
  description,
  code,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  code?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-neutral-300 text-sm">{description}</p>
      {code && (
        <pre className="bg-neutral-800 text-neutral-200 text-xs p-3 rounded-lg border border-neutral-700 overflow-x-auto">
          {code}
        </pre>
      )}
    </motion.div>
  );
};
