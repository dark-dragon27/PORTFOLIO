import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { QualificationsSection } from "@/components/qualifications-section";
import { ProjectsSection } from "@/components/projects-section";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navigation />
      <HeroSection />
      <QualificationsSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-100/70 via-pink-100/70 to-blue-100/70 dark:from-purple-900/50 dark:via-pink-900/50 dark:to-blue-900/50 backdrop-blur-sm border-t border-purple-200 dark:border-purple-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300">
              © 2024 <span className="font-semibold">Melvin S</span>. All rights reserved. Built with passion for technology and innovation.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a 
                href="https://github.com/darkdragon27" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/s-melvin"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:melvinsenthilkumar@gmail.com"
                className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
