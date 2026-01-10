import React from 'react';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/lib/analytics';

interface TrackedButtonProps extends React.ComponentProps<typeof Button> {
  trackingId: string;
  trackingLabel?: string;
}

/**
 * A wrapper around the Button component that automatically tracks clicks
 * Usage: <TrackedButton trackingId="my-button" trackingLabel="Click Me">Click Me</TrackedButton>
 */
export const TrackedButton = React.forwardRef<
  HTMLButtonElement,
  TrackedButtonProps
>(({ trackingId, trackingLabel, onClick, children, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackButtonClick(trackingId, trackingLabel || (typeof children === 'string' ? children : 'Button'));
    onClick?.(e);
  };

  return (
    <Button ref={ref} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
});

TrackedButton.displayName = 'TrackedButton';

export default TrackedButton;
