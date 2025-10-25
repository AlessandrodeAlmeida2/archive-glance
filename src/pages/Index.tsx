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
    // Real data from benchmark evaluation
    const sampleData: ScoreboardData = {
      model1Name: "gpt-4o-mini",
      model2Name: "sabiazinho_3",
      evaluationTypes: [
        {
          type: "multiple_choice",
          label: "Múltipla Escolha",
          categories: [
            { category: "all", model1Score: 64.7, model2Score: 63.0 },
            { category: "administrativo", model1Score: 64.7, model2Score: 63.0 },
            { category: "civil", model1Score: 64.7, model2Score: 63.0 },
            { category: "constitucional", model1Score: 64.7, model2Score: 63.0 },
            { category: "empresarial", model1Score: 64.7, model2Score: 63.0 },
            { category: "penal", model1Score: 64.7, model2Score: 63.0 },
            { category: "tributário", model1Score: 64.7, model2Score: 63.0 },
            { category: "trabalhista", model1Score: 64.7, model2Score: 63.0 },
          ],
        },
        {
          type: "legal_document_identification",
          label: "Identificação de Documentos",
          categories: [
            { category: "all", model1Score: 76.19, model2Score: 81.05 },
            { category: "administrativo", model1Score: 66.67, model2Score: 66.67 },
            { category: "civil", model1Score: 100.0, model2Score: 100.0 },
            { category: "constitucional", model1Score: 66.67, model2Score: 100.0 },
            { category: "empresarial", model1Score: 66.67, model2Score: 66.67 },
            { category: "penal", model1Score: 100.0, model2Score: 100.0 },
            { category: "tributário", model1Score: 100.0, model2Score: 66.67 },
            { category: "trabalhista", model1Score: 33.33, model2Score: 66.67 },
          ],
        },
        {
          type: "legal_document_writing",
          label: "Redação de Documentos",
          categories: [
            { category: "all", model1Score: 62.29, model2Score: 62.71 },
            { category: "administrativo", model1Score: 49.67, model2Score: 54.0 },
            { category: "civil", model1Score: 72.33, model2Score: 81.33 },
            { category: "constitucional", model1Score: 73.33, model2Score: 70.0 },
            { category: "empresarial", model1Score: 76.0, model2Score: 73.67 },
            { category: "penal", model1Score: 55.33, model2Score: 65.33 },
            { category: "tributário", model1Score: 68.67, model2Score: 65.33 },
            { category: "trabalhista", model1Score: 40.67, model2Score: 29.33 },
          ],
        },
        {
          type: "discursive",
          label: "Discursiva",
          categories: [
            { category: "all", model1Score: 58.69, model2Score: 62.14 },
            { category: "administrativo", model1Score: 60.4, model2Score: 48.0 },
            { category: "civil", model1Score: 64.4, model2Score: 66.6 },
            { category: "constitucional", model1Score: 56.4, model2Score: 50.4 },
            { category: "empresarial", model1Score: 53.6, model2Score: 73.0 },
            { category: "penal", model1Score: 64.4, model2Score: 75.4 },
            { category: "tributário", model1Score: 51.6, model2Score: 60.6 },
            { category: "trabalhista", model1Score: 60.0, model2Score: 61.0 },
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
            comparison={{
              model1Name: data.model1Name,
              model1Value: model1Wins,
              model2Name: data.model2Name,
              model2Value: model2Wins,
            }}
          />
        </section>

        {/* Evaluation Types Tabs */}
        <section>
          <Tabs defaultValue={data.evaluationTypes[0].type} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
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
