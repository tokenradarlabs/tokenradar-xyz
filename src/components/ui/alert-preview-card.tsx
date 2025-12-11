import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BellRing } from 'lucide-react'; // Assuming lucide-react for icons

interface AlertPreviewCardProps {
  title: string;
  description: string;
  // Add more props as needed to customize the preview
}

const AlertPreviewCard: React.FC<AlertPreviewCardProps> = ({ title, description }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Alert Preview</CardTitle>
        <BellRing className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{title}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
        <div className="mt-4 text-xs text-gray-500">
          This is how your alert notification will appear.
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertPreviewCard;
