describe("Test Overlay UI", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5179");
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
  });
});
