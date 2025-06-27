import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  GraduationCap, 
  University,
  IdCard,
  Ampersands,
  Redo2,
  Database,
  Cloud,
  Brain
} from "lucide-react";

const iconMap: Record<string, any> = {
  "fab fa-js-square": Ampersands,
  "fab fa-react": Redo2,
  "fab fa-node-js": Database,
  "fab fa-python": Brain,
  "fas fa-database": Database,
  "fab fa-aws": Cloud,
  "fab fa-docker": Cloud,
  "fas fa-brain": Brain,
};

export function QualificationsSection() {
  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["/api/skills"],
  });

  const { data: experiences = [], isLoading: experiencesLoading } = useQuery({
    queryKey: ["/api/experiences"],
  });

  const { data: educations = [], isLoading: educationsLoading } = useQuery({
    queryKey: ["/api/educations"],
  });

  if (skillsLoading || experiencesLoading || educationsLoading) {
    return (
      <section id="qualifications" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="qualifications" className="relative py-20 bg-gradient-to-br from-white/80 via-slate-50/60 to-blue-50/40 dark:from-slate-800/80 dark:via-slate-700/60 dark:to-slate-800/80 backdrop-blur-sm overflow-hidden">
      {/* Attractive background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="mesh-gradient w-80 h-80 -top-20 -left-20" style={{ animationDelay: '2s' }}></div>
        <div className="mesh-gradient w-60 h-60 top-1/2 -right-20" style={{ animationDelay: '7s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-200/10 to-purple-200/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Qualifications
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A comprehensive overview of my education, skills, and professional experience
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Technical Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill: any) => {
              const IconComponent = iconMap[skill.iconClass] || Database;
              return (
                <Card key={skill.id} className="bg-slate-50 dark:bg-slate-700 hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4 text-center">
                    <IconComponent className="mx-auto text-3xl text-primary mb-2" size={32} />
                    <p className="font-medium">{skill.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Experience
          </h3>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary"></div>
            
            {experiences.map((experience: any, index: number) => (
              <div key={experience.id} className="relative flex items-center mb-8">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Briefcase className="text-white text-sm" size={16} />
                </div>
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:w-1/2 md:pr-8 md:text-right' : 'md:w-1/2 md:pl-8 md:ml-1/2'}`}>
                  <Card className="bg-white dark:bg-slate-700 shadow-md">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                        {experience.title}
                      </h4>
                      <p className="text-primary font-medium mb-1">{experience.company}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                        {experience.period}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300">
                        {experience.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {educations.map((education: any) => (
              <Card key={education.id} className="bg-white dark:bg-slate-700 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <University className="text-2xl text-primary mr-3" size={24} />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {education.degree}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        {education.institution}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {education.period}
                    {education.gpa && ` | GPA: ${education.gpa}`}
                  </p>
                  {education.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                      {education.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
