describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    cy.register({ name: 'Emil Dimitrov', username: 'emil', password: 'asd' });
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

      it('can be liked by a user', function () {
        cy.contains('View').click();
        cy.contains('Like').click();

        cy.contains('Likes: 1');
      });

      it('can be deleted by the user that added it', function () {
        cy.contains('View').click();
        cy.contains('Remove').click();

        cy.get('.blog').should('not.contain', 'Another Blog');
      });

      it('cannot be deleted by other user', function () {
        cy.contains('Logout').click();

        cy.register({ name: 'Other User', username: 'other', password: 'xxx' });
        cy.login({ username: 'other', password: 'xxx' });

        cy.contains('View').click();

        cy.get('.blog').should('not.contain', 'Remove');
      });
    });

    describe('and a few blogs exist', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'First Blog',
          author: 'Author 1',
          url: 'http://blogone.com',
        });
        cy.addBlog({
          title: 'Second Blog',
          author: 'Author 2',
          url: 'http://blogtwo.com',
        });
        cy.addBlog({
          title: 'Third Blog',
          author: 'Author 3',
          url: 'http://blogthree.com',
        });

        cy.get('.blog')
          .first()
          .contains('View')
          .click()
          .parent()
          .contains('Like')
          .click()
          .click();

        cy.get('.blog')
          .last()
          .contains('View')
          .click()
          .parent()
          .contains('Like')
          .click()
          .click()
          .click()
          .click();
      });

      it('are ordered by likes in descending order', function () {
        cy.get('.blog-likes').should(($likes) => {
          const counts = $likes.map((i, el) => {
            return Cypress.$(el).text();
          });

          expect(+counts.get()[0]).to.be.gt(+counts.get()[1]);
          expect(+counts.get()[1]).to.be.gt(+counts.get()[2]);
        });
      });
    });
  });
});
