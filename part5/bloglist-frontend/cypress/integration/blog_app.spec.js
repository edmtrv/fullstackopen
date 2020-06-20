describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('shows a login form', function () {
    cy.contains('Log in to application');
    cy.contains('Login');
  });
});
