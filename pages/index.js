import Head from 'next/head'
import { supabase } from '../utils/supabaseClient'
import { Table } from './components/table';
// import Image from 'next/image'

export async function getStaticProps() {
  const { data: offhire, error } = await supabase.from('offhire_db').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      offhire
    }
  }
}

export default function Home({ offhire }) {
  return (
    <div className="h-screen">
      <Head>
        <title>Adi Dashboard</title>

      </Head>

      <main className=" ">
        <Table data_offhire={offhire} />
      </main>

    </div >
  )
}
