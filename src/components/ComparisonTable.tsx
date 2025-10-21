import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComparisonData {
  category: string;
  model1Score: number;
  model2Score: number;
}

interface ComparisonTableProps {
  data: ComparisonData[];
  model1Name: string;
  model2Name: string;
}

export const ComparisonTable = ({ data, model1Name, model2Name }: ComparisonTableProps) => {
  const getBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "outline";
  };

  const getWinner = (score1: number, score2: number) => {
    if (score1 > score2) return "model1";
    if (score2 > score1) return "model2";
    return "tie";
  };

  return (
    <Card className="overflow-hidden shadow-[var(--shadow-medium)]">
      <div className="bg-gradient-to-r from-primary via-secondary to-primary p-6">
        <h2 className="text-2xl font-bold text-primary-foreground">Comparação de Modelos</h2>
        <p className="text-primary-foreground/80 mt-1">Análise detalhada por categoria</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-bold text-foreground">Categoria</TableHead>
              <TableHead className="font-bold text-foreground text-center">{model1Name}</TableHead>
              <TableHead className="font-bold text-foreground text-center">{model2Name}</TableHead>
              <TableHead className="font-bold text-foreground text-center">Vencedor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => {
              const winner = getWinner(row.model1Score, row.model2Score);
              return (
                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium capitalize">{row.category}</TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={getBadgeVariant(row.model1Score)}
                      className={winner === "model1" ? "bg-success/20 text-success border-success/50" : ""}
                    >
                      {row.model1Score.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={getBadgeVariant(row.model2Score)}
                      className={winner === "model2" ? "bg-success/20 text-success border-success/50" : ""}
                    >
                      {row.model2Score.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {winner === "tie" ? (
                      <span className="text-muted-foreground">Empate</span>
                    ) : (
                      <span className="font-semibold text-foreground">
                        {winner === "model1" ? model1Name : model2Name}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
