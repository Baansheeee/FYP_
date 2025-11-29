/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import axiosInstance from "@/api/axios"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, ThumbsUp, Eye, Loader2, Plus } from "lucide-react"
import toast from "react-hot-toast"

interface Reply {
  _id?: string
  userName: string
  userEmail?: string
  content: string
  likes: number
  likedBy?: string[]
  createdAt?: string
}

interface CommunityPost {
  _id: string
  title: string
  category: string
  content: string
  userName: string
  userEmail?: string
  tags: string[]
  views: number
  likes: number
  likedBy?: string[]
  replies: Reply[]
  isPinned: boolean
  status: "open" | "closed" | "solved"
  createdAt: string
}

interface CommunityForumProps {
  userEmail?: string
  userName?: string
}

export function CommunityForum({ userEmail, userName }: CommunityForumProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)
  const [showReplyDialog, setShowReplyDialog] = useState(false)
  const [showPostDetailModal, setShowPostDetailModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [newPostForm, setNewPostForm] = useState({
    title: "",
    category: "General",
    content: "",
    tags: "",
  })

  const [replyForm, setReplyForm] = useState({
    content: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterCategory !== "all") params.append("category", filterCategory)
      if (filterStatus !== "all") params.append("status", filterStatus)

      const response = await axiosInstance.get(`/community?${params.toString()}`)
      if (response.data.success) {
        setPosts(response.data.posts)
      }
    } catch (err: any) {
      console.error("Error fetching posts:", err)
      toast.error("Failed to fetch community posts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [filterCategory, filterStatus])

  // Create new post
  const handleCreatePost = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to create a post")
      setShowNewPostDialog(false)
      return
    }

    if (!newPostForm.title.trim() || !newPostForm.content.trim()) {
      toast.error("Title and content are required")
      return
    }

    try {
      setIsSubmitting(true)

      const userName = localStorage.getItem("name") || "Anonymous"
      const userEmail = localStorage.getItem("email") || "no-email@example.com"

      const payload = {
        title: newPostForm.title,
        category: newPostForm.category,
        content: newPostForm.content,
        tags: newPostForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        userName,
        userEmail,
      }

      const response = await axiosInstance.post("/community/create", payload)

      if (response.data.success) {
        toast.success("Post created successfully!")
        setNewPostForm({ title: "", category: "General", content: "", tags: "" })
        setShowNewPostDialog(false)
        fetchPosts()
      }
    } catch (err: any) {
      console.error("Create Post Error:", err)
      if (err.response?.status === 401) {
        toast.error("Your session has expired. Please log in again")
        setIsAuthenticated(false)
      } else {
        toast.error(err.response?.data?.message || "Error creating post")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Add reply to post
  const handleAddReply = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to reply")
      setShowReplyDialog(false)
      return
    }

    if (!replyForm.content.trim()) {
      toast.error("Reply content is required")
      return
    }

    if (!selectedPost) return

    try {
      setIsSubmitting(true)

      const userName = localStorage.getItem("name") || "Anonymous"
      const userEmail = localStorage.getItem("email") || "no-email@example.com"

      const response = await axiosInstance.post(`/community/${selectedPost._id}/reply`, {
        content: replyForm.content,
        userName,
        userEmail,
      })

      if (response.data.success) {
        toast.success("Reply added successfully")
        setReplyForm({ content: "" })
        setShowReplyDialog(false)
        setSelectedPost(response.data.post)
        fetchPosts()
      }
    } catch (err: any) {
      console.error("Error adding reply:", err)
      if (err.response?.status === 401) {
        toast.error("Your session has expired. Please log in again")
        setIsAuthenticated(false)
      } else {
        toast.error(err.response?.data?.message || "Error adding reply")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikePost = async (postId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to like")
      return
    }

    try {
      const response = await axiosInstance.put(`/community/${postId}/like`)
      if (response.data.success) {
        fetchPosts()
        const post = response.data.post
        const userEmail = localStorage.getItem("email") || "no-email@example.com"
        if (post.likedBy?.includes(userEmail)) {
          toast.success("Post liked!")
        } else {
          toast.success("Post unliked!")
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error liking post")
    }
  }

  const handleLikeReply = async (postId: string, replyId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to like")
      return
    }

    try {
      const response = await axiosInstance.put(`/community/${postId}/reply/${replyId}/like`)
      if (response.data.success) {
        fetchPosts()
        const post = response.data.post
        const reply = post?.replies.find((r) => r._id === replyId)
        const userEmail = localStorage.getItem("email") || "no-email@example.com"
        if (reply?.likedBy?.includes(userEmail)) {
          toast.success("Reply liked!")
        } else {
          toast.success("Reply unliked!")
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error liking reply")
    }
  }

  // Filter posts by search
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500"
      case "solved":
        return "bg-green-500"
      case "closed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      General: "bg-blue-100 text-blue-800",
      Help: "bg-yellow-100 text-yellow-800",
      "Feature Request": "bg-purple-100 text-purple-800",
      "Bug Report": "bg-red-100 text-red-800",
      "Best Practice": "bg-green-100 text-green-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const currentUserEmail = localStorage.getItem("email") || "no-email@example.com"

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Community Forum</CardTitle>
              <CardDescription>Ask questions, share knowledge, and connect with other users</CardDescription>
            </div>
            <Button
              onClick={() => setShowNewPostDialog(true)}
              className="gradient-purple text-white hover:opacity-90"
              disabled={!isAuthenticated}
              title={!isAuthenticated ? "Please log in to create a post" : ""}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />

            <div className="flex gap-4 flex-wrap">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Help">Help</SelectItem>
                  <SelectItem value="Feature Request">Feature Request</SelectItem>
                  <SelectItem value="Bug Report">Bug Report</SelectItem>
                  <SelectItem value="Best Practice">Best Practice</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="solved">Solved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ) : filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold">No posts found</h3>
              <p className="text-muted-foreground mt-2">Be the first to start a discussion!</p>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post._id} className="glass-card border-border/50 cursor-pointer hover:border-border">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.isPinned && <Badge className="bg-purple-600">📌 Pinned</Badge>}
                      <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                      <Badge className={`${getStatusColor(post.status)} text-white`}>{post.status}</Badge>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      by <span className="font-semibold">{post.userName}</span> •{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{post.content.substring(0, 150)}...</p>

                {post.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.replies.length} replies
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLikePost(post._id)}
                      className={`hover:bg-gray-800 ${post.likedBy?.includes(currentUserEmail) ? "bg-purple-600" : ""}`}
                      title={post.likedBy?.includes(currentUserEmail) ? "Click to unlike" : "Click to like"}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setSelectedPost(post)
                        setShowPostDetailModal(true)
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      View Replies
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* New Post Dialog */}
      <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>Share your question, idea, or experience with the community</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Title *</label>
              <Input
                placeholder="What is your question or topic?"
                value={newPostForm.title}
                onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category *</label>
              <Select
                value={newPostForm.category}
                onValueChange={(value) => setNewPostForm({ ...newPostForm, category: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Help">Help</SelectItem>
                  <SelectItem value="Feature Request">Feature Request</SelectItem>
                  <SelectItem value="Bug Report">Bug Report</SelectItem>
                  <SelectItem value="Best Practice">Best Practice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Content *</label>
              <Textarea
                placeholder="Describe your post in detail..."
                value={newPostForm.content}
                onChange={(e) => setNewPostForm({ ...newPostForm, content: e.target.value })}
                className="mt-1"
                rows={5}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Tags (comma-separated)</label>
              <Input
                placeholder="e.g., javascript, help, urgent"
                value={newPostForm.tags}
                onChange={(e) => setNewPostForm({ ...newPostForm, tags: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPostDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost} disabled={isSubmitting} className="gradient-purple text-white">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPostDetailModal} onOpenChange={setShowPostDetailModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPost.title}</DialogTitle>
                <DialogDescription>
                  Posted by {selectedPost.userName} on {new Date(selectedPost.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Post Content */}
                <div className="border-b pb-4">
                  <p className="text-sm mb-3">{selectedPost.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedPost.views} views
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikePost(selectedPost._id)}
                      className={selectedPost.likedBy?.includes(currentUserEmail) ? "text-purple-600" : ""}
                      title={selectedPost.likedBy?.includes(currentUserEmail) ? "Click to unlike" : "Click to like"}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {selectedPost.likes} likes
                    </Button>
                  </div>
                </div>

                {/* Replies Section */}
                <div>
                  <h3 className="font-semibold mb-3">{selectedPost.replies.length} Replies</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedPost.replies.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No replies yet. Be the first to reply!</p>
                    ) : (
                      selectedPost.replies.map((reply) => (
                        <div key={reply._id} className="bg-muted/50 p-3 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-sm">{reply.userName}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(reply.createdAt || "").toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm mb-2">{reply.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Add Reply Section */}
                <div className="border-t pt-4">
                  <label className="text-sm font-medium block mb-2">Add a Reply</label>
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={replyForm.content}
                    onChange={(e) => setReplyForm({ content: e.target.value })}
                    className="mb-2"
                    rows={3}
                  />
                  <Button
                    onClick={handleAddReply}
                    disabled={isSubmitting || !isAuthenticated}
                    className="gradient-purple text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Reply"
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog - Deprecated in favor of post detail modal */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Reply</DialogTitle>
            <DialogDescription>
              Replying to: <span className="font-semibold">{selectedPost?.title}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Your Reply *</label>
              <Textarea
                placeholder="Share your thoughts or answer..."
                value={replyForm.content}
                onChange={(e) => setReplyForm({ content: e.target.value })}
                className="mt-1"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReplyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReply} disabled={isSubmitting} className="gradient-purple text-white">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Reply"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
