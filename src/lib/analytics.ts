/**
 * Analytics utility for tracking user interactions
 * Logs button clicks and other events to localStorage and console
 */

export interface ClickEvent {
  buttonId: string;
  buttonText: string;
  timestamp: string;
  url: string;
  userAgent: string;
}

const STORAGE_KEY = 'nik_finance_click_events';
const MAX_EVENTS = 1000; // Maximum events to store

/**
 * Track a button click event
 * @param buttonId - Unique identifier for the button
 * @param buttonText - Display text of the button
 */
export const trackButtonClick = (buttonId: string, buttonText: string): void => {
  const event: ClickEvent = {
    buttonId,
    buttonText,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  // Log to console for debugging
  console.log('[Analytics] Button clicked:', {
    id: buttonId,
    text: buttonText,
    time: event.timestamp,
    page: window.location.pathname,
  });

  // Store in localStorage
  try {
    const existingEvents = getStoredEvents();
    const updatedEvents = [event, ...existingEvents].slice(0, MAX_EVENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
  } catch (error) {
    console.error('[Analytics] Failed to store click event:', error);
  }

  // Send to external analytics service (if configured)
  sendToAnalyticsService(event);
};

/**
 * Get all stored click events from localStorage
 */
export const getStoredEvents = (): ClickEvent[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('[Analytics] Failed to retrieve stored events:', error);
    return [];
  }
};

/**
 * Get click count for a specific button
 */
export const getButtonClickCount = (buttonId: string): number => {
  const events = getStoredEvents();
  return events.filter((event) => event.buttonId === buttonId).length;
};

/**
 * Get all click counts grouped by button
 */
export const getClickCountsByButton = (): Record<string, number> => {
  const events = getStoredEvents();
  const counts: Record<string, number> = {};

  events.forEach((event) => {
    counts[event.buttonId] = (counts[event.buttonId] || 0) + 1;
  });

  return counts;
};

/**
 * Clear all stored click events
 */
export const clearStoredEvents = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[Analytics] Cleared all stored events');
  } catch (error) {
    console.error('[Analytics] Failed to clear events:', error);
  }
};

/**
 * Get analytics summary
 */
export const getAnalyticsSummary = () => {
  const events = getStoredEvents();
  const counts = getClickCountsByButton();

  return {
    totalClicks: events.length,
    uniqueButtons: Object.keys(counts).length,
    clicksByButton: counts,
    recentClicks: events.slice(0, 10),
    oldestClick: events[events.length - 1],
    newestClick: events[0],
  };
};

/**
 * Send event to external analytics service
 * This is a placeholder for integration with services like:
 * - Google Analytics
 * - Mixpanel
 * - Amplitude
 * - Custom backend endpoint
 */
const sendToAnalyticsService = (event: ClickEvent): void => {
  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'button_click', {
      button_id: event.buttonId,
      button_text: event.buttonText,
      page_path: event.url,
    });
  }

  // Example: Send to custom backend endpoint
  // Uncomment and configure as needed:
  /*
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  }).catch(error => console.error('[Analytics] Failed to send event:', error));
  */
};

/**
 * Export analytics data as JSON
 */
export const exportAnalyticsData = (): string => {
  const summary = getAnalyticsSummary();
  return JSON.stringify(summary, null, 2);
};

/**
 * Export analytics data as CSV
 */
export const exportAnalyticsAsCSV = (): string => {
  const events = getStoredEvents();

  if (events.length === 0) {
    return 'No events to export';
  }

  const headers = ['Button ID', 'Button Text', 'Timestamp', 'URL', 'User Agent'];
  const rows = events.map((event) => [
    event.buttonId,
    event.buttonText,
    event.timestamp,
    event.url,
    event.userAgent,
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

  return csv;
};
