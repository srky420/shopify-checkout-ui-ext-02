// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  
  // Line item targets to apply discount to
  const targets = [];

  // Iterate over line items from input query
  input.cart.lines.forEach(lineItem => {
    if (lineItem.quantity > 2) {
      targets.push({
        cartLine: {
          id: lineItem.id
        }
      })
    }
  });

  console.log(targets);

  // If no targets found, STDERR
  if (!targets.length) {
    console.error("No cart items of quantity over 2");
    return EMPTY_DISCOUNT;
  }

  // Otherwise apply a discount of 10% to the targets
  return {
    discounts: [
      {
        // Apply discount to targets
        targets: targets,
        value: {
          percentage: {
            value: "10.0"
          }
        }
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First
  }
};