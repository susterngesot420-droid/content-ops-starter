import * as React from 'react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header({ enableAnnotations }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sb-header bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <Link href="/">
          <a className="sb-logo text-2xl font-bold text-primary">RTP Live WIN313</a>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#pricing">
            <a className="text-gray-700 hover:text-gray-900 transition">Pricing</a>
          </Link>
          <Link href="#blog">
            <a className="text-gray-700 hover:text-gray-900 transition">Blog</a>
          </Link>
          <Link href="#careers">
            <a className="text-gray-700 hover:text-gray-900 transition">Careers</a>
          </Link>

          <a
            href="https://rtp-win313.online/daftar"
            target="_blank"
            rel="noopener"
            className="ml-6 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center justify-center"
          >
            Daftar
            <span className="ml-2">→</span>
          </a>
          <a
            href="https://rtp-win313.online/login"
            target="_blank"
            rel="noopener"
            className="ml-3 px-5 py-2 border border-primary text-primary rounded-lg hover:bg-primary-light transition flex items-center justify-center"
          >
            Masuk
            <span className="ml-2">→</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col p-4 space-y-2">
            <Link href="#pricing">
              <a className="text-gray-700 hover:text-gray-900 transition">Pricing</a>
            </Link>
            <Link href="#blog">
              <a className="text-gray-700 hover:text-gray-900 transition">Blog</a>
            </Link>
            <Link href="#careers">
              <a className="text-gray-700 hover:text-gray-900 transition">Careers</a>
            </Link>

            <a
              href="https://rtp-win313.online/daftar"
              target="_blank"
              rel="noopener"
              className="mt-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center justify-center"
            >
              Daftar
              <span className="ml-2">→</span>
            </a>
            <a
              href="https://rtp-win313.online/login"
              target="_blank"
              rel="noopener"
              className="mt-2 px-5 py-2 border border-primary text-primary rounded-lg hover:bg-primary-light transition flex items-center justify-center"
            >
              Masuk
              <span className="ml-2">→</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
