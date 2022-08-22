import { motion } from "framer-motion";
import { ImStarFull, ImStarHalf } from "react-icons/im";

interface CardProps {
  name: string;
  address: string;
  stars: number;
  url?: string;
  imgUrl: string;
}

export default function Card({ name, address, stars, url, imgUrl }: CardProps) {
  return (
    <motion.div
      className="absolute bottom-6 left-0 right-0 mx-auto my-0 w-80"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <div className="flex gap-2 p-2 rounded-lg shadow-xl bg-zinc-800 text-white">
        <div className="w-28">
          <p>
            <img src={imgUrl} alt={`Cat for ${name}`} className="rounded" />
          </p>
        </div>
        <div className="grow">
          <h1 className="font-bold">
            {url && (
              <a
                href={url}
                className="text-sky-400"
                target="_blank"
                rel="noreferrer"
              >
                {name}
              </a>
            )}
            {!url && name}
          </h1>
          <p className="text-sm">{address}</p>
          <div className="flex items-center gap-1 text-sm text-amber-400">
            {Array.from({ length: Math.trunc(stars) }).map((_, i) => (
              <ImStarFull key={i} />
            ))}
            {stars !== Math.trunc(stars) && <ImStarHalf />}
            <span className="text-white">{stars}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
