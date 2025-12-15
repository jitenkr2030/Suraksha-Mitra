"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  Shield, 
  Phone,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  Activity,
  Command
} from "lucide-react";

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
  category: 'emergency' | 'navigation' | 'communication' | 'utility';
}

interface VoiceCommandProps {
  onSOS?: () => void;
  onCallEmergency?: (type: string) => void;
  onShareLocation?: () => void;
  onNavigate?: (page: string) => void;
}

export function VoiceCommands({ 
  onSOS, 
  onCallEmergency, 
  onShareLocation, 
  onNavigate 
}: VoiceCommandProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0);

  const recognitionRef = useRef<any>(null);

  // Voice commands configuration
  const voiceCommands: VoiceCommand[] = [
    // Emergency commands
    {
      command: "emergency sos",
      action: () => {
        onSOS?.();
        speak("Emergency SOS activated. Help is on the way.");
      },
      description: "Activate emergency SOS",
      category: 'emergency'
    },
    {
      command: "help me",
      action: () => {
        onSOS?.();
        speak("Emergency help activated. Stay calm.");
      },
      description: "Call for emergency help",
      category: 'emergency'
    },
    {
      command: "call police",
      action: () => {
        onCallEmergency?.('police');
        speak("Calling police now.");
      },
      description: "Call police emergency",
      category: 'emergency'
    },
    {
      command: "call ambulance",
      action: () => {
        onCallEmergency?.('ambulance');
        speak("Calling ambulance now.");
      },
      description: "Call ambulance emergency",
      category: 'emergency'
    },
    {
      command: "call fire",
      action: () => {
        onCallEmergency?.('fire');
        speak("Calling fire department now.");
      },
      description: "Call fire department",
      category: 'emergency'
    },
    {
      command: "share location",
      action: () => {
        onShareLocation?.();
        speak("Location shared with emergency contacts.");
      },
      description: "Share current location",
      category: 'emergency'
    },

    // Navigation commands
    {
      command: "go home",
      action: () => {
        onNavigate?.('home');
        speak("Navigating to home page.");
      },
      description: "Navigate to home",
      category: 'navigation'
    },
    {
      command: "go to health",
      action: () => {
        onNavigate?.('health');
        speak("Navigating to health page.");
      },
      description: "Navigate to health",
      category: 'navigation'
    },
    {
      command: "go to finance",
      action: () => {
        onNavigate?.('finance');
        speak("Navigating to finance page.");
      },
      description: "Navigate to finance",
      category: 'navigation'
    },
    {
      command: "go to training",
      action: () => {
        onNavigate?.('training');
        speak("Navigating to training page.");
      },
      description: "Navigate to training",
      category: 'navigation'
    },
    {
      command: "go to community",
      action: () => {
        onNavigate?.('community');
        speak("Navigating to community page.");
      },
      description: "Navigate to community",
      category: 'navigation'
    },

    // Utility commands
    {
      command: "what time is it",
      action: () => {
        const time = new Date().toLocaleTimeString();
        speak(`The current time is ${time}`);
      },
      description: "Get current time",
      category: 'utility'
    },
    {
      command: "what commands can I use",
      action: () => {
        speak("You can use commands like: emergency SOS, call police, share location, go home, what time is it, and more.");
      },
      description: "List available commands",
      category: 'utility'
    },
    {
      command: "stop listening",
      action: () => {
        stopListening();
        speak("Voice commands stopped.");
      },
      description: "Stop voice listening",
      category: 'utility'
    },
    {
      command: "start listening",
      action: () => {
        startListening();
        speak("Voice commands activated.");
      },
      description: "Start voice listening",
      category: 'utility'
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || 
                               (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-IN'; // Indian English

        recognitionInstance.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');
          
          setTranscript(transcript);
          
          // Check for commands in the transcript
          const finalTranscript = transcript.toLowerCase();
          const command = voiceCommands.find(cmd => 
            finalTranscript.includes(cmd.command.toLowerCase())
          );

          if (command) {
            setLastCommand(command.command);
            setCommandHistory(prev => [command.command, ...prev.slice(0, 4)]);
            setConfidence(0.9); // Simulated confidence
            command.action();
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'no-speech') {
            // Continue listening
          } else {
            stopListening();
          }
        };

        recognitionInstance.onend = () => {
          if (isListening) {
            // Restart listening if it was stopped unexpectedly
            recognitionInstance.start();
          }
        };

        setRecognition(recognitionInstance);
        recognitionRef.current = recognitionInstance;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition && isSupported) {
      setIsListening(true);
      recognition.start();
      speak("Voice commands activated. How can I help you?");
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
      setTranscript("");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const speak = (text: string) => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleVoiceEnabled = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    speak(isVoiceEnabled ? "Voice feedback disabled." : "Voice feedback enabled.");
  };

  const getCommandsByCategory = (category: string) => {
    return voiceCommands.filter(cmd => cmd.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emergency': return <AlertTriangle className="h-4 w-4" />;
      case 'navigation': return <MapPin className="h-4 w-4" />;
      case 'communication': return <Phone className="h-4 w-4" />;
      case 'utility': return <Command className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'navigation': return 'bg-blue-100 text-blue-800';
      case 'communication': return 'bg-green-100 text-green-800';
      case 'utility': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Voice Commands</h1>
        <p className="text-gray-600">Hands-free emergency operation and navigation</p>
      </div>

      {/* Voice Control Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isSupported ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {isSupported ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Voice Recognition</h3>
                <p className="text-sm text-gray-600">
                  {isSupported ? 'Available' : 'Not Available'}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={toggleVoiceEnabled}
                variant="outline"
                size="sm"
              >
                {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                onClick={toggleListening}
                disabled={!isSupported}
                className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isListening ? 'Stop' : 'Start'}
              </Button>
            </div>
          </div>

          {isListening && (
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800 font-medium mb-1">Listening...</p>
                <p className="text-blue-600 text-sm">{transcript || "Say a command..."}</p>
              </div>
              
              {lastCommand && (
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-green-800 font-medium mb-1">Last Command:</p>
                  <p className="text-green-600 font-medium">{lastCommand}</p>
                  {confidence > 0 && (
                    <p className="text-green-600 text-xs">Confidence: {(confidence * 100).toFixed(0)}%</p>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Command History */}
      {commandHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {commandHistory.map((command, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="font-medium">{command}</span>
                  <Badge variant="outline" className="text-xs">
                    Executed
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Commands */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Voice Commands</h3>
        
        {/* Emergency Commands */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Emergency Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {getCommandsByCategory('emergency').map((cmd, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="font-medium text-red-900">{cmd.command}</p>
                      <p className="text-sm text-red-700">{cmd.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-800">
                    Emergency
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Commands */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span>Navigation Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {getCommandsByCategory('navigation').map((cmd, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">{cmd.command}</p>
                      <p className="text-sm text-blue-700">{cmd.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    Navigation
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Utility Commands */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Command className="h-5 w-5 text-purple-600" />
              <span>Utility Commands</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {getCommandsByCategory('utility').map((cmd, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Command className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">{cmd.command}</p>
                      <p className="text-sm text-purple-700">{cmd.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">
                    Utility
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Tips:</strong> Speak clearly and at a normal pace. Commands work best in quiet environments. 
          Emergency commands have the highest priority and will work even if other commands are being processed.
        </AlertDescription>
      </Alert>

      {!isSupported && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Voice recognition is not supported in your browser. Please try Chrome, Edge, or Safari for the best experience.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}