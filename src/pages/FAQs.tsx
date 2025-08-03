import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [faqSearch, setFaqSearch] = useState("");

  const faqCategories = [
    {
      category: "General",
      faqs: [
        {
          question: "What types of engines do you sell?",
          answer: "We specialize in both new and used automotive engines including 4-cylinder, V6, V8, V12, diesel, and motorcycle engines. We stock engines for most major manufacturers including Ford, Chevrolet, Toyota, Honda, BMW, Mercedes, and more."
        },
        {
          question: "Are your engines tested before sale?",
          answer: "Yes, all our engines undergo comprehensive testing including compression tests, leak-down tests, and computer diagnostics. We provide a detailed inspection report with every engine purchase."
        },
        {
          question: "Do you offer engine installation services?",
          answer: "While we don't perform installations directly, we have a network of certified mechanics and can recommend qualified installers in your area. We also provide detailed installation guides and technical support."
        }
      ]
    },
    {
      category: "Ordering & Shipping",
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days, express shipping takes 2-3 days, and overnight delivery is available. Freight shipping for heavy engines typically takes 7-14 business days."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to Canada and select international destinations. Contact us for shipping quotes and availability. International customers are responsible for customs duties and taxes."
        },
        {
          question: "How are engines packaged for shipping?",
          answer: "Engines are professionally packaged using custom crating, protective foam, and moisture barriers. Heavy engines are secured on pallets and shipped via freight carriers."
        }
      ]
    },
    {
      category: "Warranties & Returns",
      faqs: [
        {
          question: "What warranty do you offer on engines?",
          answer: "New engines come with manufacturer warranties ranging from 12-36 months. Used engines include our 90-day limited warranty covering major internal components. Extended warranties are available for purchase."
        },
        {
          question: "Can I return an engine if it doesn't fit?",
          answer: "Yes, we accept returns within 30 days of delivery if the engine is unused and in original condition. Return shipping costs may apply unless the error was on our part."
        },
        {
          question: "What if my engine arrives damaged?",
          answer: "Contact us immediately if your engine arrives damaged. We'll arrange for inspection, replacement, or refund at no cost to you. Take photos of the damage and packaging for our records."
        }
      ]
    },
    {
      category: "Technical Support",
      faqs: [
        {
          question: "How do I know if an engine is compatible with my vehicle?",
          answer: "Use our compatibility checker tool or contact our technical support team. We need your vehicle's year, make, model, and VIN number to ensure proper fitment."
        },
        {
          question: "Do you provide wiring harnesses and accessories?",
          answer: "Many of our engines include necessary accessories. We can also source wiring harnesses, ECU modules, and other components separately. Contact us for specific requirements."
        },
        {
          question: "Can you help with engine tuning and programming?",
          answer: "We provide basic programming information and can recommend certified tuning shops in your area. Some ECU programming may be required for proper engine operation."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, bank transfers, and financing through Affirm, Klarna, and Shop Pay. No additional fees for most payment methods."
        },
        {
          question: "Do you offer financing options?",
          answer: "Yes, we partner with multiple financing companies to offer flexible payment plans. Options include 0% interest for qualified buyers and extended payment terms up to 12 months."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees. All prices include basic preparation. Additional costs may include optional extended warranties, expedited shipping, or special handling requirements."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-['Orbitron'] text-gradient mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg">
              Find quick answers to the most common questions about our engines and services
            </p>
          </div>

          {/* Search FAQs */}
          <div className="relative mb-8">
            <Input
              placeholder="Search FAQs..."
              className="pl-10 h-12"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="glass-card">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    {category.category}
                  </h2>
                  
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pt-2 pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && faqSearch && (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Couldn't find any FAQs matching "{faqSearch}". Try different keywords or contact our support team.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">Still need help?</p>
                  <div className="flex justify-center gap-4">
                    <a href="/contact" className="text-primary hover:underline">Contact Support</a>
                    <a href="/live-chat" className="text-primary hover:underline">Live Chat</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact CTA */}
          <Card className="glass-card mt-12">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">Can't find what you're looking for?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help with any questions about engines, compatibility, or orders.
              </p>
              <div className="flex justify-center gap-4">
                <a 
                  href="/contact" 
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="/live-chat" 
                  className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Live Chat
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;