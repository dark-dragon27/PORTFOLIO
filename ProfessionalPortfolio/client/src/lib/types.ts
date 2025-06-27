export interface GitHubSyncRequest {
  username: string;
}

export interface GitHubSyncResponse {
  message: string;
  projects: any[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  message: string;
}
