import { render, screen } from '@testing-library/react'
import { Button, buttonVariants } from '@/components/ui/button'

describe('Button Component', () => {
  test('renders default button', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button', { name: /default/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(
      buttonVariants({ variant: 'default', size: 'default' }),
    )
  })

  test('renders button with different variants', () => {
    render(
      <>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </>,
    )

    expect(screen.getByRole('button', { name: /destructive/i })).toHaveClass(
      buttonVariants({ variant: 'destructive' }),
    )
    expect(screen.getByRole('button', { name: /outline/i })).toHaveClass(
      buttonVariants({ variant: 'outline' }),
    )
    expect(screen.getByRole('button', { name: /secondary/i })).toHaveClass(
      buttonVariants({ variant: 'secondary' }),
    )
    expect(screen.getByRole('button', { name: /ghost/i })).toHaveClass(
      buttonVariants({ variant: 'ghost' }),
    )
    expect(screen.getByRole('button', { name: /link/i })).toHaveClass(
      buttonVariants({ variant: 'link' }),
    )
  })

  test('renders button with different sizes', () => {
    render(
      <>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">
          <span role="img" aria-label="icon">
            👍
          </span>
        </Button>
      </>,
    )

    expect(screen.getByRole('button', { name: /small/i })).toHaveClass(
      buttonVariants({ size: 'sm' }),
    )
    expect(screen.getByRole('button', { name: /large/i })).toHaveClass(
      buttonVariants({ size: 'lg' }),
    )
    expect(screen.getByRole('button', { name: /icon/i })).toHaveClass(
      buttonVariants({ size: 'icon' }),
    )
  })

  test('renders button with asChild prop', () => {
    render(
      <Button asChild>
        <a href="/link">Link Button</a>
      </Button>,
    )
    const linkButton = screen.getByRole('link', { name: /link button/i })
    expect(linkButton).toBeInTheDocument()
    expect(linkButton).toHaveClass(
      buttonVariants({ variant: 'default', size: 'default' }),
    )
    expect(linkButton).toHaveAttribute('href', '/link')
  })

  test('renders button with custom className', () => {
    render(<Button className="custom-class">Custom Class</Button>)
    const button = screen.getByRole('button', { name: /custom class/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('custom-class')
  })

  test('renders disabled button', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
    expect(button).toHaveClass(
      'disabled:pointer-events-none disabled:opacity-50',
    )
  })
})
