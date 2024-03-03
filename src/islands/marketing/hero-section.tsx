
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Balancer } from "react-wrap-balancer";

import { Link } from "~/navigation";
import { typography } from "~/server/text";

export function HeroSection() {
  const t = useTranslations("landing");





  return (
    <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px]">
      {" "}
      {/* Ajusta la altura según necesites */}
      <Image
        src="/images/hero-home-240115.png" // Reemplaza con la ruta de tu imagen
        alt="Descripción de la imagen"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      {/* Capa de superposición con fondo tenue */}
      <div className="absolute inset-0 flex items-center justify-center ">
        {" "}
        {/* Ajusta la opacidad según necesites */}
      <Balancer
        as="h1"
        className="text-2xl leading-[1.4] tracking-tighter sm:text-2xl md:text-3xl xl:text-4xl" // Ajusta el estilo del texto según necesites
      >
        <span className="block max-w-5xl lg:rounded-md bg-black/50 px-4 leading-normal text-white">{t("heading")}</span>
      </Balancer>
      </div>
    </div>
  );
}
