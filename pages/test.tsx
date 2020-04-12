import { NextPage } from 'next'

const Test: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  return <div>Test {userAgent}</div>
}

Test.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default Test
