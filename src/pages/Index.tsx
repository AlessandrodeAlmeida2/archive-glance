import { useEffect, useState } from "react";
import { Trophy, TrendingUp, Award, Target } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ScoreChart } from "@/components/ScoreChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface CategoryScore {
  category: string;
  model1Score: number;
  model2Score: number;
}

interface EvaluationTypeData {
  type: string;
  label: string;
  categories: CategoryScore[];
}

interface ScoreboardData {
  model1Name: string;
  model2Name: string;
  evaluationTypes: EvaluationTypeData[];
}

const Index = () => {
  const [data, setData] = useState<ScoreboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - In production, this would parse the pickle file
    const sampleData: ScoreboardData = {
      model1Name: "gpt-4o-mini",
      model2Name: "sabiazinho_3",
      evaluationTypes: [
        {
          type: "evaluated_area",
          label: "Área Avaliada",
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
        },
        {
          type: "multiple_choice",
          label: "Múltipla Escolha",
          categories: [
            { category: "all", model1Score: 82.3, model2Score: 81.5 },
            { category: "administrativo", model1Score: 78.5, model2Score: 76.2 },
            { category: "civil", model1Score: 85.2, model2Score: 83.8 },
            { category: "constitucional", model1Score: 80.1, model2Score: 79.5 },
            { category: "empresarial", model1Score: 81.7, model2Score: 82.3 },
            { category: "penal", model1Score: 79.8, model2Score: 78.9 },
            { category: "tributário", model1Score: 83.5, model2Score: 84.1 },
            { category: "trabalhista", model1Score: 77.9, model2Score: 76.5 },
          ],
        },
        {
          type: "legal_document_identification",
          label: "Identificação de Documentos Legais",
          categories: [
            { category: "all", model1Score: 76.8, model2Score: 77.2 },
            { category: "administrativo", model1Score: 72.3, model2Score: 71.8 },
            { category: "civil", model1Score: 80.5, model2Score: 81.2 },
            { category: "constitucional", model1Score: 74.9, model2Score: 75.5 },
            { category: "empresarial", model1Score: 73.8, model2Score: 74.1 },
            { category: "penal", model1Score: 78.2, model2Score: 79.0 },
            { category: "tributário", model1Score: 75.6, model2Score: 76.3 },
            { category: "trabalhista", model1Score: 71.5, model2Score: 72.8 },
          ],
        },
        {
          type: "legal_document_writing",
          label: "Redação de Documentos Legais",
          categories: [
            { category: "all", model1Score: 68.5, model2Score: 70.2 },
            { category: "administrativo", model1Score: 65.2, model2Score: 67.8 },
            { category: "civil", model1Score: 72.8, model2Score: 74.5 },
            { category: "constitucional", model1Score: 66.5, model2Score: 68.2 },
            { category: "empresarial", model1Score: 69.7, model2Score: 71.3 },
            { category: "penal", model1Score: 67.3, model2Score: 69.1 },
            { category: "tributário", model1Score: 70.1, model2Score: 71.8 },
            { category: "trabalhista", model1Score: 68.9, model2Score: 70.5 },
          ],
        },
        {
          type: "discursive",
          label: "Discursiva",
          categories: [
            { category: "all", model1Score: 71.2, model2Score: 72.8 },
            { category: "administrativo", model1Score: 68.5, model2Score: 70.2 },
            { category: "civil", model1Score: 74.3, model2Score: 76.1 },
            { category: "constitucional", model1Score: 69.8, model2Score: 71.5 },
            { category: "empresarial", model1Score: 72.1, model2Score: 73.7 },
            { category: "penal", model1Score: 70.5, model2Score: 72.3 },
            { category: "tributário", model1Score: 73.2, model2Score: 74.9 },
            { category: "trabalhista", model1Score: 69.6, model2Score: 71.2 },
          ],
        },
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

  // Calculate overall metrics across all evaluation types
  const allCategories = data.evaluationTypes.flatMap(et => et.categories);
  const avgScore1 = allCategories.reduce((acc, cat) => acc + cat.model1Score, 0) / allCategories.length;
  const avgScore2 = allCategories.reduce((acc, cat) => acc + cat.model2Score, 0) / allCategories.length;
  const totalEvaluationTypes = data.evaluationTypes.length;
  const model1Wins = allCategories.filter(cat => cat.model1Score > cat.model2Score).length;
  const model2Wins = allCategories.filter(cat => cat.model2Score > cat.model1Score).length;

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
            title="Tipos de Avaliação"
            value={totalEvaluationTypes}
            icon={Target}
            description="Modalidades"
          />
          <MetricCard
            title="Vitórias"
            value={`${model1Wins} vs ${model2Wins}`}
            icon={TrendingUp}
            description="Comparativo"
          />
        </section>

        {/* Evaluation Types Tabs */}
        <section>
          <Tabs defaultValue={data.evaluationTypes[0].type} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              {data.evaluationTypes.map((evalType) => (
                <TabsTrigger key={evalType.type} value={evalType.type} className="text-xs md:text-sm">
                  {evalType.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {data.evaluationTypes.map((evalType) => (
              <TabsContent key={evalType.type} value={evalType.type} className="space-y-8">
                {/* Chart */}
                <ScoreChart
                  data={evalType.categories}
                  model1Name={data.model1Name}
                  model2Name={data.model2Name}
                />

                {/* Comparison Table */}
                <ComparisonTable
                  data={evalType.categories}
                  model1Name={data.model1Name}
                  model2Name={data.model2Name}
                />
              </TabsContent>
            ))}
          </Tabs>
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
