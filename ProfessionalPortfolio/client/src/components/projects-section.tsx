import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  Loader2,
  ShoppingCart,
  Brain,
  Smartphone,
  Gamepad2,
  BarChart3,
  Camera
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { GitHubSyncRequest, GitHubSyncResponse } from "@/lib/types";

const categoryIcons: Record<string, any> = {
  web: ShoppingCart,
  ai: Brain,
  mobile: Smartphone,
  games: Gamepad2,
  automation: BarChart3,
  ar: Camera,
};

const categoryColors: Record<string, string> = {
  web: "from-blue-400 to-purple-600",
  ai: "from-green-400 to-blue-600", 
  mobile: "from-purple-400 to-pink-600",
  games: "from-red-400 to-yellow-600",
  automation: "from-orange-400 to-red-600",
  ar: "from-cyan-400 to-blue-600",
};

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [githubUsername, setGithubUsername] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/projects", activeFilter],
    queryFn: async () => {
      const response = await fetch(`/api/projects?category=${activeFilter}`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    },
  });

  const syncGitHubMutation = useMutation({
    mutationFn: async (data: GitHubSyncRequest): Promise<GitHubSyncResponse> => {
      const response = await apiRequest("POST", "/api/sync-github", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setGithubUsername("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to sync GitHub repositories",
        variant: "destructive",
      });
    },
  });

  const handleSync = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername.trim()) {
      toast({
        title: "Error",
        description: "Please enter a GitHub username",
        variant: "destructive",
      });
      return;
    }
    syncGitHubMutation.mutate({ username: githubUsername.trim() });
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web Apps" },
    { id: "ai", label: "AI/ML" },
    { id: "mobile", label: "Mobile" },
    { id: "games", label: "Games" },
    { id: "automation", label: "Automation" },
    { id: "ar", label: "AR/VR" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter((project: any) => project.category === activeFilter);

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-slate-50/60 dark:from-slate-800/70 dark:via-slate-700/50 dark:to-slate-800/80 backdrop-blur-sm overflow-hidden">
      {/* Attractive background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="mesh-gradient w-72 h-72 top-10 right-10" style={{ animationDelay: '4s' }}></div>
        <div className="mesh-gradient w-56 h-56 bottom-20 left-20" style={{ animationDelay: '9s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-bl from-blue-200/10 to-indigo-200/15 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
            A showcase of my latest work and contributions to open source projects
          </p>

          {/* GitHub Sync Form */}
          <form onSubmit={handleSync} className="max-w-md mx-auto mb-8 flex gap-2">
            <Input
              type="text"
              placeholder="GitHub username"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={syncGitHubMutation.isPending}
              className="px-6"
            >
              {syncGitHubMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Sync GitHub"
              )}
            </Button>
          </form>
          
          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-slate-200 dark:bg-slate-700"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: any) => {
              const IconComponent = categoryIcons[project.category] || ShoppingCart;
              const gradientClass = categoryColors[project.category] || "from-blue-400 to-purple-600";
              
              return (
                <Card 
                  key={project.id} 
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  {/* Project visualization */}
                  <div className={`h-48 bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <IconComponent size={48} className="mx-auto mb-2" />
                          <p className="text-lg font-semibold">{project.name}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black bg-opacity-20 text-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                      {project.description || "No description available"}
                    </p>
                    
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.language && (
                        <Badge variant="outline" className="text-xs">
                          {project.language}
                        </Badge>
                      )}
                      {project.topics?.slice(0, 2).map((topic: string) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <Star size={14} />
                        {project.stargazersCount}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={14} />
                        {project.forksCount}
                      </div>
                    </div>
                    
                    {/* Links */}
                    <div className="flex space-x-4">
                      <a 
                        href={project.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:text-blue-700 transition-colors duration-200"
                      >
                        <Github size={16} className="mr-1" />
                        Code
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-accent hover:text-cyan-600 transition-colors duration-200"
                        >
                          <ExternalLink size={16} className="mr-1" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600 dark:text-slate-300">
              No projects found. Try syncing your GitHub repositories above.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
