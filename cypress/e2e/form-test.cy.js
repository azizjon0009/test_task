describe("Test login page", () => {
  let personal_info1 = {
    FirstName: "Test1",
    LastName: "Test2",
    Email: "azakromov9@mail.ru",
    PhoneNumber: "998910091998",
    Gender: "Female",
    Agreement: true,
  };

  let personal_info2 = {
    FirstName: "Test1",
    LastName: "Test2",
    Email: "azakromov9@mail.ru",
    PhoneNumber: "9989100sds91998",
    Gender: "Male",
    Agreement: true,
  };
  let personal_info3 = {
    FirstName: " ",
    LastName: " ",
    Email: "azakromov9@mail.ru",
    PhoneNumber: "998910091998",
    Gender: "Female",
    Agreement: true,
  };
  let personal_info4 = {
    FirstName: "Test1",
    LastName: "Test2",
    Email: "azakromov9@mail.ru",
    PhoneNumber: "998910091998",
    Gender: "Male",
    Agreement: false,
  };
  let personal_info5 = {
    FirstName: "Test1",
    LastName: "Test2",
    Email: "azakromov9mail.ru",
    PhoneNumber: "998910091998",
    Gender: "Male",
    Agreement: true,
  };
  beforeEach("visit ", () => {
    cy.visit("https://vladimirwork.github.io/web-ui-playground/");
  });

  it("submit with valid data", () => {
    //open website
    cy.get("input[name=FirstName]") //enter firstname
      .type(personal_info1.FirstName)
      .should("have.value", personal_info1.FirstName);
    cy.get("input[name=LastName]") //enter lastname
      .type(personal_info1.LastName)
      .should("have.value", personal_info1.LastName);
    cy.get("input[name=Email]") //enter email
      .type(personal_info1.Email)
      .should("have.value", personal_info1.Email);

    cy.get("input[name=PhoneNumber]") // enter phoneNumber
      .type(personal_info1.PhoneNumber)
      .should("have.value", personal_info1.PhoneNumber)
      .invoke("val")
      .should("have.length.within", 6, 14);

    cy.get('[type="radio"]') //select gender
      .get('[value="' + personal_info1.Gender + '"]')
      .check(personal_info1.Gender)
      .should("be.checked");

    cy.get('[type="checkbox"]').check().should("be.checked"); //check personal data checkbox
    cy.get('input[value="submit"]').click(); //submit form

    cy.get("body").then(($el) => {
      if ($el.find("p", "⚠ ").is(":visible")) {
        throw new Error("Test fails here, because you entered not valid data");
      }
    });
    cy.on("window:alert", (resp) => {
      let alert = JSON.parse(resp);
      expect(alert.FirstName).to.equal(personal_info1.FirstName);
      expect(alert.LastName).to.equal(personal_info1.LastName);
      expect(alert.Email).to.equal(personal_info1.Email);
      expect(alert.PhoneNumber).to.equal(personal_info1.PhoneNumber);
      expect(alert.Gender).to.equal(personal_info1.Gender);
      expect(alert.Agreement).to.equal(personal_info1.Agreement);

      console.log("---<", JSON.parse(resp));
    });
  });
  it("submit with invalid phone number", () => {
    //open website
    cy.get("input[name=FirstName]") //enter firstname
      .type(personal_info2.FirstName)
      .should("have.value", personal_info2.FirstName);
    cy.get("input[name=LastName]") //enter lastname
      .type(personal_info2.LastName)
      .should("have.value", personal_info2.LastName);
    cy.get("input[name=Email]") //enter email
      .type(personal_info2.Email)
      .should("have.value", personal_info2.Email);
    cy.get("input[name=PhoneNumber]") // enter phoneNumber
      .type(personal_info2.PhoneNumber)
      .should("have.value", personal_info2.PhoneNumber)
      .invoke("val")
      .should("not.have.length.within", 6, 14);

    cy.get('[type="radio"]') //select gender
      .get('[value="' + personal_info2.Gender + '"]')
      .check(personal_info2.Gender)
      .should("be.checked");

    cy.get('[type="checkbox"]').check().should("be.checked"); //check personal data checkbox
    cy.get('input[value="submit"]').click(); //submit form

    cy.get("body").then(($el) => {
      if (!$el.find("p", "⚠ ").is(":visible")) {
        throw new Error("Test fails here, because you entered valid data");
      }
    });
    cy.on("window:alert", (resp) => {
      let alert = JSON.parse(resp);
      expect(alert.FirstName).to.equal(personal_info2.FirstName);
      expect(alert.LastName).to.equal(personal_info2.LastName);
      expect(alert.Email).to.equal(personal_info2.Email);
      expect(alert.PhoneNumber).to.equal(personal_info2.PhoneNumber);
      expect(alert.Gender).to.equal(personal_info2.Gender[0]);
      expect(alert.Agreement).to.equal(personal_info2.Agreement);

      console.log("---<", JSON.parse(resp));
    });
  });
  it("submit with empty Firstname and Lastname", () => {
    //open website
    cy.get("input[name=FirstName]") //enter firstname
      .type(personal_info3.FirstName)
      .should("have.value", personal_info3.FirstName);
    cy.get("input[name=LastName]") //enter lastname
      .type(personal_info3.LastName)
      .should("have.value", personal_info3.LastName);
    cy.get("input[name=Email]") //enter email
      .type(personal_info3.Email)
      .should("have.value", personal_info3.Email);
    cy.get("input[name=PhoneNumber]") // enter phoneNumber
      .type(personal_info3.PhoneNumber)
      .should("have.value", personal_info3.PhoneNumber)
      .invoke("val")
      .should("have.length.within", 6, 14);

    cy.get('[type="radio"]') //select gender
      .get('[value="' + personal_info3.Gender + '"]')
      .check(personal_info3.Gender)
      .should("be.checked");

    cy.get('[type="checkbox"]').check().should("be.checked"); //check personal data checkbox
    cy.get('input[value="submit"]').click(); //sumbit form

    cy.get("body").then(($el) => {
      if (!$el.find("p", "⚠ ").is(":visible")) {
        throw new Error("Test fails here, because you entered valid data");
      }
    });
    cy.on("window:alert", (resp) => {
      let alert = JSON.parse(resp);
      expect(alert.FirstName).to.equal(personal_info3.FirstName);
      expect(alert.LastName).to.equal(personal_info3.LastName);
      expect(alert.Email).to.equal(personal_info3.Email);
      expect(alert.PhoneNumber).to.equal(personal_info3.PhoneNumber);
      expect(alert.Gender).to.equal(personal_info3.Gender[0]);
      expect(alert.Agreement).to.equal(personal_info3.Agreement);

      console.log("---<", JSON.parse(resp));
    });
  });
  it("submit with unchecked agreement", () => {
    let check_state;
    //open website
    cy.get("input[name=FirstName]") //enter firstname
      .type(personal_info4.FirstName)
      .should("have.value", personal_info4.FirstName);
    cy.get("input[name=LastName]") //enter lastname
      .type(personal_info4.LastName)
      .should("have.value", personal_info4.LastName);
    cy.get("input[name=Email]") //enter email
      .type(personal_info4.Email)
      .should("have.value", personal_info4.Email);
    cy.get("input[name=PhoneNumber]") // enter phoneNumber
      .type(personal_info4.PhoneNumber)
      .should("have.value", personal_info4.PhoneNumber)
      .invoke("val")
      .should("have.length.within", 6, 14);

    cy.get('[type="radio"]') //select gender
      .get('[value="' + personal_info4.Gender + '"]')
      .check(personal_info4.Gender)
      .should("be.checked");

    if (personal_info4.Agreement) {
      check_state = "be.checked";
      cy.get('[type="checkbox"]').check();
    } else {
      check_state = "not.be.checked";
    }
    cy.get('[type="checkbox"]').should("" + check_state + ""); //check personal data checkbox
    cy.get('input[value="submit"]').click(); //submit form

    cy.get("body").then(($el) => {
      if (!$el.find("p", "⚠ ").is(":visible")) {
        throw new Error("Test fails here, because you entered valid data");
      }
    });
    cy.on("window:alert", (resp) => {
      let alert = JSON.parse(resp);
      expect(alert.FirstName).to.equal(personal_info4.FirstName);
      expect(alert.LastName).to.equal(personal_info4.LastName);
      expect(alert.Email).to.equal(personal_info4.Email);
      expect(alert.PhoneNumber).to.equal(personal_info4.PhoneNumber);
      expect(alert.Gender).to.equal(personal_info4.Gender[0]);
      expect(alert.Agreement).to.equal(personal_info4.Agreement);

      console.log("---<", JSON.parse(resp));
    });
  });
  it("submit with invalid email", () => {
    //open website
    cy.get("input[name=FirstName]") //enter firstname
      .type(personal_info5.FirstName)
      .should("have.value", personal_info5.FirstName);
    cy.get("input[name=LastName]") //enter lastname
      .type(personal_info5.LastName)
      .should("have.value", personal_info5.LastName);
    cy.get("input[name=Email]") //enter email
      .type(personal_info5.Email)
      .should("have.value", personal_info5.Email);
    cy.get("input[name=PhoneNumber]") // enter phoneNumber
      .type(personal_info5.PhoneNumber)
      .should("have.value", personal_info5.PhoneNumber)
      .invoke("val")
      .should("have.length.within", 6, 14);

    cy.get('[type="radio"]') //select gender
      .get('[value="' + personal_info5.Gender + '"]')
      .check(personal_info5.Gender)
      .should("be.checked");

    cy.get('[type="checkbox"]').check().should("be.checked"); //check personal data checkbox
    cy.get('input[value="submit"]').click(); //submit form

    cy.get("body").then(($el) => {
      if (!$el.find("p", "⚠ ").is(":visible")) {
        throw new Error("Test fails here, because you entered valid data");
      }
    });
    cy.on("window:alert", (resp) => {
      let alert = JSON.parse(resp);
      expect(alert.FirstName).to.equal(personal_info5.FirstName);
      expect(alert.LastName).to.equal(personal_info5.LastName);
      expect(alert.Email).to.equal(personal_info5.Email);
      expect(alert.PhoneNumber).to.equal(personal_info5.PhoneNumber);
      expect(alert.Gender).to.equal(personal_info5.Gender[0]);
      expect(alert.Agreement).to.equal(personal_info5.Agreement);

      console.log("---<", JSON.parse(resp));
    });
  });
});
