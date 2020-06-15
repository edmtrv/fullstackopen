import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('form handler is called with the correct details when new blog is created', () => {
    const addBlogMock = jest.fn();

    const component = render(<BlogForm addBlog={addBlogMock} />);

    const input = component.container.querySelector('input#title');
    const form = component.container.querySelector('form');

    fireEvent.change(input, { target: { value: 'Test Blog 1' } });
    fireEvent.submit(form);

    expect(addBlogMock.mock.calls).toHaveLength(1);
    expect(addBlogMock.mock.calls[0][0].title).toBe('Test Blog 1');
  });
});
