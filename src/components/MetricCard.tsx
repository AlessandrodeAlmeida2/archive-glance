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
  comparison?: {
    model1Name: string;
    model1Value: number;
    model2Name: string;
    model2Value: number;
  };
}

export const MetricCard = ({ title, value, icon: Icon, trend, description, comparison }: MetricCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border-border/50 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          {!comparison ? (
            <>
              <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-foreground mb-3">{value}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium text-foreground">{comparison.model1Name}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{comparison.model1Value}</span>
                </div>
                <div className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium text-foreground">{comparison.model2Name}</span>
                  </div>
                  <span className="text-lg font-bold text-secondary">{comparison.model2Value}</span>
                </div>
              </div>
            </>
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
