import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Award, Calendar, Hash, ArrowLeft } from "lucide-react";
import { MOCK_CERTIFICATES, TRACKS } from "@/lib/mock-data";
import CertificateActions from "@/components/certificate/CertificateActions";

interface PageProps {
  params: Promise<{ certId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { certId } = await params;
  const cert = MOCK_CERTIFICATES.find((c) => c.id === certId);
  return {
    title: cert ? `Verify ${cert.userName}'s Certificate — Connexode` : "Verify Certificate — Connexode",
  };
}

export async function generateStaticParams() {
  return MOCK_CERTIFICATES.map((c) => ({ certId: c.id }));
}

export default async function VerifyCertificatePage({ params }: PageProps) {
  const { certId } = await params;
  const cert = MOCK_CERTIFICATES.find((c) => c.id === certId);
  
  if (!cert) {
    notFound();
  }

  const track = TRACKS.find((t) => t.id === cert.trackId);

  return (
    <div className="min-h-screen bg-[#020B18] text-slate-100 px-6 py-12 flex flex-col items-center justify-center print:bg-white print:text-slate-900 print:py-0 print:px-0">
      
      {/* Back button & Action Header (Hidden in Print) */}
      <div className="w-full max-w-4xl mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Connexode
        </Link>

        <CertificateActions />
      </div>

      {/* Main Certificate / Verification Container */}
      <div className="w-full max-w-4xl grid gap-8 lg:grid-cols-[2fr_1fr] print:block print:max-w-none">
        
        {/* The Certificate UI */}
        <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-[#061126] to-[#030c1c] p-12 text-center shadow-[0_0_50px_rgba(234,179,8,0.06)] print:border-none print:shadow-none print:bg-white print:p-8 print:text-black">
          {/* Certificate Border decoration */}
          <div className="absolute inset-4 rounded-2xl border border-yellow-500/10 pointer-events-none print:border-yellow-600/30" />
          <div className="absolute inset-5 rounded-2xl border border-yellow-500/5 pointer-events-none print:border-yellow-600/10" />

          {/* Certificate Content */}
          <div className="space-y-8 relative z-10">
            {/* Header / Logo */}
            <div className="flex flex-col items-center">
              <Award size={48} className="text-yellow-500 mb-2 print:text-yellow-600" />
              <h2 className="font-display text-2xl font-black tracking-wider text-white uppercase print:text-black">
                CONNEXODE
              </h2>
              <span className="text-[9px] font-bold tracking-widest text-cyan-400 uppercase print:text-cyan-600">
                Verified Internship Credential
              </span>
            </div>

            {/* Main title */}
            <div className="space-y-2">
              <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl print:text-black print:text-3xl">
                Certificate of Completion
              </h1>
              <p className="text-sm text-slate-400 max-w-lg mx-auto print:text-slate-600">
                This is proudly presented to acknowledge the successful completion and mastery of the guided technical roadmap.
              </p>
            </div>

            {/* Recipient */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-slate-500 print:text-slate-400">This is awarded to</span>
              <div className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200 print:text-black print:bg-none print:text-4xl">
                {cert.userName}
              </div>
              <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent mx-auto mt-2 print:bg-yellow-600 print:h-[1px]" />
            </div>

            {/* Track Info */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-slate-500 print:text-slate-400">for completing the intensive</span>
              <p className="text-lg font-bold text-white print:text-black">
                {cert.trackTitle}
              </p>
              <div className="flex justify-center gap-1">
                {track?.tags.slice(0, 4).map((tag, i) => (
                  <span key={i} className="text-[10px] bg-white/5 border border-white/8 text-slate-400 px-2 py-0.5 rounded print:border-slate-300 print:text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Grade Badge */}
            <div className="inline-flex flex-col items-center rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-6 py-2.5 print:border-yellow-600 print:bg-yellow-50/50">
              <span className="text-[10px] uppercase tracking-wider text-yellow-500 font-bold print:text-yellow-600">
                Performance Evaluation Level
              </span>
              <span className="text-lg font-extrabold text-white print:text-black">
                {cert.grade} (Grade A+)
              </span>
            </div>

            {/* Signature & Date Grid */}
            <div className="grid grid-cols-2 gap-8 pt-8 max-w-md mx-auto">
              <div className="text-center">
                <p className="font-display text-sm font-bold text-white print:text-black">Ahmad Khan</p>
                <div className="h-px bg-white/10 my-1 print:bg-slate-300" />
                <p className="text-[10px] text-slate-500 uppercase print:text-slate-400">Founder, Connexode</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white print:text-black">{cert.issueDate}</p>
                <div className="h-px bg-white/10 my-1 print:bg-slate-300" />
                <p className="text-[10px] text-slate-500 uppercase print:text-slate-400">Issue Date</p>
              </div>
            </div>

            {/* Bottom unique ID footer */}
            <div className="text-[10px] text-slate-600 font-mono flex justify-center gap-4 pt-6 border-t border-white/5 print:text-slate-400 print:border-slate-200">
              <span>CREDENTIAL ID: {cert.id}</span>
              <span>VERIFICATION: SECURE LEDGER</span>
            </div>
          </div>
        </div>

        {/* Verification Status Details Sidebar (Hidden in Print) */}
        <div className="space-y-6 print:hidden">
          {/* Status Panel */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Status: Verified</h3>
                <p className="text-[10px] text-emerald-400/80 font-medium">Valid & Active Credential</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
              This certificate has been cryptographically signed and authenticated by the Connexode Virtual Internship platform. It represents verified project submissions, code checks, and active developer advocacy tasks.
            </div>
          </div>

          {/* Metadata details */}
          <div className="rounded-3xl border border-white/8 bg-white/4 p-6 backdrop-blur-xl space-y-4.5">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">
              Credential Metadata
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Award size={13} /> Evaluation:</span>
                <span className="font-semibold text-slate-200">{cert.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Calendar size={13} /> Completed:</span>
                <span className="font-semibold text-slate-200">{cert.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Hash size={13} /> Credential ID:</span>
                <span className="font-semibold text-slate-200 font-mono">{cert.id}</span>
              </div>
            </div>

            {/* Cryptographic Hash details */}
            <div className="border-t border-white/5 pt-3 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Cryptographic Signature</span>
              <div className="rounded-lg bg-black/30 p-2.5 font-mono text-[9px] text-slate-500 break-all leading-normal">
                {cert.verificationHash}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
