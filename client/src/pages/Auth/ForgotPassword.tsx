/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Cloud, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import axiosInstance from "@/api/axios"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  
  // Step management
  const [step, setStep] = useState<"email" | "otp" | "reset">("email")
  
  // Form states
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [timer, setTimer] = useState(0)

  const carouselItems = [
    {
      image: "/images/aws_Image1.jpeg",
      heading: "Design your AWS Cloud Infrastructure",
      description: "Visualize and deploy AWS resources with ease."
    },
    {
      image: "/images/aws_Image2.jpeg",
      heading: "Monitor Your Data Centers",
      description: "Global real-time monitoring of your infrastructure."
    },
    {
      image: "/images/aws_Image3.jpeg",
      heading: "Build Scalable Cloud Solutions",
      description: "Create scalable, secure and reliable cloud architectures."
    }
  ]

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % carouselItems.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)

  // Step 1: Request OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email")
      return
    }

    setLoading(true)
    try {
      await axiosInstance.post("/auth/forgot", { email, step: "request" })
      toast.success("OTP sent to your email ✉️")
      setStep("otp")
      setTimer(60)
      
      // Countdown timer
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP ❌")
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP only
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp.trim() || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    try {
      await axiosInstance.post("/auth/forgot", { email, otp, step: "verify" })
      toast.success("OTP verified! ✓")
      setStep("reset")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP ❌")
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newPassword.trim() || !confirmPassword.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match ❌")
      return
    }

    setLoading(true)
    try {
      await axiosInstance.post("/auth/forgot", { 
        email, 
        otp,
        newPassword, 
        step: "reset" 
      })
      toast.success("Password reset successfully! 🎉")
      navigate("/auth/login")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reset password ❌")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep("email")
    setEmail("")
    setOtp("")
    setNewPassword("")
    setConfirmPassword("")
    setTimer(0)
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1f1f1f",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "14px",
          },
          success: {
            style: { background: "#22c55e" }
          },
          error: {
            style: { background: "#ef4444" }
          }
        }}
      />

      <div className="grid grid-cols-2 min-h-screen">
        {/* Left Column */}
        <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-8">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center shadow-lg group-hover:shadow-purple-glow transition-all duration-300">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">AWSOME</span>
            </div>

            {/* Header */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900">Reset Password</h1>
              <p className="text-gray-500 text-lg">
                {step === "email" && "Enter your email address to receive an OTP"}
                {step === "otp" && "Enter the OTP sent to your email"}
                {step === "reset" && "Create your new password"}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex gap-2">
              <div className={`h-1 flex-1 rounded-full transition-all ${step === "email" || step === "otp" || step === "reset" ? "bg-purple-500" : "bg-gray-300"}`}></div>
              <div className={`h-1 flex-1 rounded-full transition-all ${step === "otp" || step === "reset" ? "bg-purple-500" : "bg-gray-300"}`}></div>
              <div className={`h-1 flex-1 rounded-full transition-all ${step === "reset" ? "bg-purple-500" : "bg-gray-300"}`}></div>
            </div>

            {/* Step 1: Email Input */}
            {step === "email" && (
              <form className="space-y-6" onSubmit={handleSendOTP}>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === "otp" && (
              <form className="space-y-6" onSubmit={handleVerifyOTP}>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Enter OTP</Label>
                  <Input
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    disabled={loading}
                  />
                  <p className="text-sm text-gray-500">
                    {timer > 0 ? `Resend OTP in ${timer}s` : "OTP expired"}
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg disabled:opacity-50"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === "reset" && (
              <form className="space-y-6" onSubmit={handleResetPassword}>
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">New Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleReset}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Start Over
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1"
                onClick={() => navigate("/auth/login")}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column (Carousel) */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-12 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 w-full max-w-md space-y-8">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl">
              {carouselItems.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.heading}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
            </div>

            <div className="text-center text-white space-y-2">
              <h2 className="text-2xl font-bold">{carouselItems[currentImageIndex].heading}</h2>
              <p className="text-purple-100 text-sm">{carouselItems[currentImageIndex].description}</p>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button onClick={prevImage} className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20">
                <ChevronLeft />
              </button>

              <div className="flex gap-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                      }`}
                  />
                ))}
              </div>

              <button onClick={nextImage} className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword