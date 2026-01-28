import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories } from "@/lib/categories";
import {
  ArrowLeft,
  MapPin,
  Camera,
  Shield,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import MapPicker from "@/components/MapPicker";

export default function ReportIssue() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? ""
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium");

  // 📍 LOCATION STATE
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(28.6139); // Delhi default
  const [lng, setLng] = useState(77.209);

  const [loading, setLoading] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);

  // ✅ SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !selectedCategory) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("issues").insert([
      {
        title,
        description,
        category: selectedCategory,
        urgency,
        status: "reported",
        location_address: address || null,
        latitude: lat,
        longitude: lng,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Issue reported successfully");

    setTitle("");
    setDescription("");
    setUrgency("medium");
    setAddress("");
    setSelectedCategory("");
    setEvidenceFiles([]);
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-8">
        {/* Back */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-6 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6">Report a Civic Issue</h1>

        {/* Privacy */}
        <Card className="mb-6">
          <CardContent className="flex gap-3 p-4">
            <Shield className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Uploaded media is processed to protect identities
            </p>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* CATEGORY */}
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
              <CardDescription>Select issue category</CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex gap-4 p-4 rounded-xl border text-left transition ${active
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                      }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${cat.color}`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{cat.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* DETAILS */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div>
                <Label>Description *</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <Label>Urgency *</Label>
                <RadioGroup
                  value={urgency}
                  onValueChange={(v) =>
                    setUrgency(v as "low" | "medium" | "high")
                  }
                  className="mt-2 space-y-2"
                >
                  {["low", "medium", "high"].map((u) => (
                    <div key={u} className="flex items-center gap-2">
                      <RadioGroupItem value={u} id={u} />
                      <Label
                        htmlFor={u}
                        className={u === "high" ? "text-destructive" : ""}
                      >
                        {u.toUpperCase()}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* ADDRESS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address (auto-filled from map)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input value={address} readOnly />
            </CardContent>
          </Card>

          {/* MAP */}
          <Card>
            <CardHeader>
              <CardTitle>Pin Location on Map</CardTitle>
              <CardDescription>
                Click or drag marker to select exact location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MapPicker
                lat={lat}
                lng={lng}
                onPick={(la, ln, addr) => {
                  setLat(la);
                  setLng(ln);
                  if (addr) setAddress(addr);
                }}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Selected: {lat.toFixed(5)}, {lng.toFixed(5)}
              </p>
            </CardContent>
          </Card>

          {/* EVIDENCE */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed p-6 rounded-xl text-center hover:bg-muted/50 transition cursor-pointer relative">
                <Input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setEvidenceFiles((prev) => [...prev, ...Array.from(files)]);
                      toast.success(`${files.length} file(s) added`);
                    }
                  }}
                />
                <div className="pointer-events-none">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    Drop photos or videos here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports JPG, PNG, MP4
                  </p>
                </div>
              </div>

              {/* Previews */}
              {evidenceFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {evidenceFiles.map((file, index) => {
                    const isVideo = file.type.startsWith("video");
                    const url = URL.createObjectURL(file);

                    return (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        {isVideo ? (
                          <div className="w-full h-full bg-black flex items-center justify-center">
                            <span className="text-xs text-white">Video</span>
                          </div>
                        ) : (
                          <img src={url} alt="preview" className="w-full h-full object-cover" />
                        )}
                        <button
                          type="button"
                          onClick={() => setEvidenceFiles(prev => prev.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex items-start gap-2 mt-3 text-xs text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                Faces & number plates are auto-blurred
              </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Issue"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
