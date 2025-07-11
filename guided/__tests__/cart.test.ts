import { describe, it, expect } from 'vitest'
import { Cart } from '../cart'

describe('Shopping Cart', () => {
  describe('Adding items', () => {
    it('should add a new item to an empty cart', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 1,
      })

      const items = cart.getItems()
      expect(items).toHaveLength(1)
      expect(items[0]).toEqual({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 1,
      })
    })

    it('should increase quantity when adding an existing item', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 1,
      })

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 2,
      })

      const items = cart.getItems()
      expect(items).toHaveLength(1)
      expect(items[0].quantity).toBe(3)
    })
  })

  describe('Removing items', () => {
    it('should remove an item from the cart', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 1,
      })

      cart.addItem({
        id: 'notebook-456',
        name: 'Coding Notebook',
        price: 12.5,
        quantity: 2,
      })

      cart.removeItem('book-123')

      const items = cart.getItems()
      expect(items).toHaveLength(1)
      expect(items[0].id).toBe('notebook-456')
    })
  })

  describe('Updating quantities', () => {
    it('should update the quantity of an existing item', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 1,
      })

      cart.updateQuantity('book-123', 5)

      const items = cart.getItems()
      expect(items[0].quantity).toBe(5)
    })
  })

  describe('Clearing cart', () => {
    it('should remove all items from the cart', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 1,
      })

      cart.addItem({
        id: 'notebook-456',
        name: 'Coding Notebook',
        price: 12.5,
        quantity: 2,
      })

      cart.clear()

      expect(cart.getItems()).toHaveLength(0)
    })
  })

  describe('Calculating totals', () => {
    it('should calculate the subtotal of all items', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 3,
      })

      cart.addItem({
        id: 'notebook-456',
        name: 'Coding Notebook',
        price: 12.5,
        quantity: 2,
      })

      expect(cart.getSubtotal()).toBe(114.97) // (29.99 * 3) + (12.50 * 2)
    })
  })

  describe('Discount codes', () => {
    it('should apply a percentage discount code', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 1,
      })

      cart.applyDiscount('SAVE20', 20, 'percentage')

      expect(cart.getDiscount()).toBe(5.998) // 20% of 29.99
    })

    it('should apply a fixed amount discount code', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 2,
      })

      cart.applyDiscount('10OFF', 10, 'fixed')

      expect(cart.getDiscount()).toBe(10)
    })

    it('should not allow discount to exceed subtotal', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 20,
        quantity: 1,
      })

      cart.applyDiscount('50OFF', 50, 'fixed')

      expect(cart.getDiscount()).toBe(20) // Limited to subtotal
      expect(cart.getTotal()).toBe(0) // Total should not be negative
    })

    it('should replace existing discount when applying a new one', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 100,
        quantity: 1,
      })

      cart.applyDiscount('SAVE20', 20, 'percentage')
      expect(cart.getDiscount()).toBe(20)

      cart.applyDiscount('10OFF', 10, 'fixed')
      expect(cart.getDiscount()).toBe(10) // New discount replaces old one
    })
  })

  describe('Tax calculation', () => {
    it('should calculate tax for California', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 100,
        quantity: 1,
      })

      cart.setDeliveryLocation('California')

      expect(cart.getTax()).toBeCloseTo(7.25, 2) // 7.25% of 100
    })

    it('should calculate tax for different regions', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 100,
        quantity: 1,
      })

      cart.setDeliveryLocation('New York')
      expect(cart.getTax()).toBeCloseTo(8, 2) // 8% of 100

      cart.setDeliveryLocation('Texas')
      expect(cart.getTax()).toBeCloseTo(6.25, 2) // 6.25% of 100

      cart.setDeliveryLocation('International')
      expect(cart.getTax()).toBe(0) // 0% for international
    })

    it('should calculate tax on discounted amount', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 100,
        quantity: 1,
      })

      cart.applyDiscount('SAVE20', 20, 'percentage')
      cart.setDeliveryLocation('California')

      expect(cart.getTax()).toBeCloseTo(5.8, 2) // 7.25% of 80 (100 - 20% discount)
    })
  })

  describe('Total calculation with tax', () => {
    it('should include tax in the total', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 100,
        quantity: 1,
      })

      cart.setDeliveryLocation('California')

      expect(cart.getTotal()).toBeCloseTo(107.25, 2) // 100 + 7.25 tax
    })
  })

  describe('Currency conversion', () => {
    it('should convert total to EUR', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 100,
        quantity: 1,
      })

      const totalInEUR = cart.getTotalInCurrency('EUR')
      expect(totalInEUR).toBeCloseTo(92, 2) // 100 * 0.92
    })

    it('should convert total to GBP', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 100,
        quantity: 1,
      })

      const totalInGBP = cart.getTotalInCurrency('GBP')
      expect(totalInGBP).toBeCloseTo(79, 2) // 100 * 0.79
    })

    it('should convert total with tax and discount to EUR', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 100,
        quantity: 1,
      })

      cart.applyDiscount('SAVE10', 10, 'fixed')
      cart.setDeliveryLocation('California')

      // Total: 100 - 10 + (90 * 0.0725) = 90 + 6.525 = 96.525
      // In EUR: 96.525 * 0.92 = 88.803
      const totalInEUR = cart.getTotalInCurrency('EUR')
      expect(totalInEUR).toBeCloseTo(88.803, 2)
    })
  })

  describe('Business rules', () => {
    it('should not allow more than 99 items of the same product', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 50,
      })

      expect(() => {
        cart.addItem({
          id: 'book-123',
          name: 'TypeScript Handbook',
          price: 29.99,
          quantity: 50, // This would exceed 99
        })
      }).toThrow('Cannot add more than 99 items of the same product')
    })

    it('should not allow updating quantity beyond 99', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'book-123',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 50,
      })

      expect(() => {
        cart.updateQuantity('book-123', 100)
      }).toThrow('Cannot have more than 99 items of the same product')
    })

    it('should validate minimum order value of $1.00', () => {
      const cart = new Cart()

      cart.addItem({
        id: 'cheap-item',
        name: 'Cheap Item',
        price: 5,
        quantity: 1,
      })

      cart.applyDiscount('SMALL_DISCOUNT', 4, 'fixed')

      expect(cart.isValidForCheckout()).toBe(true) // $1.00 after discount

      cart.applyDiscount('BIG_DISCOUNT', 4.01, 'fixed')
      expect(cart.isValidForCheckout()).toBe(false) // $0.99 after discount - below minimum
    })

    it('should not allow adding items with negative prices', () => {
      const cart = new Cart()

      expect(() => {
        cart.addItem({
          id: 'invalid-item',
          name: 'Invalid Item',
          price: -10,
          quantity: 1,
        })
      }).toThrow('Product price must be positive')
    })
  })
})
