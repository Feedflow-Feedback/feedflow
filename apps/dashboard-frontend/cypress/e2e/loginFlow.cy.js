describe("Login Flow", () => {
  it("Tests Login Flow", () => {
    cy.visit("http://localhost:5173");
    cy.get('button[data-cy="login"]').click();
    cy.get('input[data-cy="email"]').click();
    cy.get('input[data-cy="email"]').type("reust.yannic@proton.me");
    cy.get('input[data-cy="password"]').click();
    cy.get('input[data-cy="password"]').type("12345678");
    cy.get('button[data-cy="submit"]').click();

    cy.get('div[data-cy="projectPreview"]').first().click();
    cy.contains("button", "View Project").click();
    cy.get('tr[data-cy="tableRow"]').first().click();
    cy.get('button[data-cy="addCommentButton"]').click();
    cy.get('input[data-cy="name"]').click();
    cy.get('input[data-cy="name"]').type("Test Author");
    cy.get('textarea[data-cy="comment"]').click();
    cy.get('textarea[data-cy="comment"]').type("Good Comment");

    cy.get('button[data-cy="submit"]').click();

    cy.contains("Good Comment").should("be.visible");

    cy.get('button[id="headlessui-menu-button-«ra»"]').click();
    cy.get(
      'a[class="block px-4 py-2 text-sm data-focus:text-black data-focus:outline-hidden"]'
    )
      .first()
      .click();
    cy.get('svg[data-cy="Close Icon"]').click();
  });
});
