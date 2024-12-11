// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */

// gid://shopify/ProductVariant/46136584732894
export function run(input) {
  
  // Create merge operations in operations array using bundles
  const operations = [];

  // Store items into their respective bundle IDs
  const bundles = {};
  input.cart.lines.forEach(item => {
    if (item.bundleId?.value) {
      // Check if bundle ID key exists in bundles object
      if (!bundles[item.bundleId.value]) bundles[item.bundleId.value] = [];

      bundles[item.bundleId.value].push({
        "cartLineId": item.id,
        "quantity": item.quantity
      });
    } 
    // Create expand operations for products that have free gift metafield
    else {
      if (item.merchandise?.freeGift?.value) {
        operations.push({
          expand: {
            cartLineId: item.id,
            expandedCartItems: [
              {
                merchandiseId: item.merchandise.id,
                quantity: item.quantity,
              },
              {
                merchandiseId: item.merchandise.freeGift.value,
                quantity: 1,
              }
            ],
            title: `${item.merchandise.product.title} + Free Gift`
          }
        });
      }
    }
  });

  // Iterate over key, val pairs of bundles
  for (let id in bundles) {
    // Push merge operation to operations array
    operations.push({
      merge: {
        cartLines: bundles[id],
        parentVariantId: "gid://shopify/ProductVariant/46136584732894",
        price: {
          percentageDecrease: {
            value: 20
          }
        },
        title: "Customized Bundle"
      }
    })
  }


  console.log(JSON.stringify(operations))

  // If there are changes in operation
  if (operations.length) {
    return {
      operations: operations
    }
  }

  return NO_CHANGES;
};