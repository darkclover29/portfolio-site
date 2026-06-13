import { useIoT } from '../../../hooks/useIoT.js';

export default function IoTTab() {
  const { devices, toggle, setTemp, setBrightness, setColor, setRpm } = useIoT();

  return (
    <div className="tab-panel" id="iot-panel">
      <h2 className="tab-title"><i className="fas fa-wifi" /> IoT Control Panel</h2>
      <div className="iot-grid">

        {/* Thermostat */}
        <div className={`iot-card ${devices.thermostat.status ? 'iot-card--on' : ''}`}>
          <div className="iot-card-header">
            <span><i className="fas fa-thermometer-half" /> {devices.thermostat.name}</span>
            <button className={`iot-toggle ${devices.thermostat.status ? 'active' : ''}`} onClick={() => toggle('thermostat')}>
              {devices.thermostat.status ? 'ON' : 'OFF'}
            </button>
          </div>
          {devices.thermostat.status && (
            <div className="iot-controls">
              <label>Temperature: <b>{devices.thermostat.temp.toFixed(1)}°C</b></label>
              <input type="range" min="16" max="32" step="0.5" value={devices.thermostat.temp}
                onChange={e => setTemp(e.target.value)} className="iot-slider" />
              <span className="iot-meta">Humidity: {devices.thermostat.humidity}%</span>
            </div>
          )}
        </div>

        {/* Lighting */}
        <div className={`iot-card ${devices.lighting.status ? 'iot-card--on' : ''}`}>
          <div className="iot-card-header">
            <span><i className="fas fa-lightbulb" /> {devices.lighting.name}</span>
            <button className={`iot-toggle ${devices.lighting.status ? 'active' : ''}`} onClick={() => toggle('lighting')}>
              {devices.lighting.status ? 'ON' : 'OFF'}
            </button>
          </div>
          {devices.lighting.status && (
            <div className="iot-controls">
              <label>Brightness: <b>{devices.lighting.brightness}%</b></label>
              <input type="range" min="0" max="100" value={devices.lighting.brightness}
                onChange={e => setBrightness(e.target.value)} className="iot-slider" />
              <div className="iot-colors">
                {['green', 'cyan', 'purple', 'orange', 'white'].map(c => (
                  <button key={c} className={`iot-color-btn ${devices.lighting.color === c ? 'active' : ''}`}
                    style={{ background: c }} onClick={() => setColor(c)} title={c} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security */}
        <div className={`iot-card ${devices.security.status ? 'iot-card--on' : ''}`}>
          <div className="iot-card-header">
            <span><i className="fas fa-lock" /> {devices.security.name}</span>
            <button className={`iot-toggle ${devices.security.status ? 'active' : ''}`} onClick={() => toggle('security')}>
              {devices.security.status ? 'LOCKED' : 'OPEN'}
            </button>
          </div>
          <div className="iot-controls">
            <span className="iot-meta">{devices.security.status ? '🔒 VFS /secrets directory is protected' : '🔓 Secrets directory accessible'}</span>
          </div>
        </div>

        {/* Cooling */}
        <div className={`iot-card ${devices.cooling.status ? 'iot-card--on' : ''}`}>
          <div className="iot-card-header">
            <span><i className="fas fa-fan" /> {devices.cooling.name}</span>
            <button className={`iot-toggle ${devices.cooling.status ? 'active' : ''}`} onClick={() => toggle('cooling')}>
              {devices.cooling.status ? 'ON' : 'OFF'}
            </button>
          </div>
          {devices.cooling.status && (
            <div className="iot-controls">
              <label>Fan RPM: <b>{devices.cooling.rpm}</b></label>
              <input type="range" min="0" max="3000" step="100" value={devices.cooling.rpm}
                onChange={e => setRpm(parseInt(e.target.value))} className="iot-slider" />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
