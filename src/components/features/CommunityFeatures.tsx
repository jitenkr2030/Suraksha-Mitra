"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  MessageCircle, 
  MapPin, 
  Shield, 
  Phone, 
  AlertTriangle,
  Heart,
  ThumbsUp,
  MessageSquare,
  Share2,
  Search,
  Bell,
  UserPlus,
  Calendar,
  TrendingUp
} from "lucide-react";

interface Post {
  id: string;
  author: string;
  city: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isUrgent: boolean;
  category: string;
}

interface CityCommunity {
  id: string;
  name: string;
  members: number;
  online: number;
  lastActivity: string;
}

interface Helpline {
  id: string;
  name: string;
  type: string;
  number: string;
  available: boolean;
  description: string;
}

export function CommunityFeatures() {
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  const posts: Post[] = [
    {
      id: "1",
      author: "Rajesh Kumar",
      city: "Mumbai",
      content: "Just completed the Fire Safety training! Highly recommend it to all guards. The instructor was very knowledgeable and practical examples were helpful.",
      timestamp: "2 hours ago",
      likes: 15,
      comments: 3,
      isUrgent: false,
      category: "Training",
    },
    {
      id: "2",
      author: "Priya Sharma",
      city: "Delhi",
      content: "URGENT: There's a new scam targeting security guards. Someone claiming to be from PSARA office asking for money for license renewal. Please don't fall for it!",
      timestamp: "4 hours ago",
      likes: 28,
      comments: 12,
      isUrgent: true,
      category: "Alert",
    },
    {
      id: "3",
      author: "Amit Patel",
      city: "Bangalore",
      content: "Found a great mobile recharge offer with 10% cashback for guards. Using the Suraksha Mitra app benefits. Saving money every month!",
      timestamp: "6 hours ago",
      likes: 22,
      comments: 8,
      isUrgent: false,
      category: "Tips",
    },
    {
      id: "4",
      author: "Sunita Reddy",
      city: "Chennai",
      content: "Does anyone have experience with night shift security? Looking for tips on staying alert and managing health during night duties.",
      timestamp: "1 day ago",
      likes: 18,
      comments: 15,
      isUrgent: false,
      category: "Question",
    },
  ];

  const cityCommunities: CityCommunity[] = [
    { id: "1", name: "Mumbai", members: 2540, online: 180, lastActivity: "2 min ago" },
    { id: "2", name: "Delhi", members: 1980, online: 120, lastActivity: "5 min ago" },
    { id: "3", name: "Bangalore", members: 1650, online: 95, lastActivity: "1 min ago" },
    { id: "4", name: "Chennai", members: 1420, online: 75, lastActivity: "10 min ago" },
    { id: "5", name: "Kolkata", members: 1200, online: 60, lastActivity: "15 min ago" },
  ];

  const helplines: Helpline[] = [
    {
      id: "1",
      name: "Emergency Helpline",
      type: "Emergency",
      number: "1800-123-4567",
      available: true,
      description: "24/7 emergency support for security personnel",
    },
    {
      id: "2",
      name: "Legal Assistance",
      type: "Legal",
      number: "1800-234-5678",
      available: true,
      description: "Free legal advice and support",
    },
    {
      id: "3",
      name: "Mental Health Support",
      type: "Counseling",
      number: "1800-345-6789",
      available: true,
      description: "Confidential counseling and mental health support",
    },
    {
      id: "4",
      name: "Welfare Officer",
      type: "General",
      number: "1800-456-7890",
      available: false,
      description: "General welfare queries and support (9 AM - 6 PM)",
    },
  ];

  const handleCreatePost = () => {
    if (newPost.trim()) {
      alert("Post created successfully!");
      setNewPost("");
    }
  };

  const handleLikePost = (postId: string) => {
    alert(`Liked post ${postId}`);
  };

  const handleJoinCommunity = (cityName: string) => {
    alert(`Joined ${cityName} community successfully!`);
  };

  const handleCallHelpline = (helpline: Helpline) => {
    if (helpline.available) {
      alert(`Calling ${helpline.name} at ${helpline.number}`);
    } else {
      alert(`${helpline.name} is currently unavailable. Please try again during working hours.`);
    }
  };

  const tabs = [
    { id: "feed", label: "Community Feed", icon: MessageCircle },
    { id: "cities", label: "City Groups", icon: MapPin },
    { id: "helpline", label: "Helpline", icon: Phone },
    { id: "alerts", label: "Safety Alerts", icon: AlertTriangle },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Alert": return "bg-red-100 text-red-800";
      case "Training": return "bg-blue-100 text-blue-800";
      case "Tips": return "bg-green-100 text-green-800";
      case "Question": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Guard Community</h1>
        <p className="text-gray-600">Connect, share, and support each other</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">8.5K</p>
            <p className="text-xs text-gray-600">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">450</p>
            <p className="text-xs text-gray-600">Posts Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">25</p>
            <p className="text-xs text-gray-600">Cities</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "feed" && (
        <div className="space-y-4">
          {/* Create Post */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Input
                  placeholder="Share your experience, tips, or ask questions..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {selectedCity}
                    </Badge>
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!newPost.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-3">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{post.author}</h4>
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            {post.city}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      {post.isUrgent && (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-xs">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs">Share</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "cities" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">City-wise Communities</h3>
          
          <div className="space-y-3">
            {cityCommunities.map((city) => (
              <Card key={city.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{city.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{city.members.toLocaleString()} members</span>
                          <span className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {city.online} online
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Last activity: {city.lastActivity}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleJoinCommunity(city.name)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-4 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Community Benefits</p>
                  <p className="text-sm text-blue-700">
                    Join your city community to get local updates, job opportunities, and connect with nearby guards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "helpline" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Welfare Helpline</h3>
          
          <div className="space-y-3">
            {helplines.map((helpline) => (
              <Card key={helpline.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        helpline.available ? "bg-green-100" : "bg-gray-100"
                      }`}>
                        <Phone className={`h-6 w-6 ${
                          helpline.available ? "text-green-600" : "text-gray-600"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{helpline.name}</h4>
                        <Badge className={helpline.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {helpline.type}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{helpline.description}</p>
                        <p className="text-xs text-gray-500">{helpline.number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {helpline.available ? (
                        <Button
                          onClick={() => handleCallHelpline(helpline)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call Now
                        </Button>
                      ) : (
                        <Badge variant="outline">Unavailable</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-4 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">Confidential Support</p>
                  <p className="text-sm text-orange-700">
                    All helpline services are completely confidential and free for registered security guards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "alerts" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Safety Alerts & Updates</h3>
          
          <div className="space-y-3">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-red-900">High Priority Alert</h4>
                      <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                    </div>
                    <p className="text-sm text-red-700 mb-2">
                      Fake PSARA officers targeting security guards in Mumbai area. Do not share personal information or pay money for license renewals.
                    </p>
                    <p className="text-xs text-red-600">2 hours ago • Mumbai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-orange-900">Weather Alert</h4>
                      <Badge className="bg-orange-100 text-orange-800">Moderate</Badge>
                    </div>
                    <p className="text-sm text-orange-700 mb-2">
                      Heavy rainfall expected in Chennai for next 48 hours. Guards on outdoor duty should take necessary precautions.
                    </p>
                    <p className="text-xs text-orange-600">5 hours ago • Chennai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">Job Opportunity</h4>
                      <Badge className="bg-blue-100 text-blue-800">Opportunity</Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      Multiple vacancies for experienced security guards in Bangalore. Minimum 2 years experience required.
                    </p>
                    <p className="text-xs text-blue-600">1 day ago • Bangalore</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-900">Training Update</h4>
                      <Badge className="bg-green-100 text-green-800">Training</Badge>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      New First Aid training batch starting next week in Delhi. Limited seats available. Register now.
                    </p>
                    <p className="text-xs text-green-600">2 days ago • Delhi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Alert Preferences</p>
                  <p className="text-sm text-gray-600">Customize your alert settings in the app profile</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}