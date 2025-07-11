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

## Development Methodology

### Core Development Principles

- **Business behavior first**: Focus on what the system does for users, not technical implementation
- **Emergent design**: Let architecture evolve based on real needs, not speculation
- **Simplicity over complexity**: Choose the simplest solution that delivers value
- **Dependency injection**: Pass dependencies explicitly
- **Clear boundaries**: Separate business logic from infrastructure
- **Function composition**: Build complex behavior by composing simple, focused functions

### Testing Guidelines

- **Tests define behavior**: Each test documents a specific business requirement
- **Shared code reuse**: Import shared logic from production code, never duplicate in tests
- **Test data factories**: Create functions that generate test data with sensible defaults
- **Business-focused tests**: Test names describe business value, not technical details
- **Refactor when valuable**: Actively and frequently look for opportunities to make meaningful refactorings to improve both implementation and test code

### A TDD Mindset

- **Red-Green-Refactor cycle**: Write failing test → Make it pass → Improve the code
- **Refactoring triggers**: After each green test, look for:
  - Duplication to extract
  - Complex expressions to simplify
  - Emerging patterns that suggest abstractions
  - Better names that clarify intent
  - **Code smells to eliminate**:
    - Logic crammed together without clear purpose
    - Mixed concerns (business logic, calculations, data handling in one place)
    - Hard-coded values that should be configurable
    - Similar operations repeated inline instead of abstracted
    - High coupling between components
    - Poor extensibility requiring core logic changes
- **Design emergence**: Let the tests guide you to discover the right abstractions
- **Continuous improvement**: Each cycle is an opportunity to improve both tests and implementation
