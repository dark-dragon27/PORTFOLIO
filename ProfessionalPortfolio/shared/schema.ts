import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  longDescription: text("long_description"),
  htmlUrl: text("html_url").notNull(),
  cloneUrl: text("clone_url"),
  language: text("language"),
  topics: jsonb("topics").$type<string[]>().default([]),
  stargazersCount: integer("stargazers_count").default(0),
  forksCount: integer("forks_count").default(0),
  updatedAt: timestamp("updated_at"),
  category: text("category"),
  imageUrl: text("image_url"),
  liveUrl: text("live_url"),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  iconClass: text("icon_class"),
  proficiency: integer("proficiency").default(3),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  current: boolean("current").default(false),
  order: integer("order").default(0),
});

export const educations = pgTable("educations", {
  id: serial("id").primaryKey(),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  period: text("period").notNull(),
  gpa: text("gpa"),
  description: text("description"),
});

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  issueDate: text("issue_date").notNull(),
  credentialUrl: text("credential_url"),
  iconClass: text("icon_class"),
});

export const hackathons = pgTable("hackathons", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  result: text("result").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  projectName: text("project_name"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const insertExperienceSchema = createInsertSchema(experiences).omit({ id: true });
export const insertEducationSchema = createInsertSchema(educations).omit({ id: true });
export const insertCertificationSchema = createInsertSchema(certifications).omit({ id: true });
export const insertHackathonSchema = createInsertSchema(hackathons).omit({ id: true });
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type InsertHackathon = z.infer<typeof insertHackathonSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Education = typeof educations.$inferSelect;
export type Certification = typeof certifications.$inferSelect;
export type Hackathon = typeof hackathons.$inferSelect;
export type User = typeof users.$inferSelect;
