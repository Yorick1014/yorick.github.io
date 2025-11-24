import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../constants';
import { analyzeProject } from '../services/geminiService';
import { Project } from '../types';
import { BrainCircuit, X, Megaphone, Terminal } from 'lucide-react';
import { Button } from './ui/Button';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mode, setMode] = useState<'technical' | 'marketing' | null>(null);

  const handleAnalyze = async (selectedMode: 'technical' | 'marketing') => {
    setMode(selectedMode);
    setIsAnalyzing(true);
    setAnalysis(null);
    const result = await analyzeProject(project.title, project.fullDetails || project.description, selectedMode);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const closeAnalysis = () => {
    setAnalysis(null);
    setMode(null);
  };

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Image */}
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 z-20 flex gap-2">
           {/* Floating badges */}
           {project.tags.slice(0, 2).map(tag => (
             <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded">
               {tag}
             </span>
           ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* AI Actions */}
        <div className="flex gap-2 border-t border-slate-800 pt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAnalyze('technical')}
            className="flex-1 text-xs gap-1"
            title="Get a technical breakdown from Gemini Pro"
          >
            <Terminal size={14} />
            Tech Spec
          </Button>
          <div className="w-px bg-slate-800 h-6 my-auto"></div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAnalyze('marketing')}
            className="flex-1 text-xs gap-1"
            title="Get a marketing pitch from Gemini"
          >
            <Megaphone size={14} />
            Pitch It
          </Button>
        </div>
      </div>

      {/* Analysis Overlay */}
      {(isAnalyzing || analysis) && (
        <div className="absolute inset-0 z-30 bg-slate-900/95 backdrop-blur-sm p-6 flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
            <h4 className="text-indigo-400 font-medium flex items-center gap-2">
              <BrainCircuit size={18} />
              {isAnalyzing ? 'Gemini is thinking...' : (mode === 'technical' ? 'Technical Analysis' : 'Marketing Pitch')}
            </h4>
            <button onClick={closeAnalysis} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full space-y-3 opacity-70">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs">Analyzing project context...</p>
              </div>
            ) : (
              analysis
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
           <p className="text-slate-400 max-w-xl">
             A selection of recent work. Click the AI buttons on any card to see Gemini generate dynamic insights about the code or the product.
           </p>
        </div>
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          <BrainCircuit size={14} />
          <span>Gemini Pro Enabled</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};