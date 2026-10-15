// HPI 1.7-V
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  MapPin, 
  Activity, 
  Stethoscope, 
  ArrowRight, 
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const STATS_DATA = [
  { 
    value: "4×", 
    label: "Higher Risk", 
    description: "South Asians face a 4× higher risk of heart disease compared to the general population." 
  },
  { 
    value: "<50", 
    label: "Early Onset", 
    description: "Significantly higher likelihood of experiencing heart attacks before the age of 50." 
  }
];

const VOLUNTEER_POSITIONS = [
  {
    title: "Screening & Outreach Volunteer",
    type: "In-Person",
    icon: <Stethoscope className="w-6 h-6" />,
    description: "Help run community events, welcome participants, and support the screening team across DFW.",

  },
  {
    title: "Community Health Coach",
    type: "Remote",
    icon: <ClipboardList className="w-6 h-6" />,
    description: "Stay connected with participants through follow-up calls, healthy lifestyle support, and care navigation.",

  }
];

const SERVICE_AREAS = [
  {
    title: "Free Screenings",
    icon: <Activity className="w-8 h-8" />,
    description: "Walk-up blood pressure screenings and cardiovascular risk assessments at community sites."
  },
  {
    title: "Education",
    icon: <BookOpen className="w-8 h-8" />,
    description: "Culturally tailored heart health education and prevention resources."
  },
  {
    title: "Follow-Up Support",
    icon: <Users className="w-8 h-8" />,
    description: "Longitudinal support through community health coaches and care navigation."
  },
  {
    title: "Weekly Sites",
    icon: <MapPin className="w-8 h-8" />,
    description: "Convenient community health sites across the Dallas–Fort Worth area."
  }
];

