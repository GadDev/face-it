'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Post } from '@/lib/features/api/types'

interface PostItemProps extends Partial<Post> {
  highlighted?: boolean
}

export const PostItem = ({
  title,
  body,
  userId,
  highlighted,
}: PostItemProps) => {
  return (
    <div
      className={`overflow-hidden rounded-lg bg-white shadow-sm dark:bg-black ${highlighted ? 'dark:bg-red bg-amber-400' : ''}`}
    >
      <div className="flex items-center bg-muted px-4 py-3">
        <Avatar className="mr-3 h-8 w-8">
          <AvatarImage src={`https://i.pravatar.cc/150?img=${userId}`} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-medium text-foreground">John Doe</h3>
          <p className="text-xs text-muted-foreground">Author</p>
        </div>
      </div>
      <div className="px-5 py-8 dark:bg-gray-100/40">
        <h2 className="mb-2 text-lg font-medium text-foreground">{title}</h2>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {body?.substring(0, 100)}...
        </p>
      </div>
    </div>
  )
}
