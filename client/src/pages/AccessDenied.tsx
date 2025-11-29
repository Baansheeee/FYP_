import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Lock, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const AccessDenied = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Get the last visited page from sessionStorage
    const lastPage = sessionStorage.getItem("lastVisitedPage")
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Redirect to last visited page or dashboard
          navigate(lastPage && lastPage !== location.pathname ? lastPage : "/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate, location.pathname])

  const handleGoBack = () => {
    const lastPage = sessionStorage.getItem("lastVisitedPage")
    navigate(lastPage && lastPage !== location.pathname ? lastPage : "/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
            <Lock className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Access Denied</h1>
          <p className="text-gray-400 text-lg">You don't have permission to access this page</p>
        </div>

        {/* Message */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <p className="text-gray-300 text-sm">
            This page is restricted to administrators only. Your current account does not have the necessary permissions to view this content.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
          <Clock className="w-5 h-5 text-blue-400" />
          <p className="text-blue-300 font-medium">
            Redirecting in <span className="font-bold text-lg">{countdown}s</span>
          </p>
        </div>

        {/* Button */}
        <Button
          onClick={handleGoBack}
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
        >
          Go Back Now
        </Button>

        {/* Alternative action */}
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          className="w-full h-10"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default AccessDenied
