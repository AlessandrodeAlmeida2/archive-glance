import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ScoreChartProps {
  data: Array<{
    category: string;
    model1Score: number;
    model2Score: number;
  }>;
  model1Name: string;
  model2Name: string;
}

export const ScoreChart = ({ data, model1Name, model2Name }: ScoreChartProps) => {
  const chartData = data.map((item) => ({
    name: item.category,
    [model1Name]: item.model1Score,
    [model2Name]: item.model2Score,
  }));

  return (
    <Card className="p-6 shadow-[var(--shadow-medium)]">
      <h3 className="text-xl font-bold text-foreground mb-6">Comparação Visual</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar 
            dataKey={model1Name} 
            fill="hsl(var(--primary))" 
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            dataKey={model2Name} 
            fill="hsl(var(--secondary))" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
