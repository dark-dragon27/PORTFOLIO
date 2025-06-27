import { Button } from "@/components/ui/button";
import { User, Code, Mail } from "lucide-react";
import profileImage from "@assets/Picsart_24-01-13_07-09-03-525_1750047415634.jpg";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-white/70 via-blue-50/50 to-indigo-100/60 dark:from-slate-900/70 dark:via-slate-800/50 dark:to-slate-900/60 backdrop-blur-sm">
      {/* Attractive sophisticated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced gradient orbs with better colors */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-300/25 to-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-300/20 to-purple-300/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* More attractive floating elements */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/15 to-indigo-400/20 rounded-full blur-2xl animate-rotate-scale glow-orb" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-gradient-to-bl from-purple-300/20 to-blue-300/15 rounded-full blur-xl animate-wave" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-indigo-300/15 to-purple-400/20 rounded-full blur-lg animate-bounce-slow" style={{ animationDelay: '4s' }}></div>
        
        {/* Mesh gradient backgrounds */}
        <div className="mesh-gradient w-72 h-72 top-10 left-10" style={{ animationDelay: '0s' }}></div>
        <div className="mesh-gradient w-64 h-64 bottom-20 right-10" style={{ animationDelay: '5s' }}></div>
        <div className="mesh-gradient w-48 h-48 top-1/2 left-2/3" style={{ animationDelay: '10s' }}></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10 dark:opacity-15">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="colorfulGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="url(#rainbow)" strokeWidth="0.5"/>
              </pattern>
              <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b6b"/>
                <stop offset="25%" stopColor="#4ecdc4"/>
                <stop offset="50%" stopColor="#45b7d1"/>
                <stop offset="75%" stopColor="#96ceb4"/>
                <stop offset="100%" stopColor="#ffeaa7"/>
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#colorfulGrid)" />
          </svg>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8 animate-slide-in-bottom" style={{ animationDelay: '0.2s' }}>
            {/* Professional headshot */}
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl animate-float">
              <img 
                src={profileImage} 
                alt="Melvin S - Computer Science Student" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Melvin S
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
            Computer Science Student & Automation Specialist passionate about AI and sustainable technology solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
            >
              <Code className="mr-2" size={20} />
              View My Work
            </Button>
            
            <Button
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary dark:text-accent font-medium rounded-lg hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-white transition-all duration-200 transform hover:scale-105"
            >
              <Mail className="mr-2" size={20} />
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
