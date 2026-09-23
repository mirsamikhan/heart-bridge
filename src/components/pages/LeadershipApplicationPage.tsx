import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const YEAR_OPTIONS = [
  '9th Grade',
  '10th Grade',
  '11th Grade',
  '12th Grade',
  'College Freshman',
  'College Sophomore',
  'College Junior',
  'College Senior',
  'Graduate Student',
  'Other',
];

export default function LeadershipApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    year: '',
    whyJoin: '',
    experience: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — backend not yet connected
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: '', email: '', phone: '', year: '', whyJoin: '', experience: '' });
    }, 6000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleYearChange = (value: string) => {
    setFormData({ ...formData, year: value });
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
              Leadership Application
            </h1>
            <p className="font-paragraph text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
              Interested in taking on an officer or leadership role with DilSe?
              Fill out the application below and we'll be in touch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl text-primary text-center mb-16"
          >
            What We Look For
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Passion for Health Equity',
                body: 'A genuine commitment to improving cardiovascular health outcomes in South Asian communities across DFW.',
              },
              {
                title: 'Initiative & Reliability',
                body: 'Leadership at DilSe means showing up consistently, taking ownership of responsibilities, and supporting your team.',
              },
              {
                title: 'Collaborative Spirit',
                body: 'We work closely with physicians, volunteers, and community partners — strong interpersonal and communication skills matter.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-secondary rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl md:text-2xl text-secondary-foreground mb-4">
                  {item.title}
                </h3>
                <p className="font-paragraph text-base text-foreground">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="w-full py-20 md:py-28 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-secondary-foreground mb-4 text-center">
              Apply Now
            </h2>
            <p className="font-paragraph text-base text-foreground text-center mb-10">
              All fields marked with * are required.
            </p>

            <div className="bg-background rounded-3xl p-8 md:p-12">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-3xl text-foreground mb-4">
                    Application Received!
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Thank you for applying to a DilSe leadership position. Our team will
                    review your application and reach out within 1–2 weeks.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="fullName"
                        className="font-paragraph text-base text-foreground mb-2 block"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full bg-background border-2 border-secondary focus:border-primary font-paragraph"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="font-paragraph text-base text-foreground mb-2 block"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className="w-full bg-background border-2 border-secondary focus:border-primary font-paragraph"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone + Year/Grade */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="phone"
                        className="font-paragraph text-base text-foreground mb-2 block"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full bg-background border-2 border-secondary focus:border-primary font-paragraph"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="year"
                        className="font-paragraph text-base text-foreground mb-2 block"
                      >
                        Year / Grade *
                      </Label>
                      <Select onValueChange={handleYearChange} value={formData.year} required>
                        <SelectTrigger
                          id="year"
                          className="w-full bg-background border-2 border-secondary focus:border-primary font-paragraph text-foreground"
                        >
                          <SelectValue placeholder="Select your year" />
                        </SelectTrigger>
                        <SelectContent>
                          {YEAR_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt} className="font-paragraph">
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Why Join */}
                  <div>
                    <Label
                      htmlFor="whyJoin"
                      className="font-paragraph text-base text-foreground mb-2 block"
                    >
                      Why do you want to join DilSe leadership? *
                    </Label>
                    <Textarea
                      id="whyJoin"
                      name="whyJoin"
                      required
                      value={formData.whyJoin}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your motivation and what you hope to contribute…"
                      className="w-full bg-background border-2 border-secondary focus:border-primary font-paragraph resize-none"
                    />
                  </div>

                  {/* Relevant Experience */}
                  <div>
                    <Label
                      htmlFor="experience"
                      className="font-paragraph text-base text-foreground mb-2 block"
                    >
                      Relevant Experience
                    </Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows={5}
                      placeholder="List any leadership roles, volunteer work, health-related experience, or other background that would be relevant…"
                      className="w-full bg-background border-2 border-secondary focus:border-primary font-paragraph resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base py-6 h-auto rounded-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </Button>

                  <p className="font-paragraph text-sm text-foreground text-center opacity-75">
                    Submissions are currently reviewed manually. You'll hear back within 1–2 weeks.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
