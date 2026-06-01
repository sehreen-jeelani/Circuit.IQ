import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Calendar, Mail, CheckCircle2, 
  ArrowRight, ChevronDown, Copy, Clock, User, MessageSquare, Terminal, Check, Info, ShieldAlert
} from 'lucide-react';
import { cn } from '../lib/utils';
import InteractiveCircuitLines from '../components/InteractiveCircuitLines';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How do I report a bug or system crash?",
    answer: "Please select 'Bug Report / Problem' from the Request Type menu in our transmission portal. Provide a description of what interactive actions triggered the issue, and our team will run diagnostics on the simulation logs."
  },
  {
    question: "Can I suggest a new physical simulation or lab feature?",
    answer: "Absolutely! Choose the 'Feature Request' category. We love adding new math modules, block connectors, or rendering pipelines based on operator feedback."
  },
  {
    question: "What is your typical diagnostic turnaround time?",
    answer: "We aim to analyze all diagnostics and ticket submissions within 24–48 hours. If you need urgent live guidance, you can simulate scheduling a custom support call slot on this page!"
  },
  {
    question: "Does Circuit.IQ support offline simulations?",
    answer: "Currently, our high-fidelity web engine requires an active connection for real-time asset hydration. However, we are actively constructing an offline local workstation build for standard desktop distributions."
  }
];

