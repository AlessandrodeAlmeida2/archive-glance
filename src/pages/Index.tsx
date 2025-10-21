import { useEffect, useState } from "react";
import { Trophy, TrendingUp, Award, Target } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ScoreChart } from "@/components/ScoreChart";
import { toast } from "sonner";

interface ScoreboardData {
  model1Name: string;
  model2Name: string;
  categories: Array<{
    category: string;
    model1Score: number;
    model2Score: number;
  }>;
}

const Index = () => {
  const [data, setData] = useState<ScoreboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - In production, this would parse the pickle file
    // For now, using sample data based on what we saw in the file
    const sampleData: ScoreboardData = {
      model1Name: "gpt-4o-mini",
      model2Name: "sabiazinho_3",
      categories: [
        { category: "all", model1Score: 79.6, model2Score: 79.6 },
        { category: "administrativo", model1Score: 75.2, model2Score: 73.8 },
        { category: "civil", model1Score: 88.5, model2Score: 86.2 },
        { category: "constitucional", model1Score: 75.2, model2Score: 75.2 },
        { category: "empresarial", model1Score: 75.2, model2Score: 75.2 },
        { category: "penal", model1Score: 75.2, model2Score: 75.2 },
        { category: "tributário", model1Score: 75.2, model2Score: 75.2 },
        { category: "trabalhista", model1Score: 75.2, model2Score: 75.2 },
      ],
    };

    setTimeout(() => {
      setData(sampleData);
      setLoading(false);
      toast.success("Dashboard carregado com sucesso!");
    }, 500);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const avgScore1 = data.categories.reduce((acc, cat) => acc + cat.model1Score, 0) / data.categories.length;
  const avgScore2 = data.categories.reduce((acc, cat) => acc + cat.model2Score, 0) / data.categories.length;
  const totalCategories = data.categories.length;
  const model1Wins = data.categories.filter(cat => cat.model1Score > cat.model2Score).length;
  const model2Wins = data.categories.filter(cat => cat.model2Score > cat.model1Score).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-primary py-12 px-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
            Dashboard de Análise
          </h1>
          <p className="text-primary-foreground/90 text-lg">
            Comparação de Performance entre Modelos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Score Médio"
            value={avgScore1.toFixed(1)}
            icon={Trophy}
            description={data.model1Name}
          />
          <MetricCard
            title="Score Médio"
            value={avgScore2.toFixed(1)}
            icon={Award}
            description={data.model2Name}
          />
          <MetricCard
            title="Total de Categorias"
            value={totalCategories}
            icon={Target}
            description="Áreas avaliadas"
          />
          <MetricCard
            title="Vitórias"
            value={`${model1Wins} vs ${model2Wins}`}
            icon={TrendingUp}
            description="Comparativo"
          />
        </section>

        {/* Chart */}
        <section>
          <ScoreChart
            data={data.categories}
            model1Name={data.model1Name}
            model2Name={data.model2Name}
          />
        </section>

        {/* Comparison Table */}
        <section>
          <ComparisonTable
            data={data.categories}
            model1Name={data.model1Name}
            model2Name={data.model2Name}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-8 px-4 mt-16">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>Dashboard de Análise de Performance • {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
