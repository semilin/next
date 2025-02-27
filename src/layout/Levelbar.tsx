import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import { faDiscord, faGithub, faPatreon, faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Userbar from './Userbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faHome, faInfoCircle, faListAlt, faNewspaper, faStoreAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { usePlayerContext } from '../contexts/Player.context';
import { useRouter } from 'next/router';
import Link from '../components/Uncategorized/Link';

const Levelbar = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const isNotSmallDevice = useMediaQuery({ query: '(min-width: 1024px)' });

  const { sessionData } = usePlayerContext();
  const [toggleSitebar, setToggleSitebar] = useState(false);
  const [smallDevice, setSmallDevice] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const links = [
    {
      name: 'component.bottombar.about',
      link: '/about/us',
      external: false,
    },
    {
      name: 'component.bottombar.contribute',
      link: '/about/contribute',
      external: false,
    },
    {
      name: 'component.bottombar.tos',
      link: '/about/tos',
      external: false,
    },
    {
      name: 'component.bottombar.privacy',
      link: '/about/privacy',
      external: false,
    },
    {
      name: 'component.bottombar.troubleshooting',
      link: '/about/troubleshooting',
      external: false,
    },
    {
      name: 'component.bottombar.faqM',
      link: '/about/faq',
      external: false,
    },
  ];

  const socials = [
    {
      name: 'Discord',
      icon: faDiscord,
      color: 'hover:text-orange-700',
      link: 'https://discord.gg/df4paUq',
    },
    {
      name: 'Twitter',
      icon: faTwitter,
      color: 'hover:text-blue-400',
      link: 'https://twitter.com/KeymashGame',
    },
    {
      name: 'Reddit',
      icon: faReddit,
      color: 'hover:text-orange-700',
      link: 'https://reddit.com/r/Keymash',
    },
    {
      name: 'Patreon',
      icon: faPatreon,
      color: 'hover:text-red-600',
      link: 'https://patreon.com/KeymashGame',
    },
    {
      name: 'Merch',
      icon: faStoreAlt,
      color: 'hover:text-orange-700',
      link: 'https://keymash.creator-spring.com/',
    },
    {
      name: 'GitHub',
      icon: faGithub,
      color: 'hover:text-gray-400',
      link: 'https://github.com/Keyma-sh/next',
    },
  ];

  const navCSS = `desktopNav-item`;
  const activeCSS = `levelbar-active`;

  const mobileNavCSS = `mobileNav-item`;
  const mobileActiveCSS = `levelbar-active`;

  const handleDeviceSizing = () => setSmallDevice(!isNotSmallDevice);
  const handleDeviceScrolling = () => setScroll(window.scrollY > 20);

  useEffect(() => {
    handleDeviceSizing();
    handleDeviceScrolling();
    if (typeof window !== `undefined`) {
      window?.addEventListener(`resize`, handleDeviceSizing);
      window?.addEventListener('scroll', handleDeviceScrolling);
    }

    return () => {
      window?.removeEventListener('resize', handleDeviceSizing);
      window?.removeEventListener('scroll', handleDeviceScrolling);
    };
  }, [isNotSmallDevice]);

  const renderDropdown = () => (
    <div className={`dropdown w-40 ${toggleSitebar ? 'is-open' : 'is-not'}`} style={{ marginTop: '4rem' }}>
      {links.map((item) => (
        <Link key={item.link} to={item.link} onClick={() => setToggleSitebar(false)} className={`item ${router.asPath.startsWith(item.link) && 'is-active'}`}>
          {t(item.name)}
        </Link>
      ))}

      <div className="border-t border-gray-500" />

      {socials.map((item) => (
        <a key={item.link} href={item.link} target="_blank" rel="noreferrer" className={'item'}>
          <div className="flex">
            <div className={'w-8'}>
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div className={'w-auto'}>{item.name}</div>
          </div>
        </a>
      ))}
    </div>
  );

  return smallDevice ? (
    <>
      <div className={'fixed top-0 left-0 right-0 z-50 bg-gray-775 shadow'}>
        <div className={'flex py-1 px-10 justify-between'}>
          <div className={'w-auto pt-1 my-auto relative'}>
            <button type={'button'} onClick={() => setToggleSitebar(!toggleSitebar)} className={'w-8 my-auto focus:outline-none'}>
              <img src={'/assets/logo_icon.svg'} alt={'Logo'} className={'w-full h-auto'} />
            </button>
            {renderDropdown()}
          </div>
          <div className={'w-auto'}>
            <Userbar />
          </div>
        </div>
      </div>

      <div className={'fixed grid grid-cols-5 bottom-0 left-0 right-0 z-50 navigationBar is-mobile'}>
        <Link to={'/'} className={`${mobileNavCSS} ${router.asPath === '/' && mobileActiveCSS} text-center text-xxs`}>
          <FontAwesomeIcon icon={faHome} className={'text-2xl'} />
        </Link>
        <Link to={'/about/us'} className={`${mobileNavCSS} ${router.asPath === '/play' && mobileActiveCSS} text-center text-xxs`}>
          <FontAwesomeIcon icon={faInfoCircle} className={'text-2xl'} />
        </Link>
        <Link to={'/news'} className={`${mobileNavCSS} ${router.asPath.startsWith('/news') && mobileActiveCSS} text-center text-xxs`}>
          <FontAwesomeIcon icon={faNewspaper} className={'text-2xl'} />
        </Link>
        <Link to={'/leaderboards'} className={`${mobileNavCSS} ${router.asPath.startsWith('/leaderboards') && mobileActiveCSS} text-center text-xxs`}>
          <FontAwesomeIcon icon={faListAlt} className={'text-2xl'} />
        </Link>
        <Link to={'/competitions'} className={`${mobileNavCSS} ${router.asPath.startsWith('/competitions') && mobileActiveCSS} text-center text-xxs`}>
          <FontAwesomeIcon icon={faTrophy} className={'text-2xl'} />
        </Link>
      </div>
    </>
  ) : (
    <>
      {scroll && (
        <button type="button" onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })} className="z-50 button gray border border-gray-700 fixed bottom-16 right-16 w-12 h-12">
          <FontAwesomeIcon icon={faCaretUp} className="text-2xl m-auto" />
        </button>
      )}
      <div className={`hidden lg:block fixed top-0 left-0 right-0 z-50 navigationBar`}>
        <div className={'container flex'}>
          <div className="w-44 relative my-auto py-3">
            <button type={'button'} onClick={() => setToggleSitebar(!toggleSitebar)} className={`w-11 h-11 absolute -left-1 mb-px top-2 bottom-0 h-full ${toggleSitebar ? 'opacity-10' : 'opacity-0 hover:opacity-10'} bg-white opacity-0 rounded-xl transition ease-in-out duration-300`} />
            <Link to="/" className="my-auto">
              <img src={'/assets/logo_text.svg'} alt={'Logo'} className={'w-full h-auto'} />
            </Link>

            {renderDropdown()}
          </div>
          <Link to={'/'} className={`${navCSS} ${router.asPath === '/' && activeCSS}`}>
            {t('component.navbar.play')}
          </Link>
          <Link to={'/news'} className={`${navCSS} ${router.asPath.startsWith('/news') && activeCSS}`}>
            {t('component.navbar.news')}
          </Link>
          <Link to={'/leaderboards'} className={`${navCSS} ${router.asPath.startsWith('/leaderboards') && activeCSS}`}>
            {t('component.navbar.leaders')}
          </Link>
          <Link to={'/competitions'} className={`${navCSS} ${router.asPath.startsWith('/competitions') && activeCSS}`}>
            {t('component.navbar.tournaments')}
          </Link>
          {sessionData && sessionData.authName !== 'Guest' && (
            <Link to={'/shop'} className={`hidden xl:block ${navCSS} ${router.asPath.startsWith('/shop') && activeCSS}`}>
              Item {t('component.navbar.shop')}
            </Link>
          )}
          {sessionData && (
            <div className={'ml-auto my-auto w-80'}>
              <div className={'flex justify-end py-1'}>
                <Userbar />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Levelbar;
