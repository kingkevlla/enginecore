import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Smile, Paperclip, Clock } from "lucide-react";

const LiveChat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);

  const quickQuestions = [
    "What engines do you have for a 2015 Honda Civic?",
    "How much does shipping cost?",
    "What's your return policy?",
    "Can you help me check compatibility?",
    "I need help with installation"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-['Orbitron'] text-gradient mb-4">
              Live Chat Support
            </h1>
            <p className="text-muted-foreground text-lg">
              Get instant help from our automotive experts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="glass-card h-[600px] flex flex-col">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Live Support Chat
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <Badge variant="secondary">Online</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {!chatStarted ? (
                      <div className="text-center py-12">
                        <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                        <p className="text-muted-foreground mb-6">
                          Our support team is ready to help you find the perfect engine
                        </p>
                        <Button onClick={() => setChatStarted(true)}>
                          Start Chat
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Hello! I'm Sarah from A class Verified Engine. How can I help you today?</p>
                          <span className="text-xs text-muted-foreground">Support Agent • Just now</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Chat Input */}
                  {chatStarted && (
                    <div className="border-t border-white/10 p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="flex-1"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              // Handle send message
                              setMessage("");
                            }
                          }}
                        />
                        <Button size="icon" variant="ghost">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button size="icon">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Support Hours */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Monday - Friday</span>
                    <span className="text-sm">8AM - 8PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Saturday</span>
                    <span className="text-sm">9AM - 6PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sunday</span>
                    <span className="text-sm">10AM - 4PM EST</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400">Currently Online</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Questions */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full text-left h-auto p-2 justify-start text-sm"
                        onClick={() => {
                          setChatStarted(true);
                          setMessage(question);
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Alternatives */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Other Contact Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Phone Support</h4>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Support</h4>
                    <p className="text-sm text-muted-foreground">support@aclassverifiedengine.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Response Time</h4>
                    <p className="text-sm text-muted-foreground">Usually within 2 minutes</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveChat;