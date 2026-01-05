/**
 * Portfólio Vinicius Cerqueira Silva
 * Design: Data Flow Aesthetic
 * - Tema escuro com acentos ciano (#00D4FF) e verde neon (#00FF88)
 * - Tipografia: JetBrains Mono (display) + Inter (body)
 * - Animações de fluxo de dados e métricas
 */

import { motion } from "framer-motion";
import { 
  Database, 
  BarChart3, 
  Zap, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Download,
  ExternalLink,
  ChevronDown,
  Award,
  Briefcase,
  GraduationCap,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useRef } from "react";

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Typing effect component
function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className="animate-blink text-cyan">|</span>
    </span>
  );
}

// Navigation component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          className="font-mono text-lg font-bold text-cyan"
          whileHover={{ scale: 1.05 }}
        >
          &lt;VCS /&gt;
        </motion.div>
        <div className="hidden md:flex items-center gap-6">
          {["sobre", "experiencia", "habilidades", "formacao", "contato"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-muted-foreground hover:text-cyan transition-colors capitalize font-medium"
            >
              {item === "experiencia" ? "Experiência" : item === "formacao" ? "Formação" : item}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-cyan text-cyan hover:bg-cyan hover:text-background"
          onClick={() => window.open("https://www.linkedin.com/in/viniciusplanejamento-bi-excel/", "_blank")}
        >
          <Linkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </Button>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      
      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-cyan mb-4 text-sm md:text-base">
              // Olá, eu sou
            </p>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-foreground">Vinicius </span>
            <span className="text-cyan text-glow-cyan">Cerqueira</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-mono text-xl md:text-2xl text-muted-foreground mb-8"
          >
            <TypingText text="Em transição para Análise de Dados & BI" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {["Power BI", "SQL", "Excel Avançado", "Automação"].map((skill, index) => (
              <Badge 
                key={skill} 
                variant="outline" 
                className="border-cyan/50 text-cyan px-4 py-2 text-sm"
              >
                {skill}
              </Badge>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-cyan text-background hover:bg-cyan/90 glow-cyan font-semibold"
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="w-5 h-5 mr-2" />
              Entre em Contato
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-neon text-green-neon hover:bg-green-neon hover:text-background"
              onClick={() => window.open("https://www.linkedin.com/in/viniciusplanejamento-bi-excel/", "_blank")}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Ver LinkedIn
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground cursor-pointer"
            onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="sobre" className="py-24 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('/images/skills-bg.png')" }}
      />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan mb-2">// Sobre mim</p>
          <h2 className="text-3xl md:text-4xl font-bold">Resumo Profissional</h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Profissional <span className="text-cyan font-semibold">em transição de carreira</span> para a área de Dados, 
              trazendo <span className="text-green-neon font-semibold">+7 anos de experiência em liderança operacional</span>. 
              Tenho desenvolvido habilidades em Power BI, SQL e Excel, e já consegui aplicar esses conhecimentos 
              para <span className="text-cyan font-semibold">automatizar processos</span> no meu trabalho atual.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Busco uma oportunidade para crescer na área de dados, onde possa aprender com profissionais 
              experientes e contribuir com minha visão de negócio e capacidade de resolver problemas.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Database, label: "Análise de Dados", value: "Aprendendo" },
              { icon: BarChart3, label: "Power BI", value: "Intermediário" },
              { icon: Zap, label: "Automação", value: "Aplicado" },
              { icon: Briefcase, label: "Liderança", value: "+7 anos" },
            ].map((item, index) => (
              <Card key={item.label} className="bg-card/50 border-border hover:border-cyan/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-8 h-8 text-cyan mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-mono text-lg font-semibold text-foreground">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const experiences = [
    {
      title: "Atendente de Negócios",
      company: "Paraná Banco",
      period: "Abr/2023 – Atual",
      highlights: [
        {
          title: "Automação de Relatórios",
          description: "Aprendi Power BI por conta própria e consegui automatizar um processo que antes levava 14 horas de análise manual. Foi meu primeiro projeto real aplicando BI.",
          metric: "1h → Auto",

        },
        {
          title: "Análise de Desempenho",
          description: "Utilização de KPIs para monitorar e otimizar a elegibilidade e negociação de crédito consignado."
        },
        {
          title: "Otimização de Processos",
          description: "Suporte na melhoria de processos internos, identificando e mitigando gargalos através da análise de dados."
        }
      ]
    },
    {
      title: "Supervisor de Operações CX Pleno",
      company: "DBM Contact Center",
      period: "Set/2021 – Out/2022",
      highlights: [
        {
          title: "Liderança de Equipe",
          description: "Liderava equipe operacional e comecei a usar dashboards em Excel e Power BI para acompanhar resultados. Foi quando descobri meu interesse por dados."
        },
        {
          title: "Primeiros Passos em Automação",
          description: "Desenvolvi soluções simples de automação para clientes como Eudora e Furukawa, aprendendo na prática."
        },
        {
          title: "Análise Massiva",
          description: "Estruturação e análise de grandes volumes de dados com MS Access e Excel para suporte à decisão."
        }
      ]
    },
    {
      title: "Supervisor de Operações",
      company: "SoftMarketing",
      period: "Set/2017 – Mai/2020",
      highlights: [
        {
          title: "Gestão de KPIs",
          description: "Responsável pela gestão e melhoria contínua de KPIs operacionais (NS, TMA, TQA/SLA, IDSP)."
        },
        {
          title: "Resultados",
          description: "Implementei estratégias operacionais que resultaram em um aumento mensurável do desempenho da equipe."
        }
      ]
    }
  ];

  return (
    <section id="experiencia" className="py-24 bg-card/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan mb-2">// Trajetória</p>
          <h2 className="text-3xl md:text-4xl font-bold">Experiência Profissional</h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border">
                <div className="absolute top-2 -left-[5px] w-3 h-3 rounded-full bg-cyan glow-cyan" />
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                <p className="text-cyan font-mono">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
              </div>
              
              <div className="space-y-4">
                {exp.highlights.map((highlight, hIndex) => (
                  <Card key={hIndex} className="bg-card/50 border-border hover:border-cyan/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{highlight.title}</h4>
                          <p className="text-sm text-muted-foreground">{highlight.description}</p>
                        </div>
                        {highlight.metric && (
                          <div className="text-right shrink-0">
                            <p className="font-mono text-2xl font-bold text-green-neon text-glow-green">
                              {highlight.metric}
                            </p>
                            <p className="text-xs text-muted-foreground">{highlight.metricLabel}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skills = [
    {
      category: "Business Intelligence",
      items: [
        { name: "Power BI", level: 65 },
        { name: "Power Query (M)", level: 55 },
        { name: "DAX", level: 45, learning: true },
      ]
    },
    {
      category: "Banco de Dados",
      items: [
        { name: "SQL (PostgreSQL/MySQL)", level: 50 },
        { name: "Microsoft Access", level: 70 },
      ]
    },
    {
      category: "Análise e Automação",
      items: [
        { name: "Excel Avançado", level: 85 },
        { name: "Python", level: 25, learning: true },
        { name: "JavaScript", level: 15, learning: true },
      ]
    }
  ];

  return (
    <section id="habilidades" className="py-24 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/images/data-visualization.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan mb-2">// O que estou aprendendo</p>
          <h2 className="text-3xl md:text-4xl font-bold">Habilidades em Desenvolvimento</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skills.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <Card className="bg-card/50 border-border h-full">
                <CardContent className="p-6">
                  <h3 className="font-mono text-cyan text-lg mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.items.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-foreground flex items-center gap-2">
                            {skill.name}
                            {skill.learning && (
                              <Badge variant="outline" className="text-xs border-green-neon/50 text-green-neon">
                                Em estudo
                              </Badge>
                            )}
                          </span>
                          <span className="font-mono text-sm text-muted-foreground">
                            <AnimatedCounter end={skill.level} suffix="%" />
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            className={`h-full rounded-full ${
                              skill.learning 
                                ? "bg-gradient-to-r from-green-neon/50 to-green-neon" 
                                : "bg-gradient-to-r from-cyan/50 to-cyan"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Education Section
function EducationSection() {
  return (
    <section id="formacao" className="py-24 bg-card/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan mb-2">// Educação</p>
          <h2 className="text-3xl md:text-4xl font-bold">Formação e Certificações</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/50 border-border h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-cyan/10">
                    <GraduationCap className="w-6 h-6 text-cyan" />
                  </div>
                  <h3 className="font-mono text-lg text-cyan">Formação Acadêmica</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-semibold text-foreground">Tecnólogo em Análise e Desenvolvimento de Sistemas</h4>
                    <p className="text-sm text-muted-foreground">Unicesumar</p>
                    <p className="text-xs text-cyan font-mono mt-2">Previsão: 2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/50 border-border h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-green-neon/10">
                    <Award className="w-6 h-6 text-green-neon" />
                  </div>
                  <h3 className="font-mono text-lg text-green-neon">Certificações</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-semibold text-foreground">SQL para Análise de Dados</h4>
                    <p className="text-sm text-muted-foreground">Data Science Academy</p>
                    <p className="text-xs text-green-neon font-mono mt-2">2024</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-semibold text-foreground">Excel Avançado e Power BI</h4>
                    <p className="text-sm text-muted-foreground">Udemy</p>
                    <p className="text-xs text-green-neon font-mono mt-2">2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-cyan/10">
                  <Globe className="w-6 h-6 text-cyan" />
                </div>
                <h3 className="font-mono text-lg text-cyan">Idiomas</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-cyan text-background">Português</Badge>
                  <span className="text-sm text-muted-foreground">Nativo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-cyan/50 text-cyan">Inglês</Badge>
                  <span className="text-sm text-muted-foreground">Intermediário (foco em leitura técnica)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  return (
    <section id="contato" className="py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-cyan mb-2">// Vamos conversar</p>
          <h2 className="text-3xl md:text-4xl font-bold">Entre em Contato</h2>
        </motion.div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card/50 border-border">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <a 
                    href="mailto:vcerqueira@outlook.com.br"
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:border-cyan/50 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                      <Mail className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-mono text-foreground">vcerqueira@outlook.com.br</p>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+5541995811045"
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:border-cyan/50 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                      <Phone className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <p className="font-mono text-foreground">(41) 99581-1045</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="p-3 rounded-lg bg-cyan/10">
                      <MapPin className="w-6 h-6 text-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Localização</p>
                      <p className="font-mono text-foreground">Araucária/PR</p>
                      <p className="text-xs text-green-neon">Disponível para mudança | Híbrido/Remoto</p>
                    </div>
                  </div>
                  
                  <a 
                    href="https://www.linkedin.com/in/viniciusplanejamento-bi-excel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:border-cyan/50 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-cyan/10 group-hover:bg-cyan/20 transition-colors">
                      <Linkedin className="w-6 h-6 text-cyan" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <p className="font-mono text-foreground">linkedin.com/in/viniciusplanejamento-bi-excel</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-cyan transition-colors" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-cyan text-sm">
            &lt;VCS /&gt;
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Vinicius Cerqueira Silva. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            // Feito com React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Home Component
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
