import React, { useState, useCallback, useRef, useEffect } from "react";
import { Window } from "../components/desktop";
import { useTheme } from "../context/ThemeContext";

const terminalIcon = (
  <svg fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-7-2h5v-2h-5v2zm-5.5-1.5l1.41 1.41L6 14l2.91-2.91-1.41-1.41L4.59 12.5l2.91 2z" />
  </svg>
);

type Step = 'name' | 'email' | 'message' | 'confirm' | 'sending' | 'success' | 'error';

interface TerminalLine {
  type: 'prompt' | 'input' | 'output' | 'error';
  text: string;
}

const PROMPT_USER = 'visitor';
const PROMPT_HOST = 'portfolio';
const PROMPT_PATH = '~/contact';

// Terminal prompt colors per distro
const terminalColors = {
  ubuntu: { user: '#8AE234', path: '#729FCF' },      // Classic Ubuntu green/blue
  fedora: { user: '#51A2DA', path: '#A3BE8C' },      // Fedora blue / soft green
  mint: { user: '#8BC34A', path: '#4FC3F7' },        // Mint green / cyan
  arch: { user: '#1793D1', path: '#1793D1' },        // Arch blue monochrome
};

const Contact = () => {
  const { distroName } = useTheme();
  const colors = terminalColors[distroName];
  const [step, setStep] = useState<Step>('name');
  const [currentInput, setCurrentInput] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', text: "Welcome to Denise's contact terminal!" },
    { type: 'output', text: "Let's get in touch. Answer a few questions:" },
    { type: 'output', text: '' },
    { type: 'prompt', text: 'What is your name?' },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-focus input (without scrolling the page)
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, [step]);

  const addLine = (line: TerminalLine) => {
    setHistory(prev => [...prev, line]);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  const sendMessage = useCallback(async (data: FormData) => {
    setStep('sending');
    addLine({ type: 'output', text: 'Sending message...' });

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        throw new Error('Google Script URL not configured');
      }

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      setStep('success');
      addLine({ type: 'output', text: '' });
      addLine({ type: 'output', text: '✓ Message sent successfully!' });
      addLine({ type: 'output', text: "Thanks for reaching out. I'll get back to you soon!" });
      addLine({ type: 'output', text: '' });
      addLine({ type: 'output', text: "If you don't hear back, email me at info@devdenise.com" });
      addLine({ type: 'prompt', text: "Type 'new' to send another message, or close this window." });
    } catch (err) {
      console.error(err);
      setStep('error');
      addLine({ type: 'error', text: '✗ Failed to send message. Please try again.' });
      addLine({ type: 'prompt', text: "Type 'retry' to try again." });
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processInput();
    }
  };

  const processInput = () => {
    const input = currentInput.trim();

    if (!input && step !== 'confirm') return;

    // Add user input to history
    if (input) {
      addLine({ type: 'input', text: input });
    }

    setCurrentInput('');

    switch (step) {
      case 'name':
        if (input.length < 2) {
          addLine({ type: 'error', text: 'Please enter a valid name (at least 2 characters).' });
          addLine({ type: 'prompt', text: 'What is your name?' });
          return;
        }
        setFormData(prev => ({ ...prev, name: input }));
        addLine({ type: 'output', text: `Nice to meet you, ${input}!` });
        addLine({ type: 'prompt', text: 'What is your email address?' });
        setStep('email');
        break;

      case 'email':
        if (!validateEmail(input)) {
          addLine({ type: 'error', text: 'Please enter a valid email address.' });
          addLine({ type: 'prompt', text: 'What is your email address?' });
          return;
        }
        setFormData(prev => ({ ...prev, email: input }));
        addLine({ type: 'output', text: 'Got it!' });
        addLine({ type: 'prompt', text: 'What would you like to say? (your message)' });
        setStep('message');
        break;

      case 'message':
        if (input.length < 10) {
          addLine({ type: 'error', text: 'Please enter a longer message (at least 10 characters).' });
          addLine({ type: 'prompt', text: 'What would you like to say?' });
          return;
        }
        setFormData(prev => ({ ...prev, message: input }));
        addLine({ type: 'output', text: '' });
        addLine({ type: 'output', text: '--- Message Preview ---' });
        addLine({ type: 'output', text: `From: ${formData.name} <${formData.email}>` });
        addLine({ type: 'output', text: `Message: ${input}` });
        addLine({ type: 'output', text: '-----------------------' });
        addLine({ type: 'output', text: '' });
        addLine({ type: 'prompt', text: "Press Enter to send, or type 'edit' to start over." });
        setStep('confirm');
        break;

      case 'confirm':
        if (input.toLowerCase() === 'edit') {
          setFormData({ name: '', email: '', message: '' });
          addLine({ type: 'output', text: "Let's start over." });
          addLine({ type: 'prompt', text: 'What is your name?' });
          setStep('name');
        } else {
          sendMessage(formData);
        }
        break;

      case 'success':
        if (input.toLowerCase() === 'new') {
          setFormData({ name: '', email: '', message: '' });
          setHistory([
            { type: 'output', text: "Welcome back! Let's send another message." },
            { type: 'output', text: '' },
            { type: 'prompt', text: 'What is your name?' },
          ]);
          setStep('name');
        }
        break;

      case 'error':
        if (input.toLowerCase() === 'retry') {
          sendMessage(formData);
        }
        break;
    }
  };

  const isInputDisabled = step === 'sending';

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center p-6">
      <Window
        title="denise@portfolio: ~/contact"
        icon={terminalIcon}
        className="w-full max-w-2xl"
      >
        <div
          ref={terminalRef}
          role="log"
          aria-label="Contact form terminal"
          aria-live="polite"
          className="p-4 h-[400px] overflow-y-auto"
          style={{
            backgroundColor: 'var(--bg-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal history */}
          {history.map((line, index) => (
            <div key={index} className="mb-1">
              {line.type === 'input' && (
                <>
                  <span style={{ color: colors.user }}>{PROMPT_USER}@{PROMPT_HOST}</span>
                  <span style={{ color: 'var(--text-primary)' }}>:</span>
                  <span style={{ color: colors.path }}>{PROMPT_PATH}</span>
                  <span style={{ color: 'var(--text-primary)' }}>$ </span>
                </>
              )}
              {line.type === 'prompt' && (
                <span style={{ color: 'var(--accent)' }}>? </span>
              )}
              <span
                style={{
                  color:
                    line.type === 'error'
                      ? '#ff6b6b'
                      : line.type === 'prompt'
                      ? 'var(--accent)'
                      : line.type === 'input'
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                }}
              >
                {line.text}
              </span>
            </div>
          ))}

          {/* Current input line */}
          {!isInputDisabled && (
            <div className="flex items-center">
              <span style={{ color: colors.user }}>{PROMPT_USER}@{PROMPT_HOST}</span>
              <span style={{ color: 'var(--text-primary)' }}>:</span>
              <span style={{ color: colors.path }}>{PROMPT_PATH}</span>
              <span style={{ color: 'var(--text-primary)' }}>$ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none border-none"
                style={{ color: 'var(--text-primary)', caretColor: 'var(--accent)' }}
                disabled={isInputDisabled}
              />
              <span
                className="animate-pulse"
                style={{ color: colors.user }}
              >
                _
              </span>
            </div>
          )}
        </div>
      </Window>
    </section>
  );
};

export default Contact;
