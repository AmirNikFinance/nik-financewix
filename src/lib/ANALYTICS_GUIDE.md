# Click Tracking & Analytics Guide

## Overview

This guide explains how to use the click tracking and analytics system implemented in the NIK Finance application. The system tracks button clicks and user interactions, storing them in the browser's localStorage and providing tools to analyze and export the data.

## Features

- ✅ **Automatic Click Tracking**: Track button clicks with unique IDs and labels
- ✅ **localStorage Storage**: Persists click data in the browser (up to 1000 events)
- ✅ **Console Logging**: Logs all clicks to browser console for debugging
- ✅ **Analytics Dashboard**: Visual dashboard to view click statistics
- ✅ **Data Export**: Export analytics data as JSON or CSV
- ✅ **External Integration Ready**: Hooks for Google Analytics, Mixpanel, Amplitude, etc.

## Quick Start

### 1. Track a Button Click

#### Method A: Using onClick Handler

```tsx
import { trackButtonClick } from '@/lib/analytics';

<a 
  href="https://example.com"
  onClick={() => trackButtonClick('my-button-id', 'Button Label')}
>
  Click Me
</a>
```

#### Method B: Using TrackedButton Component

```tsx
import { TrackedButton } from '@/components/TrackedButton';

<TrackedButton 
  trackingId="my-button-id" 
  trackingLabel="Button Label"
>
  Click Me
</TrackedButton>
```

### 2. View Analytics Dashboard

The analytics dashboard is automatically included on the HomePage. Look for the floating button in the bottom-right corner of the page.

**Dashboard Features:**
- Total clicks count
- Unique buttons count
- Clicks grouped by button ID
- Recent clicks list
- Export to JSON/CSV
- Clear all data

### 3. Access Analytics Programmatically

```tsx
import { 
  getAnalyticsSummary,
  getStoredEvents,
  getButtonClickCount,
  getClickCountsByButton,
  exportAnalyticsData,
  exportAnalyticsAsCSV,
  clearStoredEvents
} from '@/lib/analytics';

// Get summary of all analytics
const summary = getAnalyticsSummary();
console.log(summary);
// Output:
// {
//   totalClicks: 42,
//   uniqueButtons: 5,
//   clicksByButton: { 'hero-get-funded': 15, 'header-start-application': 27 },
//   recentClicks: [...],
//   oldestClick: {...},
//   newestClick: {...}
// }

// Get all stored events
const events = getStoredEvents();

// Get click count for specific button
const count = getButtonClickCount('hero-get-funded');

// Get all click counts
const counts = getClickCountsByButton();

// Export as JSON string
const jsonData = exportAnalyticsData();

// Export as CSV string
const csvData = exportAnalyticsAsCSV();

// Clear all stored events
clearStoredEvents();
```

## Implementation Examples

### Example 1: Hero Button (Already Implemented)

```tsx
<a 
  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3" 
  target="_blank" 
  rel="noopener noreferrer"
  onClick={() => trackButtonClick('hero-get-funded', 'Get funded')}
>
  <Button size="lg" className="...">
    Get funded
  </Button>
</a>
```

### Example 2: Header Button (Already Implemented)

```tsx
<a
  href="https://app.middle.finance/ref/7d27aec6-deb1-4e44-8bd8-85f8f8aecff3"
  onClick={() => trackButtonClick('header-start-application', 'Start Application')}
  className="..."
>
  Start Application
</a>
```

### Example 3: Form Submit Button

```tsx
<button
  type="submit"
  onClick={() => trackButtonClick('apply-form-submit', 'Submit Application')}
  className="..."
>
  Submit Application
</button>
```

### Example 4: Navigation Link

```tsx
<Link 
  to="/blog"
  onClick={() => trackButtonClick('nav-blog-link', 'Blog')}
  className="..."
>
  Blog
</Link>
```

## Data Structure

### ClickEvent Interface

```typescript
interface ClickEvent {
  buttonId: string;        // Unique identifier for the button
  buttonText: string;      // Display text of the button
  timestamp: string;       // ISO 8601 timestamp
  url: string;            // Full URL where click occurred
  userAgent: string;      // Browser user agent
}
```

### Analytics Summary

```typescript
{
  totalClicks: number;                    // Total number of clicks
  uniqueButtons: number;                  // Number of unique buttons clicked
  clicksByButton: Record<string, number>; // Click count per button
  recentClicks: ClickEvent[];            // Last 10 clicks
  oldestClick: ClickEvent;               // First recorded click
  newestClick: ClickEvent;               // Most recent click
}
```

## Storage Details

### localStorage Key
- **Key**: `nik_finance_click_events`
- **Max Events**: 1000 (oldest events are removed when limit is reached)
- **Format**: JSON array of ClickEvent objects

### Browser Console
All clicks are logged to the browser console with the format:
```
[Analytics] Button clicked: {
  id: "button-id",
  text: "Button Text",
  time: "2024-01-10T12:34:56.789Z",
  page: "/current-page"
}
```

## Integration with External Services

### Google Analytics

The analytics system includes a placeholder for Google Analytics integration. To enable it:

