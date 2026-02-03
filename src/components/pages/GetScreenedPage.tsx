import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ClipboardCheck, Heart, Shield, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GetScreenedPage() {
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
              Get Screened
            </h1>
            <p className="font-paragraph text-lg md:text-xl opacity-95">
              Free cardiovascular health screenings at community sites across DFW
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-16"
          >
            What to Expect at a DilSe Site
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary rounded-2xl p-8"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Quick & Easy
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Screenings take just 10-15 minutes. Walk-up friendly—no appointment needed.
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
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Blood Pressure Check
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Free blood pressure screening conducted by trained volunteers.
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
                <ClipboardCheck className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Risk Assessment
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Brief cardiovascular risk screening to identify potential concerns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Screening Details */}
      <section className="w-full py-20 md:py-28 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8 text-center">
              What's Included
            </h2>
            <div className="bg-secondary rounded-3xl p-8 md:p-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Blood Pressure Measurement
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Accurate blood pressure reading using calibrated equipment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Cardiovascular Risk Screening
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Brief questionnaire to assess your heart health risk factors
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Health Education
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Culturally tailored information about heart health and prevention
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Follow-Up Support (Optional)
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      If you're at increased risk, you can enroll in our community health coach program for ongoing support
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Educational Resources
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Take-home materials about heart health, nutrition, and lifestyle
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy & Consent */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-secondary rounded-3xl p-8 md:p-12 border-l-4 border-primary">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="w-12 h-12 text-primary flex-shrink-0" />
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-4">
                    Your Privacy & Consent
                  </h2>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  <strong>Participation is completely voluntary and free.</strong> You can choose to participate in screening, education, or follow-up support at any time.
                </p>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  <strong>Your information is protected.</strong> Any data collected is stored securely and may be used in de-identified form for public health research and quality improvement.
                </p>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  <strong>DilSe does not replace medical care.</strong> Our screenings are for educational and prevention purposes. If you have health concerns, please consult with a healthcare provider.
                </p>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  <strong>Volunteers do not provide medical advice.</strong> Our trained volunteers offer education and support but are not medical professionals.
                </p>
              </div>
            </div>
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
            <MapPin className="w-16 h-16 mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-5xl mb-6">
              Find a Health Site Near You
            </h2>
            <p className="font-paragraph text-base md:text-lg mb-10 opacity-95">
              DilSe operates weekly community health sites across the Dallas–Fort Worth area. Visit us for a free screening.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-paragraph text-base px-8 py-6 h-auto rounded-lg"
            >
              <Link to="/health-sites">View Health Sites</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
