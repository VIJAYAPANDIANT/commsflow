import React, { useState } from 'react';
import { DashboardSidebar, type TabType, type WorkspaceType } from '../dashboard/DashboardSidebar';
import { DashboardHeader, type NotificationItem } from '../dashboard/DashboardHeader';
import { OverviewTab, type TemplateItem } from '../dashboard/OverviewTab';
import { TemplatesTab } from '../dashboard/TemplatesTab';
import { AnalyticsTab } from '../dashboard/AnalyticsTab';
import { ActivitiesTab } from '../dashboard/ActivitiesTab';
import { SettingsTab } from '../dashboard/SettingsTab';

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
    // Marketing templates
    { id: 'm-1', title: 'Summer Product Campaign Release', category: 'email', updated: '2 hours ago', pinned: true, favorite: false, workspace: 'marketing' },
    { id: 'm-2', title: 'Monthly Lead Newsletter Update', category: 'email', updated: '1 day ago', pinned: false, favorite: true, workspace: 'marketing' },
    { id: 'm-3', title: 'August Discount Voucher Banner', category: 'billing', updated: '4 days ago', pinned: false, favorite: false, workspace: 'marketing' },
    
    // HR templates
    { id: 'h-1', title: 'Health Insurance Plan Details', category: 'document', updated: '3 days ago', pinned: true, favorite: true, workspace: 'hr' },
    { id: 'h-2', title: 'Corporate Work-from-Home Policy', category: 'document', updated: '1 week ago', pinned: false, favorite: false, workspace: 'hr' },
    { id: 'h-3', title: 'Q3 Townhall Meeting Invitation', category: 'email', updated: '2 weeks ago', pinned: false, favorite: false, workspace: 'hr' },

    // Dev templates
    { id: 'd-1', title: 'INC-889 Database Failure Failover', category: 'incident', updated: 'Just now', pinned: true, favorite: true, workspace: 'dev' },
    { id: 'd-2', title: 'Release Changelog Version 2.4.0', category: 'document', updated: '3 days ago', pinned: false, favorite: false, workspace: 'dev' },
    { id: 'd-3', title: 'API Gateway Timeout Incident Log', category: 'incident', updated: '5 days ago', pinned: false, favorite: false, workspace: 'dev' },

    // Finance templates
    { id: 'f-1', title: 'Acme Corp Subscription Invoice', category: 'billing', updated: '1 day ago', pinned: true, favorite: false, workspace: 'finance' },
    { id: 'f-2', title: 'Enterprise Cost Quotation Sheet', category: 'billing', updated: '3 days ago', pinned: false, favorite: true, workspace: 'finance' },
    { id: 'f-3', title: 'Stripe API Webhook Receipt Layout', category: 'billing', updated: '1 week ago', pinned: false, favorite: false, workspace: 'finance' },
  ]);

  const togglePin = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, pinned: !t.pinned } : t));
  };

  const toggleFavorite = (id: string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, favorite: !t.favorite } : t));
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
