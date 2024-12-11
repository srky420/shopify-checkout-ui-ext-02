// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const errors = [];

  input.cart.lines.forEach(lineItem => {
    const maxQuantity = lineItem.merchandise?.product?.max_quantity?.value;
    if (maxQuantity && lineItem.quantity > parseInt(maxQuantity)) {
      errors.push({
        localizedMessage: `Can't order more than ${maxQuantity} items of ${lineItem.merchandise?.product?.title}`,
        target: "cart"
      })
    }
  });

  return {
    errors: errors
  };
};