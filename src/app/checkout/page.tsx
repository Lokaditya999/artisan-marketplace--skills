"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/Navigation"
import { useCart } from "@/contexts/CartContext"
import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, ShoppingBag, Lock } from "lucide-react"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, totalQuantity, totalPrice, clearCart } = useCart()
  const { data: session, isPending } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    country: "",
    city: "",
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to proceed with checkout")
      router.push("/login?redirect=/checkout")
    }
  }, [session, isPending, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!session?.user) {
      toast.error("Please login to place an order")
      router.push("/login?redirect=/checkout")
      return
    }
    
    if (cart.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    // Validate form
    if (!formData.fullName || !formData.phone || !formData.address || !formData.country || !formData.city) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("bearer_token")
      
      // Create order in database
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart,
          totalPrice: totalPrice,
          totalQuantity: totalQuantity,
          shippingInfo: formData
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create order")
      }

      const order = await response.json()
      
      toast.success(`Order #${order.id} placed successfully! Thank you for your purchase.`)
      clearCart()
      
      // Redirect to orders page
      setTimeout(() => {
        router.push("/orders")
      }, 1500)
      
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading while checking authentication
  if (isPending) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  // Show login prompt if not authenticated
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Lock className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">Please login to proceed with checkout</p>
            <Button onClick={() => router.push("/login?redirect=/checkout")}>
              Login to Continue
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to your cart to continue shopping</p>
            <Link href="/marketplace">
              <Button>Browse Marketplace</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Keep Shopping
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Products in Cart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={`https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop&q=80`}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{item.price}/1 product</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                        <p className="font-semibold">{item.quantity}</p>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Checkout</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => handleSelectChange("country", value)}
                      required
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => handleSelectChange("city", value)}
                      required
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="kolkata">Kolkata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Quantity</span>
                      <span className="font-semibold">{totalQuantity}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Price</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "PLACE ORDER"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="bg-muted py-8 border-t mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 VillageCraft Connect. Empowering rural artisans.</p>
        </div>
      </footer>
    </div>
  )
}