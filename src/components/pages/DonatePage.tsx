import { motion } from 'framer-motion';
import { Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DonatePage() {
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
              Support the DilSe Program
            </h1>
            <p className="font-paragraph text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
              Your generosity powers free cardiovascular screenings, community health education,
              and life-saving follow-up care for South Asians across the DFW Metroplex.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-16"
          >
            Why Your Donation Matters
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Free Screenings
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Every dollar goes toward providing no-cost blood pressure and cardiovascular
                screenings to community members who may not otherwise have access.
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
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Evidence-Based Care
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Donations fund the longitudinal research infrastructure developed with
                UT Southwestern physicians that drives early detection and prevention.
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
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                Community Reach
              </h3>
              <p className="font-paragraph text-base text-foreground">
                Your support expands our network of health sites and health coaches so that
                more South Asian families can benefit from culturally-informed care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
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
              Our Commitment to Transparency
            </h2>
            <div className="space-y-4">
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                <strong>100% community-directed:</strong> DilSe is a volunteer-driven program.
                Donations directly fund screening supplies, health-education materials, and the
                coordination infrastructure that keeps our sites running week after week.
              </p>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                <strong>Physician-supervised research:</strong> All protocols are developed in
                collaboration with UT Southwestern Medical Center faculty, ensuring that every
                dollar contributes to scientifically rigorous, culturally appropriate care.
              </p>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                <strong>Tax-deductible giving:</strong> DilSe is part of a registered nonprofit
                organization. All qualifying donations are tax-deductible to the extent permitted
                by law. You will receive a donation receipt upon completion of your gift.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donate CTA Section */}
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
              Give Today
            </h2>
            <p className="font-paragraph text-base md:text-lg mb-10 opacity-95">
              Every contribution — no matter the size — helps us reach more families and
              save more lives. Click below to make a secure donation through our giving portal.
            </p>
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-paragraph text-base px-8 py-6 h-auto rounded-lg"
              onClick={() => window.open('https://placeholder-donation-link.org', '_blank')}
            >
              Donate Now
            </Button>
            <p className="font-paragraph text-sm mt-6 opacity-75">
              You will be redirected to our secure third-party donation platform.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
