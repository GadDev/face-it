import { cn } from '@/lib/utils'

describe('cn', () => {
  it('should merge classes correctly', () => {
    const result = cn('bg-blue-500', 'text-white')
    expect(result).toBe('bg-blue-500 text-white')
  })

  it('should handle conditional classes correctly', () => {
    const isActive = true
    const isDisabled = false
    const result = cn(
      'px-4',
      isActive && 'bg-blue-500',
      isDisabled && 'opacity-50',
    )
    expect(result).toBe('px-4 bg-blue-500')
  })

  it('should merge Tailwind CSS classes without conflicts', () => {
    const result = cn('px-4', 'px-2')
    expect(result).toBe('px-2')
  })

  it('should handle additional custom classes', () => {
    const customClass = 'custom-class'
    const result = cn('px-4', 'bg-blue-500', customClass)
    expect(result).toBe('px-4 bg-blue-500 custom-class')
  })

  it('should return an empty string for no arguments', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle null and undefined values gracefully', () => {
    const result = cn('px-4', null, undefined, 'bg-blue-500')
    expect(result).toBe('px-4 bg-blue-500')
  })
})
