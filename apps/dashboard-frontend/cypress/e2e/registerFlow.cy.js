describe("Register Flow", () => {
  it("Tests Login Flow", () => {
    cy.visit("http://localhost:5173");
    cy.get('button[data-cy="register"]').click();
    cy.get('input[data-cy="email"]').click();
    cy.get('input[data-cy="email"]').type("reust.yannic4@proton.me");
    cy.get('input[data-cy="password"]').click();
    cy.get('input[data-cy="password"]').type("12345678");
    cy.get('input[data-cy="password2"]').click();
    cy.get('input[data-cy="password2"]').type("12345678");

    cy.get('button[data-cy="submit"]').click();

    // login
    cy.get('input[data-cy="email"]').click();
    cy.get('input[data-cy="email"]').type("reust.yannic4@proton.me");
    cy.get('input[data-cy="password"]').click();
    cy.get('input[data-cy="password"]').type("12345678");
    cy.get('button[data-cy="submit"]').click();
  });
});
