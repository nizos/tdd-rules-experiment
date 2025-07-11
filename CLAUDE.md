# Shopping Cart Application

## Core Features

1. Cart Management

- Add items to cart (with product ID, name, price, and quantity)
- Remove items from cart
- Update item quantities
- Clear entire cart
- Get cart contents with calculated totals

2. Pricing & Discounts

- Calculate subtotal (sum of all items × quantities)
- Apply percentage-based discount codes (e.g., "SAVE20" for 20% off)
- Apply fixed-amount discount codes (e.g., "$10OFF")
- Ensure discounts cannot make total negative
- Only one discount code can be active at a time

3. Tax Calculation

- Calculate tax based on delivery location
- Support these regions with their tax rates:
  - California: 7.25%
  - New York: 8%
  - Texas: 6.25%
  - International: 0% (tax-free)
- Tax is calculated on subtotal after discounts

4. Currency Support

- Default currency is USD
- Support conversion to EUR (rate: 0.92) and GBP (rate: 0.79)
- All internal calculations in USD, convert only for display
- Show prices with appropriate currency symbols

5. Business Rules

- Maximum 99 items of same product
- Minimum order value: $1.00 (after discounts, before tax)
- Cart expires after 24 hours of inactivity
- Product prices must be positive

## Technical Requirements

- Use TypeScript
- Create a clean, modular design
- Provide clear interfaces for all public methods
- Include appropriate error handling
- Make the cart easy to integrate with a web frontend

## Example Usage Scenario

A customer adds 3 books ($29.99 each) and 2 notebooks ($12.50 each) to their cart. They apply a "SAVE20" discount code and select California as delivery location. The system should calculate the correct totals and be able to display them in USD, EUR, or GBP.

Please implement this system with a focus on maintainability and clear separation of concerns.
