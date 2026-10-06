import { Link } from 'react-router-dom';
import { Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-sm">
                <img src="/logo.png" alt="DilSe Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold">DilSe</h3>
                <p className="font-paragraph text-sm opacity-90">
                  South Asian Heart & Brain Program
                </p>
              </div>
            </div>
            <p className="font-paragraph text-sm opacity-90 leading-relaxed">
              A community-based public health initiative developed in collaboration with UT Southwestern physicians.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link to="/get-screened" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Get Screened
              </Link>
              <Link to="/volunteer" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Volunteer Opportunities
              </Link>
              <Link to="/resources" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Educational Resources
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5" />
              <a 
                href="mailto:DilSeDFW@outlook.com" 
                className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
              >
                DilSeDFW@outlook.com
              </a>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5" />
              <a
                href="tel:+18664909361"
                className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity"
              >
                Text Us: (866) 490-9361
              </a>
            </div>
            <p className="font-paragraph text-sm opacity-90 leading-relaxed">
              For inquiries about volunteering, partnerships, or hosting a DilSe site.
            </p>
          </div>
        </div>

        {/* Trust & Disclaimer Section */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="space-y-4 mb-8">
            <p className="font-paragraph text-sm opacity-90 leading-relaxed">
              <strong>Important Information:</strong> DilSe provides education and screening support and does not replace medical care. Volunteers do not provide medical advice.
            </p>

          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="font-paragraph text-sm opacity-75">
              © {new Date().getFullYear()} DilSe South Asian Heart & Brain Program. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
