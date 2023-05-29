import Layout from '@/components/layouts'
import Head from 'next/head'

export default function ChangePassword() {
  return <>Change password</>
}

ChangePassword.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      <Head>
        <title>Change password</title>
      </Head>
      {page}
    </Layout>
  )
}
