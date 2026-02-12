import { useRef, useState } from "react";
import { weddingConfig } from "@/config/wedding";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check, Gift, CreditCard, MapPin } from "lucide-react";
import { toast } from "sonner";

export const WeddingGift = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      toast.success("Nomor rekening berhasil disalin!");
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(() => {
      toast.error("Gagal menyalin nomor rekening");
    });
  };

  return (
    <section id="gift" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-script text-4xl md:text-5xl text-gradient mb-4">
            Wedding Gift
          </h2>
          <div className="section-divider">
            <span className="text-xl text-gold">❀</span>
          </div>
          <p className="font-serif text-muted-foreground max-w-xl mx-auto">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital
          </p>
        </div>

        {/* Gift cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
          {/* Bank accounts */}
          {weddingConfig.bankAccounts.map((account, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <Card className="glass-card border-gold/30 overflow-hidden h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  
                  <p className="text-sm font-sans uppercase tracking-wider text-muted-foreground mb-2">
                    {account.bank}
                  </p>
                  
                  <p className="font-serif text-2xl font-semibold mb-2">
                    {account.accountNumber}
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    a.n. {account.accountName}
                  </p>

                  <Button
                    variant="outline"
                    className="rounded-full border-gold hover:bg-gold/10"
                    onClick={() => copyToClipboard(account.accountNumber, index)}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Salin Nomor
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Physical gift address */}
        <div
          className={`transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Card className="glass-card border-rose-gold-light/30 overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-soft-pink border-2 border-rose-gold-light flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="font-script text-2xl text-gradient mb-4">
                Kirim Kado
              </h3>
              
              <div className="space-y-6">
                {weddingConfig.giftAddress.map((address, index) => (
                  <div key={index} className="flex items-start justify-center gap-2 text-left max-w-md mx-auto border-b border-rose-gold-light/20 pb-4 last:border-0 last:pb-0">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="font-serif">
                      <p className="font-semibold">{address.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {address.address}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {address.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
