import React, { useState, useEffect } from 'react';
import { adminLogin, fetchAdminMessages, deleteAdminMessage } from '../../services/api';

export const AdminModal = ({ isOpen, onClose, onShowToast }) => {
  const [token, setToken] = useState(() => localStorage.getItem('vedant_admin_token') || '');
  const [email, setEmail] = useState('igvedant01@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isOpen && token) {
      loadMessages(token);
    }
  }, [isOpen, token]);

  const loadMessages = async (authToken) => {
    try {
      setLoading(true);
      const res = await fetchAdminMessages(authToken);
      if (res?.success) {
        setMessages(res.data || []);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        setToken('');
        localStorage.removeItem('vedant_admin_token');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await adminLogin(email, password);
      if (res?.success && res.token) {
        setToken(res.token);
        localStorage.setItem('vedant_admin_token', res.token);
        onShowToast('Welcome back, Vedant! Loaded inquiries from MongoDB.');
        loadMessages(res.token);
      } else {
        onShowToast(res?.message || 'Access denied.');
      }
    } catch (err) {
      onShowToast(err?.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteAdminMessage(id, token);
      if (res?.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        onShowToast('Message removed from database.');
      }
    } catch (err) {
      onShowToast('Failed to delete message.');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('vedant_admin_token');
    onShowToast('Logged out of owner panel.');
  };

  if (!isOpen) return null;

  return (
    <div
      className="cmd-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="cmd-box" style={{ maxWidth: '640px' }}>
        <div className="cmd-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: 600 }}>Owner Control Center</span>
            <span className="cmd-item-badge">Strictly Locked to Owner</span>
          </div>
          <button type="button" className="kbd-shortcut" onClick={onClose} style={{ cursor: 'pointer' }}>
            ESC
          </button>
        </div>

        <div style={{ padding: '1.25rem', maxHeight: '420px', overflowY: 'auto' }}>
          {!token ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                Access is restricted strictly to <strong>igvedant01@gmail.com</strong>.
              </p>

              <div className="form-group">
                <label className="form-label">Owner Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Owner Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter ADMIN_PASSWORD configured in server/.env"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem' }}>
                {loading ? 'Authenticating...' : 'Unlock Owner Panel'}
              </button>
            </form>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  Received Inquiries ({messages.length})
                </span>
                <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
                  Lock Panel
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)' }}>
                  Querying MongoDB Atlas...
                </div>
              ) : messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                  No inquiries received yet. New submissions will show here.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      style={{
                        padding: '1rem',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)',
                        backgroundColor: 'var(--card)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{msg.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                        <a href={`mailto:${msg.email}`} style={{ color: 'var(--primary)' }}>
                          {msg.email}
                        </a>
                      </div>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          style={{ color: 'var(--destructive)', borderColor: 'var(--destructive)' }}
                          onClick={() => handleDelete(msg._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
