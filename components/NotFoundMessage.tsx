// components/NotFoundMessage.tsx
import Link from "next/link";
import { GiMushroomGills } from "react-icons/gi";

const NotFoundMessage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <GiMushroomGills className="text-6xl text-green-600" />
      <p className="mt-3 text-4xl font-bold text-gray-800">
        Artículo no Encontrado
      </p>
      <p className="mt-2 text-lg text-gray-600">
        Parece que el hongo mágico se ha escondido. No pudimos encontrar el
        artículo que estás buscando.
      </p>
      <p className="text-md mt-2 text-gray-500">
        Explora más sobre Ganoexcel y el Ganoderma Lucidum en nuestra
        <span className="text-blue-500 hover:text-blue-700">
          <Link href="/blog"> página de blog</Link>
        </span>
        .
      </p>
    </div>
  );
};

export default NotFoundMessage;
