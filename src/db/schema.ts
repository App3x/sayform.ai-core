import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
});

export const forms = sqliteTable('forms', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
});

export const questions = sqliteTable('questions', {
  id: text('id').primaryKey(),
  formId: text('form_id').notNull().references(() => forms.id),
  type: text('type').notNull(),
  question: text('question').notNull(),
  options: text('options'),
});

export const responses = sqliteTable('responses', {
  id: text('id').primaryKey(),
  formId: text('form_id').notNull().references(() => forms.id),
  questionId: text('question_id').notNull().references(() => questions.id),
  answer: text('answer').notNull(),
});