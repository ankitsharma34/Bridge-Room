import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-md">
        BR
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">BridgeRoom</h1>

        <p className="text-sm text-muted-foreground">
          Connect. Collaborate. Hangout.
        </p>
      </div>
    </Link>
  );
};

export default Logo;
