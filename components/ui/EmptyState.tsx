import React from 'react';
import { Card, CardContent } from './Card';
import { Button } from './Button';
import { 
  Inbox, 
  MapPin, 
  Users, 
  Bell, 
  AlertTriangle,
  School,
  Bus,
  FileX
} from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="py-16 text-center">
        <div className="flex justify-center mb-4">
          {icon || <Inbox className="w-16 h-16 text-gray-400" />}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Specific empty states for different scenarios
export function NoIncidentsState() {
  return (
    <EmptyState
      icon={<MapPin className="w-16 h-16 text-success-600" />}
      title="No Incidents Reported"
      description="Great news! There are no reported incidents in your area. Your community is safe right now."
      action={{
        label: 'Report an Incident',
        onClick: () => window.location.href = '/dashboard/report'
      }}
    />
  );
}

export function NoNotificationsState() {
  return (
    <EmptyState
      icon={<Bell className="w-16 h-16 text-primary-600" />}
      title="You're All Caught Up!"
      description="No new notifications. We'll alert you when there's important safety information."
    />
  );
}

export function NoChildrenState() {
  return (
    <EmptyState
      icon={<School className="w-16 h-16 text-primary-600" />}
      title="No Children Added"
      description="Add your first child to start tracking their school attendance and bus location."
      action={{
        label: 'Add Child',
        onClick: () => alert('Add child feature - Coming with Supabase integration')
      }}
    />
  );
}

export function NoBusesState() {
  return (
    <EmptyState
      icon={<Bus className="w-16 h-16 text-warning-600" />}
      title="No Active Buses"
      description="There are currently no buses on active routes. Check back during school hours."
    />
  );
}

export function NoUsersState() {
  return (
    <EmptyState
      icon={<Users className="w-16 h-16 text-gray-400" />}
      title="No Users Found"
      description="No users match your current filters. Try adjusting your search criteria."
    />
  );
}

export function ErrorState({ title = 'Something Went Wrong', description = 'An error occurred. Please try again.' }) {
  return (
    <EmptyState
      icon={<AlertTriangle className="w-16 h-16 text-danger-600" />}
      title={title}
      description={description}
      action={{
        label: 'Try Again',
        onClick: () => window.location.reload()
      }}
    />
  );
}

export function NotFoundState() {
  return (
    <EmptyState
      icon={<FileX className="w-16 h-16 text-gray-400" />}
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved."
      action={{
        label: 'Go to Dashboard',
        onClick: () => window.location.href = '/dashboard'
      }}
    />
  );
}
