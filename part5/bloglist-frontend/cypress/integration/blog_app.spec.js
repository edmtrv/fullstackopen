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

    it('shows an error notification on unsuccessful login', function () {
      cy.get('input:first').type('emil');
      cy.get('input:last').type('wrong');
      cy.get('#login-button').click();

      cy.get('.notification h2').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'emil', password: 'asd' });
    });

    it('can create a blog', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('Another Blog');
      cy.get('#author').type('Author Name');
      cy.get('#url').type('http://blogurl.com');

      cy.get('#create-button').click();

      cy.contains('Successfully added new blog');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'Another Blog',
          author: 'Blog Author',
          url: 'http://blogurl.com',
        });
      });

      it('user can like a blog', function () {
        cy.contains('View').click();
        cy.contains('Like').click();

        cy.contains('Likes: 1');
      });
    });
  });
});
