import { 
  users, projects, skills, experiences, educations, certifications, hackathons,
  type User, type InsertUser, type Project, type InsertProject,
  type Skill, type InsertSkill, type Experience, type InsertExperience,
  type Education, type InsertEducation, type Certification, type InsertCertification,
  type Hackathon, type InsertHackathon
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectsByCategory(category?: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Skills
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;

  // Experiences
  getAllExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;

  // Educations
  getAllEducations(): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;

  // Certifications
  getAllCertifications(): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;

  // Hackathons
  getAllHackathons(): Promise<Hackathon[]>;
  createHackathon(hackathon: InsertHackathon): Promise<Hackathon>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private skills: Map<number, Skill>;
  private experiences: Map<number, Experience>;
  private educations: Map<number, Education>;
  private certifications: Map<number, Certification>;
  private hackathons: Map<number, Hackathon>;
  
  private currentUserId: number;
  private currentProjectId: number;
  private currentSkillId: number;
  private currentExperienceId: number;
  private currentEducationId: number;
  private currentCertificationId: number;
  private currentHackathonId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.skills = new Map();
    this.experiences = new Map();
    this.educations = new Map();
    this.certifications = new Map();
    this.hackathons = new Map();
    
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentSkillId = 1;
    this.currentExperienceId = 1;
    this.currentEducationId = 1;
    this.currentCertificationId = 1;
    this.currentHackathonId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed default skills
    const defaultSkills: InsertSkill[] = [
      { name: "Java", category: "Programming", iconClass: "fab fa-java", proficiency: 5 },
      { name: "Python", category: "Programming", iconClass: "fab fa-python", proficiency: 5 },
      { name: "C", category: "Programming", iconClass: "fas fa-code", proficiency: 4 },
      { name: "HTML/CSS", category: "Frontend", iconClass: "fab fa-html5", proficiency: 4 },
      { name: "UiPath (RPA)", category: "Automation", iconClass: "fas fa-robot", proficiency: 4 },
      { name: "AWS", category: "Cloud", iconClass: "fab fa-aws", proficiency: 4 },
      { name: "Google Cloud", category: "Cloud", iconClass: "fab fa-google", proficiency: 4 },
      { name: "Unity", category: "Development", iconClass: "fas fa-cube", proficiency: 3 },
      { name: "Empathy", category: "Soft Skills", iconClass: "fas fa-heart", proficiency: 5 },
      { name: "Emotional Intelligence", category: "Soft Skills", iconClass: "fas fa-brain", proficiency: 5 },
      { name: "Adaptability", category: "Soft Skills", iconClass: "fas fa-sync", proficiency: 5 },
    ];

    defaultSkills.forEach(skill => this.createSkill(skill));

    // Seed default experiences
    const defaultExperiences: InsertExperience[] = [
      {
        title: "Intern",
        company: "Cybercrime Department, Coimbatore",
        period: "10-day internship",
        description: "Gained insights into cybercrime investigation and prevention techniques. Assisted investigators with data analysis, evidence collection, and case documentation.",
        current: false,
        order: 1
      }
    ];

    defaultExperiences.forEach(exp => this.createExperience(exp));

    // Seed default education
    const defaultEducations: InsertEducation[] = [
      {
        degree: "B.Sc. Computer Science (5th semester)",
        institution: "KG College of Arts and Science",
        period: "2022 - 2025",
        gpa: "74%",
        description: "Currently pursuing"
      },
      {
        degree: "HSC",
        institution: "Ashokapuram Government Higher Secondary School",
        period: "2020 - 2022",
        gpa: "73%"
      },
      {
        degree: "SSLC",
        institution: "Bishop Francis Matriculation School",
        period: "2019 - 2020",
        gpa: "64%"
      }
    ];

    defaultEducations.forEach(edu => this.createEducation(edu));

    // Seed default certifications
    const defaultCertifications: InsertCertification[] = [
      {
        title: "AWS Cloud Certification",
        issuer: "Amazon Web Services",
        issueDate: "2023",
        iconClass: "fab fa-aws"
      },
      {
        title: "Google Cloud Certification",
        issuer: "Google Cloud Platform",
        issueDate: "2023",
        iconClass: "fab fa-google"
      },
      {
        title: "Gen AI Certification",
        issuer: "Various Platforms",
        issueDate: "2023",
        iconClass: "fas fa-brain"
      }
    ];

    defaultCertifications.forEach(cert => this.createCertification(cert));

    // Seed default hackathons
    const defaultHackathons: InsertHackathon[] = [
      {
        name: "Hack-a-Bot",
        result: "2nd Runner-up",
        date: "2023",
        description: "Participated in robotics and automation challenge showcasing innovative bot solutions.",
        projectName: "Automation Bot"
      },
      {
        name: "Reality Feast",
        result: "2nd Runner-up",
        date: "2023",
        description: "Competed in AR/VR development competition focusing on immersive technology solutions.",
        projectName: "AR Space Application"
      },
      {
        name: "Smart India Hackathon (SIH)",
        result: "Participant",
        date: "2023",
        description: "National level hackathon addressing real-world problems with innovative technology solutions.",
        projectName: "SIH Project"
      },
      {
        name: "Google Solution Challenge",
        result: "Participant",
        date: "2023-24",
        description: "Global competition focused on solving societal challenges using Google technologies.",
        projectName: "Solution Challenge Project"
      }
    ];

    defaultHackathons.forEach(hack => this.createHackathon(hack));

    // Seed projects from resume
    const resumeProjects: InsertProject[] = [
      {
        name: "RPA - Finding Blood and Organ Donors",
        description: "Developed an RPA bot using UiPath to streamline the process of finding blood and organ donors.",
        longDescription: "Automated bot developed using UiPath that efficiently searches and connects blood and organ donors with recipients, reducing manual search time and improving donation coordination.",
        htmlUrl: "#",
        cloneUrl: null,
        language: "UiPath",
        topics: ["RPA", "Automation", "Healthcare", "UiPath"],
        stargazersCount: 0,
        forksCount: 0,
        updatedAt: new Date("2023-01-01"),
        category: "automation",
        imageUrl: null,
        liveUrl: null
      },
      {
        name: "AR Application on Space",
        description: "Built an augmented reality application in Unity focusing on space education.",
        longDescription: "Interactive AR application developed in Unity that provides educational content about space, planets, and astronomy through immersive augmented reality experiences.",
        htmlUrl: "#",
        cloneUrl: null,
        language: "C#",
        topics: ["AR", "Unity", "Education", "Space", "Augmented Reality"],
        stargazersCount: 0,
        forksCount: 0,
        updatedAt: new Date("2023-01-01"),
        category: "ar",
        imageUrl: null,
        liveUrl: null
      },
      {
        name: "Live Translating AI for Specially Abled People",
        description: "Designed and implemented an AI system in Python for real-time language translation.",
        longDescription: "AI-powered real-time translation system built with Python to assist specially abled individuals with communication barriers, featuring live translation capabilities and accessibility features.",
        htmlUrl: "#",
        cloneUrl: null,
        language: "Python",
        topics: ["AI", "Translation", "Accessibility", "Real-time", "Python"],
        stargazersCount: 0,
        forksCount: 0,
        updatedAt: new Date("2023-01-01"),
        category: "ai",
        imageUrl: null,
        liveUrl: null
      }
    ];

    resumeProjects.forEach(project => this.createProject(project));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
    );
  }

  async getProjectsByCategory(category?: string): Promise<Project[]> {
    const allProjects = await this.getAllProjects();
    if (!category || category === 'all') {
      return allProjects;
    }
    return allProjects.filter(project => project.category === category);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      description: insertProject.description || null,
      longDescription: insertProject.longDescription || null,
      cloneUrl: insertProject.cloneUrl || null,
      language: insertProject.language || null,
      topics: Array.isArray(insertProject.topics) ? insertProject.topics : null,
      stargazersCount: insertProject.stargazersCount || null,
      forksCount: insertProject.forksCount || null,
      updatedAt: insertProject.updatedAt || null,
      category: insertProject.category || null,
      imageUrl: insertProject.imageUrl || null,
      liveUrl: insertProject.liveUrl || null
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updateProject: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    
    const updated: Project = { ...existing, ...updateProject };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(skill => skill.category === category);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = { 
      ...insertSkill, 
      id,
      iconClass: insertSkill.iconClass || null,
      proficiency: insertSkill.proficiency || null
    };
    this.skills.set(id, skill);
    return skill;
  }

  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiences.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = this.currentExperienceId++;
    const experience: Experience = { ...insertExperience, id };
    this.experiences.set(id, experience);
    return experience;
  }

  async getAllEducations(): Promise<Education[]> {
    return Array.from(this.educations.values());
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const id = this.currentEducationId++;
    const education: Education = { ...insertEducation, id };
    this.educations.set(id, education);
    return education;
  }

  async getAllCertifications(): Promise<Certification[]> {
    return Array.from(this.certifications.values());
  }

  async createCertification(insertCertification: InsertCertification): Promise<Certification> {
    const id = this.currentCertificationId++;
    const certification: Certification = { ...insertCertification, id };
    this.certifications.set(id, certification);
    return certification;
  }

  async getAllHackathons(): Promise<Hackathon[]> {
    return Array.from(this.hackathons.values());
  }

  async createHackathon(insertHackathon: InsertHackathon): Promise<Hackathon> {
    const id = this.currentHackathonId++;
    const hackathon: Hackathon = { ...insertHackathon, id };
    this.hackathons.set(id, hackathon);
    return hackathon;
  }
}

export const storage = new MemStorage();
