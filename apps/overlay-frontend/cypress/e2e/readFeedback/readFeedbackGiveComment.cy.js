describe("read Feedback & give Comment", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5173");

    // give specific feedback
    cy.get('img[alt="Add Icon"]').click();
    cy.get('div[id="extendedOverlay"]').should("be.visible");
    cy.get('img[alt="Feedback Text Icon"]').click();
    cy.get('p[id="exampleElement"]').click();
    cy.get('input[id="feedback_Author"]').click();
    cy.get('input[id="feedback_Author"]').type("Its Me the Feedback Author");
    cy.get('input[id="feedback_AuthorEmail"]').click();
    cy.get('input[id="feedback_AuthorEmail"]').type("email@author.com");
    cy.get('input[id="feedback_Title"]').click();
    cy.get('input[id="feedback_Title"]').type("This is my feedback.");
    cy.get('textarea[id="feedback_Description"]').type(
      "This is my feedback. Text Lorem Ipsum"
    );
    cy.get('button[type="submit"]').click();

    //read given Feedback

    cy.get('img[alt="Close Icon"]').click();
    cy.get('img[alt="Feedback List Icon"]').click();
    cy.contains("Its Me the Feedback Author").should("exist");
    cy.get(
      'button[class="bg-blue text-nowrap py-1 px-6 text-white rounded-md cursor-pointer"]'
    )
      .first()
      .click();
    cy.get('input[id="name"]').click();
    cy.get('input[id="name"]').type("Its Me the Feedback Author");
    cy.get('input[id="email"]').click();
    cy.get('input[id="email"]').type("email@author.com");
    cy.get('textarea[id="comment"]').click();
    cy.get('textarea[id="comment"]').type("New comment from me");
    cy.get(
      'button[class="bg-blue text-nowrap py-1 px-6 text-white rounded-md"]'
    )
      .first()
      .click();
    cy.get('p[class="mt-2 text-p-sm underline cursor-pointer"]')
      .first()
      .click();
    cy.contains("New comment from me").should("exist");
  });
});
