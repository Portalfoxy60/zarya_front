import { createIcon } from '@chakra-ui/react'

const TrashIcon = createIcon({
  displayName: 'TrashIcon',
  viewBox: '0 0 24 24',
  path: (
    <>
      <path
        fill="black"
        d="M3 6h18v2H3zm2 3h14v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9zm5 2v8h2v-8H10zm4 0v8h2v-8h-2zM9 4V2h6v2h5v2H4V4h5z"
      />
    </>
  ),
})

export default TrashIcon
