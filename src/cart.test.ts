import { describe, it, expect } from 'vitest'
import { Cart } from './cart'

describe('Cart', () => {
  describe('Basic Cart Management', () => {
    it('should create an empty cart', () => {
      const cart = new Cart()
      expect(cart.getItems()).toEqual([])
      expect(cart.getItemCount()).toBe(0)
    })

    it('should add an item to the cart', () => {
      const cart = new Cart()
      const product = {
        id: 'book-1',
        name: 'TypeScript Handbook',
        price: 29.99,
      }

      cart.addItem(product, 1)

      const items = cart.getItems()
      expect(items).toHaveLength(1)
      expect(items[0]).toEqual({
        id: 'book-1',
        name: 'TypeScript Handbook',
        price: 29.99,
        quantity: 1,
      })
    })

    it('should update quantity when adding existing item', () => {
      const cart = new Cart()
      const product = {
        id: 'book-1',
        name: 'TypeScript Handbook',
        price: 29.99,
      }

      cart.addItem(product, 2)
      cart.addItem(product, 3)

      const items = cart.getItems()
      expect(items).toHaveLength(1)
      expect(items[0].quantity).toBe(5)
    })

    it('should remove an item from the cart', () => {
      const cart = new Cart()
      const product = {
        id: 'book-1',
        name: 'TypeScript Handbook',
        price: 29.99,
      }

      cart.addItem(product, 2)
      cart.removeItem('book-1')

      expect(cart.getItems()).toEqual([])
    })

    it('should update item quantity', () => {
      const cart = new Cart()
      const product = {
        id: 'book-1',
        name: 'TypeScript Handbook',
        price: 29.99,
      }

      cart.addItem(product, 2)
      cart.updateQuantity('book-1', 5)

      const items = cart.getItems()
      expect(items[0].quantity).toBe(5)
    })

    it('should clear the entire cart', () => {
      const cart = new Cart()
      const product1 = {
        id: 'book-1',
        name: 'TypeScript Handbook',
        price: 29.99,
      }
      const product2 = {
        id: 'notebook-1',
        name: 'Developer Notebook',
        price: 12.5,
      }

      cart.addItem(product1, 2)
      cart.addItem(product2, 1)
      cart.clear()

      expect(cart.getItems()).toEqual([])
    })
  })

  describe('Price Calculations', () => {
    it('should calculate correct subtotal', () => {
      const cart = new Cart()
      cart.addItem({ id: 'book-1', name: 'Book', price: 29.99 }, 3)
      cart.addItem({ id: 'notebook-1', name: 'Notebook', price: 12.5 }, 2)

      const totals = cart.getTotals()
      expect(totals.subtotal).toBe(114.97)
    })
  })

  describe('Discount Codes', () => {
    it('should apply percentage discount code', () => {
      const cart = new Cart()
      cart.addItem({ id: 'book-1', name: 'Book', price: 29.99 }, 3)
      cart.addItem({ id: 'notebook-1', name: 'Notebook', price: 12.5 }, 2)

      cart.applyDiscount('SAVE20', 'percentage', 20)

      const totals = cart.getTotals()
      expect(totals.subtotal).toBe(114.97)
      expect(totals.discount).toBe(22.99)
    })

    it('should apply fixed amount discount code', () => {
      const cart = new Cart()
      cart.addItem({ id: 'book-1', name: 'Book', price: 29.99 }, 3)
      cart.addItem({ id: 'notebook-1', name: 'Notebook', price: 12.5 }, 2)

      cart.applyDiscount('10OFF', 'fixed', 10)

      const totals = cart.getTotals()
      expect(totals.subtotal).toBe(114.97)
      expect(totals.discount).toBe(10)
    })
  })

  describe('Tax Calculation', () => {
    it('should calculate tax for California', () => {
      const cart = new Cart()
      cart.addItem({ id: 'book-1', name: 'Book', price: 29.99 }, 3)
      cart.addItem({ id: 'notebook-1', name: 'Notebook', price: 12.5 }, 2)

      cart.setTaxRegion('California')

      const totals = cart.getTotals()
      expect(totals.subtotal).toBe(114.97)
      expect(totals.taxAmount).toBe(8.34)
    })
  })

  describe('Complete Order Calculation', () => {
    it('should calculate total with discount and tax', () => {
      const cart = new Cart()
      cart.addItem({ id: 'book-1', name: 'Book', price: 29.99 }, 3)
      cart.addItem({ id: 'notebook-1', name: 'Notebook', price: 12.5 }, 2)

      cart.applyDiscount('SAVE20', 'percentage', 20)
      cart.setTaxRegion('California')

      const totals = cart.getTotals()
      expect(totals.subtotal).toBe(114.97)
      expect(totals.discount).toBe(22.99)
      expect(totals.taxAmount).toBe(6.67)
      expect(totals.total).toBe(98.64)
    })
  })

  describe('Currency Support', () => {
    it('should return totals in USD by default', () => {
      const cart = new Cart()
      cart.addItem({ id: 'book-1', name: 'Book', price: 29.99 }, 1)

      const totals = cart.getTotals()
      expect(totals.currency).toBe('USD')
    })

    it('should convert totals to EUR', () => {
      const cart = new Cart()
      cart.addItem({ id: 'book-1', name: 'Book', price: 100 }, 1)

      const totals = cart.getTotals('EUR')
      expect(totals.currency).toBe('EUR')
      expect(totals.subtotal).toBe(92)
      expect(totals.total).toBe(92)
    })
  })

  describe('Business Rules', () => {
    it('should not allow more than 99 items of the same product', () => {
      const cart = new Cart()
      const product = { id: 'book-1', name: 'Book', price: 29.99 }

      expect(() => cart.addItem(product, 100)).toThrow(
        'Maximum quantity per item is 99'
      )
    })

    it('should not allow products with negative prices', () => {
      const cart = new Cart()
      const product = { id: 'book-1', name: 'Book', price: -10 }

      expect(() => cart.addItem(product, 1)).toThrow(
        'Product price must be positive'
      )
    })
  })
})
