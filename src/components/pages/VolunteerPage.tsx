import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Phone, Award, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { VolunteerPositions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VolunteerPage() {
  const [positions, setPositions] = useState<VolunteerPositions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPositions();
  }, []);

  const loadPositions = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<VolunteerPositions>('volunteerpositions');
      setPositions(result.items);
    } catch (error) {
      console.error('Error loading volunteer positions:', error);
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
              Volunteer & Research Opportunities
            </h1>
            <p className="font-paragraph text-lg md:text-xl opacity-95">
              Join our team of dedicated volunteers making a difference in South Asian cardiovascular health
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-16"
          >
            Why Volunteer with DilSe
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Community Impact
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Directly serve South Asian communities and help prevent cardiovascular disease
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-secondary rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Training Provided
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Comprehensive training in screening protocols and health education
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-secondary rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Service Hours
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Eligible for service hours and research experience for students
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-secondary rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Flexible Options
              </h3>
              <p className="font-paragraph text-base text-foreground">
                In-person and remote volunteer opportunities available
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Positions Available */}
      <section className="w-full py-20 md:py-28 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-16"
          >
            Positions Available
          </motion.h2>

          <div className="min-h-[400px]">
            {isLoading ? null : positions.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                {positions.map((position, index) => (
                  <motion.div
                    key={position._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-secondary rounded-3xl p-8 md:p-10"
                  >
                    <div className="mb-6">
                      <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-3">
                        {position.positionTitle}
                      </h3>
                      {position.locationType && (
                        <span className="inline-block bg-primary text-primary-foreground font-paragraph text-sm px-4 py-2 rounded-full">
                          {position.locationType}
                        </span>
                      )}
                    </div>

                    {position.roleDescription && (
                      <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed">
                        {position.roleDescription}
                      </p>
                    )}

                    {position.responsibilities && (
                      <div className="mb-6">
                        <h4 className="font-heading text-lg text-secondary-foreground mb-3">
                          Responsibilities
                        </h4>
                        <div className="space-y-2">
                          {position.responsibilities.split('\n').map((resp, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <p className="font-paragraph text-base text-foreground">
                                {resp.trim()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {position.requirements && (
                      <div className="mb-6">
                        <h4 className="font-heading text-lg text-secondary-foreground mb-3">
                          Requirements
                        </h4>
                        <p className="font-paragraph text-base text-foreground">
                          {position.requirements}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 mb-6">
                      {position.trainingProvided && (
                        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-sm text-foreground">
                            Training Provided
                          </span>
                        </div>
                      )}
                      {position.serviceHoursEligibility && (
                        <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-sm text-foreground">
                            Service Hours Eligible
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-secondary rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
              >
                <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-6">
                  Screening & Outreach Volunteer (In-Person)
                </h3>
                <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed">
                  Serve at weekly 2-hour community health sites across DFW. Engage community members, conduct blood pressure screenings, identify high-risk participants, enroll individuals into longitudinal follow-up, and collect data supporting public health research.
                </p>
                
                <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-6 mt-10">
                  Community Health Coach (Remote)
                </h3>
                <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed">
                  Serve as a designated health coach for community members. Conduct weekly follow-up calls, support care navigation and healthy lifestyle practices, and document participant progress for longitudinal research.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                  <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="font-paragraph text-sm text-foreground">
                      Training Provided
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="font-paragraph text-sm text-foreground">
                      Service Hours Eligible
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="font-paragraph text-sm text-foreground">
                      Research Experience
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="w-full py-20 md:py-28 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-secondary-foreground mb-8 text-center">
              Important Information for Volunteers
            </h2>
            <div className="space-y-4">
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                <strong>Training is provided:</strong> All volunteers receive comprehensive training in screening protocols, health education, and data collection before serving at community sites.
              </p>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                <strong>Clear scope of practice:</strong> Volunteers provide education and support but do not provide medical advice. All protocols are developed in collaboration with UT Southwestern physicians.
              </p>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                <strong>Service and research hours:</strong> Volunteer work with DilSe is eligible for service hours and can provide valuable public health research experience for students.
              </p>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                <strong>Flexible commitment:</strong> We offer both in-person and remote volunteer opportunities to accommodate different schedules and preferences.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apply for Leadership Section */}
      <section className="w-full py-20 md:py-28 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-secondary rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl text-secondary-foreground mb-4">
              Apply for Leadership
            </h2>
            <p className="font-paragraph text-base md:text-lg text-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Interested in taking on an officer or leadership role with DilSe? Help guide our mission, coordinate community health sites, and lead public health initiatives across DFW.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base px-8 py-6 h-auto rounded-lg"
            >
              <Link to="/leadership-application">Apply for Leadership</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-heading text-3xl md:text-5xl mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="font-paragraph text-base md:text-lg mb-10 opacity-95">
              Join our team of volunteers and help improve cardiovascular health in South Asian communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-paragraph text-base px-8 py-6 h-auto rounded-lg"
                onClick={() => window.open('https://forms.gle/JXHtZA6EsWVceng5A', '_blank')}
              >
                Apply to Volunteer
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-paragraph text-base px-8 py-6 h-auto rounded-lg bg-transparent"
              >
                <Link to="/leadership-application">Apply for Leadership</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
