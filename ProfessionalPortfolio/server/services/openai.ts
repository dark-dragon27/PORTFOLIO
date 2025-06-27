import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_TOKEN || process.env.API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

export class OpenAIService {
  async generateProjectImage(prompt: string): Promise<{ url: string }> {
    try {
      if (!openai) {
        throw new Error("OpenAI API key not configured");
      }

      const response = await openai!.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural"
      });

      if (!response.data || response.data.length === 0) {
        throw new Error("No image generated from OpenAI");
      }

      return { url: response.data[0].url! };
    } catch (error: any) {
      console.error("Error generating image with OpenAI:", error);
      
      // Provide more specific error messages
      if (error.code === 'insufficient_quota') {
        throw new Error("OpenAI API quota exceeded. Please check your billing.");
      } else if (error.code === 'invalid_api_key') {
        throw new Error("Invalid OpenAI API key provided.");
      } else if (error.code === 'content_policy_violation') {
        throw new Error("Image prompt violates OpenAI content policy.");
      } else {
        throw new Error(`Failed to generate project image: ${error.message}`);
      }
    }
  }

  async analyzeProjectDescription(projectName: string, description: string, readme?: string): Promise<{
    category: string;
    imagePrompt: string;
    enhancedDescription: string;
  }> {
    try {
      if (!openai) {
        throw new Error("OpenAI API key not configured");
      }

      const content = `
Project Name: ${projectName}
Description: ${description || 'No description provided'}
README Content: ${readme ? readme.substring(0, 1000) + '...' : 'No README available'}

Based on this project information, please analyze and categorize it. Respond with JSON in this exact format:
{
  "category": "web|ai|mobile|games",
  "imagePrompt": "A detailed prompt for generating a project visualization image",
  "enhancedDescription": "An improved, more detailed description of the project"
}

Guidelines for categorization:
- "web": Web applications, websites, APIs, web services, frontend/backend projects
- "ai": Machine learning, AI, data science, neural networks, computer vision, NLP projects  
- "mobile": Mobile apps, React Native, Flutter, iOS, Android projects
- "games": Game development, game engines, interactive entertainment projects

For the imagePrompt, create a detailed description for a modern, professional project visualization that:
- Represents the project's core functionality
- Uses clean, minimal design with gradient backgrounds
- Is appropriate for a professional portfolio
- Avoids text or logos
- Focuses on visual metaphors and iconography
`;

      const response = await openai!.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a software project analyst who categorizes and creates visual descriptions for projects in a professional portfolio."
          },
          {
            role: "user",
            content: content
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 500,
        temperature: 0.3
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      // Validate the response structure
      if (!result.category || !result.imagePrompt || !result.enhancedDescription) {
        throw new Error("Invalid response structure from OpenAI analysis");
      }

      // Ensure category is valid
      const validCategories = ['web', 'ai', 'mobile', 'games'];
      if (!validCategories.includes(result.category)) {
        result.category = 'web'; // Default fallback
      }

      return {
        category: result.category,
        imagePrompt: result.imagePrompt,
        enhancedDescription: result.enhancedDescription
      };

    } catch (error: any) {
      console.error("Error analyzing project with OpenAI:", error);
      
      // Fallback analysis based on simple keyword matching
      const text = `${projectName} ${description} ${readme || ''}`.toLowerCase();
      
      let category = 'web';
      if (text.match(/\b(machine learning|ml|ai|artificial intelligence|neural|tensorflow|pytorch|sklearn|keras|nlp|computer vision|deep learning|data science)\b/)) {
        category = 'ai';
      } else if (text.match(/\b(react native|flutter|ios|android|mobile|swift|kotlin|expo)\b/)) {
        category = 'mobile';
      } else if (text.match(/\b(game|gaming|unity|godot|phaser|pygame|canvas|webgl)\b/)) {
        category = 'games';
      }

      return {
        category,
        imagePrompt: `A modern, clean illustration representing a ${category} project with gradient background and professional design`,
        enhancedDescription: description || `A ${category} project named ${projectName}`
      };
    }
  }

  async generateMultipleProjectImages(projects: Array<{
    name: string;
    description?: string;
    category: string;
  }>): Promise<Array<{ name: string; imageUrl: string | null }>> {
    const results = [];
    
    for (const project of projects) {
      try {
        const imagePrompt = `Create a modern, professional project visualization for "${project.name}": ${project.description || 'A software project'}. 
        Category: ${project.category}. 
        Style: Clean, minimal, tech-focused illustration with a gradient background matching the ${project.category} theme. 
        Should represent the project concept visually without any text or logos.
        Use modern flat design principles with subtle shadows and contemporary color schemes.`;
        
        const result = await this.generateProjectImage(imagePrompt);
        results.push({ name: project.name, imageUrl: result.url });
        
        // Add a small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to generate image for ${project.name}:`, error);
        results.push({ name: project.name, imageUrl: null });
      }
    }
    
    return results;
  }
}

export const openaiService = new OpenAIService();
