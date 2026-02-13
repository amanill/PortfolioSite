import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io();

const SocketDemo: React.FC = () => {
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0, visible: false });
  const [connected, setConnected] = useState(false);
  const [messagesSent, setMessagesSent] = useState(0);
  const [messagesReceived, setMessagesReceived] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const inputRef = useRef(null);
  const logsRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3
    });
    setLogs(prev => {
      const updated = [`[${timestamp}] ${message}`, ...prev].slice(0, 15);
      return updated;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    socket.emit('move', { x, y });
    setMessagesSent(prev => prev + 1);
    addLog(`📤 Sent move event: x=${Math.round(x)}, y=${Math.round(y)}`);
  };

  const boxStyle: React.CSSProperties = {
    width: '400px',
    height: '400px',
    border: '2px dashed #ccc',
    position: 'relative',
    overflow: 'hidden',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px'
  };

  useEffect(() => {
    // Connection events
    socket.on('connect', () => {
      setConnected(true);
      addLog('✅ Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
      setConnected(false);
      addLog('❌ Disconnected from Socket.IO server');
    });

    // Listen for coordinates coming back from the server
    socket.on('sync-move', (data) => {
      setGhostPos({ x: data.x, y: data.y, visible: true });
      setMessagesReceived(prev => prev + 1);
      addLog(`📥 Received sync-move: x=${Math.round(data.x)}, y=${Math.round(data.y)}`);
    });

    // Clean up on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('sync-move');
    };
  }, []);

  return (
    <section className="container socket-demo" style={{ padding: 20 }}> 
        <h2>Socket.IO Demo - Real-Time Cursor Sync</h2>
        
        {/* CONNECTION STATUS */}
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: connected ? '#d4edda' : '#f8d7da', borderRadius: '4px' }}>
          <strong>Socket.IO Status: </strong>
          <span style={{ color: connected ? '#155724' : '#721c24' }}>
            {connected ? '✅ Connected' : '❌ Disconnected'}
          </span>
          <span style={{ marginLeft: '20px' }}>📤 Sent: {messagesSent}</span>
          <span style={{ marginLeft: '20px' }}>📥 Received: {messagesReceived}</span>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', marginTop: '20px', flexWrap: 'nowrap' }}>
      
            {/* INPUT BOX */}
            <div>
              <h4 style={{ color: '#007bff', marginTop: 0 }}>Local Input</h4>
              <div 
                  ref={inputRef}
                  onMouseMove={handleMouseMove}
                  style={{ ...boxStyle, borderColor: '#007bff', cursor: 'crosshair' }}
              >
                  <strong style={{ color: '#007bff' }}>DRAG MOUSE HERE</strong>
              </div>
            </div>

            {/* OUTPUT BOX */}
            <div>
              <h4 style={{ color: '#28a745', marginTop: 0 }}>Received via Socket.IO</h4>
              <div style={{ ...boxStyle, borderColor: '#28a745' }}>
                  <strong style={{ color: '#28a745' }}>SERVER BROADCAST</strong>
                  
                  {ghostPos.visible && (
                  <div style={{
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      background: '#28a745',
                      borderRadius: '50%',
                      left: ghostPos.x,
                      top: ghostPos.y,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      transition: 'transform 0.05s linear'
                  }} />
                  )}
              </div>
            </div>
        </div>

        {/* EVENT LOG */}
        <div style={{ marginTop: '30px' }}>
          <h4>Event Log (Real-Time Messages)</h4>
          <div 
            ref={logsRef}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '10px',
              height: '150px',
              overflowY: 'auto',
              backgroundColor: '#f9f9f9',
              fontFamily: 'monospace',
              fontSize: '12px'
            }}
          >
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <div key={idx} style={{ marginBottom: '4px', color: '#333' }}>
                  {log}
                </div>
              ))
            ) : (
              <div style={{ color: '#999' }}>Waiting for socket events...</div>
            )}
          </div>
        </div>
    </section>
  )
}

export default SocketDemo   