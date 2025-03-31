// https://on.cypress.io/api

describe('Checkout Page - E2E', () => {
  it.only('Checkout as a Guest with Billing Address same as Shipping Address.', () => {
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.get('[data-cy="mobile-menu"]').should('be.visible')
    cy.get('[data-cy="mobile-menu"]').click()
    cy.contains('TestList').click()
    cy.get('[data-cy="product_name"]').first().click()
    cy.get('[data-cy="add_cart"]').first().click()
    cy.get('[data-cy="toast-message"]').should('be.visible').should('contain', "Product has been added to cart")
    cy.get('[data-cy="cart_button"]').find('span').should('contain', '1')
    cy.get('[data-cy="cart_button"]').click()
    cy.get('[data-cy="cart_page_button"]').click()
    cy.get('[data-cy="checkout_page_button"]').click()
    cy.get('[data-cy="shipping_first_name"]').type("Automation").as('shipping_first_name')
    cy.get('[data-cy="shipping_last_name"]').type("Tester").as('shipping_last_name')
    cy.get('[data-cy="shipping_email"]').type("oarthaseinaigay@gmail.com").as('shipping_email')
    cy.get('[data-cy="country-selector"]').select("Greece").as('country-selector')
    cy.get('[data-cy="region-selector"]').select("Attikḯ").as('region-selector')
    cy.get('[data-cy="shipping_address"]').type("Deligiannaki 16").as('shipping_address')
    cy.get('[data-cy="shipping_city"]').type("Athens").as('shipping_city')
    cy.get('[data-cy="shipping_code"]').type("10045").as('shipping_code')
    cy.get('[data-cy="same_as_shipping_checkbox"]').check()
    cy.get('[data-cy="billingForm"]').should('not.exist')
    cy.get('[data-cy="courier"]').click()
    cy.get('[id="cash"]').click()
    cy.get('[ data-cy="finishPaymentButton"]').contains("Finish Payment").click()
    cy.contains(' Thank you for your order! ').should('be.visible')
    cy.get('[data-cy="orderBillingName" > text]').should('have.value', '@shipping_first_name @shipping_last_name') 
    cy.get('@shipping_last_name').should('have.value', 'Tester')
    cy.get('@shipping_email').should('have.value', 'Tester')

  });

  it('Checkout as an User with Billing Address same as Shipping Address.', () => {
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.get('[data-cy="loginButtonHeader"]').click()
    cy.get('[id="email"]').type("dasexyninja@gmail.com")
    cy.get('[id="password"]').type("test")
    cy.get('[type="submit"]').click()
    cy.get('[data-cy="mobile-menu"]').should('be.visible')
    cy.get('[data-cy="mobile-menu"]').click()
    cy.contains('TestList').click()
    cy.get('[data-cy="product_name"]').first().click()
    cy.get('[data-cy="add_cart"]').first().click()
    cy.get('[data-cy="toast-message"]').should('be.visible').should('contain', "Product has been added to cart")
    cy.get('[data-cy="cart_button"]').find('span').should('contain', '1')
    cy.get('[data-cy="cart_button"]').click()
    cy.get('[data-cy="cart_page_button"]').click()
    cy.get('[data-cy="checkout_page_button"]').click()
    cy.get('[data-cy="shipping_first_name"]').type("Automation")
    cy.get('[data-cy="shipping_last_name"]').type("Tester")
    cy.get('[data-cy="shipping_email"]').type("oarthaseinaigay@gmail.com")
    cy.get('[data-cy="country-selector"]').select("Greece")
    cy.get('[data-cy="region-selector"]').select("Attikḯ")
    cy.get('[data-cy="shipping_address"]').type("Deligiannaki 16")
    cy.get('[data-cy="shipping_city"]').type("Athens")
    cy.get('[data-cy="shipping_code"]').type("10045")
    cy.get('[data-cy="same_as_shipping_checkbox"]').check()
    cy.get('[data-cy="billingForm"]').should('not.exist')
    cy.get('[data-cy="courier"]').click()
    cy.get('[id="cash"]').click()
    cy.get('[ data-cy="finishPaymentButton"]').contains("Finish Payment").click()
  });

  it('Create a new customer account.', () => {
    cy.viewport(1920, 1080)
    cy.visit('/')
    
  });
});