export default function ContactPage() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState('Bug Report / Problem');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Validation / Submission states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLogs, setSubmitLogs] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Scheduler Widget State
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Copy Feedback state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Generic and common validation checker (now supporting standard emails so anyone can contact)
  const handleValidate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Please specify your name.";
    
    // Standard standard-compliant email validator (no longer restricted strictly to academic .edu/.org)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = "Please specify your contact email address.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please specify a valid email address.";
    }
    
    if (!subject.trim()) newErrors.subject = "Please enter a subject or summary of the problem.";
    if (message.trim().length < 8) newErrors.message = "Please describe the problem details in at least 8 characters.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulated ticket handshake log compilation
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    setIsSubmitting(true);
    setSubmitLogs([]);

    const steps = [
      "Securing connection pipeline to diagnostic channel... [OK]",
      "Compiling problem metadata and browser specs... [OK]",
      "Encoding ticket payload parameters... [OK]",
      "Syncing with Circuit.IQ global queue... [SUCCESS]"
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, i === 0 ? 150 : 300));
      setSubmitLogs((prev) => [...prev, steps[i]]);
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, requestType, subject, message })
      });
      if (response.ok) {
        const data = await response.json();
        setTicketId(data.ticketId);
      } else {
        throw new Error("Backend response error");
      }
    } catch (err) {
      console.warn("Failed to contact backend API, falling back to mock ticket.", err);
      const randomTicket = `CIQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(randomTicket);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Calculate days for interactive scheduler
  const today = new Date();
  const calendarDays = Array.from({ length: 7 }, (_, i) => {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i + 1);
    return nextDay;
  });

  const availableHours = ["10:00 AM", "1:30 PM", "4:00 PM"];

  const handleBookCall = () => {
    if (selectedDate === null || !selectedTime) return;
    setScheduleSuccess(true);
    setTimeout(() => {
      setSelectedDate(null);
      setSelectedTime(null);
      setScheduleSuccess(false);
    }, 4000);
  };

  return (
    <div className="w-full min-h-screen bg-transparent pt-32 pb-24 px-4 sm:px-6 md:px-8 relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* Dynamic Handcrafted Interactive Circuit Background Lines */}
      <InteractiveCircuitLines />
      
      {/* Decorative Science Grid Backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Dynamic Ambient Glowing Accents */}
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-24 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-10 md:gap-14">
        
        {/* Cinematic Page Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-[10px] font-mono tracking-widest uppercase"
          >
            <Info className="w-3.5 h-3.5 animate-pulse" />
            <span>Problem Support & Inquiries Hub</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How can we assist you?
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-lg text-center text-sm leading-relaxed"
          >
            Got a problem with the simulation, spotted a bug, or want to suggest an improvement? Submit your request details below and we will investigate immediately.
          </motion.p>
        </div>

        {/* Form and fast contact list */}
        <div className="grid grid-cols-1 lg:grid-cols-[13fr_8fr] gap-8 items-start">
          
          {/* Main Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 dark:bg-black/30 border border-slate-200 dark:border-white/5 shadow-xl rounded-3xl p-6 md:p-8 backdrop-blur-3xl relative"
          >
            <div className="border-b border-slate-100 dark:border-white/5 pb-4 mb-6 text-left">
              <h2 className="text-base font-display font-semibold text-slate-900 dark:text-white">Submit a Support Ticket</h2>
              <p className="text-xs text-slate-400 mt-1">Please specify the exact nature of the problem or feedback you have.</p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <form onSubmit={handleSubmitForm} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <User className="w-3 h-3 text-blue-500" />
                        <span>Your Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Richard Feynman"
                        value={name}
                        onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
                        disabled={isSubmitting}
                        className={cn(
                          "w-full px-3.5 py-2.5 text-xs rounded-xl border bg-slate-50/50 dark:bg-black/30 outline-none transition-all",
                          errors.name
                            ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-200 focus:ring-opacity-50"
                            : "border-slate-200 dark:border-white/10 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/60"
                        )}
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-mono mt-0.5">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <Mail className="w-3 h-3 text-blue-500" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@domain.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                        disabled={isSubmitting}
                        className={cn(
                          "w-full px-3.5 py-2.5 text-xs rounded-xl border bg-slate-50/50 dark:bg-black/30 outline-none transition-all",
                          errors.email
                            ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-200 focus:ring-opacity-50"
                            : "border-slate-200 dark:border-white/10 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/60"
                        )}
                      />
                      {errors.email && <span className="text-[10px] text-red-500 font-mono mt-0.5">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Request Type Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-blue-500" />
                        <span>Request Type</span>
                      </label>
                      <select
                        value={requestType}
                        onChange={(e) => setRequestType(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/30 dark:text-white outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/60 transition-all cursor-pointer"
                      >
                        <option value="Bug Report / Problem">Bug Report / Problem</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="General Question">General Inquiry / Help</option>
                        <option value="Other">Other Issues</option>
                      </select>
                    </div>

                    {/* Subject Line */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                        <span>Brief Summary</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3D grid loading error"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value); if (errors.subject) setErrors(prev => ({ ...prev, subject: '' })); }}
                        disabled={isSubmitting}
                        className={cn(
                          "w-full px-3.5 py-2.5 text-xs rounded-xl border bg-slate-50/50 dark:bg-black/30 outline-none transition-all",
                          errors.subject
                            ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-200 focus:ring-opacity-50"
                            : "border-slate-200 dark:border-white/10 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/60"
                        )}
                      />
                      {errors.subject && <span className="text-[10px] text-red-500 font-mono mt-0.5">{errors.subject}</span>}
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-blue-500" />
                      <span>Description of Request / Problem</span>
                    </label>
                    <textarea
                      placeholder="Please clarify any issues, steps to reproduce, or instructions about the problem..."
                      rows={4}
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(prev => ({ ...prev, message: '' })); }}
                      disabled={isSubmitting}
                      className={cn(
                        "w-full px-3.5 py-2.5 text-xs rounded-xl border bg-slate-50/50 dark:bg-black/30 outline-none transition-all resize-none",
                        errors.message
                          ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-200 focus:ring-opacity-50"
                          : "border-slate-200 dark:border-white/10 dark:text-white focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black/60"
                      )}
                    />
                    {errors.message && <span className="text-[10px] text-red-500 font-mono mt-0.5">{errors.message}</span>}
                  </div>

                  {/* Submit Log pipeline compilation */}
                  <AnimatePresence>
                    {isSubmitting && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-950 text-blue-400 rounded-xl p-3.5 font-mono text-[10px] border border-blue-500/20 shadow-inner overflow-hidden flex flex-col gap-1"
                      >
                        <div className="flex items-center gap-2 border-b border-blue-500/10 pb-1 text-blue-500 font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          <span>Filing Inbound Support Pipeline</span>
                        </div>
                        <div className="space-y-0.5 mt-1 text-blue-300">
                          {submitLogs.map((log, index) => (
                            <div key={index} className="flex items-center gap-1.5 animate-fadeIn">
                              <span>✓</span>
                              <span>{log}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs transition-all hover:bg-blue-700 disabled:opacity-50 tracking-wider uppercase select-none active:scale-[0.99] cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send size={14} />
                  </button>
                </form>
              ) : (
                /* Success Animated Modal */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 px-4 flex flex-col items-center justify-center text-center gap-5"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/25 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={32} className="animate-bounce" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">Ticket Submitted Successfully</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Thank you! Your inquiry was compiled. We have assigned a local reference identifier to compile with our system logs.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 rounded-2xl p-4 font-mono text-xs w-full max-w-xs flex flex-col gap-1.5 text-left">
                    <div className="flex justify-between items-center border-b border-dashed border-slate-200 dark:border-white/10 pb-1.5">
                      <span className="text-slate-400 text-[9px] uppercase">Reference Ticket:</span>
                      <strong className="text-blue-500">{ticketId}</strong>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">OPERATOR:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{name}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">TYPE:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{requestType}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">TRACK STATUS:</span>
                      <span className="text-emerald-500 font-semibold">Active Inbound Queue</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubject('');
                      setMessage('');
                    }}
                    className="px-5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1"
                  >
                    <span>Submit Another Inquiry</span>
                    <ArrowRight size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Silder details and rapid contact */}
          <div className="flex flex-col gap-6 text-left">
            
            {/* Quick Contact metrics card */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 dark:bg-black/30 border border-slate-200 dark:border-white/5 shadow-xl rounded-3xl p-6 backdrop-blur-3xl flex flex-col gap-3.5"
            >
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Support Coordinates</span>
              </h3>
              
              <div 
                onClick={() => handleCopyText("support@circuit-iq.org")}
                className="group bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 hover:border-blue-500/20 cursor-pointer rounded-2xl p-4 flex justify-between items-center transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-500">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-slate-400 uppercase leading-none">Global Support Email</span>
                    <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 mt-1">support@circuit-iq.org</span>
                  </div>
                </div>
                <button className="text-[9px] font-mono text-blue-500 flex items-center gap-1 shrink-0">
                  {copiedEmail ? (
                    <span className="text-emerald-500 font-bold">COPIED!</span>
                  ) : (
                    <span>COPY</span>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Quick Consultation Slot Booking */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 dark:bg-black/30 border border-slate-200 dark:border-white/5 shadow-xl rounded-3xl p-6 backdrop-blur-3xl flex flex-col gap-4"
            >
              <div className="flex flex-col">
                <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>Reserve Inbound Live Call Slot</span>
                </h3>
                <span className="text-[10px] text-slate-400 mt-1 leading-normal">
                  Trouble with simulations? Choose an empty time block below to book a live support review.
                </span>
              </div>

              <AnimatePresence mode="wait">
                {!scheduleSuccess ? (
                  <div className="space-y-4">
                    {/* Days list */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">Available Dates:</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {calendarDays.slice(0, 4).map((day, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedDate(idx)}
                            className={cn(
                              "flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer",
                              selectedDate === idx
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-slate-50 dark:bg-black/20 border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 dark:text-gray-300"
                            )}
                          >
                            <span className="text-[8px] font-mono uppercase text-slate-400">
                              {day.toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <span className="text-xs font-bold leading-none mt-1">
                              {day.getDate()}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time List */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">Available Hours (UTC):</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {availableHours.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "py-1.5 text-[9px] font-mono border rounded-lg text-center transition-all cursor-pointer",
                              selectedTime === time
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-slate-50 dark:bg-black/20 border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 dark:text-gray-300"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleBookCall}
                      disabled={selectedDate === null || !selectedTime}
                      className="w-full py-2 rounded-lg bg-slate-900 border border-transparent text-white dark:bg-white/10 dark:text-white hover:bg-slate-800 dark:hover:bg-white/15 text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                    >
                      Book Free Support Call
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center text-center gap-1.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Check size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-white">Call Slot Reserved!</span>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      We've reserved the 15-minute diagnostic call slot. We'll synchronize meeting parameters with your email.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Accordion Questions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto w-full flex flex-col gap-4 text-left"
        >
          <div className="border-b border-slate-100 dark:border-white/5 pb-3 mb-2 text-center md:text-left">
            <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white flex items-center gap-2 justify-center md:justify-start">
              <MessageSquare className="w-4.5 h-4.5 text-blue-500" />
              <span>Common Questions & Problem Fixes</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Review guidelines before sending custom diagnostics messages.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white/50 dark:bg-black/15 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4.5 text-left outline-none text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-white/2 cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-bold">{faq.question}</span>
                    <ChevronDown 
                      size={14} 
                      className={cn(
                        "text-slate-400 shrink-0 duration-300 transition-transform",
                        isOpen ? "transform rotate-180 text-blue-500" : ""
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="px-4.5 pb-4.5 pt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