1. Ensure Google Analytics is loaded on your page
2. The system will automatically send events if `window.gtag` is available

```typescript
// In analytics.ts, the sendToAnalyticsService function includes:
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', 'button_click', {
    button_id: event.buttonId,
    button_text: event.buttonText,
    page_path: event.url,
  });
}
```

### Custom Backend Endpoint

To send events to your own backend:

1. Uncomment the fetch code in `sendToAnalyticsService()` in `/src/lib/analytics.ts`
2. Update the endpoint URL to match your backend
3. Implement the corresponding backend endpoint

```typescript
// Uncomment in analytics.ts:
fetch('/api/analytics/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(event),
}).catch(error => console.error('[Analytics] Failed to send event:', error));
```

### Mixpanel, Amplitude, etc.

Similar to Google Analytics, you can add integrations in the `sendToAnalyticsService()` function:

```typescript
// Mixpanel example
if (typeof window !== 'undefined' && (window as any).mixpanel) {
  (window as any).mixpanel.track('button_click', {
    button_id: event.buttonId,
    button_text: event.buttonText,
  });
}
```

## Best Practices

### 1. Use Consistent Button IDs

Use kebab-case for button IDs and include context:
- ✅ `hero-get-funded`
- ✅ `header-start-application`
- ✅ `apply-form-submit`
- ❌ `btn1`, `button`, `click`

### 2. Use Descriptive Labels

Labels should match the button text or describe the action:
- ✅ `Get funded`
- ✅ `Start Application`
- ✅ `Submit Form`
- ❌ `btn`, `click`, `action`

### 3. Track Important Actions

Focus on tracking:
- Primary CTAs (Call-to-Action buttons)
- Form submissions
- Navigation links
- External link clicks
- Feature interactions

### 4. Regular Data Export

Periodically export and backup your analytics data:
1. Open the Analytics Dashboard
2. Click "JSON" or "CSV" to download
3. Store in a safe location

### 5. Privacy Considerations

The current implementation:
- Stores data locally in the browser (not sent to servers by default)
- Does not collect personally identifiable information (PII)
- Includes user agent for debugging purposes
- Can be cleared at any time

**Important**: If you integrate with external services, ensure compliance with:
- GDPR (if serving EU users)
- CCPA (if serving California users)
- Your privacy policy
- Cookie consent requirements

## Troubleshooting

### Data Not Appearing in Dashboard

1. **Check localStorage**: Open browser DevTools → Application → localStorage
2. **Look for key**: `nik_finance_click_events`
3. **Check console**: Look for `[Analytics]` messages
4. **Verify tracking calls**: Ensure `trackButtonClick()` is being called

### Dashboard Not Visible

1. The dashboard appears as a floating button in the bottom-right corner
2. It's only visible on the HomePage
3. To add to other pages, import and include `<AnalyticsDashboard />`

### Data Lost After Page Refresh

This is normal behavior. localStorage persists data across page refreshes, but:
- Clearing browser cache will delete the data
- Using private/incognito mode won't persist data
- Different browsers have separate localStorage

### Export Not Working

1. Check browser console for errors
2. Ensure you have data to export (at least one click)
3. Check browser permissions for downloads
4. Try a different browser if issues persist

## Advanced Usage

### Custom Analytics Page

Create a dedicated analytics page to view detailed statistics:

```tsx
// src/components/pages/AnalyticsPage.tsx
import { getAnalyticsSummary, getStoredEvents } from '@/lib/analytics';
import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setSummary(getAnalyticsSummary());
    setEvents(getStoredEvents());
  }, []);

  return (
    <div className="p-8">
      <h1>Analytics Report</h1>
      {/* Display summary and events */}
    </div>
  );
}
```

### Real-time Analytics Monitoring

Create a hook to monitor analytics in real-time:

```tsx
import { useEffect, useState } from 'react';
import { getAnalyticsSummary } from '@/lib/analytics';

export function useAnalytics(refreshInterval = 5000) {
  const [summary, setSummary] = useState(getAnalyticsSummary());

  useEffect(() => {
    const interval = setInterval(() => {
      setSummary(getAnalyticsSummary());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return summary;
}
```

## Files Reference

### Core Files
- **`/src/lib/analytics.ts`** - Main analytics utility with all tracking functions
- **`/src/components/TrackedButton.tsx`** - Reusable tracked button component
- **`/src/components/AnalyticsDashboard.tsx`** - Visual analytics dashboard

### Modified Files
- **`/src/components/Header.tsx`** - Added tracking to header buttons
- **`/src/components/pages/HomePage.tsx`** - Added tracking to hero button and dashboard
- **`/src/components/pages/ApplyPage.tsx`** - Ready for tracking (import added)

## Support & Questions

For questions or issues with the analytics system:
1. Check this guide first
2. Review the code comments in `/src/lib/analytics.ts`
3. Check browser console for error messages
4. Verify button IDs and labels are correct

## Version History

- **v1.0** (2024-01-10)
  - Initial implementation
  - localStorage-based tracking
  - Analytics dashboard
  - JSON/CSV export
  - Google Analytics integration ready
