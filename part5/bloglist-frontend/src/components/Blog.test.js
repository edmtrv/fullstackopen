// import React from 'react';
// import '@testing-library/jest-dom';
// import { render, fireEvent } from '@testing-library/react';
// import Blog from './Blog';

// describe('<Blog />', () => {
//   let component;

//   const blog = {
//     title: 'Test Blog',
//     author: 'Test Author',
//     url: 'http://testurl.com',
//     likes: 4,
//     user: {
//       username: 'emil',
//       name: 'Emil',
//     },
//   };

//   const login = {
//     username: 'emil',
//     name: 'Emil',
//   };

//   const mockHandler = jest.fn();

//   beforeEach(() => {
//     component = render(<Blog blog={blog} login={login} />);
//   });

//   test('by default renders author and title but not url and likes', () => {
//     const div = component.container.querySelector('.blog');
//     const details = component.container.querySelector('.blog-details');

//     expect(div).toHaveTextContent('Test Blog');
//     expect(div).toHaveTextContent('Test Author');
//     expect(details).toHaveStyle('display: none');
//   });

//   test('on button click url and number of likes are shown', () => {
//     const button = component.getByText('View');
//     fireEvent.click(button);

//     const details = component.container.querySelector('.blog-details');

//     expect(details).not.toHaveStyle('display: none');
//   });

//   test('likes increase when like button is clicked', () => {
//     const likeButton = component.getByText('Like');
//     fireEvent.click(likeButton);
//     fireEvent.click(likeButton);

//     expect(mockHandler.mock.calls).toHaveLength(2);
//   });
// });
