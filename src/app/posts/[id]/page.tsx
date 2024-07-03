import { PostDetail } from './components/post-detail'

export default function PersonPage({ params }: { params: { id: string } }) {
  const { id } = params

  return <PostDetail id={parseInt(id, 10)} />
}
