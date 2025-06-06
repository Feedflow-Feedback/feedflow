describe("Create Project", () => {
  it("Tests Login Flow", () => {
    cy.visit("http://localhost:5173");
    cy.get('button[data-cy="login"]').click();
    cy.get('input[data-cy="email"]').click();
    cy.get('input[data-cy="email"]').type("reust.yannic@proton.me");
    cy.get('input[data-cy="password"]').click();
    cy.get('input[data-cy="password"]').type("12345678");
    cy.get('button[data-cy="submit"]').click();

    cy.get('div[data-cy="addProjectButton"]').click();

    cy.get('input[data-cy="title"]').click();
    cy.get('input[data-cy="title"]').type("New Project");
    cy.get('input[data-cy="url"]').click();
    cy.get('input[data-cy="url"]').type("https://example.com");
    cy.get('textarea[data-cy="description"]').click();
    cy.get('textarea[data-cy="description"]').type(
      "This is a new project description."
    );
    cy.get('button[data-cy="submit"]').click();

    cy.contains("New Project").should("exist");
  });
});
