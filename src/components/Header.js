import { Container } from './Container'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Workshops', href: '/workshops' },
  { name: 'Sample Apps', href: '/apps' },
  { name: 'Starter Apps', href: '/starters' },
]

export default function Header() {
  return (
    <header className="relative z-50 pb-11 lg:pt-11">

      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="ml-8 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <button className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                href="{link.href}">{link.name}</button>
              ))}
            </div>
      </Container>
    </header>
  )
}
