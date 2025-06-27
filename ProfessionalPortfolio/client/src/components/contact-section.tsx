import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Github, 
  Linkedin, 
  Phone, 
  Send,
  Loader2 
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ContactFormData, ContactFormResponse } from "@/lib/types";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData): Promise<ContactFormResponse> => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactLinks = [
    {
      label: "Email",
      value: "melvinsenthilkumar@gmail.com",
      href: "mailto:melvinsenthilkumar@gmail.com",
      icon: Mail,
      gradient: "from-red-500 to-pink-600"
    },
    {
      label: "GitHub",
      value: "@darkdragon27",
      href: "https://github.com/darkdragon27",
      icon: Github,
      gradient: "from-gray-700 to-gray-900"
    },
    {
      label: "LinkedIn",
      value: "S Melvin",
      href: "https://www.linkedin.com/in/s-melvin",
      icon: Linkedin,
      gradient: "from-blue-600 to-blue-800"
    },
    {
      label: "Phone",
      value: "+91 9363160503",
      href: "tel:+919363160503",
      icon: Phone,
      gradient: "from-green-500 to-emerald-600"
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50/80 via-slate-50/60 to-indigo-50/50 dark:from-slate-700/80 dark:via-slate-800/60 dark:to-slate-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Let's connect and discuss potential opportunities or collaborations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          {contactLinks.map((contact) => {
            const IconComponent = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group"
              >
                <Card className="bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${contact.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {contact.label}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-accent transition-colors duration-200">
                      {contact.value}
                    </p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white dark:bg-slate-800 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your Name"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Project Collaboration"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="mt-2"
                    required
                  />
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                  >
                    {contactMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2" size={16} />
                    )}
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
