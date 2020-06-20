describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Emil Dimitrov',
      username: 'emil',
      password: 'asd',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('shows a login form', function () {
    cy.contains('Log in to application');
    cy.contains('Login');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('emil');
      cy.get('input:last').type('asd');
      cy.get('#login-button').click();

      cy.contains('Emil Dimitrov logged in');
    });

    it('fails with incorrect credentials', function () {
      cy.get('input:first').type('emil');
      cy.get('input:last').type('wrong');
      cy.get('#login-button').click();

      cy.contains('Invalid username or password');
    });
  });
});
