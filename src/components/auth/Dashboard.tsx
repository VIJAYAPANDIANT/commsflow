import React, { useState } from 'react';
import { DashboardSidebar, type TabType } from '../dashboard/DashboardSidebar';
import { DashboardHeader } from '../dashboard/DashboardHeader';
import { OverviewTab } from '../dashboard/OverviewTab';
import { TemplatesTab } from '../dashboard/TemplatesTab';
import { AnalyticsTab } from '../dashboard/AnalyticsTab';
import { ActivitiesTab } from '../dashboard/ActivitiesTab';
import { SettingsTab } from '../dashboard/SettingsTab';
import type { TemplateItem, WorkspaceType, NotificationItem } from '../../types';

export const Dashboard: React.FC = () => {

  // Tab & Workspace management states
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType>('marketing');
  const [searchQuery, setSearchQuery] = useState('');
  const [brandLocked, setBrandLocked] = useState(true);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 'n-1', title: 'Security Alert: Color Guidelines Lock', desc: 'Sarah J. updated corporate accent HEX restrictions.', time: '10m ago', read: false },
    { id: 'n-2', title: 'Export Node Succeeded', desc: 'Alex R. exported incident report HTML to Mailchimp endpoint.', time: '2h ago', read: false },
    { id: 'n-3', title: 'Workspace Member Joined', desc: 'Marcus V. was provisioned write access to Marketing templates folder.', time: '1d ago', read: true },
    { id: 'n-4', title: 'Changelog Update Required', desc: 'Lead product designer requested visual updates for Q3 headers.', time: '2d ago', read: true },
  ]);

  // Unified Templates State
  const [templates, setTemplates] = useState<TemplateItem[]>([
    // Engineering templates
    { id: 'eng-1', title: 'Release Notes V3.0', category: 'Release Notes', updated: '2 hours ago', pinned: true, favorite: false, workspace: 'engineering', previewColor: 'from-blue-600/30 to-indigo-600/30' },
    { id: 'eng-2', title: 'API Changelog Layout', category: 'API Changelog', updated: '1 day ago', pinned: false, favorite: true, workspace: 'engineering', previewColor: 'from-slate-700/30 to-slate-900/30' },
    { id: 'eng-3', title: 'Weekly Sprint Summary', category: 'Sprint Summary', updated: '4 days ago', pinned: false, favorite: false, workspace: 'engineering', previewColor: 'from-cyan-600/30 to-blue-600/30' },
    { id: 'eng-4', title: 'INC-901 Incident Resolution', category: 'Incident Report', updated: '1 week ago', pinned: true, favorite: true, workspace: 'engineering', previewColor: 'from-red-600/30 to-rose-600/30' },
    { id: 'eng-5', title: 'Scheduled System Maintenance', category: 'Maintenance Notification', updated: '2 weeks ago', pinned: false, favorite: false, workspace: 'engineering', previewColor: 'from-orange-600/30 to-amber-600/30' },
    
    // HR templates
    { id: 'hr-1', title: 'Senior Engineer Offer Letter', category: 'Offer Letter', updated: '3 days ago', pinned: true, favorite: true, workspace: 'hr', previewColor: 'from-violet-600/30 to-fuchsia-600/30' },
    { id: 'hr-2', title: 'Employment Certificate Log', category: 'Experience Certificate', updated: '1 week ago', pinned: false, favorite: false, workspace: 'hr', previewColor: 'from-indigo-600/30 to-purple-600/30' },
    { id: 'hr-3', title: 'Standard Joining Letter', category: 'Joining Letter', updated: '2 weeks ago', pinned: false, favorite: false, workspace: 'hr', previewColor: 'from-pink-600/30 to-rose-600/30' },
    { id: 'hr-4', title: 'Summer Internship Agreement', category: 'Internship Letter', updated: '1 month ago', pinned: false, favorite: false, workspace: 'hr', previewColor: 'from-fuchsia-600/30 to-pink-600/30' },

    // Finance templates
    { id: 'fin-1', title: 'Monthly Subscription Invoice', category: 'Invoice', updated: '1 day ago', pinned: true, favorite: false, workspace: 'finance', previewColor: 'from-emerald-600/30 to-teal-600/30' },
    { id: 'fin-2', title: 'Corporate Payment Receipt', category: 'Receipt', updated: '3 days ago', pinned: false, favorite: true, workspace: 'finance', previewColor: 'from-green-600/30 to-emerald-600/30' },
    { id: 'fin-3', title: 'Service Quotation Sheet', category: 'Quotation', updated: '1 week ago', pinned: false, favorite: false, workspace: 'finance', previewColor: 'from-teal-600/30 to-cyan-600/30' },
    { id: 'fin-4', title: 'Bulk Hardware Purchase Order', category: 'Purchase Order', updated: '3 weeks ago', pinned: false, favorite: false, workspace: 'finance', previewColor: 'from-emerald-600/30 to-green-600/30' },

    // Marketing templates
    { id: 'mkt-1', title: 'Weekly Engagement Newsletter', category: 'Newsletter', updated: '1 day ago', pinned: true, favorite: false, workspace: 'marketing', previewColor: 'from-violet-600/30 to-indigo-600/30' },
    { id: 'mkt-2', title: 'Summer Launch Campaign Announcement', category: 'Campaign Email', updated: '3 days ago', pinned: false, favorite: true, workspace: 'marketing', previewColor: 'from-indigo-600/30 to-purple-600/30' },
    { id: 'mkt-3', title: 'Exclusive Promotional Voucher', category: 'Promotional Email', updated: '1 week ago', pinned: false, favorite: false, workspace: 'marketing', previewColor: 'from-fuchsia-600/30 to-pink-600/30' },
    { id: 'mkt-4', title: 'Corporate Brand Announcement', category: 'Announcement', updated: '3 weeks ago', pinned: false, favorite: false, workspace: 'marketing', previewColor: 'from-purple-600/30 to-violet-600/30' },

    // Support templates
    { id: 'sup-1', title: 'Technical Issue Resolution Guide', category: 'Issue Resolution Email', updated: '2 days ago', pinned: true, favorite: false, workspace: 'support', previewColor: 'from-blue-600/30 to-cyan-600/30' },
    { id: 'sup-2', title: 'Service Interruption Update', category: 'Customer Update', updated: '4 days ago', pinned: false, favorite: true, workspace: 'support', previewColor: 'from-cyan-600/30 to-teal-600/30' },
    { id: 'sup-3', title: 'Subscription Refund Confirmation', category: 'Refund Letter', updated: '1 week ago', pinned: false, favorite: false, workspace: 'support', previewColor: 'from-teal-600/30 to-emerald-600/30' },
    { id: 'sup-4', title: 'System Outage Apology Letter', category: 'Apology Letter', updated: '2 weeks ago', pinned: false, favorite: false, workspace: 'support', previewColor: 'from-rose-600/30 to-red-600/30' },

    // Operations templates
    { id: 'ops-1', title: 'Monthly Progress Project Report', category: 'Project Report', updated: '3 days ago', pinned: true, favorite: false, workspace: 'operations', previewColor: 'from-slate-600/30 to-zinc-600/30' },
    { id: 'ops-2', title: 'Quarterly Board Meeting Minutes', category: 'Meeting Minutes', updated: '1 week ago', pinned: false, favorite: true, workspace: 'operations', previewColor: 'from-zinc-700/30 to-slate-700/30' },
    { id: 'ops-3', title: 'Operational Executive Summary', category: 'Executive Summary', updated: '2 weeks ago', pinned: false, favorite: false, workspace: 'operations', previewColor: 'from-slate-700/30 to-neutral-700/30' },
    { id: 'ops-4', title: 'GDPR Compliance Verification Audit', category: 'Compliance Report', updated: '1 month ago', pinned: false, favorite: false, workspace: 'operations', previewColor: 'from-neutral-600/30 to-zinc-600/30' },
  ]);

  const togglePin = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, pinned: !t.pinned } : t));
  };

  const toggleFavorite = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, favorite: !t.favorite } : t));
  };

  const duplicateTemplate = (id: string) => {
    setTemplates(prev => {
      const target = prev.find(t => t.id === id);
      if (!target) return prev;
      const copy: TemplateItem = {
        ...target,
        id: `temp-copy-${Date.now()}`,
        title: `${target.title} (Copy)`,
        updated: 'Just now',
        pinned: false,
        favorite: false,
      };
      return [copy, ...prev];
    });
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'templates':
        return (
          <TemplatesTab
            templates={templates}
            setTemplates={setTemplates}
            togglePin={togglePin}
            toggleFavorite={toggleFavorite}
            duplicateTemplate={duplicateTemplate}
            deleteTemplate={deleteTemplate}
            workspace={activeWorkspace}
            searchQuery={searchQuery}
          />
        );
      case 'analytics':
        return <AnalyticsTab />;
      case 'activities':
        return <ActivitiesTab />;
      case 'settings':
        return (
          <SettingsTab
            brandLocked={brandLocked}
            setBrandLocked={setBrandLocked}
          />
        );
      case 'overview':
      default:
        return (
          <OverviewTab
            setActiveTab={setActiveTab}
            templates={templates}
            togglePin={togglePin}
            toggleFavorite={toggleFavorite}
            workspace={activeWorkspace}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-row relative overflow-hidden">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeWorkspace={activeWorkspace}
        setActiveWorkspace={setActiveWorkspace}
        brandLocked={brandLocked}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Header Bar */}
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          setNotifications={setNotifications}
          activeTab={activeTab}
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 relative">
          {/* Background ambient lighting */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
};
