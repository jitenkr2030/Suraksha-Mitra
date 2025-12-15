"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Navigation, 
  Share2, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Shield,
  Phone,
  Map,
  Satellite,
  Wifi,
  WifiOff,
  Battery,
  Signal
} from "lucide-react";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
}

interface LocationShare {
  id: string;
  contactName: string;
  contactPhone: string;
  sharedAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

interface SafetyZone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  type: 'home' | 'work' | 'family' | 'custom';
}

export function GPSTracking() {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [sharedLocations, setSharedLocations] = useState<LocationShare[]>([]);
  const [safetyZones, setSafetyZones] = useState<SafetyZone[]>([]);
  const [isInSafeZone, setIsInSafeZone] = useState(false);
  const [currentSafeZone, setCurrentSafeZone] = useState<SafetyZone | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [signalStrength, setSignalStrength] = useState<number | null>(null);

  // Initialize location tracking
  useEffect(() => {
    checkLocationPermission();
    getBatteryInfo();
    getSignalInfo();
    
    // Set up geolocation watcher if permission granted
    if (locationPermission === 'granted') {
      startLocationTracking();
    }
  }, [locationPermission]);

  const checkLocationPermission = async () => {
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setLocationPermission(permission.state as any);
      
      permission.addEventListener('change', () => {
        setLocationPermission(permission.state as any);
      });
    }
  };

  const requestLocationPermission = async () => {
    try {
      const position = await navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission('granted');
          updateLocationData(position);
        },
        (error) => {
          setLocationPermission('denied');
          console.error('Location permission denied:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationPermission('denied');
    }
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsTracking(true);
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        updateLocationData(position);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000, // Accept positions up to 30 seconds old
        distanceFilter: 10 // Update only if moved by 10 meters
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  };

  const stopLocationTracking = () => {
    setIsTracking(false);
  };

  const updateLocationData = (position: GeolocationPosition) => {
    const locationData: LocationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp
    };

    setCurrentLocation(locationData);
    setLocationAccuracy(position.coords.accuracy);
    setLastUpdate(new Date());

    // Check if in safety zone
    checkSafetyZones(locationData);
  };

  const checkSafetyZones = (location: LocationData) => {
    const inZone = safetyZones.some(zone => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        zone.latitude,
        zone.longitude
      );
      return distance <= zone.radius;
    });

    setIsInSafeZone(inZone);

    if (inZone) {
      const zone = safetyZones.find(zone => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          zone.latitude,
          zone.longitude
        );
        return distance <= zone.radius;
      });
      setCurrentSafeZone(zone || null);
    } else {
      setCurrentSafeZone(null);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const shareLocation = async () => {
    if (!currentLocation) {
      alert('Location not available. Please enable location services.');
      return;
    }

    setIsSharingLocation(true);
    
    // Simulate sharing location with emergency contacts
    const newShare: LocationShare = {
      id: Date.now().toString(),
      contactName: 'Emergency Contact',
      contactPhone: '+91 98765 43210',
      sharedAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isActive: true
    };

    setSharedLocations(prev => [...prev, newShare]);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSharingLocation(false);
    alert('Location shared successfully with emergency contacts!');
  };

  const getBatteryInfo = async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        setBatteryLevel(Math.round(battery.level * 100));
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      } catch (error) {
        console.error('Error getting battery info:', error);
      }
    }
  };

  const getSignalInfo = () => {
    // Simulate signal strength (in a real app, this would use device APIs)
    const randomStrength = Math.floor(Math.random() * 5) + 1; // 1-5 bars
    setSignalStrength(randomStrength);
  };

  const formatCoordinates = (lat: number, lon: number): string => {
    return `${lat.toFixed(6)}°, ${lon.toFixed(6)}°`;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString();
  };

  const getSignalIcon = (strength: number | null) => {
    if (!strength) return <Signal className="h-4 w-4 text-gray-400" />;
    
    const bars = [];
    for (let i = 1; i <= 5; i++) {
      bars.push(
        <div
          key={i}
          className={`w-1 h-${i * 2} mx-px ${
            i <= strength ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
      );
    }
    return <div className="flex items-end h-4">{bars}</div>;
  };

  const getBatteryIcon = (level: number | null) => {
    if (!level) return <Battery className="h-4 w-4 text-gray-400" />;
    
    if (level > 75) return <Battery className="h-4 w-4 text-green-500" />;
    if (level > 50) return <Battery className="h-4 w-4 text-yellow-500" />;
    if (level > 25) return <Battery className="h-4 w-4 text-orange-500" />;
    return <Battery className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">GPS Tracking</h1>
        <p className="text-gray-600">Real-time location sharing and safety monitoring</p>
      </div>

      {/* Location Permission Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                locationPermission === 'granted' ? 'bg-green-100' :
                locationPermission === 'denied' ? 'bg-red-100' : 'bg-yellow-100'
              }`}>
                {locationPermission === 'granted' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : locationPermission === 'denied' ? (
                  <XCircle className="h-6 w-6 text-red-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Location Permission</h3>
                <p className="text-sm text-gray-600">
                  {locationPermission === 'granted' ? 'Granted' :
                   locationPermission === 'denied' ? 'Denied' : 'Not Requested'}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {locationPermission !== 'granted' && (
                <Button
                  onClick={requestLocationPermission}
                  variant="outline"
                  size="sm"
                >
                  Enable Location
                </Button>
              )}
              {locationPermission === 'granted' && (
                <Button
                  onClick={isTracking ? stopLocationTracking : startLocationTracking}
                  variant={isTracking ? "destructive" : "default"}
                  size="sm"
                >
                  {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                </Button>
              )}
            </div>
          </div>

          {currentLocation && (
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">Current Location</span>
                  <Badge variant="outline" className="text-xs">
                    Accuracy: ±{Math.round(locationAccuracy || 0)}m
                  </Badge>
                </div>
                <p className="text-blue-800 font-mono text-sm">
                  {formatCoordinates(currentLocation.latitude, currentLocation.longitude)}
                </p>
                {lastUpdate && (
                  <p className="text-blue-600 text-xs mt-1">
                    Last updated: {formatTime(lastUpdate)}
                  </p>
                )}
              </div>

              {isInSafeZone && currentSafeZone && (
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      In Safe Zone: {currentSafeZone.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Device Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Device Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {getBatteryIcon(batteryLevel)}
                <span className="text-sm font-medium">Battery</span>
              </div>
              <span className="text-sm text-gray-600">
                {batteryLevel !== null ? `${batteryLevel}%` : 'Unknown'}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {getSignalIcon(signalStrength)}
                <span className="text-sm font-medium">Signal</span>
              </div>
              <span className="text-sm text-gray-600">
                {signalStrength !== null ? `${signalStrength}/5` : 'Unknown'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Sharing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Location Sharing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={shareLocation}
            disabled={!currentLocation || isSharingLocation}
            className="w-full"
          >
            {isSharingLocation ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Sharing Location...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share Location with Contacts</span>
              </div>
            )}
          </Button>

          {sharedLocations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Active Shares</h4>
              {sharedLocations.map((share) => (
                <div key={share.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{share.contactName}</p>
                    <p className="text-xs text-gray-500">{share.contactPhone}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={share.isActive ? "default" : "secondary"} className="text-xs">
                      {share.isActive ? 'Active' : 'Expired'}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      Expires {share.expiresAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Zones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Safety Zones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {safetyZones.length === 0 ? (
            <div className="text-center py-4">
              <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">No safety zones configured</p>
              <p className="text-gray-500 text-xs mt-1">
                Add safety zones to get alerts when you enter or leave them
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {safetyZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{zone.name}</p>
                    <p className="text-xs text-gray-500">
                      {zone.radius}m radius • {zone.type}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {formatCoordinates(zone.latitude, zone.longitude)}
                  </Badge>
                </div>
              ))}
            </div>
          )}
          
          <Button variant="outline" size="sm" className="w-full mt-3">
            Add Safety Zone
          </Button>
        </CardContent>
      </Card>

      {/* Location History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Location Updated</p>
                <p className="text-xs text-gray-500">
                  {lastUpdate ? formatTime(lastUpdate) : 'Never'}
                </p>
              </div>
              {isTracking && (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  Live
                </Badge>
              )}
            </div>
            
            {sharedLocations.length > 0 && (
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                  <Share2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Location Shared</p>
                  <p className="text-xs text-gray-500">
                    {sharedLocations[sharedLocations.length - 1].sharedAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>GPS Tips:</strong> Enable high-accuracy mode for better location tracking. 
          Location sharing works best with a strong internet connection and good GPS signal. 
          Battery usage increases when location tracking is active.
        </AlertDescription>
      </Alert>

      {locationPermission === 'denied' && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Location permission is required for GPS tracking and location sharing. 
            Please enable location services in your browser settings.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}