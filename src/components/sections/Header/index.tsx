import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Link, Action } from '../../atoms';
import ImageBlock from '../../blocks/ImageBlock';
import ChevronDownIcon from '../../svgs/chevron-down';
import CloseIcon from '../../svgs/close';
import MenuIcon from '../../svgs/menu';

export default function Header(props) {
    const { colors = 'bg-light-fg-dark', styles = {}, enableAnnotations } = props;
    return (
        <header
            className={classNames(
                'sb-component',
                'sb-component-header',
                colors,
                'relative',
                'shadow-header',
                styles?.self?.margin ? mapStyles({ padding: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'p-4',
                'z-50'
            )}
            {...(enableAnnotations && { 'data-sb-object-id': props?.__metadata?.id })}
        >
            <div className="mx-auto max-w-7xl">
                <Link href="#main" className="sr-only">
                    Skip to main content
                </Link>
                <HeaderVariants {...props} />
            </div>
        </header>
    );
}

function HeaderVariants(props) {
    const { variant = 'logo-left-primary-nav-left', ...rest } = props;
    switch (variant) {
        case 'logo-left-primary-nav-centered':
            return <HeaderLogoLeftPrimaryCentered {...rest} />;
        case 'logo-left-primary-nav-right':
            return <HeaderLogoLeftPrimaryRight {...rest} />;
        case 'logo-centered-primary-nav-left':
            return <HeaderLogoCenteredPrimaryLeft {...rest} />;
        case 'logo-centered-primary-nav-centered':
            return <HeaderLogoCenteredPrimaryCentered {...rest} />;
        default:
            return <HeaderLogoLeftPrimaryLeft {...rest} />;
    }
}

// Tambahkan secondaryLinks default ke RTP
const defaultSecondaryLinks = [
    {
        label: 'Daftar',
        url: 'https://rtp-win313.online/',
        __metadata: { modelName: 'Button' },
        style: 'primary',
    },
    {
        label: 'Masuk',
        url: 'https://rtp-win313.online/',
        __metadata: { modelName: 'Button' },
        style: 'secondary',
    }
];

function HeaderLogoLeftPrimaryLeft(props) {
    const { title, logo, primaryLinks = [], colors = 'bg-light-fg-dark', enableAnnotations } = props;
    const secondaryLinks = defaultSecondaryLinks;
    return (
        <div className="relative flex items-center">
            {(title || logo?.url) && (
                <div className="mr-10">
                    <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden mr-10 gap-x-10 lg:flex lg:items-center" {...(enableAnnotations && { 'data-sb-field-path': 'primaryLinks' })}>
                    <ListOfLinks links={primaryLinks} colors={colors} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto gap-x-2.5 lg:flex lg:items-center" {...(enableAnnotations && { 'data-sb-field-path': 'secondaryLinks' })}>
                    <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} secondaryLinks={secondaryLinks} />}
        </div>
    );
}

// Gunakan defaultSecondaryLinks di semua variant
function HeaderLogoLeftPrimaryCentered(props) { return <HeaderLogoLeftPrimaryLeft {...props} />; }
function HeaderLogoLeftPrimaryRight(props) { return <HeaderLogoLeftPrimaryLeft {...props} />; }
function HeaderLogoCenteredPrimaryLeft(props) { return <HeaderLogoLeftPrimaryLeft {...props} />; }
function HeaderLogoCenteredPrimaryCentered(props) { return <HeaderLogoLeftPrimaryLeft {...props} />; }

function MobileMenu({ primaryLinks = [], secondaryLinks = [], title, logo, colors = 'bg-light-fg-dark', styles = {}, enableAnnotations }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const openMobileMenu = () => {
        setIsMenuOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
            document.body.style.overflow = 'unset';
        };
        router.events.on('routeChangeStart', handleRouteChange);
        return () => router.events.off('routeChangeStart', handleRouteChange);
    }, [router.events]);

    return (
        <div className="ml-auto lg:hidden">
            <button aria-label="Open Menu" title="Open Menu" className="p-2 -mr-1 focus:outline-none" onClick={openMobileMenu}>
                <MenuIcon className="w-6 h-6 fill-current" />
            </button>
            <div className={classNames(colors, 'fixed inset-0 p-4 overflow-y-auto z-10', isMenuOpen ? 'block' : 'hidden')}>
                <div className="flex flex-col min-h-full">
                    <div className="flex items-center justify-between mb-10">
                        <SiteLogoLink title={title} logo={logo} enableAnnotations={enableAnnotations} />
                        <button aria-label="Close Menu" title="Close Menu" className="p-2 -mr-1 focus:outline-none" onClick={closeMobileMenu}>
                            <CloseIcon className="w-6 h-6 fill-current" />
                        </button>
                    </div>
                    {primaryLinks.length > 0 && <ListOfLinks links={primaryLinks} enableAnnotations={enableAnnotations} inMobileMenu />}
                    {secondaryLinks.length > 0 && <ListOfLinks links={secondaryLinks} enableAnnotations={enableAnnotations} inMobileMenu />}
                </div>
            </div>
        </div>
    );
}

function SiteLogoLink({ title, logo, enableAnnotations }) {
    return (
        <Link href="/" className="flex items-center">
            {logo && <ImageBlock {...logo} {...(enableAnnotations && { 'data-sb-field-path': 'logo' })} />}
            {title && <span className="h4" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>{title}</span>}
        </Link>
    );
}

function ListOfLinks({ links = [], enableAnnotations, inMobileMenu = false }) {
    return (
        <>
            {links.map((link, index) => (
                <li key={index} className={classNames(inMobileMenu ? 'border-t' : 'py-2')}>
                    <Action
                        {...link}
                        className={classNames('whitespace-nowrap', inMobileMenu ? 'w-full' : 'text-sm')}
                        {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                    />
                </li>
            ))}
        </>
    );
}
