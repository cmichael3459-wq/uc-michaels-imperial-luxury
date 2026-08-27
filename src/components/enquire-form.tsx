import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COLLECTIONS } from "@/lib/catalog";
import { defaultEnquiry, whatsappHref } from "@/lib/site";

const INTERESTS = [
  { value: "", label: "Select a collection" },
  ...COLLECTIONS.map((c) => ({ value: c.label, label: c.label })),
  { value: "Other", label: "Something else" },
];

export function EnquireForm({
  presetPiece,
  presetCollection,
}: {
  presetPiece?: string;
  presetCollection?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(presetCollection ?? "");
  const [message, setMessage] = useState(
    presetPiece ? defaultEnquiry(presetPiece) : "",
  );

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const lines = [
      `Hello UC.MICHAELS, my name is ${name.trim() || "a private client"}.`,
      phone.trim() ? `My number is ${phone.trim()}.` : null,
      interest ? `I am interested in ${interest}.` : null,
      message.trim() || defaultEnquiry(presetPiece),
    ].filter(Boolean);
    window.open(whatsappHref(lines.join(" ")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="enquire-name">Name</Label>
          <Input
            id="enquire-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="enquire-phone">Phone</Label>
          <Input
            id="enquire-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0800 000 0000"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="enquire-interest">Collection</Label>
        <select
          id="enquire-interest"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="h-11 w-full border border-line bg-ink-2 px-3.5 text-sm text-ivory focus-visible:border-champagne/50 focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-champagne)]"
        >
          {INTERESTS.map((item) => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="enquire-message">Message</Label>
        <Textarea
          id="enquire-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="The piece, dates, or budget you have in mind."
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Continue on WhatsApp
      </Button>
      <p className="text-xs leading-relaxed text-stone">
        The form opens WhatsApp with your message. Nothing is stored on this
        site.
      </p>
    </form>
  );
}
