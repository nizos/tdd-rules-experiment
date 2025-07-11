export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export class Cart {
  private items: CartItem[] = []
  private discount: number = 0
  private location: string = ''

  private taxRates: Record<string, number> = {
    California: 0.0725,
    'New York': 0.08,
    Texas: 0.0625,
    International: 0,
  }

  private exchangeRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
  }

  addItem(item: CartItem): void {
    if (item.price <= 0) {
      throw new Error('Product price must be positive')
    }

    const existingItem = this.items.find((i) => i.id === item.id)

    if (existingItem) {
      const newQuantity = existingItem.quantity + item.quantity
      if (newQuantity > 99) {
        throw new Error('Cannot add more than 99 items of the same product')
      }
      existingItem.quantity = newQuantity
    } else {
      if (item.quantity > 99) {
        throw new Error('Cannot add more than 99 items of the same product')
      }
      this.items.push(item)
    }
  }

  getItems(): CartItem[] {
    return this.items
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter((item) => item.id !== itemId)
  }

  updateQuantity(itemId: string, newQuantity: number): void {
    const item = this.items.find((i) => i.id === itemId)
    if (item) {
      if (newQuantity > 99) {
        throw new Error('Cannot have more than 99 items of the same product')
      }
      item.quantity = newQuantity
    }
  }

  clear(): void {
    this.items = []
  }

  getSubtotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  applyDiscount(code: string, value: number, type: string): void {
    const subtotal = this.getSubtotal()

    if (type === 'percentage') {
      this.discount = subtotal * (value / 100)
    } else if (type === 'fixed') {
      this.discount = Math.min(value, subtotal)
    }
  }

  getDiscount(): number {
    return this.discount
  }

  getTotal(): number {
    return this.getSubtotal() - this.getDiscount() + this.getTax()
  }

  setDeliveryLocation(location: string): void {
    this.location = location
  }

  getTax(): number {
    if (!this.location || !this.taxRates[this.location]) {
      return 0
    }

    const taxableAmount = this.getSubtotal() - this.getDiscount()
    return taxableAmount * this.taxRates[this.location]
  }

  getTotalInCurrency(currency: string): number {
    const total = this.getTotal()
    const rate = this.exchangeRates[currency]

    if (!rate) {
      return total // Default to USD if currency not supported
    }

    return total * rate
  }

  isValidForCheckout(): boolean {
    const subtotalAfterDiscount = this.getSubtotal() - this.getDiscount()
    return subtotalAfterDiscount >= 1.0
  }
}
