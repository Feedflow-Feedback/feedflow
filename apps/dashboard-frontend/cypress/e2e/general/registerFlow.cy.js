/*describe("Test Overlay UI", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5174");
    cy.get('button[id="login"]').click();
    cy.get('input[id="email"]').click();
    cy.get('input[id="email"]').type("reust.yannic@proton.me");
    cy.get('input[id="password"]').click();
    cy.get('input[id="password"]').type("12345678");
    cy.get('button[type="submit"]').click();

    cy.get(
      'div[class="shadow-xl border-[1px] border-black/10 rounded-lg p-6 aspect-video  transition-all duration-100 bg-white "]'
    )
      .first()
      .click();
    cy.contains("button", "View Project").click();
    cy.get('tr[class="cursor-pointer"]').first().click();
    cy.get('button[id="addCommentButton"]').click();
    cy.get('input[id="name"]').click();
    cy.get('input[id="name"]').type("Test Author");
    cy.get('textarea[id="comment"]').click();
    cy.get('textarea[id="comment"]').type("Good Comment");

    cy.get('button[type="submit"]').click();

    cy.contains("Good Comment").should("be.visible");

    cy.get('button[id="headlessui-menu-button-«ra»"]').click();
    cy.get(
      'a[class="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-black data-focus:outline-hidden"]'
    )
      .first()
      .click();
    cy.get('img[alt="Close Icon"]').click();
  });
});*/
