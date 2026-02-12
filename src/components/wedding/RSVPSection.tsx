import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Send, MessageCircle, Check, X, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  message: string;
  attendance: "hadir" | "tidak" | "ragu";
  timestamp: number;
}

const STORAGE_KEY = "wedding_messages";

export const RSVPSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | "ragu">("hadir");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading messages:", e);
      }
    }
  }, []);

  // Save messages to localStorage
  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    setMessages(newMessages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast.error("Mohon isi nama dan ucapan Anda");
      return;
    }

    setIsSubmitting(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        attendance,
        timestamp: Date.now(),
      };

      const newMessages = [newMessage, ...messages];
      saveMessages(newMessages);

      // Reset form
      setName("");
      setMessage("");
      setAttendance("hadir");
      setIsSubmitting(false);

      toast.success("Terima kasih atas ucapan dan doanya! 💕");
    }, 500);
  };

  const getAttendanceLabel = (att: string) => {
    switch (att) {
      case "hadir":
        return { text: "Hadir", icon: <Check className="w-3 h-3" />, color: "text-green-600" };
      case "tidak":
        return { text: "Tidak Hadir", icon: <X className="w-3 h-3" />, color: "text-red-500" };
      case "ragu":
        return { text: "Masih Ragu", icon: <HelpCircle className="w-3 h-3" />, color: "text-yellow-600" };
      default:
        return { text: "", icon: null, color: "" };
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-script text-4xl md:text-5xl text-gradient mb-4">
            RSVP & Ucapan
          </h2>
          <div className="section-divider">
            <span className="text-xl text-rose-gold-light">❀</span>
          </div>
          <p className="font-serif text-muted-foreground">
            Kirimkan ucapan dan doa restu untuk kedua mempelai
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div
            className={`transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <Card className="glass-card border-rose-gold-light/30">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="font-sans text-sm">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="mt-1 bg-background/50"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <Label className="font-sans text-sm mb-3 block">
                      Konfirmasi Kehadiran
                    </Label>
                    <RadioGroup
                      value={attendance}
                      onValueChange={(value) => setAttendance(value as typeof attendance)}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hadir" id="hadir" />
                        <Label htmlFor="hadir" className="flex items-center gap-1 cursor-pointer">
                          <Check className="w-4 h-4 text-green-600" />
                          Hadir
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tidak" id="tidak" />
                        <Label htmlFor="tidak" className="flex items-center gap-1 cursor-pointer">
                          <X className="w-4 h-4 text-red-500" />
                          Tidak Hadir
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ragu" id="ragu" />
                        <Label htmlFor="ragu" className="flex items-center gap-1 cursor-pointer">
                          <HelpCircle className="w-4 h-4 text-yellow-600" />
                          Masih Ragu
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-sans text-sm">
                      Ucapan & Doa
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                      className="mt-1 bg-background/50 min-h-[120px]"
                      maxLength={500}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-wedding bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Mengirim...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Kirim Ucapan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Messages list */}
          <div
            className={`transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Card className="glass-card border-rose-gold-light/30 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-serif font-semibold">
                    Ucapan ({messages.length})
                  </h3>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {messages.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8 font-serif">
                      Belum ada ucapan. Jadilah yang pertama! 💕
                    </p>
                  ) : (
                    messages.map((msg) => {
                      const att = getAttendanceLabel(msg.attendance);
                      return (
                        <div
                          key={msg.id}
                          className="p-4 bg-soft-pink/30 rounded-lg border border-rose-gold-light/20"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-serif font-semibold text-sm">
                                {msg.name}
                              </p>
                              <span className={`text-xs flex items-center gap-1 ${att.color}`}>
                                {att.icon}
                                {att.text}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(msg.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/80 font-serif">
                            {msg.message}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
