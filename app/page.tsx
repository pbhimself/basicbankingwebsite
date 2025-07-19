"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import {
  Leaf,
  MapPin,
  Sprout,
  Users,
  Camera,
  Trophy,
  Heart,
  Star,
  Timer,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  X,
  CalendarIcon,
  Sparkles,
  Zap,
  Target,
  Globe,
  BookOpen,
  PlayCircle,
  Share2,
  Eye,
  Mail,
  Phone,
  CreditCard,
  Shield,
  Award,
  Video,
  Youtube,
  ThumbsUp,
  UserCheck,
} from "lucide-react"

export default function Home() {
  // State management
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [registrationStep, setRegistrationStep] = useState(1)
  const [selectedFarm, setSelectedFarm] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Form data states
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    activity: "",
    duration: "",
    specialRequests: "",
    experience: "",
    groupSize: 1,
    transportation: "",
    dietaryRestrictions: "",
    emergencyContact: "",
    insurance: false,
    newsletter: true,
    paymentMethod: "",
    totalAmount: 0,
  })

  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profession: "",
    experience: "",
    interests: [] as string[],
    location: "",
    emergencyContact: "",
    medicalConditions: "",
    newsletter: true,
    terms: false,
    profilePhoto: null as File | null,
  })

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Enhanced farms data
  const farms = [
    {
      id: 1,
      name: "Green Valley Organic Farm",
      distance: "2.3 km",
      driveTime: "15 min",
      location: "Nashik, Maharashtra",
      image: "/images/tractor-field.jpg",
      description: "Premium organic vegetables • Beginner to Expert",
      availability: "Available today 6 AM - 7 PM",
      ecoPoints: 75,
      activities: ["Organic Farming", "Composting", "Seed Planting", "Harvesting", "Irrigation"],
      rating: 4.9,
      reviews: 234,
      farmSize: "25 acres",
      established: "2015",
      certifications: ["Organic Certified", "Fair Trade", "Sustainable"],
      crops: ["Tomatoes", "Peppers", "Lettuce", "Herbs", "Carrots"],
      facilities: ["Rest Area", "Organic Cafe", "Tool Shed", "Washrooms", "Parking"],
      priceRange: "₹400-800",
      halfDayPrice: 500,
      fullDayPrice: 800,
      difficulty: "All Levels",
      weatherSuitability: "Excellent",
      soilType: "Loamy",
      irrigationType: "Drip Irrigation",
      specialFeatures: ["Solar Powered", "Rainwater Harvesting", "Butterfly Garden"],
      videoUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
      virtualTourUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
    },
    {
      id: 2,
      name: "Sunrise Heritage Orchards",
      distance: "5.7 km",
      driveTime: "25 min",
      location: "Ratnagiri, Maharashtra",
      image: "/images/hands-seedling.jpg",
      description: "Traditional fruit orchards • Intermediate to Expert",
      availability: "Available tomorrow 5 AM - 6 PM",
      ecoPoints: 100,
      activities: ["Fruit Harvesting", "Tree Pruning", "Grafting", "Orchard Management", "Pest Control"],
      rating: 4.8,
      reviews: 189,
      farmSize: "40 acres",
      established: "1987",
      certifications: ["Heritage Farm", "Organic Certified", "Export Quality"],
      crops: ["Mangoes", "Cashews", "Coconuts", "Jackfruit", "Guava"],
      facilities: ["Processing Unit", "Cold Storage", "Guest House", "Training Center"],
      priceRange: "₹600-1200",
      halfDayPrice: 700,
      fullDayPrice: 1200,
      difficulty: "Intermediate+",
      weatherSuitability: "Good",
      soilType: "Red Laterite",
      irrigationType: "Sprinkler System",
      specialFeatures: ["Heritage Varieties", "Export Quality", "Agro-Tourism"],
      videoUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
      virtualTourUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
    },
    {
      id: 3,
      name: "Modern Hydroponic Gardens",
      distance: "12.1 km",
      driveTime: "35 min",
      location: "Pune, Maharashtra",
      image: "/images/hands-plant.jpg",
      description: "High-tech soilless farming • All levels welcome",
      availability: "Available this weekend 7 AM - 8 PM",
      ecoPoints: 125,
      activities: ["Hydroponic Setup", "Nutrient Management", "Climate Control", "Automation", "Quality Testing"],
      rating: 4.7,
      reviews: 156,
      farmSize: "15 acres",
      established: "2020",
      certifications: ["Tech Certified", "Pesticide Free", "Water Efficient"],
      crops: ["Leafy Greens", "Strawberries", "Cherry Tomatoes", "Herbs", "Microgreens"],
      facilities: ["Climate Control", "Lab", "Visitor Center", "Cafe", "Gift Shop"],
      priceRange: "₹800-1500",
      halfDayPrice: 900,
      fullDayPrice: 1500,
      difficulty: "All Levels",
      weatherSuitability: "Excellent (Indoor)",
      soilType: "Soilless",
      irrigationType: "Hydroponic",
      specialFeatures: ["AI Monitoring", "Year-round Production", "Educational Tours"],
      videoUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
      virtualTourUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
    },
  ]

  // Featured farming videos
  const farmingVideos = [
    {
      id: 1,
      title: "Organic Farming Basics: From Seed to Harvest",
      description: "Learn the fundamentals of organic farming with our expert farmers",
      thumbnail: "/images/farmer-planting.jpg",
      duration: "12:45",
      views: "125K",
      category: "Beginner",
      videoUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
      instructor: "Farmer Rajesh",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Hydroponic Revolution: Future of Farming",
      description: "Discover how hydroponic farming is changing agriculture",
      thumbnail: "/images/hands-seedling.jpg",
      duration: "18:30",
      views: "89K",
      category: "Advanced",
      videoUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
      instructor: "Dr. Priya Sharma",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Sustainable Pest Control Methods",
      description: "Natural ways to protect your crops without chemicals",
      thumbnail: "/images/hands-plant.jpg",
      duration: "15:20",
      views: "67K",
      category: "Intermediate",
      videoUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
      instructor: "Farmer Anita",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Composting Masterclass",
      description: "Turn kitchen waste into black gold for your garden",
      thumbnail: "/images/tractor-field.jpg",
      duration: "22:15",
      views: "156K",
      category: "Beginner",
      videoUrl: "https://www.youtube.com/embed/0zNbmuSANqE",
      instructor: "Master Gardener Suresh",
      rating: 4.9,
    },
  ]

  // Handler functions
  const handleBookingClick = (farm?: any) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true)
      return
    }
    if (farm) {
      setSelectedFarm(farm)
    }
    setIsBookingOpen(true)
    setBookingStep(1)
  }

  const handleRegistrationClick = () => {
    setIsRegistrationOpen(true)
    setRegistrationStep(1)
  }

  const handleLoginClick = () => {
    setIsLoginOpen(true)
  }

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const handleNextStep = () => {
    setBookingStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setBookingStep((prev) => prev - 1)
  }

  const handleRegistrationNext = () => {
    setRegistrationStep((prev) => prev + 1)
  }

  const handleRegistrationPrev = () => {
    setRegistrationStep((prev) => prev - 1)
  }

  const handleLogin = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoggedIn(true)
    setUserProfile({
      name: "John Doe",
      email: loginData.email,
      ecoPoints: 1250,
      level: "Green Thumb",
      joinDate: "2023",
      completedExperiences: 12,
    })
    setIsSubmitting(false)
    setIsLoginOpen(false)
    setLoginData({ email: "", password: "", rememberMe: false })
  }

  const handleRegistration = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsRegistered(true)
    setTimeout(() => {
      setIsRegistrationOpen(false)
      setIsRegistered(false)
      setRegistrationStep(1)
      setIsLoggedIn(true)
      setUserProfile({
        name: `${registrationData.firstName} ${registrationData.lastName}`,
        email: registrationData.email,
        ecoPoints: 0,
        level: "Seedling",
        joinDate: "2024",
        completedExperiences: 0,
      })
      setRegistrationData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        profession: "",
        experience: "",
        interests: [],
        location: "",
        emergencyContact: "",
        medicalConditions: "",
        newsletter: true,
        terms: false,
        profilePhoto: null,
      })
    }, 3000)
  }

  const handleSubmitBooking = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsBookingOpen(false)
      setIsSubmitted(false)
      setBookingStep(1)
      setBookingData({
        name: "",
        email: "",
        phone: "",
        activity: "",
        duration: "",
        specialRequests: "",
        experience: "",
        groupSize: 1,
        transportation: "",
        dietaryRestrictions: "",
        emergencyContact: "",
        insurance: false,
        newsletter: true,
        paymentMethod: "",
        totalAmount: 0,
      })
    }, 3000)
  }

  // Calculate booking total
  useEffect(() => {
    if (selectedFarm && bookingData.duration) {
      const basePrice = bookingData.duration === "half-day" ? selectedFarm.halfDayPrice : selectedFarm.fullDayPrice
      const total = basePrice * bookingData.groupSize
      setBookingData((prev) => ({ ...prev, totalAmount: total }))
    }
  }, [selectedFarm, bookingData.duration, bookingData.groupSize])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-all duration-300 shadow-sm">
        <div className="container flex h-20 items-center justify-between py-4">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <Leaf className="h-8 w-8 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-green-800">FarmBreathe</span>
              <div className="text-xs text-green-600 font-medium">Where Wellness Grows</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: "#farms", label: "Farms", icon: Sprout },
              { href: "#videos", label: "Videos", icon: Video },
              { href: "#experiences", label: "Experiences", icon: Target },
              { href: "#learn", label: "Learn", icon: BookOpen },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-green-800 hover:text-green-600 transition-all duration-200 relative group"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            <Button
              onClick={() => setIsAboutUsOpen(true)}
              variant="outline"
              size="sm"
              className="border-green-600 text-green-700 hover:bg-green-50 transition-all duration-200 hover:scale-105"
            >
              <Users className="h-4 w-4 mr-2" />
              About Us
            </Button>
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn && userProfile ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">{userProfile.ecoPoints} Points</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {userProfile.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-green-800">{userProfile.name}</div>
                    <div className="text-xs text-green-600">{userProfile.level}</div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Button
                  onClick={handleLoginClick}
                  variant="outline"
                  className="hidden sm:flex border-green-600 text-green-700 hover:bg-green-50 transition-all duration-200 hover:scale-105 bg-transparent"
                >
                  Log In
                </Button>
                <Button
                  onClick={handleRegistrationClick}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 md:py-32">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8 animate-fade-in-up">
                <div className="space-y-4">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-4 py-2 text-sm font-medium">
                    🌱 #1 Farm Experience Platform in India
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    <span className="text-green-800">Escape the Concrete,</span>
                    <br />
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent relative">
                      Embrace the Soil
                      <Sparkles className="absolute -top-3 -right-10 h-8 w-8 text-yellow-500 animate-pulse" />
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-xl text-gray-600 leading-relaxed animate-fade-in-up animation-delay-200">
                    Transform your wellness journey through authentic farming experiences. Connect with nature, learn
                    sustainable practices, and discover the therapeutic power of soil.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up animation-delay-400">
                  <Button
                    onClick={() => handleBookingClick()}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 h-14 px-8 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  >
                    <Zap className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                    {isLoggedIn ? "Book Your Experience" : "Start Your Journey"}
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={() => document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" })}
                    variant="outline"
                    size="lg"
                    className="border-2 border-green-600 text-green-700 hover:bg-green-50 h-14 px-8 text-lg transition-all duration-300 hover:scale-105 group bg-transparent"
                  >
                    <PlayCircle className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Watch Videos
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 animate-fade-in-up animation-delay-600">
                  {[
                    { icon: Trophy, label: "Eco-Points", value: "1,250+" },
                    { icon: Camera, label: "Experiences", value: "5,000+" },
                    { icon: Users, label: "Happy Users", value: "10,000+" },
                    { icon: Leaf, label: "Farms", value: "50+" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center group cursor-pointer">
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:animate-bounce" />
                        <div className="text-2xl font-bold text-green-800">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative animate-fade-in-right">
                <div className="relative h-[500px] overflow-hidden rounded-3xl group">
                  <Image
                    src="/images/farmer-planting.jpg"
                    alt="Farmer planting in a beautiful green field"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => handleVideoClick(farmingVideos[0])}
                      size="lg"
                      className="bg-white/90 text-green-800 hover:bg-white rounded-full w-20 h-20 p-0"
                    >
                      <PlayCircle className="h-10 w-10" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Videos Section */}
        <section id="videos" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <Badge className="bg-red-100 text-red-800 mb-4">🎥 Featured Content</Badge>
              <h2 className="text-4xl font-bold text-green-800 mb-6">Learn from Expert Farmers</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Watch our comprehensive video library featuring real farmers sharing their knowledge and experiences.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {farmingVideos.map((video, index) => (
                <Card
                  key={video.id}
                  className={`group border-2 border-green-100 hover:border-green-300 bg-white transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up cursor-pointer overflow-hidden`}
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                        <PlayCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-black/80 text-white">{video.duration}</Badge>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-2 left-2">
                      <Badge
                        className={`${
                          video.category === "Beginner"
                            ? "bg-green-500"
                            : video.category === "Intermediate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } text-white`}
                      >
                        {video.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-green-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>{video.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span>{video.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {video.instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-green-700">{video.instructor}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => handleVideoClick(farmingVideos[0])}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Youtube className="mr-3 h-5 w-5" />
                View All Videos
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Farm Showcase */}
        <section id="farms" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <Badge className="bg-green-100 text-green-800 mb-4">🏆 Premium Farm Partners</Badge>
              <h2 className="text-4xl font-bold text-green-800 mb-6">Discover Amazing Farms Near You</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From traditional organic farms to cutting-edge hydroponic facilities, find the perfect farming
                experience that matches your interests and skill level.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {farms.map((farm, index) => (
                <Card
                  key={farm.id}
                  className={`group border-2 border-green-100 hover:border-green-300 bg-white transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up overflow-hidden`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={farm.image || "/placeholder.svg"}
                      alt={farm.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Farm badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <Badge className="bg-white/90 text-green-700 font-medium">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {farm.rating} ({farm.reviews})
                      </Badge>
                      <Badge className="bg-green-600 text-white">+{farm.ecoPoints} Eco-Points</Badge>
                    </div>

                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`${farm.distance.includes("2.3") ? "bg-green-500" : farm.distance.includes("5.7") ? "bg-yellow-500" : "bg-red-500"} text-white`}
                      >
                        {farm.distance}
                      </Badge>
                    </div>

                    {/* Video play button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => handleVideoClick({ ...farmingVideos[0], title: `${farm.name} Virtual Tour` })}
                        size="lg"
                        className="bg-white/90 text-green-800 hover:bg-white rounded-full w-16 h-16 p-0"
                      >
                        <PlayCircle className="h-8 w-8" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">{farm.name}</h3>
                        <p className="text-gray-600 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {farm.location}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Specialties</div>
                          <div className="flex flex-wrap gap-1">
                            {farm.crops.slice(0, 3).map((crop) => (
                              <Badge key={crop} variant="secondary" className="text-xs">
                                {crop}
                              </Badge>
                            ))}
                            {farm.crops.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{farm.crops.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-green-600" />
                            <span className="text-green-700 font-medium">{farm.driveTime} away</span>
                          </div>
                          <div className="font-bold text-green-800">{farm.priceRange}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <div className="w-full space-y-3">
                      <Button
                        onClick={() => handleBookingClick(farm)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:shadow-lg group"
                      >
                        {isLoggedIn ? "Book Experience" : "Login to Book"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleVideoClick({ ...farmingVideos[0], title: `${farm.name} Virtual Tour` })}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs bg-transparent"
                        >
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Virtual Tour
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <Badge className="bg-purple-100 text-purple-800 mb-4">🌟 Success Stories</Badge>
              <h2 className="text-4xl font-bold text-green-800 mb-6">Real Stories, Real Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from our community members who have transformed their lives through farming experiences.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Priya Sharma",
                  role: "Software Engineer",
                  image: "/images/hands-plant.jpg",
                  story:
                    "After 6 months of weekend farming, I've reduced my stress levels by 60% and learned to grow my own organic vegetables. The community here is amazing!",
                  ecoPoints: 1250,
                  experiences: 12,
                  achievement: "Green Thumb Master",
                },
                {
                  name: "Rajesh Patel",
                  role: "Marketing Director",
                  image: "/images/farmer-planting.jpg",
                  story:
                    "Our team building sessions at the farms have improved our collaboration by 40%. It's incredible how working with soil brings people together.",
                  ecoPoints: 890,
                  experiences: 8,
                  achievement: "Team Builder",
                },
                {
                  name: "Anita Desai",
                  role: "Teacher",
                  image: "/images/hands-seedling.jpg",
                  story:
                    "I bring my students here for field trips. They learn more about science in one day at the farm than weeks in the classroom!",
                  ecoPoints: 2100,
                  experiences: 25,
                  achievement: "Education Champion",
                },
              ].map((story, index) => (
                <Card
                  key={index}
                  className={`group border-2 border-green-100 hover:border-green-300 bg-white transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fade-in-up`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={story.image || "/placeholder.svg"}
                            alt={story.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-green-800">{story.name}</h3>
                          <p className="text-sm text-gray-600">{story.role}</p>
                          <Badge className="bg-green-100 text-green-700 text-xs mt-1">{story.achievement}</Badge>
                        </div>
                      </div>

                      <blockquote className="text-gray-700 italic">"{story.story}"</blockquote>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-green-600" />
                          <span>{story.ecoPoints} Points</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{story.experiences} Experiences</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-800 via-green-700 to-blue-800 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-xl text-green-50 max-w-3xl mx-auto mb-8">
                Join thousands of people who have discovered the joy of farming and transformed their relationship with
                nature.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!isLoggedIn ? (
                  <>
                    <Button
                      onClick={handleRegistrationClick}
                      size="lg"
                      className="bg-white text-green-800 hover:bg-green-100 h-14 px-8 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <UserCheck className="mr-3 h-5 w-5" />
                      Create Free Account
                    </Button>
                    <Button
                      onClick={handleLoginClick}
                      variant="outline"
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <Mail className="mr-3 h-5 w-5" />
                      Already a Member?
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => handleBookingClick()}
                    size="lg"
                    className="bg-white text-green-800 hover:bg-green-100 h-14 px-8 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Zap className="mr-3 h-5 w-5" />
                    Book Your Next Experience
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
                {[
                  { icon: Shield, label: "100% Safe", desc: "Insured experiences" },
                  { icon: Award, label: "Expert Guides", desc: "Certified farmers" },
                  { icon: Heart, label: "Wellness Focus", desc: "Mental health benefits" },
                  { icon: Globe, label: "Eco-Friendly", desc: "Sustainable practices" },
                ].map((feature, index) => (
                  <div key={index} className="group">
                    <feature.icon className="h-12 w-12 mx-auto mb-4 text-green-300 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-bold mb-2">{feature.label}</h3>
                    <p className="text-green-100 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-10 left-10 animate-float">
            <Leaf className="h-16 w-16 text-green-600 opacity-20" />
          </div>
          <div className="absolute bottom-10 right-10 animate-float animation-delay-1000">
            <Sprout className="h-12 w-12 text-green-500 opacity-30" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-green-100">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 group">
                <Leaf className="h-6 w-6 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xl font-bold text-green-800">FarmBreathe</span>
              </div>
              <p className="text-sm text-gray-600">Escape the Concrete, Embrace the Soil</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700">🏆 Featured on TechCrunch</Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium text-green-800">For Everyone</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {["Find Farms", "Book Experience", "Watch Videos", "Learn Farming", "Join Community"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link href="#" className="hover:text-green-600 transition-colors duration-200">
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium text-green-800">For Farmers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {["List Your Farm", "Create Content", "Manage Bookings", "Farmer Dashboard", "Success Stories"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link href="#" className="hover:text-green-600 transition-colors duration-200">
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium text-green-800">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Safety Guidelines"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link href="#" className="hover:text-green-600 transition-colors duration-200">
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-green-100 pt-8 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} FarmBreathe. All rights reserved. • Made with 🌱 for a greener future</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800 text-center">Welcome Back!</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={loginData.rememberMe}
                  onCheckedChange={(checked) => setLoginData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isSubmitting || !loginData.email || !loginData.password}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 h-12"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-green-600 hover:text-green-700"
                  onClick={() => {
                    setIsLoginOpen(false)
                    setIsRegistrationOpen(true)
                  }}
                >
                  Sign up here
                </Button>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Registration Modal */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800 text-center">
              {isRegistered ? "Welcome to FarmBreathe! 🎉" : "Join the FarmBreathe Community"}
            </DialogTitle>
          </DialogHeader>

          {isRegistered ? (
            <div className="text-center py-8 animate-fade-in-up">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-4">
                Welcome to the FarmBreathe family! You can now book amazing farming experiences.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>🎁 Welcome Bonus:</strong> 100 Eco-Points have been added to your account!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        step <= registrationStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-12 h-1 mx-2 transition-all duration-300 ${
                          step < registrationStep ? "bg-green-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Basic Information */}
              {registrationStep === 1 && (
                <div className="space-y-4 animate-fade-in-up">
                  <h3 className="text-lg font-semibold text-green-800">Basic Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={registrationData.firstName}
                        onChange={(e) => setRegistrationData((prev) => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter your first name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={registrationData.lastName}
                        onChange={(e) => setRegistrationData((prev) => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter your last name"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reg-email">Email *</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-phone">Phone Number *</Label>
                    <Input
                      id="reg-phone"
                      value={registrationData.phone}
                      onChange={(e) => setRegistrationData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reg-password">Password *</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        value={registrationData.password}
                        onChange={(e) => setRegistrationData((prev) => ({ ...prev, password: e.target.value }))}
                        placeholder="Create a password"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password *</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={registrationData.confirmPassword}
                        onChange={(e) => setRegistrationData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm your password"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleRegistrationNext}
                      disabled={
                        !registrationData.firstName ||
                        !registrationData.lastName ||
                        !registrationData.email ||
                        !registrationData.phone ||
                        !registrationData.password ||
                        registrationData.password !== registrationData.confirmPassword
                      }
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Profile Information */}
              {registrationStep === 2 && (
                <div className="space-y-4 animate-fade-in-up">
                  <h3 className="text-lg font-semibold text-green-800">Tell Us About Yourself</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="profession">Profession</Label>
                      <Input
                        id="profession"
                        value={registrationData.profession}
                        onChange={(e) => setRegistrationData((prev) => ({ ...prev, profession: e.target.value }))}
                        placeholder="e.g., Software Engineer"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={registrationData.location}
                        onChange={(e) => setRegistrationData((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., Mumbai, Maharashtra"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="experience">Farming Experience</Label>
                    <Select
                      value={registrationData.experience}
                      onValueChange={(value) => setRegistrationData((prev) => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Complete Beginner</SelectItem>
                        <SelectItem value="basic">Some Gardening Experience</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced/Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Interests (Select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Organic Farming",
                        "Hydroponics",
                        "Composting",
                        "Permaculture",
                        "Herb Gardening",
                        "Fruit Trees",
                        "Sustainable Living",
                        "Wellness",
                      ].map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={registrationData.interests.includes(interest)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setRegistrationData((prev) => ({ ...prev, interests: [...prev.interests, interest] }))
                              } else {
                                setRegistrationData((prev) => ({
                                  ...prev,
                                  interests: prev.interests.filter((i) => i !== interest),
                                }))
                              }
                            }}
                          />
                          <Label htmlFor={interest} className="text-sm">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="emergency-contact">Emergency Contact</Label>
                    <Input
                      id="emergency-contact"
                      value={registrationData.emergencyContact}
                      onChange={(e) => setRegistrationData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                      placeholder="Name and phone number"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button
                      onClick={handleRegistrationPrev}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleRegistrationNext} className="bg-green-600 text-white hover:bg-green-700">
                      Next Step
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Final Details */}
              {registrationStep === 3 && (
                <div className="space-y-4 animate-fade-in-up">
                  <h3 className="text-lg font-semibold text-green-800">Final Details</h3>
                  <div>
                    <Label htmlFor="medical-conditions">Medical Conditions (Optional)</Label>
                    <Textarea
                      id="medical-conditions"
                      value={registrationData.medicalConditions}
                      onChange={(e) => setRegistrationData((prev) => ({ ...prev, medicalConditions: e.target.value }))}
                      placeholder="Any medical conditions we should be aware of?"
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={registrationData.newsletter}
                        onCheckedChange={(checked) =>
                          setRegistrationData((prev) => ({ ...prev, newsletter: checked as boolean }))
                        }
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter for farming tips and updates
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={registrationData.terms}
                        onCheckedChange={(checked) =>
                          setRegistrationData((prev) => ({ ...prev, terms: checked as boolean }))
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="#" className="text-green-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-green-600 hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        *
                      </Label>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🎁 Welcome Benefits</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 100 free Eco-Points to start your journey</li>
                      <li>• Access to exclusive beginner-friendly farms</li>
                      <li>• Free farming starter guide</li>
                      <li>• Priority booking for popular experiences</li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={handleRegistrationPrev}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleRegistration}
                      disabled={isSubmitting || !registrationData.terms}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-800">
              {isSubmitted ? "Booking Confirmed! 🎉" : "Book Your Farm Experience"}
            </DialogTitle>
          </DialogHeader>

          {isSubmitted ? (
            <div className="text-center py-8 animate-fade-in-up">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6 animate-bounce" />
              <h3 className="text-2xl font-bold text-green-800 mb-4">Your Experience is Booked!</h3>
              <p className="text-gray-600 mb-6">
                Get ready for an amazing farming adventure! You'll receive a confirmation email with all the details.
              </p>

              <div className="bg-green-50 p-6 rounded-xl mb-6">
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Experience Details</h4>
                    <p className="text-sm text-green-700">
                      <strong>{selectedFarm?.name}</strong>
                      <br />
                      {selectedDate ? format(selectedDate, "PPP") : "Date TBD"}
                      <br />
                      {bookingData.duration === "half-day" ? "Half Day (4 hours)" : "Full Day (8 hours)"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Rewards Earned</h4>
                    <p className="text-sm text-green-700">
                      <strong>+{selectedFarm?.ecoPoints || 75} Eco-Points</strong>
                      <br />
                      Level progress updated
                      <br />
                      Achievement unlocked!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
                <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Experience
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        step <= bookingStep ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 5 && (
                      <div
                        className={`w-8 h-1 mx-2 transition-all duration-300 ${
                          step < bookingStep ? "bg-green-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Farm Selection */}
              {bookingStep === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-green-800">Choose Your Farm Experience</h3>
                  <div className="grid gap-6">
                    {farms.map((farm) => (
                      <Card
                        key={farm.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedFarm?.id === farm.id
                            ? "border-2 border-green-600 bg-green-50"
                            : "border border-gray-200 hover:border-green-300"
                        }`}
                        onClick={() => setSelectedFarm(farm)}
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={farm.image || "/placeholder.svg"}
                                alt={farm.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="text-lg font-bold text-green-800">{farm.name}</h4>
                                  <p className="text-gray-600 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {farm.location} • {farm.driveTime} away
                                  </p>
                                </div>
                                {selectedFarm?.id === farm.id && <CheckCircle className="h-6 w-6 text-green-600" />}
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Badge className="bg-green-100 text-green-700">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  {farm.rating} ({farm.reviews} reviews)
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-700">+{farm.ecoPoints} Eco-Points</Badge>
                                <Badge variant="outline">{farm.difficulty}</Badge>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-700">Specialties:</span>
                                  <p className="text-gray-600">{farm.crops.slice(0, 3).join(", ")}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-700">Price Range:</span>
                                  <p className="text-green-600 font-semibold">{farm.priceRange}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleNextStep}
                      disabled={!selectedFarm}
                      className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time Selection */}
              {bookingStep === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-green-800">Select Date & Duration</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label className="text-base font-medium text-gray-700 mb-4 block">Choose Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-12 bg-transparent"
                          >
                            <CalendarIcon className="mr-3 h-5 w-5" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label className="text-base font-medium text-gray-700 mb-4 block">Duration & Pricing</Label>
                      <RadioGroup
                        value={bookingData.duration}
                        onValueChange={(value) => setBookingData((prev) => ({ ...prev, duration: value }))}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors">
                          <RadioGroupItem value="half-day" id="half-day" />
                          <Label htmlFor="half-day" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Half Day Experience</div>
                                <div className="text-sm text-gray-600">4 hours • Perfect for beginners</div>
                              </div>
                              <div className="text-lg font-bold text-green-600">₹{selectedFarm?.halfDayPrice}</div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors">
                          <RadioGroupItem value="full-day" id="full-day" />
                          <Label htmlFor="full-day" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Full Day Experience</div>
                                <div className="text-sm text-gray-600">8 hours • Complete immersion</div>
                              </div>
                              <div className="text-lg font-bold text-green-600">₹{selectedFarm?.fullDayPrice}</div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-4 block">Select Activities</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedFarm?.activities.map((activity: string) => (
                        <div key={activity} className="flex items-center space-x-2">
                          <Checkbox
                            id={activity}
                            checked={bookingData.activity.includes(activity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setBookingData((prev) => ({
                                  ...prev,
                                  activity: prev.activity ? `${prev.activity}, ${activity}` : activity,
                                }))
                              } else {
                                setBookingData((prev) => ({
                                  ...prev,
                                  activity: prev.activity
                                    .replace(activity, "")
                                    .replace(/^,\s*|,\s*$/g, "")
                                    .replace(/,\s*,/g, ","),
                                }))
                              }
                            }}
                          />
                          <Label htmlFor={activity} className="text-sm font-medium">
                            {activity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!selectedDate || !bookingData.duration || !bookingData.activity}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Group Details */}
              {bookingStep === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-green-800">Group & Experience Details</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="group-size" className="text-base font-medium text-gray-700">
                        Group Size
                      </Label>
                      <Select
                        value={bookingData.groupSize.toString()}
                        onValueChange={(value) =>
                          setBookingData((prev) => ({ ...prev, groupSize: Number.parseInt(value) }))
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select group size" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                              {size} {size === 1 ? "person" : "people"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="experience-level" className="text-base font-medium text-gray-700">
                        Your Experience Level
                      </Label>
                      <Select
                        value={bookingData.experience}
                        onValueChange={(value) => setBookingData((prev) => ({ ...prev, experience: value }))}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Complete Beginner</SelectItem>
                          <SelectItem value="some">Some Gardening Experience</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="transportation" className="text-base font-medium text-gray-700">
                      Transportation
                    </Label>
                    <RadioGroup
                      value={bookingData.transportation}
                      onValueChange={(value) => setBookingData((prev) => ({ ...prev, transportation: value }))}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="own" id="own" />
                        <Label htmlFor="own">I'll arrange my own transportation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup">I need pickup service (+₹200)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="dietary" className="text-base font-medium text-gray-700">
                      Dietary Restrictions
                    </Label>
                    <Textarea
                      id="dietary"
                      value={bookingData.dietaryRestrictions}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, dietaryRestrictions: e.target.value }))}
                      placeholder="Any dietary restrictions or food allergies?"
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="emergency" className="text-base font-medium text-gray-700">
                      Emergency Contact
                    </Label>
                    <Input
                      id="emergency"
                      value={bookingData.emergencyContact}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                      placeholder="Name and phone number"
                      className="mt-2"
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!bookingData.experience || !bookingData.transportation}
                      className="bg-green-600 text-white hover:bg-green-700"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Safety & Insurance */}
              {bookingStep === 4 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-green-800">Safety & Insurance</h3>

                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Safety First
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• All activities are supervised by certified farm experts</li>
                      <li>• Safety equipment and first aid kits are available on-site</li>
                      <li>• Weather conditions are monitored for safe farming</li>
                      <li>• Emergency protocols are in place at all partner farms</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="insurance"
                        checked={bookingData.insurance}
                        onCheckedChange={(checked) =>
                          setBookingData((prev) => ({ ...prev, insurance: checked as boolean }))
                        }
                      />
                      <div>
                        <Label htmlFor="insurance" className="text-base font-medium">
                          Add Activity Insurance (+₹50)
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Covers medical expenses up to ₹1,00,000 for activity-related injuries
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="newsletter-booking"
                        checked={bookingData.newsletter}
                        onCheckedChange={(checked) =>
                          setBookingData((prev) => ({ ...prev, newsletter: checked as boolean }))
                        }
                      />
                      <div>
                        <Label htmlFor="newsletter-booking" className="text-base font-medium">
                          Subscribe to farming tips & updates
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Get weekly farming tips, seasonal guides, and exclusive offers
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="special-requests" className="text-base font-medium text-gray-700">
                      Special Requests
                    </Label>
                    <Textarea
                      id="special-requests"
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                      placeholder="Any special requirements, celebrations, or questions?"
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button onClick={handleNextStep} className="bg-green-600 text-white hover:bg-green-700">
                      Review Booking
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: Payment & Confirmation */}
              {bookingStep === 5 && (
                <div className="space-y-6 animate-fade-in-up">
                  <h3 className="text-xl font-semibold text-green-800">Review & Payment</h3>

                  {/* Booking Summary */}
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-4">Booking Summary</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={selectedFarm?.image || ""}
                            alt={selectedFarm?.name || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-green-700">{selectedFarm?.name}</h5>
                          <p className="text-sm text-gray-600">{selectedFarm?.location}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              +{selectedFarm?.ecoPoints} Eco-Points
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm border-t pt-4">
                        <div>
                          <span className="font-medium text-gray-700">Date:</span>
                          <p>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Duration:</span>
                          <p>{bookingData.duration === "half-day" ? "Half Day (4 hours)" : "Full Day (8 hours)"}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Group Size:</span>
                          <p>
                            {bookingData.groupSize} {bookingData.groupSize === 1 ? "person" : "people"}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Transportation:</span>
                          <p>{bookingData.transportation === "own" ? "Own transport" : "Pickup service"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-white border-2 border-green-200 p-6 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-4">Price Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Base Price ({bookingData.duration})</span>
                        <span>
                          ₹
                          {bookingData.duration === "half-day"
                            ? selectedFarm?.halfDayPrice
                            : selectedFarm?.fullDayPrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Group Size (×{bookingData.groupSize})</span>
                        <span>
                          ₹
                          {((bookingData.duration === "half-day"
                            ? selectedFarm?.halfDayPrice
                            : selectedFarm?.fullDayPrice) || 0) * bookingData.groupSize}
                        </span>
                      </div>
                      {bookingData.transportation === "pickup" && (
                        <div className="flex justify-between">
                          <span>Pickup Service</span>
                          <span>₹200</span>
                        </div>
                      )}
                      {bookingData.insurance && (
                        <div className="flex justify-between">
                          <span>Activity Insurance</span>
                          <span>₹50</span>
                        </div>
                      )}
                      <div className="border-t pt-3 flex justify-between text-lg font-bold text-green-800">
                        <span>Total Amount</span>
                        <span>
                          ₹
                          {bookingData.totalAmount +
                            (bookingData.transportation === "pickup" ? 200 : 0) +
                            (bookingData.insurance ? 50 : 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label className="text-base font-medium text-gray-700 mb-4 block">Payment Method</Label>
                    <RadioGroup
                      value={bookingData.paymentMethod}
                      onValueChange={(value) => setBookingData((prev) => ({ ...prev, paymentMethod: value }))}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">Secure payment via Razorpay</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer">
                          <Phone className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">UPI Payment</div>
                            <div className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer">
                          <Trophy className="h-5 w-5 text-yellow-600" />
                          <div>
                            <div className="font-medium">Eco-Points Wallet</div>
                            <div className="text-sm text-gray-600">
                              Use your earned points (Available: {userProfile?.ecoPoints || 0})
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmitBooking}
                      disabled={isSubmitting || !bookingData.paymentMethod}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Confirm & Pay ₹
                          {bookingData.totalAmount +
                            (bookingData.transportation === "pickup" ? 200 : 0) +
                            (bookingData.insurance ? 50 : 0)}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-green-800">{selectedVideo?.title}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVideoModalOpen(false)}
                className="hover:bg-green-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              <iframe
                src={selectedVideo?.videoUrl}
                title={selectedVideo?.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{selectedVideo?.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm text-gray-600">{selectedVideo?.rating}</span>
                  </div>
                  <Badge
                    className={`${
                      selectedVideo?.category === "Beginner"
                        ? "bg-green-100 text-green-700"
                        : selectedVideo?.category === "Intermediate"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedVideo?.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-gray-700 mb-3">{selectedVideo?.description}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {selectedVideo?.instructor
                        ?.split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-green-800">{selectedVideo?.instructor}</div>
                    <div className="text-sm text-gray-600">Certified Farm Expert</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Related Courses
                </Button>
                <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Farm Visit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* About Us Modal */}
      <Dialog open={isAboutUsOpen} onOpenChange={setIsAboutUsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
                <Users className="h-6 w-6 text-green-600" />
                About Us
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAboutUsOpen(false)}
                className="hover:bg-green-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="py-6 space-y-6 animate-fade-in-up">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                <div className="relative flex items-center justify-center w-20 h-20 bg-green-600 rounded-full">
                  <Users className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Meet the Founder</h3>
              <p className="text-gray-600 text-sm">
                Passionate about connecting urban professionals with nature and sustainable farming
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Founder & CEO</h4>
                  <p className="text-lg font-bold text-green-700">Pratik Bhangale</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Email</h4>
                  <a href="mailto:pratik.business28@gmail.com" className="text-green-700 hover:underline font-medium">
                    pratik.business28@gmail.com
                  </a>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  "Our mission is to bridge the gap between urban wellness and sustainable agriculture, creating
                  meaningful connections with nature."
                </p>
                <div className="flex justify-center gap-2">
                  <Badge className="bg-green-100 text-green-700">🌱 Sustainability</Badge>
                  <Badge className="bg-green-100 text-green-700">💚 Wellness</Badge>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => setIsAboutUsOpen(false)}
                  className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 hover:scale-105"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
