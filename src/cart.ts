interface Product {
  id: string
  name: string
  price: number
}

interface CartItem extends Product {
  quantity: number
}

export class Cart {
  private items: CartItem[] = []
  private discountCode: string | null = null
  private discountType: string | null = null
  private discountValue: number = 0
  private taxRegion: string | null = null

  getItems(): CartItem[] {
    return this.items
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0)
  }

  addItem(product: Product, quantity: number): void {
    if (product.price <= 0) {
      throw new Error('Product price must be positive')
    }

    if (quantity > 99) {
      throw new Error('Maximum quantity per item is 99')
    }

    const existingItem = this.items.find((item) => item.id === product.id)

    if (existingItem) {
      if (existingItem.quantity + quantity > 99) {
        throw new Error('Maximum quantity per item is 99')
      }
      existingItem.quantity += quantity
    } else {
      this.items.push({
        ...product,
        quantity,
      })
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter((item) => item.id !== productId)
  }

  updateQuantity(productId: string, newQuantity: number): void {
    const item = this.items.find((item) => item.id === productId)
    if (item) {
      item.quantity = newQuantity
    }
  }

  clear(): void {
    this.items = []
  }

  getTotals(currency: string = 'USD') {
    const subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    let discountAmount = 0

    if (this.discountType === 'percentage') {
      discountAmount = subtotal * (this.discountValue / 100)
    } else if (this.discountType === 'fixed') {
      discountAmount = this.discountValue
    }

    const subtotalAfterDiscount = subtotal - discountAmount
    let taxAmount = 0

    if (this.taxRegion === 'California') {
      taxAmount = subtotalAfterDiscount * 0.0725
    } else if (this.taxRegion === 'New York') {
      taxAmount = subtotalAfterDiscount * 0.08
    } else if (this.taxRegion === 'Texas') {
      taxAmount = subtotalAfterDiscount * 0.0625
    } else if (this.taxRegion === 'International') {
      taxAmount = 0
    }

    const total = subtotalAfterDiscount + taxAmount

    let conversionRate = 1
    if (currency === 'EUR') {
      conversionRate = 0.92
    } else if (currency === 'GBP') {
      conversionRate = 0.79
    }

    return {
      subtotal: Math.round(subtotal * conversionRate * 100) / 100,
      discount: Math.round(discountAmount * conversionRate * 100) / 100,
      taxAmount: Math.round(taxAmount * conversionRate * 100) / 100,
      total: Math.round(total * conversionRate * 100) / 100,
      currency: currency as 'USD' | 'EUR' | 'GBP',
    }
  }

  applyDiscount(code: string, type: string, value: number): void {
    this.discountCode = code
    this.discountType = type
    this.discountValue = value
  }

  setTaxRegion(region: string): void {
    this.taxRegion = region
  }
}
