import { motion } from 'framer-motion';
import { Heart, Users, Target, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
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
              About DilSe
            </h1>
            <p className="font-paragraph text-lg md:text-xl opacity-95">
              A community-first approach to cardiovascular health for South Asians
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="w-full py-6 md:py-8">
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
                Our Mission
              </h2>
              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed mb-6">
                DilSe South Asian Heart & Brain Program is a community-based public health initiative developed in collaboration with UT Southwestern physicians to address the elevated cardiovascular risk among South Asians.
              </p>
              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed">
                South Asians face a significantly higher risk of heart disease and are more likely to experience heart attacks at a younger age. DilSe works to reduce this risk through early screening, culturally tailored education, and structured follow-up support.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="w-full py-6 md:py-8 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-8 md:mb-10"
          >
            Leadership
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            <div className="bg-secondary rounded-3xl p-8 md:p-12 grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-8 md:gap-12 items-center text-center md:text-left">
              <img
                src="/officers/mir-sami-khan.jpg"
                alt="Mir Sami Khan"
                className="w-full max-w-sm mx-auto aspect-[3/4] object-cover rounded-2xl"
                loading="lazy"
              />
              <div>
                <h3 className="font-heading text-3xl md:text-4xl text-secondary-foreground mb-2">
                  Mir Sami Khan
                </h3>
                <p className="font-paragraph text-lg text-primary font-semibold mb-6">
                  Project Director
                </p>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  Mir Sami Khan leads the DilSe initiative, bringing vision and expertise to our mission of advancing cardiovascular health in South Asian communities across the Dallas–Fort Worth area.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="w-full md:w-[calc((100%_-_2rem)/2)] lg:w-[calc((100%_-_4rem)/3)] shrink-0 bg-secondary rounded-3xl p-8 md:p-12">
                <img
                  src="/officers/gobinathan-vaseegaran.jpg"
                  alt="Gobinathan Vaseegaran"
                  className="w-full aspect-[3/4] object-cover rounded-2xl mb-6"
                  loading="lazy"
                />
                <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-2">
                  Gobinathan Vaseegaran
                </h3>
                <p className="font-paragraph text-lg text-primary font-semibold">
                  Training Officer
                </p>
              </div>
              <div className="w-full md:w-[calc((100%_-_2rem)/2)] lg:w-[calc((100%_-_4rem)/3)] shrink-0 bg-secondary rounded-3xl p-8 md:p-12">
                <img
                  src="/officers/leah-harris.jpg"
                  alt="Leah Harris"
                  className="w-full aspect-[3/4] object-cover rounded-2xl mb-6"
                  loading="lazy"
                />
                <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-2">
                  Leah Harris
                </h3>
                <p className="font-paragraph text-lg text-primary font-semibold">
                  Education Officer
                </p>
              </div>
              <div className="w-full md:w-[calc((100%_-_2rem)/2)] lg:w-[calc((100%_-_4rem)/3)] shrink-0 bg-secondary rounded-3xl p-8 md:p-12">
                <img
                  src="/officers/asma-mohammed.jpg"
                  alt="Asma Mohammed"
                  className="w-full aspect-[3/4] object-cover rounded-2xl mb-6"
                  loading="lazy"
                />
                <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-2">
                  Asma Mohammed
                </h3>
                <p className="font-paragraph text-lg text-primary font-semibold">
                  Secretary
                </p>
              </div>
              <div className="w-full md:w-[calc((100%_-_2rem)/2)] lg:w-[calc((100%_-_4rem)/3)] shrink-0 bg-secondary rounded-3xl p-8 md:p-12">
                <img
                  src="/officers/samaira-srivastva.jpg"
                  alt="Samaira Srivastva"
                  className="w-full aspect-[3/4] object-cover rounded-2xl mb-6"
                  loading="lazy"
                />
                <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-2">
                  Samaira Srivastva
                </h3>
                <p className="font-paragraph text-lg text-primary font-semibold">
                  Administrative Officer
                </p>
              </div>
              <div className="w-full md:w-[calc((100%_-_2rem)/2)] lg:w-[calc((100%_-_4rem)/3)] shrink-0 bg-secondary rounded-3xl p-8 md:p-12">
                <img
                  src="/officers/ayesha-sharif.jpg"
                  alt="Ayesha Sharif"
                  className="w-full aspect-[3/4] object-cover rounded-2xl mb-6"
                  loading="lazy"
                />
                <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-2">
                  Ayesha Sharif
                </h3>
                <p className="font-paragraph text-lg text-primary font-semibold">
                  Scheduling Officer
                </p>
              </div>
            </div>
          </motion.div>
          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base px-8 py-6 h-auto rounded-lg"
            >
              <a
                href="https://docs.google.com/document/d/15k3qHwJq52_CoqrVDYF_62e0dLcSGColjzrvMeNvbvk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply for Leadership
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full py-6 md:py-8 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-8 md:mb-10"
          >
            What Drives Us
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Community-First
              </h3>
              <p className="font-paragraph text-base text-foreground">
                We bring health services directly to South Asian communities across DFW
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-secondary rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Prevention Focus
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Early detection and education to prevent cardiovascular disease before it starts
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-secondary rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Cultural Tailoring
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Education and resources designed specifically for South Asian lifestyles and diets
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-secondary rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Academic Rigor
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Developed with UT Southwestern physicians and contributing to public health research
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="w-full py-6 md:py-8">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8 text-center">
              UT Southwestern Collaboration
            </h2>
            <div className="bg-secondary rounded-3xl p-8 md:p-12">
              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed mb-6">
                DilSe was developed in collaboration with physicians from UT Southwestern Medical Center, one of the nation's premier academic medical institutions. This partnership ensures that our screening protocols, educational materials, and follow-up support are grounded in the latest cardiovascular research and clinical best practices.
              </p>
              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed">
                Our program contributes to ongoing public health research and quality improvement initiatives, helping to advance understanding of cardiovascular risk in South Asian populations while providing immediate benefit to our community members.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="w-full py-6 md:py-8 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-8 md:mb-10"
          >
            How We Work
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-secondary rounded-3xl p-8 md:p-12">
              <p className="font-paragraph text-base md:text-lg text-foreground leading-relaxed mb-8">
                Through weekly community health sites across the Dallas–Fort Worth area, trained volunteers:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-paragraph text-sm text-primary-foreground font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Provide Cardiovascular Health Education
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Share culturally relevant information about heart health, risk factors, and prevention strategies
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-paragraph text-sm text-primary-foreground font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Health Screenings for Cardiovascular Risk Factors
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Offer free, walk-up health screenings for cardiovascular risk factors and risk assessments
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-paragraph text-sm text-primary-foreground font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Identify Individuals at Increased Risk
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Help community members understand their cardiovascular risk profile
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-paragraph text-sm text-primary-foreground font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Enroll Participants into Follow-Up Support
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Connect high-risk individuals with community health coaches for ongoing support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-paragraph text-sm text-primary-foreground font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Contribute to Public Health Research
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Collect de-identified data to advance understanding of cardiovascular health in South Asian communities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Note */}
      <section className="w-full py-6 md:py-8">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-secondary rounded-3xl p-8 md:p-12 border-l-4 border-primary"
          >
            <h3 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-6">
              Important Information
            </h3>
            <div className="space-y-4">
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                <strong>DilSe is a public health and prevention program, not a clinical care provider.</strong> We provide education and screening support but do not replace medical care. Volunteers do not provide medical advice.
              </p>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Participation in DilSe is completely free and voluntary. All data collected may be used in de-identified form for public health research and quality improvement initiatives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
