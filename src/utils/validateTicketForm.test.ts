import { describe, it, expect } from 'vitest';
import { validateTicketForm } from './validateTicketForm';
import type { FormFields } from './validateTicketForm';

const validFields: FormFields = {
  title: 'Login page crashes on Safari',
  type: 'Bug',
  priority: 'High',
  assignee: 'Jamie Lee',
  description: 'The login page throws a 500 error on Safari 17.',
};

describe('validateTicketForm', () => {
  it('returns no errors for valid input', () => {
    expect(validateTicketForm(validFields)).toEqual({});
  });

  describe('title', () => {
    it('returns an error when title is empty', () => {
      const result = validateTicketForm({ ...validFields, title: '' });
      expect(result.title).toBe('A title is required.');
    });

    it('returns an error when title is only whitespace', () => {
      const result = validateTicketForm({ ...validFields, title: '   ' });
      expect(result.title).toBe('A title is required.');
    });

    it('returns an error when title is fewer than 5 characters', () => {
      const result = validateTicketForm({ ...validFields, title: 'Bug' });
      expect(result.title).toBe('Title must be at least 5 characters.');
    });

    it('accepts a title of exactly 5 characters', () => {
      const result = validateTicketForm({ ...validFields, title: 'Crash' });
      expect(result.title).toBeUndefined();
    });
  });

  describe('type', () => {
    it('returns an error when type is not selected', () => {
      const result = validateTicketForm({ ...validFields, type: '' });
      expect(result.type).toBe('Please select a type.');
    });
  });

  describe('priority', () => {
    it('returns an error when priority is not selected', () => {
      const result = validateTicketForm({ ...validFields, priority: '' });
      expect(result.priority).toBe('Please select a priority.');
    });
  });

  describe('assignee', () => {
    it('returns an error when assignee is empty', () => {
      const result = validateTicketForm({ ...validFields, assignee: '' });
      expect(result.assignee).toBe('An assignee is required.');
    });
  });

  describe('description', () => {
    it('returns an error when description is empty', () => {
      const result = validateTicketForm({ ...validFields, description: '' });
      expect(result.description).toBe('A description is required.');
    });

    it('returns an error when description is fewer than 20 characters', () => {
      const result = validateTicketForm({
        ...validFields,
        description: 'Too short.',
      });
      expect(result.description).toBe(
        'Description must be at least 20 characters.',
      );
    });

    it('accepts a description of exactly 20 characters', () => {
      const result = validateTicketForm({
        ...validFields,
        description: 'Exactly 20 chars ok!',
      });
      expect(result.description).toBeUndefined();
    });
  });

  it('returns multiple errors when multiple fields are invalid', () => {
    const result = validateTicketForm({
      title: '',
      type: '',
      priority: '',
      assignee: '',
      description: '',
    });
    expect(Object.keys(result)).toHaveLength(5);
  });
});
