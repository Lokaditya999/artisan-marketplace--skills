"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Eye, Filter } from "lucide-react"

interface Video {
  id: number
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  category: string
  type: string
  views: number
  artisan: {
    name: string
    profileImage: string
  }
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Pottery", value: "pottery" },
    { label: "Weaving", value: "weaving" },
    { label: "Wooden Crafts", value: "wooden-crafts" },
    { label: "Jute Crafts", value: "jute-crafts" },
    { label: "Ceramic Products", value: "ceramic-products" },
  ]

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true)
      try {
        let url = '/api/videos'
        const params = new URLSearchParams()
        if (selectedCategory !== 'all') params.append('category', selectedCategory)
        if (activeTab !== 'all') params.append('type', activeTab)
        if (params.toString()) url += `?${params.toString()}`
        
        const res = await fetch(url)
        const data = await res.json()
        setVideos(data)
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchVideos()
  }, [selectedCategory, activeTab])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Videos & Tutorials</h1>
          <p className="text-muted-foreground">
            Learn traditional crafting techniques from master artisans
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select category" />
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

        {/* Tabs for Video Types */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
            <TabsTrigger value="showcase">Showcases</TabsTrigger>
            <TabsTrigger value="course">Course Previews</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="p-0">
                      <Skeleton className="h-48 w-full rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))
              ) : videos.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-muted-foreground text-lg">No videos found</p>
                </div>
              ) : (
                videos.map((video) => (
                  <Card key={video.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0 relative">
                      <div className="relative h-48 w-full bg-muted rounded-t-lg overflow-hidden">
                        <Image
                          src={`https://images.unsplash.com/photo-1611174318447-f268f76e6137?w=400&h=300&fit=crop&q=80`}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="lg" variant="secondary" className="rounded-full">
                            <Play className="h-6 w-6 mr-2" />
                            Watch Now
                          </Button>
                        </div>
                        <Badge className="absolute top-2 right-2">{video.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                            <Image
                              src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80`}
                              alt={video.artisan.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">{video.artisan.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{video.views.toLocaleString()}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="mt-3">{video.category}</Badge>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Why Learn Traditional Crafts?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preserve Heritage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn centuries-old techniques passed down through generations of master artisans
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Develop Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Build practical skills in pottery, weaving, woodwork and more with hands-on tutorials
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Support Artisans</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every view supports rural craftspeople and helps preserve traditional craftsmanship
                </CardDescription>
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
