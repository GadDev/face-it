export default function VerifyPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-10">
          <div className="container px-4 md:px-6">
            <h1 className="text-2xl font-semibold md:text-2xl">Verify page</h1>
            <p>
              This page is intended to verify that Redux state is persisted
              across page navigations.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
