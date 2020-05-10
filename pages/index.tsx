import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import cx from 'classnames'
import MobileDetect from 'mobile-detect'

/************
 * Timeline
 ***********/

type Timeline = { userName: string; logo: string; flag?: string }

const timelines: Timeline[] = [
  { userName: 'HerthaBSC', flag: '🇩🇪', logo: '/assets/hertha-logo-de.jpg' },
  { userName: 'HerthaBSC_EN', flag: '🇬🇧', logo: '/assets/hertha-logo-en.jpg' },
  { userName: 'HerthaBSC_ES', flag: '🇪🇦', logo: '/assets/hertha-logo-en.jpg' },
  {
    userName: 'HerthaBubis',
    logo: '/assets/hertha-logo-bubis.jpg',
    // flag: '🇬🇧',
  },
  {
    userName: 'kicker_BSC',
    logo: '/assets/hertha-logo-kicker.jpg',
    // flag: '🇬🇧',
  },
]

const renderTimeline: React.FC<Timeline> = ({ userName }) => {
  return (
    <div className="flex-1 overflow-y-auto p-1" key={userName}>
      <a
        data-theme="dark"
        className="twitter-timeline"
        href={`https://twitter.com/${userName}?ref_src=twsrc%5Etfw`}
      >
        Tweets by @{userName}
      </a>{' '}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        // charset="utf-8"
      ></script>
    </div>
  )
}

/************
 * Logos
 ***********/

type ProfileLogosProps = { activeList: Object; onClick: Function }

const ProfileLogos: React.FC<ProfileLogosProps> = ({ activeList, onClick }) => {
  return (
    <div className="flex">
      {timelines.map((timeline, index) => (
        <div
          className={cx('pl-1 pr-2 relative', {
            inactive: !activeList[timeline.userName],
          })}
          key={index}
          onClick={() => onClick(timeline.userName)}
        >
          <img
            src={timeline.logo}
            className="timeline-logo sm:h-16 border-white border-2 cursor-pointer"
            // h-12
          />
          {timeline.flag && (
            <span className="timeline-logo-flag absolute text-2xl sm:text-3xl pl-8 sm:pl-12">
              {timeline.flag}
            </span>
          )}
        </div>
      ))}
      <style jsx>{`
        .timeline-logo {
          border-radius: 50%;
        }

        .timeline-logo-flag {
          bottom: 0px;
        }

        .inactive {
          filter: grayscale(100%);
          opacity: 0.8;
        }
      `}</style>
    </div>
  )
}

const initialStateDesktop = timelines.reduce((acc, timeline) => {
  acc[timeline.userName] = true
  return acc
}, {})

/************
 * Index
 ***********/

const initialStateMobile = { HerthaBSC: true }

// // type IndexProps = { isMobile: Boolean }
// interface StatelessPage {
//   isMobile: Boolean
// }

const Index: NextPage<any> = ({ isMobile }) => {
  const [activeList, setActive] = useState(
    isMobile ? initialStateMobile : initialStateDesktop
  )

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('useEffect', { isMobile })
    // setActive(isMobile ? initialStateMobile : initialStateDesktop)
  }, [isMobile])

  console.log('render', { isMobile })
  console.log({ activeList })

  const toggleItem = (item) => {
    console.log('toggleItem', item)

    if (isMobile) {
      const disableAll = timelines.reduce((acc, timeline) => {
        acc[timeline.userName] = false
        return acc
      }, {})

      setActive({
        ...disableAll,
        [item]: !activeList[item],
      })
    } else {
      setActive({
        ...activeList,
        [item]: !activeList[item],
      })
    }

    window['twttr'].widgets.load()
  }

  return (
    <div className="wrapper">
      <Head>
        <title>Hertha BSC News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col absolute w-full h-full overflow-hidden">
        {/* navbar */}
        <div className="navBar flex px-4 items-center bg-white">
          <h1 className="text-black text-lg pl-1 font-bold">
            Hertha BSC News 🔵⚪️
          </h1>
          <div className="flex-1 flex flex-col items-end pr-1 text-2xl">
            <button onClick={() => window.location.reload()}>🔄</button>
          </div>
        </div>

        <div className="px-4 pt-4">
          <ProfileLogos
            activeList={activeList}
            onClick={(userName) => toggleItem(userName)}
          />
        </div>

        {/* timelines */}
        <div className="flex flex-row h-full p-1 pb-0 md:p-4 md:pb-0">
          {timelines.map(
            (timeline) =>
              activeList[timeline.userName] && renderTimeline(timeline)
          )}
        </div>
      </main>

      <style jsx>{`
        main {
          background-color: #005ca9;
          background-image: linear-gradient(
            90deg,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%
          );
          background-size: 100px 100px;
        }

        .navBar {
          min-height: 50px;
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  const mobileDetect = new MobileDetect(userAgent)

  return { isMobile: mobileDetect.phone() }
}

export default Index
