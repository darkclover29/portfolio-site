import { useState, useCallback } from 'react';

const initialDevices = {
  thermostat: { name: 'Smart Thermostat',     status: true,  temp: 22.5, humidity: 45 },
  lighting:   { name: 'Ambient RGB Light',    status: true,  brightness: 80, color: 'green' },
  security:   { name: 'VFS Security Lock',    status: true  },
  cooling:    { name: 'Cooling Fan Pump',      status: false, rpm: 0 },
};

export function useIoT() {
  const [devices, setDevices] = useState(initialDevices);

  const toggle = useCallback((key) => {
    setDevices(prev => {
      const d = { ...prev[key], status: !prev[key].status };
      if (key === 'cooling' && !d.status) d.rpm = 0;
      return { ...prev, [key]: d };
    });
  }, []);

  const setTemp = useCallback((val) => {
    setDevices(prev => ({ ...prev, thermostat: { ...prev.thermostat, temp: parseFloat(val) } }));
  }, []);

  const setBrightness = useCallback((val) => {
    setDevices(prev => ({ ...prev, lighting: { ...prev.lighting, brightness: parseInt(val) } }));
  }, []);

  const setColor = useCallback((color) => {
    setDevices(prev => ({ ...prev, lighting: { ...prev.lighting, color } }));
  }, []);

  const setRpm = useCallback((rpm) => {
    setDevices(prev => ({ ...prev, cooling: { ...prev.cooling, rpm } }));
  }, []);

  return { devices, toggle, setTemp, setBrightness, setColor, setRpm };
}
