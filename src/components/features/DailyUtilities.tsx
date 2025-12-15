"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, 
  Clock, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  Play,
  Pause,
  Flag,
  Coffee,
  Moon,
  Sun
} from "lucide-react";

interface DutyRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  regularHours: number;
  overtimeHours: number;
  totalEarnings: number;
  status: "Completed" | "In Progress" | "Scheduled";
}

interface LeaveRecord {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  days: number;
  status: "Approved" | "Pending" | "Rejected";
  reason: string;
}

export function DailyUtilities() {
  const [activeTab, setActiveTab] = useState("tracker");
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [dutyStartTime, setDutyStartTime] = useState<string | null>(null);
  const [regularHours, setRegularHours] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [overtimeRate, setOvertimeRate] = useState(225);

  const dutyRecords: DutyRecord[] = [
    {
      id: "1",
      date: "2024-01-15",
      checkIn: "09:00",
      checkOut: "18:00",
      regularHours: 8,
      overtimeHours: 1,
      totalEarnings: 1425,
      status: "Completed",
    },
    {
      id: "2",
      date: "2024-01-14",
      checkIn: "08:30",
      checkOut: "17:30",
      regularHours: 8,
      overtimeHours: 1,
      totalEarnings: 1425,
      status: "Completed",
    },
    {
      id: "3",
      date: "2024-01-13",
      checkIn: "09:00",
      checkOut: "18:30",
      regularHours: 8,
      overtimeHours: 1.5,
      totalEarnings: 1575,
      status: "Completed",
    },
  ];

  const leaveRecords: LeaveRecord[] = [
    {
      id: "1",
      type: "Casual Leave",
      fromDate: "2024-01-20",
      toDate: "2024-01-20",
      days: 1,
      status: "Approved",
      reason: "Personal work",
    },
    {
      id: "2",
      type: "Sick Leave",
      fromDate: "2024-01-10",
      toDate: "2024-01-11",
      days: 2,
      status: "Approved",
      reason: "Fever",
    },
  ];

  const leaveBalance = {
    casual: 12,
    sick: 8,
    earned: 15,
    total: 35,
  };

  const handleStartDuty = () => {
    const now = new Date();
    setDutyStartTime(now.toLocaleTimeString());
    setIsOnDuty(true);
  };

  const handleEndDuty = () => {
    setIsOnDuty(false);
    setDutyStartTime(null);
    alert("Duty ended successfully! Your earnings have been calculated.");
  };

  const calculateEarnings = () => {
    const regularEarnings = regularHours * hourlyRate;
    const totalEarnings = regularEarnings; // Simplified for demo
    return {
      regularEarnings,
      totalEarnings,
      overtimeEarnings: 0,
    };
  };

  const handleApplyLeave = () => {
    alert("Leave application feature coming soon!");
  };

  const tabs = [
    { id: "tracker", label: "Duty Tracker", icon: Clock },
    { id: "calculator", label: "Salary Calc", icon: Calculator },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "leave", label: "Leave Mgmt", icon: Flag },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Scheduled": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const earnings = calculateEarnings();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Daily Utilities</h1>
        <p className="text-gray-600">Track your duty, calculate earnings, and manage attendance</p>
      </div>

      {/* Current Status */}
      <Card className={`border-2 ${isOnDuty ? "border-green-200 bg-green-50" : "border-gray-200"}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isOnDuty ? "bg-green-500" : "bg-gray-400"
              }`}>
                {isOnDuty ? <Play className="h-6 w-6 text-white" /> : <Pause className="h-6 w-6 text-white" />}
              </div>
              <div>
                <h3 className="font-semibold">
                  {isOnDuty ? "Currently On Duty" : "Off Duty"}
                </h3>
                {dutyStartTime && (
                  <p className="text-sm text-gray-600">Started at: {dutyStartTime}</p>
                )}
              </div>
            </div>
            <Button
              onClick={isOnDuty ? handleEndDuty : handleStartDuty}
              className={isOnDuty ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {isOnDuty ? "End Duty" : "Start Duty"}
            </Button>
          </div>
        </CardContent>
      </Card>

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
      {activeTab === "tracker" && (
        <div className="space-y-4">
          {/* Today's Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Duty Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{regularHours}</p>
                  <p className="text-sm text-gray-600">Regular Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">₹{earnings.totalEarnings}</p>
                  <p className="text-sm text-gray-600">Today's Earnings</p>
                </div>
              </div>
              
              {isOnDuty && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <p className="text-sm text-blue-800">Duty in progress...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Duty History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Duty Records</h3>
              <Badge variant="outline">{dutyRecords.length} records</Badge>
            </div>
            
            {dutyRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{record.date}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{record.checkIn} - {record.checkOut}</span>
                          <span>•</span>
                          <span>{record.regularHours}h + {record.overtimeHours}h OT</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                      <p className="text-sm font-medium text-green-600 mt-1">
                        ₹{record.totalEarnings}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "calculator" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Salary Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regularHours">Regular Hours</Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setRegularHours(Math.max(0, regularHours - 1))}
                      variant="outline"
                      size="sm"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="regularHours"
                      type="number"
                      value={regularHours}
                      onChange={(e) => setRegularHours(Number(e.target.value))}
                      className="text-center"
                    />
                    <Button
                      onClick={() => setRegularHours(regularHours + 1)}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="overtimeRate">Overtime Rate (₹)</Label>
                <Input
                  id="overtimeRate"
                  type="number"
                  value={overtimeRate}
                  onChange={(e) => setOvertimeRate(Number(e.target.value))}
                />
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Regular Earnings:</span>
                    <span className="font-medium">₹{earnings.regularEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overtime Earnings:</span>
                    <span className="font-medium">₹{earnings.overtimeEarnings}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total Earnings:</span>
                    <span className="text-green-600">₹{earnings.totalEarnings}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">₹{(earnings.totalEarnings * 26).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Monthly Earnings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">₹{(earnings.totalEarnings * 312).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Yearly Projection</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="space-y-4">
          {/* Attendance Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">18</p>
                <p className="text-xs text-gray-600">Days Present</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">2</p>
                <p className="text-xs text-gray-600">Days Absent</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">90%</p>
                <p className="text-xs text-gray-600">Attendance Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* This Month's Attendance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div key={index} className="font-medium text-gray-600">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const isPresent = day % 7 !== 0 && day % 7 !== 6; // Weekends absent
                  const isToday = day === 15; // Today
                  return (
                    <div
                      key={i}
                      className={`p-2 rounded text-xs ${
                        isToday
                          ? "bg-blue-600 text-white"
                          : isPresent
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Present Days</span>
                </div>
                <span className="font-medium">18 days</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Absent Days</span>
                </div>
                <span className="font-medium">2 days</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Half Days</span>
                </div>
                <span className="font-medium">1 day</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Late Arrivals</span>
                </div>
                <span className="font-medium">3 times</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "leave" && (
        <div className="space-y-4">
          {/* Leave Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{leaveBalance.casual}</p>
                  <p className="text-sm text-gray-600">Casual Leave</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{leaveBalance.sick}</p>
                  <p className="text-sm text-gray-600">Sick Leave</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{leaveBalance.earned}</p>
                  <p className="text-sm text-gray-600">Earned Leave</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Available:</span>
                  <span className="text-lg font-bold text-blue-600">{leaveBalance.total} days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Apply for Leave */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Apply for Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  onClick={handleApplyLeave}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Apply for Leave
                </Button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Quick apply for casual, sick, or earned leave
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leave History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Leave History</h3>
              <Badge variant="outline">{leaveRecords.length} records</Badge>
            </div>
            
            {leaveRecords.map((leave) => (
              <Card key={leave.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Flag className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{leave.type}</h4>
                        <p className="text-sm text-gray-600">{leave.fromDate} to {leave.toDate}</p>
                        <p className="text-xs text-gray-500">{leave.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(leave.status)}>
                        {leave.status}
                      </Badge>
                      <p className="text-sm font-medium mt-1">{leave.days} day(s)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}