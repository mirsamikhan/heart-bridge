import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { EducationalResources } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResourcesPage() {
  const [resources, setResources] = useState<EducationalResources[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<EducationalResources>('educationalresources');
      setResources(result.items);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.topicCategory).filter(Boolean)))];
  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.topicCategory === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-heading text-4xl md:text-6xl mb-6">
              Educational Resources
            </h1>
            <p className="font-paragraph text-lg md:text-xl opacity-95">
              Culturally tailored heart health education and prevention resources for South Asian communities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-secondary rounded-3xl p-8 md:p-12">
              <h2 className="font-heading text-3xl md:text-4xl text-secondary-foreground mb-6 text-center">
                Why Heart Health Matters for South Asians
              </h2>
              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed mb-6">
                South Asians face a significantly higher risk of heart disease compared to other populations. Research shows that South Asians are up to 4 times more likely to develop cardiovascular disease and experience heart attacks at younger ages—often before age 50.
              </p>
              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed">
                Understanding your risk factors and taking preventive action can make a significant difference. Our educational resources are designed specifically for South Asian lifestyles, diets, and cultural contexts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="w-full py-8 bg-background">
          <div className="max-w-[100rem] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-paragraph text-base px-6 py-3 rounded-full transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="min-h-[400px]">
            {isLoading ? null : filteredResources.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredResources.map((resource, index) => (
                  <motion.div
                    key={resource._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-secondary rounded-2xl p-8 flex flex-col"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-2">
                          {resource.resourceTitle}
                        </h3>
                        {resource.topicCategory && (
                          <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs px-3 py-1 rounded-full">
                            {resource.topicCategory}
                          </span>
                        )}
                      </div>
                    </div>

                    {resource.contentSummary && (
                      <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed flex-1">
                        {resource.contentSummary}
                      </p>
                    )}

                    {resource.downloadableFileUrl && (
                      <a
                        href={resource.downloadableFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download Resource
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {/* Default Educational Content */}
                <div className="bg-secondary rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-2">
                        Health Screenings for Cardiovascular Risk Factors
                      </h3>
                      <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs px-3 py-1 rounded-full">
                        Heart Health Basics
                      </span>
                    </div>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Learn what blood pressure numbers mean, why they matter, and how to maintain healthy levels through lifestyle changes tailored to South Asian diets and routines.
                  </p>
                </div>

                <div className="bg-secondary rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-2">
                        Heart-Healthy South Asian Cooking
                      </h3>
                      <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs px-3 py-1 rounded-full">
                        Nutrition & Diet
                      </span>
                    </div>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Discover how to prepare traditional South Asian dishes in heart-healthy ways, with tips for reducing sodium, choosing healthier oils, and balancing your meals.
                  </p>
                </div>

                <div className="bg-secondary rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-2">
                        Recognizing Heart Attack Warning Signs
                      </h3>
                      <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs px-3 py-1 rounded-full">
                        Emergency Awareness
                      </span>
                    </div>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Know the warning signs of a heart attack and what to do in an emergency. Early recognition and action can save lives.
                  </p>
                </div>

                <div className="bg-secondary rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-2">
                        Physical Activity for Heart Health
                      </h3>
                      <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs px-3 py-1 rounded-full">
                        Lifestyle & Exercise
                      </span>
                    </div>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Simple, practical ways to incorporate physical activity into your daily routine, even with a busy schedule.
                  </p>
                </div>

                <div className="bg-secondary rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-2">
                        Managing Stress & Mental Health
                      </h3>
                      <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs px-3 py-1 rounded-full">
                        Mental Wellness
                      </span>
                    </div>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Understand the connection between stress and heart health, with culturally relevant strategies for managing stress and supporting mental wellness.
                  </p>
                </div>

                <div className="bg-secondary rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-2">
                        Diabetes & Heart Disease Connection
                      </h3>
                      <span className="inline-block bg-primary text-primary-foreground font-paragraph text-xs px-3 py-1 rounded-full">
                        Risk Factors
                      </span>
                    </div>
                  </div>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Learn about the strong link between diabetes and cardiovascular disease, and how to manage both conditions effectively.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Support */}
      <section className="w-full py-20 md:py-28 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-secondary-foreground mb-6">
              Need More Information?
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground mb-10 leading-relaxed">
              Visit one of our community health sites to speak with trained volunteers, get screened, and receive personalized education and resources.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base px-8 py-6 h-auto rounded-lg"
            >
              <a href="/health-sites">Find a Health Site</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
