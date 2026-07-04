// Estructura de datos para los posts del blog
export const blogPosts = [
  {
    id: 1,
    title: "Building Production-Grade Multimodal RAG Systems",
    excerpt: "Lessons learned from architecting a production RAG system for the AEC industry using CLIP, BGE-M3, and multi-agent architectures.",
    content: `# Building Production-Grade Multimodal RAG Systems

In this post, I'll share my experience building a production-grade Multimodal RAG system for the construction industry. The challenge was to enable natural language queries over architectural drawings and technical documentation.

## Architecture Overview

The system combines:
- **CLIP (ViT-B/16)** for image understanding
- **BGE-M3** for text embeddings
- **OCR** for technical document processing
- **Multi-agent architecture** for reasoning

## Key Challenges

1. **Multimodal Alignment**: Ensuring image and text embeddings work together
2. **Hallucination Control**: Keeping hallucinations under 3%
3. **Performance**: Reducing estimation time from days to minutes

## Results

- Precision: 0.92
- F1-Score: 0.91
- Hallucination rate: <3%

Stay tuned for more technical details in upcoming posts!`,
    author: "Carlos Villena",
    date: "2025-01-15",
    category: "AI/ML",
    tags: ["RAG", "CLIP", "Multimodal AI", "Production Systems"],
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    title: "Oracle Cloud Migration: Lessons from CPAT Development",
    excerpt: "Core contributor insights on building the Cloud Premigration Advisor Tool and helping customers anticipate migration contingencies.",
    content: `# Oracle Cloud Migration: Lessons from CPAT Development

As a core contributor to the Cloud Premigration Advisor Tool (CPAT), I've learned valuable lessons about cloud migrations and customer success.

## The Challenge

Customers needed to anticipate and resolve migration contingencies before cloud deployment. This required:
- Comprehensive database analysis
- Automated reporting systems
- CLI interfaces for developers

## Key Learnings

1. **Early Detection**: Identifying issues before migration saves time and money
2. **Automation**: HTML reporting systems streamline the process
3. **Developer Experience**: CLI interfaces make tools accessible

## Impact

- 40%+ improvement in migration throughput
- Enterprise-scale deployments
- Reduced customer migration risks

More technical details coming soon!`,
    author: "Carlos Villena",
    date: "2025-01-10",
    category: "DevOps",
    tags: ["Oracle", "Cloud Migration", "DevOps", "Automation"],
    readTime: "6 min read",
    featured: false
  },
  {
    id: 3,
    title: "Virtualized Database Testing: Improving CI/CD Pipelines",
    excerpt: "How we built a fully virtualized database testing platform that improved validation throughput by 40%+ using Docker and Jenkins.",
    content: `# Virtualized Database Testing: Improving CI/CD Pipelines

Building reliable CI/CD pipelines for database testing requires careful architecture and automation.

## The Problem

Traditional database testing was slow, expensive, and difficult to scale across different environments.

## The Solution

We built a fully virtualized platform using:
- **Docker** for containerization
- **Jenkins** for CI/CD automation
- **Multi-platform support** for heterogeneous environments

## Results

- 40%+ improvement in validation throughput
- Reduced feedback loops
- Accelerated release cycles
- Multi-platform support

## Technical Deep Dive

The platform uses container orchestration to spin up test databases on-demand, reducing infrastructure costs and improving developer productivity.

Stay tuned for more details on the implementation!`,
    author: "Carlos Villena",
    date: "2025-01-05",
    category: "DevOps",
    tags: ["Docker", "Jenkins", "CI/CD", "Testing", "Automation"],
    readTime: "7 min read",
    featured: false
  },
  {
    id: 4,
    title: "Tu Título Aquí",
    excerpt: "Un resumen corto y atractivo de tu post que aparecerá en la tarjeta del blog.",
    content: `# Tu Título Aquí

Este es el contenido completo de tu post. Puedes usar markdown básico:

## Subtítulos

Puedes usar **negritas** y crear listas:

- Punto 1
- Punto 2
- Punto 3

### Subsecciones

Más contenido aquí...`,
    author: "Carlos Villena",
    date: "2025-01-20", // Formato: YYYY-MM-DD
    category: "AI/ML", // Debe coincidir con una categoría de la lista
    tags: ["Tag1", "Tag2", "Tag3"],
    readTime: "5 min read", // Tiempo estimado de lectura
    featured: false // true para destacar el post
  }
]

// Categorías disponibles
export const categories = [
  "All",
  "AI/ML",
  "DevOps",
  "Backend",
  "Frontend",
  "Architecture"
]

