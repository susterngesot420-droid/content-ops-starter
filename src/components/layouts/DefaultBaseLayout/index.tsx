import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'next/link';

export default function Header({ enableAnnotations }) {
  return (
    <header className="sb-header">
      <div className="container flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/">
          <a className="sb-logo text-xl font-bold">RTP Live WIN313</a>
        </Link>

        {/* Menu */}
        <nav className="flex items-center space-x-4">
          <Link href="#pricing">
            <a className="text-gray-700 hover:text-gray-900">Pricing</a>
          </Link>
          <Link href="#blog">
            <a className="text-gray-700 hover:text-gray-900">Blog</a>
          </Link>
          <Link href="#careers">
            <a className="text-gray-700 hover:text-gray-900">Careers</a>
          </Link>

          {/* Tombol CTA */}
          <a
            href="https://rtp-win313.online/daftar"
            target="_blank"
            rel="noopener"
            className="ml-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Daftar
          </a>
          <a
            href="https://rtp-win313.online/login"
            target="_blank"
            rel="noopener"
            className="ml-2 px-4 py-2 border border-primary text-primary rounded hover:bg-primary-light"
          >
            Masuk
          </a>
        </nav>
      </div>
    </header>
  );
}

