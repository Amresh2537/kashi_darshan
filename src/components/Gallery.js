// src/components/Gallery.js
import Image from 'next/image';

export default function Gallery() {
  const images = [
    {
      src: "/Mata Durga Temple.jpeg",
      alt: "Mata Durga Temple",
      title: "Mata Durga Temple",
      description: "Also known as Monkey Temple, built in North Indian Nagara style"
    },
    {
      src: "/Sankant Mochan.jpeg", 
      alt: "Sankat Mochan Temple",
      title: "Sankat Mochan Temple",
      description: "Dedicated to Lord Hanuman, built by Pandit Madan Mohan Malviya"
    },
    {
      src: "/Kal Bhairav Temple.jpeg",
      alt: "Kal Bhairav Temple", 
      title: "Kal Bhairav Temple",
      description: "Temple dedicated to the fierce form of Lord Shiva"
    },
    {
      src: "/Arti.jpeg",
      alt: "Ganga Aarti", 
      title: "Ganga Aarti",
      description: "Divine evening Ganga Aarti ceremony at the ghats"
    },
    {
      src: "/Sarnath.jpeg",
      alt: "Sarnath",
      title: "Sarnath",
      description: "Where Lord Buddha delivered his first sermon after enlightenment"
    },
    {
      src: "/Namo Ghat.jpeg",
      alt: "Namo Ghat",
      title: "Namo Ghat",
      description: "Renovated ghat with giant Namaste statues and Ganga Aarti"
    },
    {
      src: "/Annapurna Mandir.jpeg",
      alt: "Annapurna Mandir",
      title: "Annapurna Mandir",
      description: "Dedicated to Annapurna, the goddess of food"
    },
    {
      src: "/Shri Vishalakshi Mata Mandir.jpeg",
      alt: "Shri Vishalakshi Mata Mandir",
      title: "Shri Vishalakshi Mata Mandir", 
      description: "Prominent temple dedicated to goddess Vishalakshi"
    },
    {
      src: "/Tulsi Manas Temple.jpeg",
      alt: "Tulsi Manas Temple",
      title: "Tulsi Manas Temple",
      description: "Known for saint-poet Tulsidas who authored Ramcharitmanas"
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-800 mb-4">Divine Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the spiritual beauty and sacred temples of Kashi through our divine gallery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition duration-500">
                  <h3 className="text-white font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition duration-500 delay-200">
                    {image.title}
                  </h3>
                  <p className="text-amber-100 text-sm opacity-0 group-hover:opacity-100 transition duration-500 delay-300">
                    {image.description}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}