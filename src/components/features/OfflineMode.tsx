"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Upload, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Database,
  Cloud,
  Smartphone,
  Shield,
  Clock,
  Activity,
  Server,
  Save
} from "lucide-react";

interface OfflineData {
  id: string;
  type: 'profile' | 'contacts' | 'documents' | 'training' | 'health' | 'finance';
  data: any;
  timestamp: number;
  synced: boolean;
}

interface SyncStatus {
  online: boolean;
  lastSync: Date | null;
  pendingUploads: number;
  pendingDownloads: number;
  storageUsed: number;
  storageTotal: number;
}

export function OfflineMode() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    online: navigator.onLine,
    lastSync: null,
    pendingUploads: 0,
    pendingDownloads: 0,
    storageUsed: 0,
    storageTotal: 100 * 1024 * 1024, // 100MB
  });

  const [offlineData, setOfflineData] = useState<OfflineData[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloadingEssential, setIsDownloadingEssential] = useState(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus(prev => ({ ...prev, online: true }));
      autoSync();
    };

    const handleOffline = () => {
      setSyncStatus(prev => ({ ...prev, online: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline data from IndexedDB
    loadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineData = async () => {
    try {
      // Simulate loading from IndexedDB
      const mockData: OfflineData[] = [
        {
          id: '1',
          type: 'profile',
          data: { name: 'Rajesh Kumar', phone: '+91 98765 43210' },
          timestamp: Date.now() - 3600000,
          synced: true
        },
        {
          id: '2',
          type: 'contacts',
          data: [{ name: 'Emergency Contact', phone: '+91 100' }],
          timestamp: Date.now() - 7200000,
          synced: true
        }
      ];
      setOfflineData(mockData);
      
      // Calculate storage used
      const storageUsed = JSON.stringify(mockData).length;
      setSyncStatus(prev => ({ ...prev, storageUsed }));
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const autoSync = async () => {
    if (syncStatus.online && !isSyncing) {
      await syncData();
    }
  };

  const syncData = async () => {
    setIsSyncing(true);
    setSyncProgress(0);

    try {
      // Simulate sync process
      const totalItems = offlineData.length;
      let syncedItems = 0;

      for (const item of offlineData) {
        if (!item.synced) {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          syncedItems++;
          setSyncProgress((syncedItems / totalItems) * 100);
        }
      }

      // Update sync status
      setSyncStatus(prev => ({
        ...prev,
        lastSync: new Date(),
        pendingUploads: 0,
        pendingDownloads: 0
      }));

      // Update offline data as synced
      setOfflineData(prev => prev.map(item => ({ ...item, synced: true })));

    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  const downloadEssentialData = async () => {
    setIsDownloadingEssential(true);
    setDownloadProgress(0);

    try {
      const essentialDataTypes = ['profile', 'contacts', 'documents'];
      const totalTypes = essentialDataTypes.length;
      let downloadedTypes = 0;

      for (const type of essentialDataTypes) {
        // Simulate downloading data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: OfflineData = {
          id: `${type}-${Date.now()}`,
          type: type as any,
          data: { type, downloaded: true },
          timestamp: Date.now(),
          synced: true
        };

        setOfflineData(prev => [...prev, mockData]);
        downloadedTypes++;
        setDownloadProgress((downloadedTypes / totalTypes) * 100);
      }

      // Update storage used
      const newStorageUsed = JSON.stringify(offlineData).length;
      setSyncStatus(prev => ({ ...prev, storageUsed: newStorageUsed }));

    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloadingEssential(false);
      setDownloadProgress(0);
    }
  };

  const clearOfflineData = async () => {
    if (confirm('Are you sure you want to clear all offline data? This action cannot be undone.')) {
      setOfflineData([]);
      setSyncStatus(prev => ({ ...prev, storageUsed: 0 }));
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleString();
  };

  const getDataIcon = (type: string) => {
    switch (type) {
      case 'profile': return <Shield className="h-4 w-4" />;
      case 'contacts': return <Smartphone className="h-4 w-4" />;
      case 'documents': return <Database className="h-4 w-4" />;
      case 'training': return <Activity className="h-4 w-4" />;
      case 'health': return <Save className="h-4 w-4" />;
      case 'finance': return <Cloud className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getDataColor = (type: string) => {
    switch (type) {
      case 'profile': return 'bg-blue-100 text-blue-800';
      case 'contacts': return 'bg-green-100 text-green-800';
      case 'documents': return 'bg-purple-100 text-purple-800';
      case 'training': return 'bg-orange-100 text-orange-800';
      case 'health': return 'bg-red-100 text-red-800';
      case 'finance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Offline Mode</h1>
        <p className="text-gray-600">Access essential features without internet connection</p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                syncStatus.online ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {syncStatus.online ? (
                  <Wifi className="h-6 w-6 text-green-600" />
                ) : (
                  <WifiOff className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Connection Status</h3>
                <p className="text-sm text-gray-600">
                  {syncStatus.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <Badge variant={syncStatus.online ? "default" : "destructive"}>
              {syncStatus.online ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Last Sync</p>
              <p className="font-medium">{formatTime(syncStatus.lastSync)}</p>
            </div>
            <div>
              <p className="text-gray-600">Pending Actions</p>
              <p className="font-medium">
                {syncStatus.pendingUploads + syncStatus.pendingDownloads} items
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5" />
            <span>Data Synchronization</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-3">
            <Button
              onClick={syncData}
              disabled={!syncStatus.online || isSyncing}
              className="flex-1"
            >
              {isSyncing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Syncing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Sync Now</span>
                </div>
              )}
            </Button>
            
            <Button
              onClick={downloadEssentialData}
              disabled={isDownloadingEssential}
              variant="outline"
              className="flex-1"
            >
              {isDownloadingEssential ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span>Downloading...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Essentials</span>
                </div>
              )}
            </Button>
          </div>

          {(isSyncing || isDownloadingEssential) && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(isSyncing ? syncProgress : downloadProgress)}%</span>
              </div>
              <Progress 
                value={isSyncing ? syncProgress : downloadProgress} 
                className="h-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Storage Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Used</span>
              <span>{formatBytes(syncStatus.storageUsed)} of {formatBytes(syncStatus.storageTotal)}</span>
            </div>
            <Progress 
              value={(syncStatus.storageUsed / syncStatus.storageTotal) * 100} 
              className="h-2"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded p-3">
              <p className="text-lg font-semibold text-blue-600">{offlineData.length}</p>
              <p className="text-xs text-gray-600">Offline Items</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-lg font-semibold text-green-600">
                {offlineData.filter(item => item.synced).length}
              </p>
              <p className="text-xs text-gray-600">Synced</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-lg font-semibold text-orange-600">
                {offlineData.filter(item => !item.synced).length}
              </p>
              <p className="text-xs text-gray-600">Pending</p>
            </div>
          </div>

          <Button
            onClick={clearOfflineData}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Clear Offline Data
          </Button>
        </CardContent>
      </Card>

      {/* Offline Data List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Available Offline Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {offlineData.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No offline data available</p>
              <p className="text-sm text-gray-500 mt-2">
                Download essential data to use the app offline
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {offlineData.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getDataColor(item.type)}`}>
                      {getDataIcon(item.type)}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{item.type}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.synced ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <Badge variant={item.synced ? "default" : "secondary"} className="text-xs">
                      {item.synced ? 'Synced' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Offline Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Available Offline Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Emergency SOS</p>
                <p className="text-sm text-green-700">Always available, even offline</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Profile Access</p>
                <p className="text-sm text-blue-700">View and edit your profile offline</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">Emergency Contacts</p>
                <p className="text-sm text-purple-700">Access emergency contacts anytime</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-900">Document Storage</p>
                <p className="text-sm text-orange-700">View important documents offline</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Offline Tips:</strong> Download essential data when you have a good internet connection. 
          The app will automatically sync when you come back online. Emergency features are always available.
        </AlertDescription>
      </Alert>
    </div>
  );
}