const SLIDESHOW_IMAGES = [
  { src: '/homepage/community-1.jpg', alt: 'DilSe volunteers at a community screening table' },
  { src: '/homepage/community-2.jpg', alt: 'A volunteer checks a participant’s blood pressure indoors' },
  { src: '/homepage/community-3.jpg', alt: 'Volunteers support a blood pressure screening at an outdoor event' },
  { src: '/homepage/community-4.jpg', alt: 'DilSe outreach table outside a community building' },
  { src: '/homepage/community-5.jpg', alt: 'Community members practice CPR with training mannequins' },
  { src: '/homepage/community-6.jpg', alt: 'A volunteer prepares a blood pressure cuff for a participant' },
  { src: '/homepage/community-7.jpg', alt: 'DilSe volunteers and community members at an outdoor health screening table' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Auto-advance slideshow
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background font-paragraph overflow-clip selection:bg-primary selection:text-white">
      <Header />
      {/* --- HERO SECTION --- */}
      {/* Design: Full bleed, deep medical blue, academic authority. */}
      <section className="relative w-full py-16 md:py-20 flex items-center justify-center bg-primary overflow-hidden z-20">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#ffffff_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
        
        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: yParallax }}
          className="absolute top-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          style={{ y: yBackground }}
          className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white leading-[1.1] mb-6">
                DilSe <br/>
                <span className="text-secondary">South Asian Heart & Brain Program</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Free heart health screenings, practical education, and ongoing support for South Asian communities across Dallas–Fort Worth.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <Button 
                asChild 
                size="lg"
                className="bg-white text-primary hover:bg-secondary hover:text-primary-foreground font-bold text-lg px-7 py-4 h-auto rounded-xl shadow-lg transition-all duration-300"
              >
                <Link to="/get-screened">Get Screened</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-7 py-4 h-auto rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <a
                  href="https://docs.google.com/document/d/15k3qHwJq52_CoqrVDYF_62e0dLcSGColjzrvMeNvbvk/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Volunteer With Us
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Homepage community slideshow */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label="DilSe community photos"
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5"
            >
              {SLIDESHOW_IMAGES.map((image, index) => (
                <motion.img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  aria-hidden={index !== currentSlide}
                  initial={false}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <button type="button" onClick={prevSlide} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 hover:bg-black/65 text-white p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button type="button" onClick={nextSlide} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 hover:bg-black/65 text-white p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
                {SLIDESHOW_IMAGES.map((image, index) => (
                  <button key={image.src} type="button" onClick={() => setCurrentSlide(index)} aria-label={`Show photo ${index + 1}`} aria-current={index === currentSlide ? 'true' : undefined} className="p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded-full">
                    <span className={`block h-2 rounded-full ${index === currentSlide ? 'bg-white w-6' : 'bg-white/60 w-2'}`} />
                  </button>
                ))}
                <button type="button" onClick={() => setAutoPlay(previous => !previous)} aria-label={autoPlay ? 'Pause slideshow' : 'Play slideshow'} className="ml-2 p-2 rounded-full bg-black/45 hover:bg-black/65 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary py-10 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {STATS_DATA.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 group"
              >
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-inner border-4 border-white/50 group-hover:scale-105 transition-transform duration-500">
                  <span className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</span>
                </div>
                <div>
                  <h3 className="font-heading text-3xl text-secondary-foreground mb-2">{stat.label}</h3>
                  <p className="text-lg text-foreground/80 leading-relaxed max-w-md">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- KEY STATS SECTION --- */}
      {/* Design: Clean, high-contrast strip. Light blue background. */}
      {/* --- MISSION & ABOUT SECTION --- */}
      {/* Design: Split layout with sticky image. Academic yet approachable. */}
      <section className="w-full py-16 md:py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Sticky Image Side */}
            <div className="relative h-fit order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://static.wixstatic.com/media/b1d366_e91e364c82b241af855eab6d1f9d18c3~mv2.png"
                    className="w-full h-full object-cover"
                    originWidth={2262}
                    originHeight={1302}
                    focalPointX={47.45762711864407}
                    focalPointY={47.05537764586423} />
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary rounded-full -z-10 opacity-50"></div>
                <div className="absolute -top-10 -left-10 w-24 h-24 border-4 border-primary rounded-full -z-10 opacity-20"></div>
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8">
                  About DilSe
                </h2>
                <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                  Developed in collaboration with UT Southwestern physicians, DilSe brings culturally tailored prevention into the places our community already gathers.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Our volunteers connect community members with approachable support and contribute to public health research.
                </p>
              </motion.div>

              <div className="flex flex-wrap items-center gap-6">
                <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
                  Meet DilSe <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Button asChild className="font-semibold px-6 py-3 h-auto rounded-xl">
                  <Link to="/donate">Support DilSe</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Community video */}
      <section aria-labelledby="community-video-heading" className="w-full py-12 md:py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 id="community-video-heading" className="font-heading text-3xl md:text-4xl text-primary">
              Our Community in Action
            </h2>
          </div>
          <video
            className="block w-full max-w-3xl mx-auto h-auto rounded-2xl shadow-xl bg-black"
            controls
            muted
            autoPlay
            playsInline
            preload="metadata"
            poster="/videos/community-in-action-poster.jpg"
            aria-label="Silent video of the TANTEX 5K Run in Frisco"
          >
            <source src="/videos/community-in-action.mp4" type="video/mp4" />
            Your browser does not support embedded video.{' '}
            <a href="/videos/community-in-action.mp4">Watch the community video</a>.
          </video>
        </div>
      </section>
      <section className="w-full py-16 md:py-20 bg-secondary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-heading text-3xl md:text-4xl mb-6 text-primary-foreground">
              How We Serve the Community
            </h2>
            <p className="text-xl text-secondary">
              Support at every step, from your first screening to your next steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_AREAS.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl p-6 md:p-8 bg-primary-foreground"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 bg-secondary">
                  <div className="text-primary">
                    {service.icon}
                  </div>
                </div>
                <h3 className="font-heading text-2xl text-primary mb-3">{service.title}</h3>
                <p className="text-foreground/80 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- VOLUNTEER OPPORTUNITIES (Flyer Replica) --- */}
      {/* Design: Dark blue background, white text, split columns. Matches the "Make a difference with DilSe" section. */}
      <section className="w-full py-16 md:py-20 bg-accent-darker-blue text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5">
           <div className="w-full h-full bg-[linear-gradient(45deg,#ffffff_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="bg-white text-accent-darker-blue px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase mb-4 inline-block">
              Join Our Team
            </span>
            <h2 className="font-heading text-3xl md:text-4xl mb-6">Make a difference with DilSe</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Bring your time and skills to a team working toward a healthier community.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {VOLUNTEER_POSITIONS.map((position, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="bg-secondary/20 p-4 rounded-2xl">
                    {position.icon}
                  </div>
                  <span className="px-4 py-1 rounded-full border border-white/30 text-sm font-medium">
                    {position.type}
                  </span>
                </div>
                
                <h3 className="font-heading text-3xl mb-4">{position.title}</h3>
                <p className="text-lg text-white/90 mb-8 font-medium">
                  {position.description}
                </p>


              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <Button asChild className="bg-white text-accent-darker-blue hover:bg-secondary font-semibold px-7 py-4 h-auto rounded-xl">
              <a href="https://docs.google.com/document/d/15k3qHwJq52_CoqrVDYF_62e0dLcSGColjzrvMeNvbvk/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Apply to Volunteer</a>
            </Button>
            <Link to="/volunteer" className="inline-flex items-center gap-2 font-semibold text-white hover:underline underline-offset-4">Explore volunteer roles <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      {/* --- SERVICES & PATHWAYS --- */}
      {/* Design: Light, airy, card-based grid. */}
      {/* Partner logos */}
      <section className="w-full py-12 md:py-16 bg-background" aria-labelledby="partners-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="partners-heading" className="font-heading text-3xl md:text-4xl text-primary text-center mb-8">
            Our Partners
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="w-[calc((100%_-_1rem)/2)] md:w-[calc((100%_-_4.5rem)/4)] h-28 md:h-32 bg-white border border-secondary rounded-2xl flex items-center justify-center p-4">
              <img
                src="/partners/dallas-pediatrics-id-associates.jpg"
                alt="Dallas Pediatrics &amp; ID Associates"
                className="w-full h-full object-contain"
                width={1705}
                height={346}
                loading="lazy"
              />
            </div>
            {[2, 3, 4].map(partner => (
              <div
                key={partner}
                aria-label={`Partner logo placeholder ${partner}`}
                className="w-[calc((100%_-_1rem)/2)] md:w-[calc((100%_-_4.5rem)/4)] h-28 md:h-32 bg-secondary/30 border border-secondary rounded-2xl flex flex-col items-center justify-center gap-2 px-4 text-center"
              >
                <span className="font-heading text-xl text-primary">Partner Logo</span>
                <span className="font-paragraph text-sm text-foreground/60">Coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-14 md:py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-3">Have a question?</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">Our team can help you plan a visit or learn more about getting involved.</p>
          </div>
          <Button asChild size="lg" className="font-semibold px-7 py-4 h-auto rounded-xl">
            <Link to="/contact">Contact Us <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
