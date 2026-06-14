"use client";

import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";

export default function ContactModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handleOpen);
    return () => window.removeEventListener("open-contact-modal", handleOpen);
  }, []);

  return <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
