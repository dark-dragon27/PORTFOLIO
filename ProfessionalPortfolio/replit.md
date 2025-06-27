# Portfolio Application Architecture Guide

## Overview

This is a full-stack portfolio application built with React, Express.js, TypeScript, and PostgreSQL. The application provides a modern, responsive portfolio website with GitHub integration, AI-powered project categorization, and comprehensive content management for showcasing professional work, skills, and achievements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **External APIs**: GitHub API and OpenAI API integration

### Database Architecture
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for type sharing
- **Connection**: Neon Database serverless connection
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Database Schema
The application manages several core entities:
- **Users**: Authentication and user management
- **Projects**: Portfolio projects with GitHub integration
- **Skills**: Technical skills with proficiency levels
- **Experiences**: Professional work history
- **Educations**: Academic background
- **Certifications**: Professional certifications
- **Hackathons**: Competition and event participation

### API Layer
- **Projects API**: CRUD operations and GitHub synchronization
- **GitHub Integration**: Repository fetching and metadata extraction
- **OpenAI Integration**: AI-powered project categorization and image generation
- **Contact Form**: Message handling functionality

### Frontend Components
- **Navigation**: Responsive navigation with theme toggle
- **Hero Section**: Professional introduction and call-to-action
- **Qualifications**: Skills, experience, and education display
- **Projects**: Filterable project showcase with GitHub sync
- **Certifications**: Achievement and certification display
- **Contact**: Interactive contact form

## Data Flow

1. **Project Synchronization**: GitHub API → Project categorization (OpenAI) → Database storage
2. **Content Display**: Database → API endpoints → React Query → UI components
3. **User Interactions**: UI events → API calls → Database updates → UI refresh
4. **Theme Management**: Local storage → Context provider → CSS variables

## External Dependencies

### Required APIs
- **GitHub API**: For repository synchronization (optional token for higher rate limits)
- **OpenAI API**: For project image generation and categorization
- **Neon Database**: PostgreSQL serverless database connection

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `GITHUB_TOKEN`/`GITHUB_API_KEY`: GitHub API authentication (optional)
- `OPENAI_API_KEY`/`OPENAI_TOKEN`/`API_KEY`: OpenAI API authentication

### Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting
- **GitHub**: Repository data source
- **OpenAI**: AI services for content enhancement

## Deployment Strategy

### Development Environment
- Replit development environment with auto-reload
- Vite dev server for frontend with HMR
- Express server with TypeScript compilation
- PostgreSQL database connection

### Production Build
- Frontend: Vite production build to `dist/public`
- Backend: ESBuild compilation to `dist/index.js`
- Database: Drizzle schema push for migrations
- Deployment: Configured for Replit autoscale deployment

### Build Commands
- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run db:push`: Database schema deployment

## Changelog
- June 15, 2025. Initial setup
- June 16, 2025. Updated portfolio with Melvin S's actual resume data including:
  - Personal information (name, contact details)
  - Skills from resume (Java, Python, C, HTML/CSS, UiPath RPA, AWS, Google Cloud, Unity, soft skills)
  - Education history (B.Sc Computer Science, HSC, SSLC)
  - Work experience (Cybercrime Department internship)
  - Certifications (AWS, Google Cloud, Gen AI)
  - Hackathon participation (Hack-a-Bot, Reality Feast, SIH 2023, Google Solution Challenge)
  - Resume projects (RPA Blood Donor Bot, AR Space App, Live Translation AI)
  - Added new project categories: automation, AR/VR
  - Updated contact information and footer

## User Preferences

Preferred communication style: Simple, everyday language.