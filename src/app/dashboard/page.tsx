"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Package, Video, Lightbulb, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoCategory, setVideoCategory] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = [
    { label: "Pottery", value: "pottery" },
    { label: "Weaving", value: "weaving" },
    { label: "Wooden Crafts", value: "wooden-crafts" },
    { label: "Jute Crafts", value: "jute-crafts" },
    { label: "Ceramic Products", value: "ceramic-products" },
  ]

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate product upload
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    // Reset form
    setProductName("")
    setProductPrice("")
    setProductCategory("")
    setProductDescription("")
  }

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate video upload
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    // Reset form
    setVideoTitle("")
    setVideoCategory("")
  }

  const aiAdvice = [
    {
      title: "Product Photography",
      advice: "Use natural lighting and neutral backgrounds to showcase your crafts. Take multiple angles showing details and craftsmanship.",
      icon: <Lightbulb className="h-5 w-5" />
    },
    {
      title: "Pricing Strategy",
      advice: "Consider material costs, time invested, and market rates. Your ceramic products are priced competitively at $320-$1000 range.",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Product Descriptions",
      advice: "Tell the story behind your craft. Mention traditional techniques, materials used, and cultural significance to connect with buyers.",
      icon: <Package className="h-5 w-5" />
    },
    {
      title: "Video Content",
      advice: "Share your creative process in videos. Showcase techniques, explain your inspiration, and let customers see the artisan behind the craft.",
      icon: <Video className="h-5 w-5" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Artisan Dashboard</h1>
          <p className="text-muted-foreground">Manage your products, videos, and grow your craft business</p>
        </div>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Successfully submitted! Your content will be reviewed and published shortly.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="advice">AI Advice</TabsTrigger>
          </TabsList>

          {/* Upload Products */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload New Product
                </CardTitle>
                <CardDescription>
                  Add your handcrafted products to the marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        placeholder="e.g., Handcrafted Ceramic Bowl"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productPrice">Price ($)</Label>
                      <Input
                        id="productPrice"
                        type="number"
                        placeholder="e.g., 450"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productCategory">Category</Label>
                    <Select value={productCategory} onValueChange={setProductCategory} required>
                      <SelectTrigger id="productCategory">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Description</Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Describe your product, materials used, and crafting technique..."
                      rows={5}
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productImage">Product Images</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or WEBP (max. 5MB per image)
                      </p>
                      <Input id="productImage" type="file" accept="image/*" multiple className="hidden" />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Product
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* My Products */}
            <Card>
              <CardHeader>
                <CardTitle>My Products</CardTitle>
                <CardDescription>Manage your existing product listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-muted rounded" />
                        <div>
                          <h4 className="font-semibold">Product {i}</h4>
                          <p className="text-sm text-muted-foreground">Listed 2 days ago</p>
                          <Badge variant="secondary" className="mt-1">ceramic-products</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">${(Math.random() * 500 + 300).toFixed(0)}</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Videos */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Upload Skill Video
                </CardTitle>
                <CardDescription>
                  Share your crafting techniques and expertise with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVideoSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="videoTitle">Video Title</Label>
                    <Input
                      id="videoTitle"
                      placeholder="e.g., How to Make Traditional Pottery"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoCategory">Category</Label>
                    <Select value={videoCategory} onValueChange={setVideoCategory} required>
                      <SelectTrigger id="videoCategory">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoDescription">Video Description</Label>
                    <Textarea
                      id="videoDescription"
                      placeholder="Describe what viewers will learn from this video..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoFile">Video File</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload your video
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP4, MOV or AVI (max. 500MB)
                      </p>
                      <Input id="videoFile" type="file" accept="video/*" className="hidden" />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Video
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* My Videos */}
            <Card>
              <CardHeader>
                <CardTitle>My Videos</CardTitle>
                <CardDescription>Your published tutorial and showcase videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-24 bg-muted rounded flex items-center justify-center">
                          <Video className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Tutorial Video {i}</h4>
                          <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 5000)} views</p>
                          <Badge variant="secondary" className="mt-1">pottery</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Advice */}
          <TabsContent value="advice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI-Powered Business Advice
                </CardTitle>
                <CardDescription>
                  Personalized recommendations to improve your product presentation and sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {aiAdvice.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {item.icon}
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.advice}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Market Trends & Insights</CardTitle>
                <CardDescription>What's popular in your category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">🔥 Trending: Eco-friendly Products</h4>
                  <p className="text-sm text-muted-foreground">
                    Products emphasizing sustainable materials and traditional methods are seeing 35% more engagement.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">💡 Tip: Video Content</h4>
                  <p className="text-sm text-muted-foreground">
                    Artisans who post skill-sharing videos see 2x more product sales. Share your crafting process!
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">📈 Pricing Insight</h4>
                  <p className="text-sm text-muted-foreground">
                    Ceramic products in the $400-$700 range have the highest conversion rate in your region.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="bg-muted py-8 border-t mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 VillageCraft Connect. Empowering rural artisans.</p>
        </div>
      </footer>
    </div>
  )
}
