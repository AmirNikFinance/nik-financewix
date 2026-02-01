import React, { useState, useEffect } from 'react';
import { 
  getAnalyticsSummary, 
  getStoredEvents, 
  clearStoredEvents,
  exportAnalyticsAsCSV,
  exportAnalyticsData
} from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Download, Trash2, RefreshCw } from 'lucide-react';

/**
 * Analytics Dashboard Component
 * Displays click tracking data and provides export/clear functionality
 * 
 * Usage: <AnalyticsDashboard />
 * 
 * This component is useful for development and monitoring purposes.
 * You can add it to a hidden admin page or development page.
 */
export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const refreshData = () => {
    const newSummary = getAnalyticsSummary();
    const newEvents = getStoredEvents();
    setSummary(newSummary);
    setEvents(newEvents);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleExportJSON = () => {
    const data = exportAnalyticsData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csv = exportAnalyticsAsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      clearStoredEvents();
      refreshData();
    }
  };

  if (!summary) {
    return <div className="p-4 text-gray-500">Loading analytics...</div>;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Toggle Button */}

      {/* Dashboard Panel */}
      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl p-6 w-96 max-h-96 overflow-y-auto border border-gray-200">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b">
              <h3 className="font-heading text-lg font-bold text-foreground">
                Analytics Dashboard
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-light-gray rounded-lg p-3">
                <div className="text-2xl font-bold text-accent">
                  {summary.totalClicks}
                </div>
                <div className="text-xs text-gray-600">Total Clicks</div>
              </div>
              <div className="bg-light-gray rounded-lg p-3">
                <div className="text-2xl font-bold text-secondary">
                  {summary.uniqueButtons}
                </div>
                <div className="text-xs text-gray-600">Unique Buttons</div>
              </div>
            </div>

            {/* Clicks by Button */}
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-2">Clicks by Button</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {Object.entries(summary.clicksByButton).map(([buttonId, count]) => (
                  <div key={buttonId} className="flex justify-between items-center text-xs bg-light-gray p-2 rounded">
                    <span className="font-mono text-gray-700 truncate">{buttonId}</span>
                    <span className="font-bold text-accent">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Clicks */}
            {summary.recentClicks.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-2">Recent Clicks</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto text-xs">
                  {summary.recentClicks.slice(0, 5).map((click: any, idx: number) => (
                    <div key={idx} className="text-gray-600 truncate">
                      {click.buttonText} • {new Date(click.timestamp).toLocaleTimeString()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button
                size="sm"
                variant="outline"
                onClick={refreshData}
                className="flex-1 text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportJSON}
                className="flex-1 text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                JSON
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportCSV}
                className="flex-1 text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                CSV
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleClear}
                className="flex-1 text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
