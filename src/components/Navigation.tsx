"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingBag, Video, GraduationCap, LayoutDashboard, ShoppingCart, LogOut, User } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { authClient, useSession } from "@/lib/auth-client"
import CartSidebar from "@/components/CartSidebar"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const { totalQuantity } = useCart()
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleSignOut = async () => {
    const { error } = await authClient.signOut()
    if (error?.code) {
      toast.error(error.code)
    } else {
      localStorage.removeItem("bearer_token")
      refetch()
      toast.success("Logged out successfully")
      router.push("/")
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VillageCraft Connect</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
                Marketplace
              </Link>
              <Link href="/videos" className="text-sm font-medium hover:text-primary transition-colors">
                Videos & Tutorials
              </Link>
              <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                Courses
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                <Button variant="default" size="sm">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Artisan Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </Button>

              {/* Auth Buttons */}
              {isPending ? (
                <div className="h-9 w-20 bg-muted animate-pulse rounded" />
              ) : session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      {session.user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/checkout">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center gap-2 md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                      Home
                    </Link>
                    <Link href="/marketplace" className="text-lg font-medium hover:text-primary transition-colors">
                      Marketplace
                    </Link>
                    <Link href="/videos" className="text-lg font-medium hover:text-primary transition-colors">
                      Videos & Tutorials
                    </Link>
                    <Link href="/courses" className="text-lg font-medium hover:text-primary transition-colors">
                      Courses
                    </Link>
                    <Link href="/dashboard" className="text-lg font-medium hover:text-primary transition-colors">
                      Artisan Dashboard
                    </Link>
                    
                    {!isPending && (
                      <>
                        {session?.user ? (
                          <>
                            <div className="pt-4 border-t">
                              <p className="text-sm text-muted-foreground mb-2">Logged in as</p>
                              <p className="font-semibold">{session.user.name}</p>
                            </div>
                            <Button variant="outline" onClick={handleSignOut} className="w-full">
                              <LogOut className="h-4 w-4 mr-2" />
                              Logout
                            </Button>
                          </>
                        ) : (
                          <div className="pt-4 border-t space-y-2">
                            <Link href="/login" className="block">
                              <Button variant="outline" className="w-full">
                                Login
                              </Button>
                            </Link>
                            <Link href="/register" className="block">
                              <Button className="w-full">
                                Register
                              </Button>
                            </Link>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}