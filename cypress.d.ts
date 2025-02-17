/// <reference types="cypress" />

import { Chainable } from "./support/commands";

declare global {
  interface Cypress {
    Chainable: Chainable;
  }
}
