import React, { useState } from 'react';
import { Shield, CheckCircle2, Lock, Unlock, Palette, Type, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface SettingsTabProps {
  brandLocked: boolean;
  setBrandLocked: (locked: boolean) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ brandLocked, setBrandLocked }) => {
  // Input fields state
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');
  const [secondaryColor, setSecondaryColor] = useState('#06b6d4');
  const [fontFamily, setFontFamily] = useState('Outfit');
  const [forceLogo, setForceLogo] = useState(true);
  const [lockFooter, setLockFooter] = useState(true);

  // Alert/Loader states
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSavedAlert(false);

    setTimeout(() => {
      setIsSaving(false);
      setShowSavedAlert(true);
      // Automatically hide alert after 3s
      setTimeout(() => setShowSavedAlert(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6 text-left max-w-3xl animate-fade-in">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white font-heading">Studio Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Configure global brand guidelines, typography libraries, and corporate lockdown guardrails</p>
      </div>

      {showSavedAlert && (
        <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center space-x-2.5">
          <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
          <span>Brand guidelines saved successfully. Lockdown statuses updated.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Brand Lockdown card */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/40 space-y-6">
          <div className="flex items-center space-x-3 border-b border-white/5 pb-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Enterprise Brand Lockdowns</h3>
              <p className="text-[10px] text-slate-500">Restricts visual editing controls for non-admin workspace members</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Toggle 1: Lock guidelines */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="space-y-0.5 text-left pr-4">
                <div className="text-xs font-bold text-slate-200 flex items-center space-x-1.5 font-heading">
                  {brandLocked ? <Lock className="h-3.5 w-3.5 text-violet-400" /> : <Unlock className="h-3.5 w-3.5 text-slate-400" />}
                  <span>Enforce Color Palette Lock</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  When enabled, non-admin members cannot use the custom color picker and are restricted to primary/secondary corporate accents.
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

            {/* Toggle 2: Force Logo */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="space-y-0.5 text-left pr-4">
                <div className="text-xs font-bold text-slate-200 flex items-center space-x-1.5 font-heading">
                  <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
                  <span>Lock Official Header Logo</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Automatically inserts and locks the official corporate logo SVG in all email and document headers. Prevents replacement.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForceLogo(!forceLogo)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  forceLogo ? 'bg-violet-600' : 'bg-white/10'
                }`}
              >
                <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  forceLogo ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 3: Force Footer */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="space-y-0.5 text-left pr-4">
                <div className="text-xs font-bold text-slate-200 flex items-center space-x-1.5 font-heading">
                  <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
                  <span>Lock Standard Corporate Footer</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Appends a pre-approved legal footer containing corporate social icons, unsubscribe links, and addresses. Unmodifiable by content editors.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLockFooter(!lockFooter)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  lockFooter ? 'bg-violet-600' : 'bg-white/10'
                }`}
              >
                <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  lockFooter ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>

          </div>
        </div>

        {/* Corporate Colors & Typography card */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 bg-[#09090c]/40 space-y-6">
          <div className="flex items-center space-x-3 border-b border-white/5 pb-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Palette className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Brand Guide Asset Variables</h3>
              <p className="text-[10px] text-slate-500">Define color schemes and fonts loaded by visual templates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Primary Accent color */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Primary Accent</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-8 h-8 border border-white/10 rounded cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 min-w-0 px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white font-mono uppercase"
                />
              </div>
            </div>

            {/* Secondary Accent color */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Secondary Accent</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-8 h-8 border border-white/10 rounded cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 min-w-0 px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white font-mono uppercase"
                />
              </div>
            </div>

            {/* Font Family selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Corporate Font Family</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Type className="h-4 w-4" />
                </div>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="Inter" className="bg-[#09090c]">Inter (Standard)</option>
                  <option value="Outfit" className="bg-[#09090c]">Outfit (Premium)</option>
                  <option value="Roboto" className="bg-[#09090c]">Roboto (Neo-Grotesque)</option>
                  <option value="Playfair Display" className="bg-[#09090c]">Playfair (Corporate Editorial)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Form submit button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSaving}
            className="flex items-center space-x-1.5 px-6 font-bold uppercase tracking-wider text-xs"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Saving Guidelines...</span>
              </>
            ) : (
              <span>Save Guidelines</span>
            )}
          </Button>
        </div>

      </form>

    </div>
  );
};
