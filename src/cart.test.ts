import { describe, it, expect } from 'vitest'
import { Cart } from './cart'

describe('Cart', () => {
  it('should create an empty cart', () => {
    const cart = new Cart()
    expect(cart.getItems()).toEqual([])
  })
})
