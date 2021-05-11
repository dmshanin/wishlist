import Nav from '@/components/nav'
import Container from '@/components/container'
import dynamic from "next/dynamic";

const EntryForm = dynamic(
    () => import('@/components/entry-form'),
    { ssr: false }
)

export default function NewEntryPage() {
  return (
    <>
      <Nav title="New" />
      <Container className="w-full lg:w-2/4">
        <EntryForm />
      </Container>
    </>
  )
}
