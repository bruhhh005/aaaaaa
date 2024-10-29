'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, LogIn } from "lucide-react"

const categories = [
  "Paintings",
  "Sculptures",
  "Digital Art",
  "Photography",
  "Sketches",
  "Mixed Media"
]

const mockPosts = [
  { id: 1, user: "Alice", avatar: "A", category: "Paintings", image: "/placeholder.svg?height=300&width=400", likes: 120, comments: 15 },
  { id: 2, user: "Bob", avatar: "B", category: "Sculptures", image: "/placeholder.svg?height=300&width=400", likes: 85, comments: 7 },
  { id: 3, user: "Charlie", avatar: "C", category: "Digital Art", image: "/placeholder.svg?height=300&width=400", likes: 200, comments: 32 },
  { id: 4, user: "Diana", avatar: "D", category: "Photography", image: "/placeholder.svg?height=300&width=400", likes: 150, comments: 18 },
]

export default function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const handleLogin = () => {
    // Simulate login process
    setIsLoggedIn(true)
  }

  const filteredPosts = selectedCategory === "All" 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
        <h1 className="text-2xl font-bold">Art Class Feed</h1>
        {!isLoggedIn ? (
          <Button onClick={handleLogin} variant="secondary">
            <LogIn className="mr-2 h-4 w-4" /> Login with Outlook
          </Button>
        ) : (
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-muted p-4 hidden md:block">
          <h2 className="font-semibold mb-4">Categories</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-2">
              <Button 
                variant={selectedCategory === "All" ? "secondary" : "ghost"} 
                className="w-full justify-start"
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 p-4 overflow-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt={post.user} />
                      <AvatarFallback>{post.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{post.user}</CardTitle>
                      <p className="text-sm text-muted-foreground">{post.category}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <img 
                    src={post.image} 
                    alt={`${post.user}'s ${post.category} post`} 
                    className="w-full h-64 object-cover"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    <Heart className="mr-2 h-4 w-4" /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" /> {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}