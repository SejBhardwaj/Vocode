import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

const bannerVariants = cva(
  'relative overflow-hidden rounded-md border shadow-lg text-sm',
  {
    variants: {
      variant: {
        default: 'glass-card border-white/20 text-white',
        success:
          'bg-green-500/20 border-green-400/30 text-green-300',
        warning:
          'bg-amber-500/20 border-amber-400/30 text-amber-300',
        info: 'bg-blue-500/20 border-blue-400/30 text-blue-300',
        premium:
          'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300',
        gradient:
          'glass-card border-white/20 text-white',
      },
      size: {
        default: 'py-1.5 px-2.5',
        sm: 'text-xs py-1 px-2',
        lg: 'text-base py-4 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export function Banner({
  variant = 'default',
  size = 'default',
  title,
  description,
  icon,
  showShade = false,
  show,
  onHide,
  action,
  closable = false,
  className,
  autoHide,
  ...props
}) {
  React.useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        onHide?.();
      }, autoHide);
      return () => clearTimeout(timer);
    }
  }, [autoHide, onHide]);

  if (!show) return null;

  return (
    <div
      className={cn(bannerVariants({ variant, size }), className)}
      role={variant === 'warning' || variant === 'default' ? 'alert' : 'status'}
      {...props}
    >
      {/* Shimmer effect */}
      {showShade && (
        <div className="absolute inset-0 -z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col">
              <p className="font-bold text-white text-lg leading-tight">{title}</p>
              {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {action && action}
          {closable && (
            <button 
              onClick={onHide} 
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 h-8 w-8 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
