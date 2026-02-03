import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { HealthSites } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HealthSitesPage() {
  const [sites, setSites] = useState<HealthSites[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<HealthSites>('healthsites');
      const activeSites = result.items.filter(site => site.isActive);
      setSites(activeSites);
    } catch (error) {
      console.error('Error loading health sites:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
              Weekly Health Sites
            </h1>
            <p className="font-paragraph text-lg md:text-xl opacity-95">
              Find a DilSe community health site near you across the Dallas–Fort Worth area
            </p>
          </motion.div>
        </div>
      </section>

      {/* Health Sites List */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="min-h-[400px]">
            {isLoading ? null : sites.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                {sites.map((site, index) => (
                  <motion.div
                    key={site._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-secondary rounded-2xl p-8"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Building className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-2">
                          {site.locationName}
                        </h3>
                      </div>
                    </div>

                    {site.address && (
                      <div className="flex items-start gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <p className="font-paragraph text-base text-foreground">
                          {site.address}
                        </p>
                      </div>
                    )}

                    {site.operatingHours && (
                      <div className="flex items-start gap-3 mb-4">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        <p className="font-paragraph text-base text-foreground">
                          {site.operatingHours}
                        </p>
                      </div>
                    )}

                    {site.description && (
                      <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed">
                        {site.description}
                      </p>
                    )}

                    {site.mapLink && (
                      <a
                        href={site.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-paragraph text-base text-primary hover:text-primary/80 transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                        View on Map
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
                className="text-center py-16"
              >
                <Calendar className="w-16 h-16 text-secondary mx-auto mb-6" />
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Health Sites Coming Soon
                </h3>
                <p className="font-paragraph text-base text-foreground max-w-md mx-auto">
                  We're currently setting up community health sites across DFW. Check back soon for locations and times.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Host a Site CTA */}
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
              Host a DilSe Site
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground mb-10 leading-relaxed">
              Is your organization, temple, community center, or business interested in hosting a DilSe health site? We provide all the training, equipment, and volunteers needed to bring cardiovascular health screening to your community.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base px-8 py-6 h-auto rounded-lg"
            >
              <Link to="/contact">Contact Us to Host</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What Happens at a Site */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-16"
          >
            What Happens at Our Sites
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-heading text-2xl text-primary font-bold">1</span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4">
                Walk Up
              </h3>
              <p className="font-paragraph text-base text-foreground">
                No appointment needed. Just visit during operating hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-heading text-2xl text-primary font-bold">2</span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4">
                Get Screened
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Quick blood pressure check and cardiovascular risk assessment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-heading text-2xl text-primary font-bold">3</span>
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4">
                Learn & Connect
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Receive education and optional follow-up support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
