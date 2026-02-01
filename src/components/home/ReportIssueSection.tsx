import { useState } from "react";
import { supabase } from "@/lib/supabase";
import EvidenceUpload from "@/components/ui/EvidenceUpload";

export default function ReportIssueSection() {
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const submit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const user = (await supabase.auth.getUser()).data.user;

    if (!user || !lat || !lng) {
      alert("Login & select location");
      return;
    }

    await supabase.from("issues").insert({
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      latitude: lat,
      longitude: lng,
      user_id: user.id,
    });

    alert("Issue reported successfully");
    form.reset();
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="input"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="input"
          required
        />

        <select name="category" className="input" required>
          <option value="">Select Category</option>
          <option>Road</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Garbage</option>
        </select>

        {/* 🔽 EVIDENCE UPLOAD DROPBOX */}
        <EvidenceUpload />

        <button type="submit" className="btn-primary w-full">
          Submit Issue
        </button>
      </form>
    </section>
  );
}
 
 
