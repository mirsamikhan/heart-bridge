import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a backend
    // For now, we'll just show a success message
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              Contact Us
            </h1>
            <p className="font-paragraph text-lg md:text-xl opacity-95">
              Get in touch about volunteering, partnerships, or hosting a DilSe site
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8">
                Get in Touch
              </h2>
              
              <div className="bg-secondary rounded-2xl p-8 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                      Email Us
                    </h3>
                    <a 
                      href="mailto:DILSE@outlook.com"
                      className="font-paragraph text-base text-foreground hover:text-primary transition-colors"
                    >
                      DILSE@outlook.com
                    </a>
                  </div>
                </div>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  We typically respond within 1-2 business days. For urgent matters, please indicate this in your message subject line.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-3">
                    Volunteer Inquiries
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Interested in joining our team? Let us know about your availability, interests, and any relevant experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-foreground mb-3">
                    Partnership Opportunities
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Organizations interested in collaborating with DilSe can reach out to discuss partnership opportunities.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-foreground mb-3">
                    Host a DilSe Site
                  </h3>
                  <p className="font-paragraph text-base text-foreground leading-relaxed">
                    Temples, community centers, and organizations can host weekly health sites. We provide training, equipment, and volunteers.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-secondary rounded-2xl p-8">
                <h2 className="font-heading text-2xl md:text-3xl text-secondary-foreground mb-6">
                  Send Us a Message
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading text-2xl text-secondary-foreground mb-4">
                      Message Sent!
                    </h3>
                    <p className="font-paragraph text-base text-foreground">
                      Thank you for contacting DilSe. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="font-paragraph text-base text-foreground mb-2 block">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-background focus:border-primary font-paragraph"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-paragraph text-base text-foreground mb-2 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-background focus:border-primary font-paragraph"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="font-paragraph text-base text-foreground mb-2 block">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-background focus:border-primary font-paragraph"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="font-paragraph text-base text-foreground mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full bg-background border-2 border-background focus:border-primary font-paragraph resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base py-6 h-auto rounded-lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
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
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-background rounded-2xl p-6">
                <h3 className="font-heading text-xl text-foreground mb-3">
                  How do I volunteer with DilSe?
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  Send us an email at DILSE@outlook.com with your interest in volunteering. Include your availability, any relevant experience, and whether you're interested in in-person or remote opportunities. We'll respond with next steps and training information.
                </p>
              </div>

              <div className="bg-background rounded-2xl p-6">
                <h3 className="font-heading text-xl text-foreground mb-3">
                  Can my organization host a DilSe health site?
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  Yes! We partner with temples, community centers, and organizations across DFW. We provide all training, equipment, and volunteers. Contact us to discuss hosting requirements and scheduling.
                </p>
              </div>

              <div className="bg-background rounded-2xl p-6">
                <h3 className="font-heading text-xl text-foreground mb-3">
                  Is there a cost for screening or participation?
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  No. All DilSe services are completely free. Participation is voluntary, and there are no fees for screening, education, or follow-up support.
                </p>
              </div>

              <div className="bg-background rounded-2xl p-6">
                <h3 className="font-heading text-xl text-foreground mb-3">
                  How is my data used?
                </h3>
                <p className="font-paragraph text-base text-foreground leading-relaxed">
                  Data collected through DilSe may be used in de-identified form for public health research and quality improvement. Your privacy is protected, and participation is voluntary.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
