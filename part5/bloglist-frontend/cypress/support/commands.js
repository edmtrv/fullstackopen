Cypress.Commands.add('register', ({ name, username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users/', {
    name,
    username,
    password,
  });

  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedInUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedInUser')).token
      }`,
    },
  });

  cy.visit('http://localhost:3000');
});
