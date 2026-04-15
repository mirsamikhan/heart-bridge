// HPI 1.7-V
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  BookOpen, 
  MapPin, 
  Activity, 
  Stethoscope, 
  Calendar, 
  ArrowRight, 
  CheckCircle2,
  ClipboardList,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Slideshow images
const HERO_SLIDESHOW_IMAGES = [
  {
    src: "https://static.wixstatic.com/media/b1d366_0daff48ec47e414098e41b116cfffeba~mv2.jpeg",
    alt: "Community health screening event",
    originWidth: 4032,
    originHeight: 3024,
    focalPointX: 51.17807539682539,
    focalPointY: 18.248456790123456
  },
  {
    src: "https://static.wixstatic.com/media/b1d366_0daff48ec47e414098e41b116cfffeba~mv2.jpeg",
    alt: "Healthcare volunteers in action",
    originWidth: 4032,
    originHeight: 3024,
    focalPointX: 51.17807539682539,
    focalPointY: 18.248456790123456
  },
  {
    src: "https://static.wixstatic.com/media/b1d366_0daff48ec47e414098e41b116cfffeba~mv2.jpeg",
    alt: "Community members receiving care",
    originWidth: 4032,
    originHeight: 3024,
    focalPointX: 51.17807539682539,
    focalPointY: 18.248456790123456
  }
];
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Canonical Data Sources ---
// Preserving and structuring the static content from the original file and brief.



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
    description: "Serve at weekly 2-hour community health sites across DFW.",
    responsibilities: [
      "Engage community members",
      "Conduct blood pressure screenings",
      "Identify high-risk participants",
      "Enroll individuals into longitudinal follow-up",
      "Collect data supporting public health research"
    ]
  },
  {
    title: "Community Health Coach",
    type: "Remote",
    icon: <ClipboardList className="w-6 h-6" />,
    description: "Serve as a designated health coach for community members.",
    responsibilities: [
      "Conduct weekly follow-up calls",
      "Support care navigation",
      "Promote healthy lifestyle practices",
      "Document participant progress",
      "Contribute to longitudinal research"
    ]
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
  {
    src: "https://static.wixstatic.com/media/b1d366_8435298bc689479fa8c1154b30627529~mv2.png?originWidth=960&originHeight=1152",
    alt: "Community health screening"
  },
  {
    src: "https://static.wixstatic.com/media/b1d366_fce7820249184fd78f57915b0fe6d58d~mv2.png?originWidth=960&originHeight=1152",
    alt: "Health education session"
  },
  {
    src: "https://static.wixstatic.com/media/b1d366_94eb3812ad764c7fbab6d9c4d507b56e~mv2.png?originWidth=960&originHeight=1152",
    alt: "Volunteer support"
  },
  {
    src: "https://static.wixstatic.com/media/b1d366_df3ec4b37f234c5b8febe020dd18fc64~mv2.png?originWidth=960&originHeight=1152",
    alt: "Community gathering"
  }
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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Auto-advance slideshow
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);
    setAutoPlay(false);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background font-paragraph overflow-clip selection:bg-primary selection:text-white">
      <Header />
      {/* --- HERO SECTION --- */}
      {/* Design: Full bleed, deep medical blue, academic authority. */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center bg-primary overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] z-20 shadow-xl">
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
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center pt-20">
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block py-2 px-4 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
                UT SOUTHWESTERN COLLABORATION
              </span>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6">
                DilSe: <br/>
                <span className="text-secondary">South Asian Heart & Brain Program</span>
              </h1>
              <p className="text-lg md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Addressing the elevated cardiovascular risk among South Asians through early screening, education, and longitudinal support.
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
                className="bg-white text-primary hover:bg-secondary hover:text-primary-foreground font-bold text-lg px-10 py-7 h-auto rounded-full shadow-lg transition-all duration-300"
              >
                <Link to="/get-screened">Get Screened</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-10 py-7 h-auto rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <Link to="/volunteer">Volunteer With Us</Link>
              </Button>
            </motion.div>
          </div>

          {/* Hero Image / Visual */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative z-10"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/10">
                <Image
                  src="https://static.wixstatic.com/media/b1d366_0daff48ec47e414098e41b116cfffeba~mv2.jpeg"
                  className="w-full h-full object-cover"
                  originWidth={4032}
                  originHeight={3024}
                  focalPointX={48.64457831325305}
                  focalPointY={9.63855421686747} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent mix-blend-multiply"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 right-8 backdrop-blur-md rounded-2xl shadow-lg border-0 border-solid border-gray-200 bg-[#FFFFFFF2] p-[15px]">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Heart className="w-6 h-6 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="text-primary font-bold text-lg">Preventative Care</p>
                      <p className="text-sm text-foreground/70">Culturally tailored approach</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* --- PHOTO SLIDESHOW SECTION --- */}
      {/* Design: Full-width immersive slideshow with navigation controls */}
      <section className="w-full bg-secondary py-20 md:py-24 relative z-10">
        <div className="max-w-[100rem] mx-auto px-6">
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
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-inner border-4 border-white/50 group-hover:scale-105 transition-transform duration-500">
                  <span className="font-heading text-4xl md:text-5xl font-bold text-primary">{stat.value}</span>
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
      <section className="w-full py-24 md:py-32 bg-background relative z-10 -mt-12 pt-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl md:text-6xl text-primary mb-6">
              Our Community in Action
            </h2>
            <p className="text-xl text-foreground/70">
              Discover the impact of DilSe through our community events and health initiatives.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {/* Slideshow Container */}
            <div className="relative w-full aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-foreground/5">
              {/* Images */}
              <div className="relative w-full h-full p-0 border border-solid border-black">
                {SLIDESHOW_IMAGES.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {SLIDESHOW_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setAutoPlay(false);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'bg-white w-8 h-2'
                        : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* --- KEY STATS SECTION --- */}
      {/* Design: Clean, high-contrast strip. Light blue background. */}
      {/* --- MISSION & ABOUT SECTION --- */}
      {/* Design: Split layout with sticky image. Academic yet approachable. */}
      <section className="w-full py-24 md:py-32 bg-background relative">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Sticky Image Side */}
            <div className="relative lg:sticky lg:top-32 h-fit order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image 
                    src="https://static.wixstatic.com/media/b1d366_f039a48bb0f3425dbaf73004c2c0ca41~mv2.png?originWidth=960&originHeight=704" 
                    alt="Community health outreach" 
                    className="w-full h-full object-cover"
                  />
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
                <h2 className="font-heading text-4xl md:text-6xl text-primary mb-8">
                  About DilSe
                </h2>
                <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                  The <strong className="text-primary">DilSe South Asian Heart & Brain Program</strong>, developed in collaboration with UT Southwestern physicians, works to address the elevated cardiovascular risk among South Asians through early screening and education.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Volunteers serve at weekly health sites to provide health education, conduct blood pressure screenings, offer follow-up support, and contribute to research projects.
                </p>
              </motion.div>

              <div className="space-y-6">
                <h3 className="font-heading text-2xl text-secondary-foreground border-b border-secondary pb-2 inline-block">
                  Our Core Objectives
                </h3>
                <ul className="space-y-4">
                  {[
                    "Provide cardiovascular health education",
                    "Conduct blood pressure screenings",
                    "Identify individuals at increased cardiovascular risk",
                    "Enroll participants into longitudinal follow-up support",
                    "Contribute to public health research"
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- VOLUNTEER OPPORTUNITIES (Flyer Replica) --- */}
      {/* Design: Dark blue background, white text, split columns. Matches the "Positions Available" section. */}
      <section className="w-full py-24 bg-accent-darker-blue text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5">
           <div className="w-full h-full bg-[linear-gradient(45deg,#ffffff_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="max-w-[100rem] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="bg-white text-accent-darker-blue px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase mb-4 inline-block">
              Join Our Team
            </span>
            <h2 className="font-heading text-4xl md:text-6xl mb-6">Positions Available</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Meaningful service opportunities for students and community members interested in public health, medicine, and research.
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
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 transition-colors duration-300"
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

                <ul className="space-y-3 mb-10">
                  {position.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-3 text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0"></div>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  asChild 
                  className="w-full bg-white text-accent-darker-blue hover:bg-secondary font-bold text-lg py-6 rounded-xl"
                >
                  <a href="https://forms.gle/JXHtZA6EsWVceng5A" target="_blank" rel="noopener noreferrer">Apply Now</a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- PHOTO SLIDESHOW SECTION --- */}
      {/* Design: Full-width immersive slideshow with navigation controls */}
      <section className="w-full py-24 md:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-4xl md:text-6xl text-primary mb-6">
              Our Community in Action
            </h2>
            <p className="text-xl text-foreground/70">
              Discover the impact of DilSe through our community events and health initiatives.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {/* Slideshow Container */}
            <div className="relative w-full aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-foreground/5">
              {/* Images */}
              <div className="relative w-full h-full">
                {SLIDESHOW_IMAGES.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {SLIDESHOW_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setAutoPlay(false);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? 'bg-white w-8 h-2'
                        : 'bg-white/50 hover:bg-white/75 w-2 h-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* --- SERVICES & PATHWAYS --- */}
      {/* Design: Light, airy, card-based grid. */}
      <section className="w-full py-24 md:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading text-4xl md:text-6xl text-primary mb-6">
              How We Serve the Community
            </h2>
            <p className="text-xl text-foreground/70">
              Comprehensive support designed to be accessible, culturally relevant, and effective.
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
                className="group bg-secondary/30 hover:bg-secondary/50 rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
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
      {/* --- CTA SECTION --- */}
      {/* Design: Full width image background with overlay. Emotional connection. */}
      <section className="w-full py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://static.wixstatic.com/media/b1d366_f391fa9599d240648b20b6879766f834~mv2.png?originWidth=1152&originHeight=768" 
            alt="Community gathering" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
        </div>

        <div className="max-w-[100rem] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] p-12 md:p-20"
          >
            <h2 className="font-heading text-4xl md:text-6xl text-white mb-8">
              Take Control of Your Heart Health
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
              Whether you're seeking screening for yourself or looking to make a difference as a volunteer, DilSe welcomes you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-primary hover:bg-secondary font-bold text-lg px-12 py-8 h-auto rounded-full shadow-xl"
              >
                <Link to="/health-sites">Find a Health Site</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-12 py-8 h-auto rounded-full"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}