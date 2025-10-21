import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export const MetricCard = ({ title, value, icon: Icon, trend, description }: MetricCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border-border/50 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-muted-foreground ml-2">vs anterior</span>
        </div>
      )}
    </Card>
  );
};
