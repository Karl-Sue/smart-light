import { useState, useEffect } from 'react'
import './App.css'

// PLACEHOLDER: Update this with your ESP32-S3 IP Address or mDNS name.
// When hosting on GitHub Pages (HTTPS), if your local ESP32 is HTTP, you might face Mixed Content issues.
// Often, local IoT dashboards are served directly from the ESP or tested locally (localhost).
//const ESP32_API_BASE_URL = "http://your-esp32-ip";

interface SensorState {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
}

const initialSensors: SensorState[] = [
  {
    id: 'light-sensor',
    name: 'Light Sensor',
    description: 'Auto-adjusts light intensity based on ambient light.',
    isEnabled: false,
  },
  {
    id: 'voice-control',
    name: 'Voice Assistant',
    description: 'Use voice for lights, weather, time, and timers via AI.',
    isEnabled: false,
  },
  {
    id: 'motion-sensor',
    name: 'Motion Sensor',
    description: 'Turns lights on automatically when movement is detected.',
    isEnabled: false,
  },
  {
    id: 'audio-sensor',
    name: 'Audio Sensor',
    description: 'Enable audio triggers (e.g., clapping to toggle lights).',
    isEnabled: false,
  },
  {
    id: 'timer-schedule',
    name: 'Smart Schedule',
    description: 'Follow predefined schedules to manage lighting.',
    isEnabled: false,
  }
];

function App() {
  const [sensors, setSensors] = useState<SensorState[]>(initialSensors);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Placeholder function to check initial ESP32 connection
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Ping ESP32 health endpoint. Change '/api/health' to whatever route your ESP32 has.
        // const response = await fetch(`${ESP32_API_BASE_URL}/api/health`, { method: 'GET' });
        // if (response.ok) setConnectionStatus('connected');
        // else setConnectionStatus('error');
        
        // Simulating the check for now:
        setTimeout(() => setConnectionStatus('error'), 1500); // Defaults to error since IP is placeholder
      } catch (error) {
        setConnectionStatus('error');
      }
    };
    checkConnection();
  }, []);

  const toggleSensor = async (id: string, name: string) => {
    setSensors(prevSensors =>
      prevSensors.map(sensor => {
        if (sensor.id === id) {
          const newState = !sensor.isEnabled;
          // Send signal to IoT backend here
          console.log(`[IoT Signal] ${name} turned ${newState ? 'ON' : 'OFF'}`);
          
          // PLACEHOLDER: Fetch request to ESP32 to update state
          /*
          fetch(`${ESP32_API_BASE_URL}/api/sensors/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: newState ? 'ON' : 'OFF' })
          }).catch(err => console.error("Failed to reach ESP32:", err));
          */
          
          return { ...sensor, isEnabled: newState };
        }
        return sensor;
      })
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Smart Light Control Panel</h1>
        <p>Manage your IoT sensors and AI endpoints</p>
        <div className={`connection-status ${connectionStatus}`}>
          {connectionStatus === 'checking' && '⏳ Connecting to ESP32...'}
          {connectionStatus === 'connected' && '✅ Connected to ESP32'}
          {connectionStatus === 'error' && '❌ ESP32 Disconnected (Check IP/CORS)'}
        </div>
      </header>
      
      <div className="panel">
        {sensors.map(sensor => (
          <div key={sensor.id} className={`toggle-card ${sensor.isEnabled ? 'active' : ''}`}>
            <div className="toggle-info">
              <h2>{sensor.name}</h2>
              <p>{sensor.description}</p>
            </div>
            <div className="toggle-container">
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={sensor.isEnabled} 
                  onChange={() => toggleSensor(sensor.id, sensor.name)} 
                />
                <span className="slider round"></span>
              </label>
              <span className="status-text">{sensor.isEnabled ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
