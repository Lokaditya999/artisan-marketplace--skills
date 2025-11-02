"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Clock, Filter, Star } from "lucide-react"

interface Course {
  id: number
  title: string
  description: string
  category: string
  thumbnail: string
  price: number
  duration: string
  level: string
  instructor: {
    name: string
    profileImage: string
    specialization: string
  }
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Pottery", value: "pottery" },
    { label: "Weaving", value: "weaving" },
    { label: "Wooden Crafts", value: "wooden-crafts" },
    { label: "Jute Crafts", value: "jute-crafts" },
    { label: "Ceramic Products", value: "ceramic-products" },
  ]

  const levels = [
    { label: "All Levels", value: "all" },
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ]

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true)
      try {
        const url = selectedCategory === 'all' 
          ? '/api/courses' 
          : `/api/courses?category=${selectedCategory}`
        const res = await fetch(url)
        const data = await res.json()
        
        // Filter by level if needed
        let filtered = data
        if (selectedLevel !== 'all') {
          filtered = data.filter((course: Course) => course.level === selectedLevel)
        }
        
        setCourses(filtered)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCourses()
  }, [selectedCategory, selectedLevel])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-blue-100 text-blue-800'
      case 'advanced': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Online Courses</h1>
          <p className="text-muted-foreground">
            Master traditional crafts with comprehensive courses from expert artisans
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2 flex-1">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Category" />
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
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-sm text-muted-foreground flex items-center">
            {!loading && `${courses.length} courses found`}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
          ) : courses.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-muted-foreground text-lg">No courses found</p>
            </div>
          ) : (
            courses.map((course) => (
              <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https://images.unsplash.com/photo-1611174318447-f268f76e6137?w=400&h=300&fit=crop&q=80`}
                      alt={course.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <Badge className={`absolute top-2 right-2 ${getLevelColor(course.level)}`}>
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1">
                  <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80`} />
                      <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{course.instructor.name}</p>
                      <p className="text-muted-foreground text-xs">{course.instructor.specialization}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="text-2xl font-bold">₹{course.price}</span>
                  <Button>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {/* Benefits Section */}
        <div className="bg-muted/50 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Enroll in Our Courses?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Instruction</h3>
              <p className="text-sm text-muted-foreground">
                Learn from master artisans with decades of experience
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Self-Paced Learning</h3>
              <p className="text-sm text-muted-foreground">
                Study at your own pace with lifetime access
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className="text-sm text-muted-foreground">
                Earn certificates upon course completion
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Community Support</h3>
              <p className="text-sm text-muted-foreground">
                Join a community of craft enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 VillageCraft Connect. Empowering rural artisans.</p>
        </div>
      </footer>
    </div>
  )
}