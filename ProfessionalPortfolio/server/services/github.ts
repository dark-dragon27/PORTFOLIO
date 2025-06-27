interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

export class GitHubService {
  private baseUrl = 'https://api.github.com';
  private token: string | undefined;

  constructor() {
    this.token = process.env.GITHUB_TOKEN || process.env.GITHUB_API_KEY;
  }

  private async fetchGitHub(endpoint: string) {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-App'
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    try {
      const repos = await this.fetchGitHub(`/users/${username}/repos?sort=updated&per_page=100`);
      return repos.filter((repo: any) => !repo.fork); // Filter out forks
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return [];
    }
  }

  async getUserProfile(username: string): Promise<GitHubUser | null> {
    try {
      return await this.fetchGitHub(`/users/${username}`);
    } catch (error) {
      console.error('Error fetching GitHub user profile:', error);
      return null;
    }
  }

  async getRepoReadme(username: string, repoName: string): Promise<string | null> {
    try {
      const readme = await this.fetchGitHub(`/repos/${username}/${repoName}/readme`);
      // Decode base64 content
      return Buffer.from(readme.content, 'base64').toString('utf-8');
    } catch (error) {
      console.error('Error fetching README:', error);
      return null;
    }
  }

  categorizeProject(repo: GitHubRepo, readme?: string): string {
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const topics = repo.topics.map(t => t.toLowerCase());
    const readmeContent = (readme || '').toLowerCase();
    
    const allText = `${name} ${description} ${topics.join(' ')} ${readmeContent}`;

    // AI/ML keywords
    if (allText.match(/\b(machine learning|ml|ai|artificial intelligence|neural|tensorflow|pytorch|sklearn|keras|nlp|computer vision|deep learning|data science|pandas|numpy)\b/)) {
      return 'ai';
    }

    // Mobile keywords
    if (allText.match(/\b(react native|flutter|ios|android|mobile|swift|kotlin|expo|cordova|ionic)\b/) || repo.language === 'Swift' || repo.language === 'Kotlin') {
      return 'mobile';
    }

    // Game keywords
    if (allText.match(/\b(game|gaming|unity|godot|phaser|pygame|canvas|webgl|three\.js|babylon)\b/)) {
      return 'games';
    }

    // Web app keywords (default for most projects)
    return 'web';
  }
}

export const githubService = new GitHubService();
