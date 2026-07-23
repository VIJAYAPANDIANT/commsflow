import React, { useState } from 'react';
import { 
  User, Building2, Users, Palette, Moon, Bell, 
  Globe, HelpCircle, MessageSquare, Info, ShieldAlert,
  Lock, Unlock, Key, Copy, Trash2, Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

interface SettingsTabProps {
  brandLocked: boolean;
  setBrandLocked: (locked: boolean) => void;
}

interface MemberItem {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Guest';
  status: 'Active' | 'Pending';
}

interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  created: string;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ brandLocked, setBrandLocked }) => {
  const { setCurrentView } = useNavigation();

  // Active setting tab state
  const [activeSubTab, setActiveSubTab] = useState<string>('profile');
  const [loading, setLoading] = useState(false);

  // Profile Form States
  const [fullName, setFullName] = useState('Administrator');
  const [bio, setBio] = useState('Workspace Manager at CommsFlow Studio.');

  // Members list state
  const [members, setMembers] = useState<MemberItem[]>([
    { id: 'mem-1', name: 'Sarah Jenkins', email: 'sarah@commsflow.ai', role: 'Owner', status: 'Active' },
    { id: 'mem-2', name: 'Alex Rivera', email: 'alex@commsflow.ai', role: 'Admin', status: 'Active' },
    { id: 'mem-3', name: 'Elena Rostova', email: 'elena@commsflow.ai', role: 'Admin', status: 'Active' },
    { id: 'mem-4', name: 'Marcus Vance', email: 'marcus@commsflow.ai', role: 'Member', status: 'Active' },
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Member' | 'Guest'>('Member');

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Other Settings
  const [darkModeEnforced, setDarkModeEnforced] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(false);
  const [language, setLanguage] = useState('English');

  // simulated loaders for subtab transitions
  const handleTabChange = (tabId: string) => {
    setLoading(true);
    setActiveSubTab(tabId);
    setTimeout(() => {
      setLoading(false);
    }, 450); // 450ms loading simulation
  };

  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;

    const newMem: MemberItem = {
      id: `mem-${Date.now()}`,
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: newMemberRole,
      status: 'Pending',
    };

    setMembers(prev => [...prev, newMem]);
    setNewMemberEmail('');
  };

  const handleGenerateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: `cf_live_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`,
      created: 'Just now',
    };

    setApiKeys(prev => [newKey, ...prev]);
    setNewKeyName('');
  };

  const handleCopyKey = (id: string, keyStr: string) => {
    navigator.clipboard.writeText(keyStr);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
  };

  const renderSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 bg-white/5 rounded-lg w-1/3" />
      <div className="h-4 bg-white/5 rounded-lg w-2/3" />
      <div className="space-y-3 pt-4">
        <div className="h-10 bg-white/5 rounded-xl w-full" />
        <div className="h-10 bg-white/5 rounded-xl w-full" />
        <div className="h-10 bg-white/5 rounded-xl w-full" />
      </div>
    </div>
  );

  const renderSettingPanelDetails = () => {
    if (loading) return renderSkeleton();

    switch (activeSubTab) {
      case 'organization':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold text-white font-heading">Organization Directory</h3>
            <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/40 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-heading">Company Name</label>
                  <input
                    type="text"
                    defaultValue="CommsFlow AI Inc."
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-heading">Legal Domain</label>
                  <input
                    type="text"
                    defaultValue="commsflow.ai"
                    disabled
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/5 rounded-lg text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white font-heading">Workspace Members</h3>
              <span className="text-[10px] text-slate-500 font-mono">Active Seats: {members.length}</span>
            </div>

            {/* Invite Form */}
            <form onSubmit={handleInviteMember} className="flex flex-col sm:flex-row gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <input
                type="email"
                required
                placeholder="colleague@domain.com"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-[#09090c] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
              />
              <select
                value={newMemberRole}
                onChange={(e: any) => setNewMemberRole(e.target.value)}
                className="bg-[#09090c] border border-white/10 rounded-lg px-2 text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
                <option value="Guest">Guest</option>
              </select>
              <Button type="submit" variant="primary" size="sm" className="px-4 py-1.5">
                Invite Member
              </Button>
            </form>

            {/* Members Table */}
            <div className="glass-card rounded-2xl border border-white/5 bg-[#09090c]/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/5 text-slate-300 font-bold font-heading">
                  <tr>
                    <th className="p-4">Member Name</th>
                    <th className="p-4">Access Role</th>
                    <th className="p-4 text-right">Status Badge</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 divide-y divide-white/5">
                  {members.map((mem) => (
                    <tr key={mem.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-slate-300 uppercase shrink-0">
                            {mem.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-white font-heading">{mem.name}</div>
                            <div className="text-[9px] font-mono text-slate-500 mt-0.5">{mem.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {mem.role === 'Owner' ? (
                          <span className="text-[10px] font-bold text-violet-400">Owner</span>
                        ) : (
                          <select
                            value={mem.role}
                            onChange={(e: any) => {
                              const updatedRole = e.target.value;
                              setMembers(prev => prev.map(m => m.id === mem.id ? { ...m, role: updatedRole } : m));
                            }}
                            className="bg-transparent border border-white/5 hover:border-white/10 rounded px-1.5 py-0.5 text-xs text-slate-300 cursor-pointer"
                          >
                            <option value="Admin" className="bg-[#09090c]">Admin</option>
                            <option value="Member" className="bg-[#09090c]">Member</option>
                            <option value="Guest" className="bg-[#09090c]">Guest</option>
                          </select>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                          mem.status === 'Active' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse'
                        }`}>
                          {mem.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'brand':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold text-white font-heading font-heading">Lockdown Brand kit</h3>
            
            {/* Brand lockout toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="space-y-0.5 text-left pr-4">
                <div className="text-xs font-bold text-slate-200 flex items-center space-x-1.5 font-heading">
                  {brandLocked ? <Lock className="h-3.5 w-3.5 text-violet-400" /> : <Unlock className="h-3.5 w-3.5 text-slate-400" />}
                  <span>Enforce Global Palette Rules</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Locking restrictions prevents team members from using unapproved fonts or custom color pickers in the visual builder canvas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBrandLocked(!brandLocked)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  brandLocked ? 'bg-violet-600' : 'bg-white/10'
                }`}
              >
                <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  brandLocked ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold text-white font-heading">Appearance Themes</h3>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="space-y-0.5 text-left pr-4">
                <div className="text-xs font-bold text-slate-200 flex items-center space-x-1.5 font-heading">
                  <Moon className="h-3.5 w-3.5 text-violet-400" />
                  <span>Enforce Dark Theme Mode</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Default backdrops utilize zinc/slate palettes. Currently, light mode option is locked in beta.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDarkModeEnforced(!darkModeEnforced)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  darkModeEnforced ? 'bg-violet-600' : 'bg-white/10'
                }`}
              >
                <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  darkModeEnforced ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6 animate-fade-in text-left">
            <h3 className="text-sm font-bold text-white font-heading">Notifications Settings</h3>
            
            <div className="space-y-3.5">
              <label className="flex items-start space-x-3.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer select-none transition-colors">
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="mt-0.5 accent-violet-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-200 font-heading">Email Delivery Alerts</div>
                  <div className="text-[9.5px] text-slate-500 mt-0.5">Receive transactional logs summaries or server alerts.</div>
                </div>
              </label>

              <label className="flex items-start space-x-3.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer select-none transition-colors">
                <input
                  type="checkbox"
                  checked={notifyPush}
                  onChange={(e) => setNotifyPush(e.target.checked)}
                  className="mt-0.5 accent-violet-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-200 font-heading">Browser Push Alerts</div>
                  <div className="text-[9.5px] text-slate-500 mt-0.5">Show desktop notifications when collaborators save layout edits.</div>
                </div>
              </label>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold text-white font-heading">Security Credentials & API Keys</h3>
            
            {/* Create API Key Form */}
            <form onSubmit={handleGenerateApiKey} className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <input
                type="text"
                required
                placeholder="Key label name (e.g. Production Webhook)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-[#09090c] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 font-heading"
              />
              <Button type="submit" variant="primary" size="sm" className="px-4">
                Generate API Key
              </Button>
            </form>

            {/* List of keys / Empty State */}
            {apiKeys.length === 0 ? (
              <div className="p-10 rounded-2xl bg-white/5 border border-white/5 border-dashed text-center text-xs text-slate-500 space-y-2.5 animate-fade-in">
                <Key className="h-7 w-7 text-slate-600 mx-auto" />
                <div>
                  <div className="font-bold text-slate-400 font-heading">No active API keys generated</div>
                  <p className="text-[10px] text-slate-500 max-w-[240px] mx-auto mt-0.5">
                    Generate custom security hashes to connect external delivery loops or SMTP pipelines.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                {apiKeys.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-[#09090c] border border-white/5 flex items-center justify-between group">
                    <div className="text-left space-y-1 min-w-0">
                      <div className="text-xs font-bold text-white font-heading truncate">{item.name}</div>
                      <div className="font-mono text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 select-all truncate max-w-xs md:max-w-md">
                        {item.key}
                      </div>
                    </div>
                    
                    <div className="flex space-x-1 shrink-0">
                      <button
                        onClick={() => handleCopyKey(item.id, item.key)}
                        aria-label="Copy key to clipboard"
                        className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedKeyId === item.id ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteKey(item.id)}
                        aria-label="Delete API key"
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold text-white font-heading">Language Translation</h3>
            
            <div className="space-y-1.5 max-w-xs">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-heading">System Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-xs text-white focus:outline-none cursor-pointer font-heading"
              >
                <option value="English" className="bg-[#09090c]">English (Standard)</option>
                <option value="Spanish" className="bg-[#09090c]">Español (Castellano)</option>
                <option value="French" className="bg-[#09090c]">Français (Standard)</option>
                <option value="German" className="bg-[#09090c]">Deutsch (Beta)</option>
              </select>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6 animate-fade-in text-left">
            <h3 className="text-sm font-bold text-white font-heading">Help Center FAQs</h3>
            <div className="space-y-3.5">
              {[
                { q: "How do I lock brand accent guidelines?", a: "Navigate to the Settings tab, select Brand Kit in organization folder, and toggle Enforce Global Palette Rules to prevent modifications." },
                { q: "How can I export layouts to raw HTML?", a: "Open any template in Visual Editor, select Export from the top header bar, and download the ZIP package." },
                { q: "Can I connect SMTP delivery targets?", a: "Yes, you can generate hashes in the Security & API Keys panel to plug layouts into custom webhooks." }
              ].map((faq, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-slate-200 font-heading">{faq.q}</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="space-y-6 animate-fade-in text-left">
            <h3 className="text-sm font-bold text-white font-heading">Submit Studio Feedback</h3>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your feedback!'); }} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-heading">Comments / Suggestions</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details on your document builder experience..."
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 font-heading"
                />
              </div>
              <Button type="submit" variant="primary" size="sm">
                Submit Feedback
              </Button>
            </form>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6 animate-fade-in text-left">
            <h3 className="text-sm font-bold text-white font-heading">About CommsFlow Studio</h3>
            
            <div className="space-y-4 text-xs text-slate-400">
              <p>
                CommsFlow AI – Business Communication Studio version 3.0 is a premium visual document compiler constructed entirely inside React and Tailwind CSS framework.
              </p>
              
              <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl font-mono text-[10px] text-slate-500 space-y-1">
                <div>Client version: v3.4.0-stable</div>
                <div>Sandbox Engine: v8.1.5</div>
                <div>Developer license: verified</div>
              </div>

              {/* TEST 404 NAVIGATION LINK */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Interface Debug Panels</div>
                <button
                  type="button"
                  onClick={() => setCurrentView('404')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-[10px] font-semibold cursor-pointer"
                >
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>Simulate 404 Error Page</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'profile':
      default:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold text-white font-heading">User Profile Settings</h3>
            
            <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/40 space-y-6">
              
              {/* Photo uploader */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow shrink-0">
                  A
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-200 font-heading">Profile Avatar</div>
                  <span className="text-[9.5px] text-slate-500">JPG, PNG (max 800x800px)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-heading">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#09090c] border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-heading">Biography</label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#09090c] border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 text-left animate-fade-in">
      
      {/* settings sidebar sub-navigation */}
      <div className="w-full lg:w-60 shrink-0 space-y-4">
        
        {/* Account Folder */}
        <div className="space-y-1">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1.5 font-heading">Account Folder</div>
          {[
            { id: 'profile', label: 'User Profile', icon: <User className="h-4 w-4" /> },
            { id: 'security', label: 'Security & API Keys', icon: <Key className="h-4 w-4" /> },
            { id: 'language', label: 'Language', icon: <Globe className="h-4 w-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === item.id 
                  ? 'bg-white/5 text-white border border-white/5' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Organization Folder */}
        <div className="space-y-1 pt-2">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1.5 font-heading">Organization</div>
          {[
            { id: 'organization', label: 'Workspace Details', icon: <Building2 className="h-4 w-4" /> },
            { id: 'members', label: 'Workspace Members', icon: <Users className="h-4 w-4" /> },
            { id: 'brand', label: 'Brand Kit', icon: <Palette className="h-4 w-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === item.id 
                  ? 'bg-white/5 text-white border border-white/5' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Preferences Folder */}
        <div className="space-y-1 pt-2">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1.5 font-heading">Preferences</div>
          {[
            { id: 'theme', label: 'Appearance', icon: <Moon className="h-4 w-4" /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === item.id 
                  ? 'bg-white/5 text-white border border-white/5' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Support Folder */}
        <div className="space-y-1 pt-2">
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1.5 font-heading">Help & Legal</div>
          {[
            { id: 'help', label: 'Help Center', icon: <HelpCircle className="h-4 w-4" /> },
            { id: 'feedback', label: 'Send Feedback', icon: <MessageSquare className="h-4 w-4" /> },
            { id: 'about', label: 'About Studio', icon: <Info className="h-4 w-4" /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === item.id 
                  ? 'bg-white/5 text-white border border-white/5' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* settings details panel details viewport */}
      <div className="flex-1 min-w-0">
        <div className="glass-card rounded-3xl border border-white/5 bg-[#09090c]/20 p-6 md:p-8 min-h-[350px]">
          {renderSettingPanelDetails()}
        </div>
      </div>

    </div>
  );
};
