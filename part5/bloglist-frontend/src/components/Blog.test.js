import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 4,
    user: {
      username: 'emil',
      name: 'Emil',
    },
  };

  const user = {
    username: 'emil',
    name: 'Emil',
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />);
  });

  test('by default renders author and title but not url and likes', () => {
    const div = component.container.querySelector('.blog');
    const details = component.container.querySelector('.blog-details');

    expect(div).toHaveTextContent('Test Blog');
    expect(div).toHaveTextContent('Test Author');
    expect(details).toHaveStyle('display: none');
  });
});
