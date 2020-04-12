import Head from 'next/head'

const renderTimeline = ({ userName }) => {
  return (
    <div className="flex-1 overflow-y-auto p-1">
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

const Index = () => (
  <div className="wrapper">
    <Head>
      <title>Hertha BSC News</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col absolute w-full h-full overflow-hidden">
      <div className="navBar flex px-4 items-center bg-white">
        <h1 className="text-black text-lg pl-1 font-bold">
          🔵⚪️ Hertha BSC News 🔵⚪️
        </h1>
        <div className="flex-1 flex flex-col items-end pr-1">
          <button onClick={() => window.location.reload()}>Refresh 🔄</button>
        </div>
      </div>

      <div className="flex flex-row h-full p-4">
        {renderTimeline({ userName: 'HerthaBSC' })}
        {renderTimeline({ userName: 'HerthaBSC_EN' })}
        {renderTimeline({ userName: 'HerthaBSC_ES' })}
        {renderTimeline({ userName: 'HerthaBubis' })}
        {renderTimeline({ userName: 'kicker_BSC' })}
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

export default Index
