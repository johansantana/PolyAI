import { deleteChat } from '@/lib/chat-store'

export async function DELETE(request: Request) {
  const { id } = await request.json()

  if (!id) {
    return new Response('Chat ID is required', { status: 400 })
  }

  try {
    await deleteChat(id)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting chat:', error)
    return new Response('Failed to delete chat', { status: 500 })
  }
}
