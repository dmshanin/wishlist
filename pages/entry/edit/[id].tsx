import Nav from '@/components/nav'
import Container from '@/components/container'
import dynamic from "next/dynamic";

const EditEntryForm = dynamic(
    () => import('@/components/edit-entry-form'),
    { ssr: false }
)

export default function EditEntryPage() {
  return (
    <>
      <Nav title="Edit" />
      <Container>
        <EditEntryForm />
      </Container>
    </>
  )
}
