import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/lists">Lists</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
