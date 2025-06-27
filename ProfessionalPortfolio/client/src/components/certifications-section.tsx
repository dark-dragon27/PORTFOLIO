import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Trophy, 
  Medal, 
  Award, 
  Star,
  Cloud,
  Zap,
  Code,
  BarChart3
} from "lucide-react";

const certificationIcons: Record<string, any> = {
  "fab fa-aws": Cloud,
  "fab fa-google": Cloud,
  "fab fa-microsoft": Cloud,
  "fab fa-react": Code,
  "fas fa-chart-line": BarChart3,
  "fas fa-database": Code,
};

const achievementIcons = [Trophy, Medal, Award, Star];

export function CertificationsSection() {
  const { data: certifications = [], isLoading: certLoading } = useQuery({
    queryKey: ["/api/certifications"],
  });

  const { data: hackathons = [], isLoading: hackLoading } = useQuery({
    queryKey: ["/api/hackathons"],
  });

  if (certLoading || hackLoading) {
    return (
      <section id="certifications" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-80 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-slate-50/80 via-indigo-50/40 to-blue-50/60 dark:from-slate-800/80 dark:via-slate-700/40 dark:to-slate-800/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Certifications & Achievements
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Professional certifications, awards, and hackathon achievements
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert: any) => {
              const IconComponent = certificationIcons[cert.iconClass] || Zap;
              return (
                <Card 
                  key={cert.id}
                  className="bg-slate-50 dark:bg-slate-700 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {cert.title}
                    </h4>
                    <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                      Issued: {cert.issueDate}
                    </p>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-blue-700 text-sm transition-colors duration-200"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        View Credential
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Hackathons */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Hackathons & Competitions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {hackathons.map((hackathon: any, index: number) => {
              const IconComponent = achievementIcons[index % achievementIcons.length];
              
              return (
                <Card 
                  key={hackathon.id}
                  className="bg-slate-50 dark:bg-slate-700 hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <IconComponent className="text-white" size={20} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {hackathon.name}
                        </h4>
                        <Badge variant="secondary" className="text-primary font-medium mb-2">
                          {hackathon.result}
                        </Badge>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                          {hackathon.date}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                          {hackathon.description}
                        </p>
                        {hackathon.projectName && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                            Project: {hackathon.projectName}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
