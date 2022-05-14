import Link from "next/link"

export default function FirstPost() {
  return <>
    <h1>First Post.</h1>
    <div>
      Read{' '}
      <Link href="./FetchData">
        <a>Fetch data.</a>
      </Link>
    </div>
  </>
}
