import React, { useState } from 'react';
import '../index.css';


const ChatOverlay: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button className="chat-btn" onClick={() => setOpen(true)}>
        <i className="fas fa-comment-dots"></i> Chat
      </button>

      {/* Chat Overlay */}
      <div
        className={`chat-overlay ${open ? 'open' : ''}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).classList.contains('chat-overlay')) {
            setOpen(false);
          }
        }}
      >
        <div className="chat-panel">
          <div className="chat-panel-header">
            <span className="title">Need Help?</span>
            <span className="close-btn" onClick={() => setOpen(false)}>
              &times;
            </span>
          </div>
          <div className="chat-panel-body">
            <p>Welcome to our mental health chat. How can we help you today?</p>
            <p><strong>Bot:</strong> Hello, I'm here to support you!</p>
          </div>
        </div>
      </div>


    </>
  );
};

export default ChatOverlay;
