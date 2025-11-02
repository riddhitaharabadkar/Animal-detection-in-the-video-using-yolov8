import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Zap, BarChart3, Shield, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-wildlife.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Video,
      title: "Real-Time Detection",
      description: "Process videos instantly with advanced YOLO technology for accurate animal identification",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "State-of-the-art AI algorithms deliver results in seconds, not minutes",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Get comprehensive reports on species count, behavior patterns, and more",
    },
    {
      icon: Shield,
      title: "Reliable & Accurate",
      description: "Industry-leading accuracy rates ensure trustworthy wildlife monitoring",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by YOLO AI Technology</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              YOLO-Based Real-Time
            </span>
            <br />
            <span className="text-foreground">Animal Detection System</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionize wildlife monitoring with cutting-edge AI technology. 
            Detect, count, and analyze animals in real-time with unprecedented accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              variant="hero" 
              className="text-lg px-8 py-6"
              onClick={() => navigate("/auth")}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="glass" 
              className="text-lg px-8 py-6"
              onClick={() => navigate("/dashboard")}
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Wildlife Conservation
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology meets conservation science
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-card to-muted/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <CardHeader className="relative z-10 text-center pb-8">
              <CardTitle className="text-4xl md:text-5xl mb-4">
                Ready to Transform Wildlife Monitoring?
              </CardTitle>
              <CardDescription className="text-xl">
                Join researchers and conservationists using AI-powered detection
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 flex justify-center pb-8">
              <Button 
                size="lg" 
                variant="hero" 
                className="text-lg px-12 py-6"
                onClick={() => navigate("/auth")}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
