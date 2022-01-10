import { FingerPrintIcon, AcademicCapIcon, UserGroupIcon, GiftIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Los estudiantes podrán culminar o iniciar su formación profesional',
    description:
      'Los estudiantes pueden solicitar fondos para realizar: cursos, diplomados, pregrados y postgrados',
    icon: AcademicCapIcon,
  },
  {
    name: 'Los patrocinadores reciben NFTs como obsequio al realizar una donación',
    description:
      'Se le dan certificados NFTs a los contribuidores que los certifican como colaboradores en el crecimiento profesional de los estudiantes',
    icon: GiftIcon,
  },
  {
    name: 'La comunidad crece y se integran a la tecnología blockchain de NEAR',
    description:
      'Todo el proceso simbiótico ocurre dentro de la blockchain de NEAR y eso hace miembros de la misma a todos los que participan en el proceso',
    icon: UserGroupIcon,
  },
  {
    name: 'Las transacciones en la blockchain son inmutables, lo que garantiza una mayor transparencia',
    description:
      'La blockchain ofrece acceso público a todas las transacciones de las diferentes wallets y contratos, por ende las personas podrán auditar todo el proceso de contribuiciones ',
    icon: FingerPrintIcon,
  },
]

export default function Items() {
  return (
    <div className="py-12 bg-white" id="Items">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Plataforma crowdfunding orienda a al crecimiento profesional 
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Queremos que más personas se formen como presionales 
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-emerald-400  text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}