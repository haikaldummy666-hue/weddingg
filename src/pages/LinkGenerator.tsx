import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, ExternalLink } from "lucide-react";
import { weddingConfig } from "@/config/wedding";

const LinkGenerator = () => {
  const [names, setNames] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [generatedLinks, setGeneratedLinks] = useState<{ name: string; url: string; message: string }[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Set default base URL to current window location
    setBaseUrl(window.location.origin);
  }, []);

  const generateMessage = (name: string, url: string) => {
    return `Kepada Yth. 
*${name}* 
 
بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud mengundang *${name}* untuk hadir dalam acara pernikahan kami. 
 
*Info lengkap pernikahan dapat dilihat melalui tautan berikut:* 
 
${url} 
 
Merupakan kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberi doa restu. 
 
*Undangan ini disampaikan melalui pesan ini. Mohon dimaklumi.* 
 
جَزَاكُمُ اللهُ خَيْرًا كَثِيْرًا
 
وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
${weddingConfig.groom.name} & ${weddingConfig.bride.name}`;
  };

  const handleGenerate = () => {
    const nameList = names
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    const links = nameList.map((name) => {
      // Encode the name for URL safety
      const encodedName = encodeURIComponent(name);
      const url = `${baseUrl}/?to=${encodedName}&v=1`;
      return {
        name,
        url,
        message: generateMessage(name, url),
      };
    });

    setGeneratedLinks(links);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold mb-2">Invitation Link Generator</h1>
          <p className="text-muted-foreground">
            Generate unique invitation links and WhatsApp messages for your guests.
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://your-wedding-site.com"
            />
            <p className="text-xs text-muted-foreground">
              This is the address of your wedding website.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="names">Guest Names (one per line)</Label>
            <Textarea
              id="names"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              placeholder="Budi Santoso&#10;Siti Aminah&#10;Keluarga Besar Bapak Joko"
              className="min-h-[200px]"
            />
          </div>

          <Button onClick={handleGenerate} className="w-full">
            Generate Links & Messages
          </Button>
        </Card>

        {generatedLinks.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Invitations</h2>
            <div className="space-y-4">
              {generatedLinks.map((link, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted/50 rounded-lg group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{link.name}</p>
                    <div className="flex gap-2">
                        <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                        className="h-8"
                        >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Link
                        </Button>
                        <Button
                        variant="default"
                        size="sm"
                        onClick={() => copyToClipboard(link.message, index)}
                        className="h-8"
                        >
                        {copiedIndex === index ? (
                            <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied
                            </>
                        ) : (
                            <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Message
                            </>
                        )}
                        </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground bg-background p-3 rounded border whitespace-pre-wrap font-mono">
                    {link.message}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LinkGenerator;
