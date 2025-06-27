import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { githubService } from "./services/github";
import { openaiService } from "./services/openai";
import { insertProjectSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const { category } = req.query;
      const projects = await storage.getProjectsByCategory(category as string);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Sync GitHub repositories
  app.post("/api/sync-github", async (req, res) => {
    try {
      const { username } = req.body;
      
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      // Fetch repositories from GitHub
      const repos = await githubService.getUserRepos(username);
      
      if (repos.length === 0) {
        return res.status(404).json({ error: "No repositories found or GitHub API error" });
      }

      const syncedProjects = [];

      for (const repo of repos) {
        try {
          // Get README for better categorization
          const readme = await githubService.getRepoReadme(username, repo.name);
          
          // Categorize the project
          const category = githubService.categorizeProject(repo, readme || undefined);
          
          // Generate project image using AI
          let imageUrl: string | null = null;
          try {
            const imagePrompt = `Create a modern, professional project visualization for "${repo.name}": ${repo.description || 'A software project'}. 
            Category: ${category}. Style: Clean, minimal, tech-focused illustration with a gradient background. 
            Should represent the project concept visually.`;
            
            const imageResult = await openaiService.generateProjectImage(imagePrompt);
            imageUrl = imageResult.url;
          } catch (imageError) {
            console.error(`Failed to generate image for ${repo.name}:`, imageError);
          }

          // Create or update project
          const projectData = {
            name: repo.name,
            description: repo.description || "",
            longDescription: readme?.substring(0, 500) || repo.description || "",
            htmlUrl: repo.html_url,
            cloneUrl: repo.clone_url,
            language: repo.language,
            topics: repo.topics,
            stargazersCount: repo.stargazers_count,
            forksCount: repo.forks_count,
            updatedAt: new Date(repo.updated_at),
            category,
            imageUrl,
            liveUrl: null // Could be enhanced to detect live URLs from README
          };

          const project = await storage.createProject(projectData);
          syncedProjects.push(project);
        } catch (projectError) {
          console.error(`Error processing repository ${repo.name}:`, projectError);
        }
      }

      res.json({
        message: `Successfully synced ${syncedProjects.length} projects`,
        projects: syncedProjects
      });

    } catch (error) {
      console.error("Error syncing GitHub repositories:", error);
      res.status(500).json({ error: "Failed to sync GitHub repositories" });
    }
  });

  // Get all skills
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  // Get all experiences
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  // Get all educations
  app.get("/api/educations", async (req, res) => {
    try {
      const educations = await storage.getAllEducations();
      res.json(educations);
    } catch (error) {
      console.error("Error fetching educations:", error);
      res.status(500).json({ error: "Failed to fetch educations" });
    }
  });

  // Get all certifications
  app.get("/api/certifications", async (req, res) => {
    try {
      const certifications = await storage.getAllCertifications();
      res.json(certifications);
    } catch (error) {
      console.error("Error fetching certifications:", error);
      res.status(500).json({ error: "Failed to fetch certifications" });
    }
  });

  // Get all hackathons
  app.get("/api/hackathons", async (req, res) => {
    try {
      const hackathons = await storage.getAllHackathons();
      res.json(hackathons);
    } catch (error) {
      console.error("Error fetching hackathons:", error);
      res.status(500).json({ error: "Failed to fetch hackathons" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // In a real application, this would send an email
      console.log("Contact form submission:", { name, email, subject, message });
      
      res.json({ message: "Thank you for your message! I'll get back to you soon." });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
