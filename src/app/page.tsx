"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, ShoppingBag, Users, Video, Sparkles } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  artisan: {
    name: string
  }
}

interface Artisan {
  id: number
  name: string
  bio: string
  story: string
  profileImage: string
  specialization: string
  location: string
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [featuredArtisans, setFeaturedArtisans] = useState<Artisan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, artisansRes] = await Promise.all([
          fetch('/api/products?category=ceramic-products'),
          fetch('/api/artisans')
        ])
        
        const products = await productsRes.json()
        const artisans = await artisansRes.json()
        
        setFeaturedProducts(products.slice(0, 6))
        setFeaturedArtisans(artisans.slice(0, 3))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const categories = [
    { name: "Pottery", slug: "pottery", icon: "🏺", description: "Traditional clay pottery and earthenware" },
    { name: "Weaving", slug: "weaving", icon: "🧵", description: "Handloom textiles and fabrics" },
    { name: "Wooden Crafts", slug: "wooden-crafts", icon: "🪵", description: "Carved wooden items and toys" },
    { name: "Jute Crafts", slug: "jute-crafts", icon: "🌾", description: "Eco-friendly jute products" },
    { name: "Ceramic Products", slug: "ceramic-products", icon: "🏺", description: "Glazed ceramic art and decor" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="h-3 w-3 mr-1" />
                Empowering Rural Artisans
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Discover Authentic Handmade Crafts
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect directly with skilled artisans from rural India. Every purchase supports traditional craftsmanship and empowers local communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/marketplace">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/videos">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Video className="mr-2 h-4 w-4" />
                    Watch Tutorials
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=600&fit=crop"
                alt="Artisan crafts"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground">Explore traditional crafts from master artisans</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/marketplace?category=${category.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="text-5xl mb-3">{category.icon}</div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm">{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked ceramic masterpieces</p>
            </div>
            <Link href="/marketplace">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-48 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredProducts.map((product) => (
                <Link key={product.id} href={`/marketplace/${product.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative h-64 w-full">
                        <Image
                          src={`https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop&q=80`}
                          alt={product.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">by {product.artisan.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                      <Badge variant="secondary">{product.category}</Badge>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-2xl font-bold">${product.price}</span>
                        <Button size="sm">View Details</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Artisans</h2>
            <p className="text-muted-foreground">Stories of craftsmanship and tradition</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-48 w-full rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                </Card>
              ))
            ) : (
              featuredArtisans.map((artisan) => (
                <Card key={artisan.id} className="text-center">
                  <CardHeader>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80`}
                        alt={artisan.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <CardTitle>{artisan.name}</CardTitle>
                    <CardDescription>{artisan.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge className="mb-3">{artisan.specialization}</Badge>
                    <p className="text-sm text-muted-foreground line-clamp-4">{artisan.story}</p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant="outline" size="sm">Read Story</Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <ShoppingBag className="h-12 w-12 mx-auto" />
              <h3 className="text-xl font-bold">Direct Sales</h3>
              <p className="text-primary-foreground/80">
                Buy directly from artisans at fair prices, supporting their livelihood
              </p>
            </div>
            <div className="space-y-3">
              <Video className="h-12 w-12 mx-auto" />
              <h3 className="text-xl font-bold">Skill Development</h3>
              <p className="text-primary-foreground/80">
                Access video tutorials and learn traditional craft techniques
              </p>
            </div>
            <div className="space-y-3">
              <Users className="h-12 w-12 mx-auto" />
              <h3 className="text-xl font-bold">Community Support</h3>
              <p className="text-primary-foreground/80">
                Join a community that values traditional craftsmanship
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 VillageCraft Connect. Empowering rural artisans.</p>
        </div>
      </footer>
    </div>
  )
}