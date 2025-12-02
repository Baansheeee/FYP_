/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "../api/axios"
import { Loader2 } from "lucide-react"

interface Lecture {
  _id: string
  title: string
  description: string
  fileUrl: string
  fileName: string
  fileType: string
  duration: number
  uploadedBy: string
  createdAt: string
}

interface LectureFormProps {
  lecture?: Lecture | null
  onSuccess: () => void
  onCancel: () => void
}

export function LectureForm({ lecture, onSuccess, onCancel }: LectureFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 0,
    fileUrl: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (lecture) {
      setFormData({
        title: lecture.title,
        description: lecture.description,
        duration: lecture.duration,
        fileUrl: lecture.fileUrl,
      })
      // Determine if it's a file or URL
      setUploadMethod(lecture.fileUrl.startsWith("/uploads/") ? "file" : "url")
    }
  }, [lecture])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const form = new FormData()
      form.append("title", formData.title)
      form.append("description", formData.description)
      form.append("duration", formData.duration.toString())

      if (uploadMethod === "file") {
        if (!file && !lecture) {
          setError("Please select a file to upload")
          setLoading(false)
          return
        }
        if (file) {
          form.append("file", file)
        }
      } else {
        if (!formData.fileUrl) {
          setError("Please enter a file URL")
          setLoading(false)
          return
        }
        form.append("fileUrl", formData.fileUrl)
      }

      if (lecture) {
        // Update existing lecture
        await axiosInstance.put(`/lectures/${lecture._id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      } else {
        // Create new lecture
        await axiosInstance.post("/lectures/create", form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      onSuccess()
    } catch (err: any) {
      setError(err.response?.data?.message || "Error saving lecture")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{lecture ? "Edit Lecture" : "Create New Lecture"}</CardTitle>
        <CardDescription>{lecture ? "Update lecture details" : "Add a new lecture to the system"}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{error}</div>}

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input
              name="title"
              placeholder="Enter lecture title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              placeholder="Enter lecture description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (minutes)</label>
            <Input
              name="duration"
              type="number"
              placeholder="Enter duration in minutes"
              value={formData.duration}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          {/* File Upload Method Toggle */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="file"
                  checked={uploadMethod === "file"}
                  onChange={(e) => setUploadMethod(e.target.value as "file" | "url")}
                />
                <span className="text-sm">Upload File</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="url"
                  checked={uploadMethod === "url"}
                  onChange={(e) => setUploadMethod(e.target.value as "file" | "url")}
                />
                <span className="text-sm">External URL</span>
              </label>
            </div>
          </div>

          {/* File Input or URL Input */}
          {uploadMethod === "file" ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select File {!lecture && "*"}</label>
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".mp4,.webm,.pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.ppt,.pptx,.txt"
              />
              <p className="text-xs text-muted-foreground">Supported: Video, PDF, Images, Documents (Max 100MB)</p>
              {file && <p className="text-xs text-green-600">Selected: {file.name}</p>}
              {lecture && lecture.fileUrl && (
                <p className="text-xs text-muted-foreground">Current: {lecture.fileName}</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium">File URL *</label>
              <Input
                name="fileUrl"
                placeholder="Enter external file URL"
                value={formData.fileUrl}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : lecture ? (
                "Update Lecture"
              ) : (
                "Create Lecture"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
