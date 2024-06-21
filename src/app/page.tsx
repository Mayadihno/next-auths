import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <h3 className="text-4xl">Landing page</h3>

      <Link href={"/products"} className=" text-3xl underline">
        All products
      </Link>
    </div>
  );
}
