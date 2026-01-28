import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

const lenderLogos = [
  {
    id: 1,
    name: 'Commonwealth Bank',
    url: 'https://static.wixstatic.com/media/e994c8_0359024120594bb69bb7fcc35fec3e2f~mv2.png',
  },
  {
    id: 2,
    name: 'MoneyMe',
    url: 'https://static.wixstatic.com/media/e994c8_9696772f5a72435c986deb481038109e~mv2.png',
  },
  {
    id: 3,
    name: 'Dynamoney',
    url: 'https://static.wixstatic.com/media/e994c8_60834c4e297c47bca76c734107f17796~mv2.png',
  },
  {
    id: 4,
    name: 'Macquarie',
    url: 'https://static.wixstatic.com/media/e994c8_7e43ebf3014c4a849277c534be2291a0~mv2.png',
  },
  {
    id: 5,
    name: 'Great Southern Bank',
    url: 'https://static.wixstatic.com/media/e994c8_3cc395e3813243d99a9bc24c85636304~mv2.png',
  },
  {
    id: 6,
    name: 'Pepper Money',
    url: 'https://static.wixstatic.com/media/e994c8_d9752866db584cbab271ca9bb3f6f59d~mv2.png',
  },
  {
    id: 7,
    name: 'Resimac',
    url: 'https://static.wixstatic.com/media/e994c8_e33f0cf0c0264bd094a8905b455a7510~mv2.png',
  },
  {
    id: 8,
    name: 'Latitude',
    url: 'https://static.wixstatic.com/media/e994c8_325d524ef9464e7cb028d020361698c7~mv2.png',
  },
  {
    id: 9,
    name: 'Angle Finance',
    url: 'https://static.wixstatic.com/media/e994c8_68a81b4652064bad944d67170b4de484~mv2.png',
  },
  {
    id: 10,
    name: 'AMP',
    url: 'https://static.wixstatic.com/media/e994c8_f190cbdb58f94528887947c71f53917b~mv2.png',
  },
  {
    id: 11,
    name: 'ANZ',
    url: 'https://static.wixstatic.com/media/e994c8_0d92328ce3bc4c73b7400b882a7f8faf~mv2.png',
  },
  {
    id: 12,
    name: 'Uwisr',
    url: 'https://static.wixstatic.com/media/e994c8_e3b287c35f434024a4d5c49cf6852793~mv2.png',
  },
  {
    id: 13,
    name: 'Plenti',
    url: 'https://static.wixstatic.com/media/e994c8_b73ae233a07c4e6db97724337bc74580~mv2.png',
  },
  {
    id: 14,
    name: 'Prospa',
    url: 'https://static.wixstatic.com/media/e994c8_e2c60f0c2b4c4ec18fb64290e27a18ab~mv2.png',
  },
  {
    id: 15,
    name: 'Now Finance',
    url: 'https://static.wixstatic.com/media/e994c8_6bb0cb140cf545259f9f0f070d1a0681~mv2.png',
  },
  {
    id: 16,
    name: 'Bendigo Bank',
    url: 'https://static.wixstatic.com/media/e994c8_4ff00877571140e8b88befddb02172f8~mv2.png',
  },
  {
    id: 17,
    name: 'La Trobe Financial',
    url: 'https://static.wixstatic.com/media/e994c8_650487733cc04c18ba087188953124ce~mv2.png',
  },
  {
    id: 18,
    name: 'ING',
    url: 'https://static.wixstatic.com/media/e994c8_dc5a3b19241a474bb65b5a3e56e21836~mv2.png',
  },
  {
    id: 19,
    name: 'Ubank',
    url: 'https://static.wixstatic.com/media/e994c8_9ed79fd00fbb4a2f967fe01739c8d374~mv2.png',
  },
  {
    id: 20,
    name: 'Suncorp',
    url: 'https://static.wixstatic.com/media/e994c8_815f1d8bd81a46f68f4ae098c4c59f48~mv2.png',
  },
  {
    id: 21,
    name: 'Westpac',
    url: 'https://static.wixstatic.com/media/e994c8_d6302baee6c94a19baaae8edbba12092~mv2.png',
  },
  {
    id: 22,
    name: 'NAB',
    url: 'https://static.wixstatic.com/media/e994c8_e41caba14a1745c694d8c222ff3d1c75~mv2.png',
  },
  {
    id: 23,
    name: 'Firstmac',
    url: 'https://static.wixstatic.com/media/e994c8_c02ec9c950b145cabe9a7b5226e4e510~mv2.png',
  },
  {
    id: 24,
    name: 'Branded Financial Services',
    url: 'https://static.wixstatic.com/media/e994c8_57b4d01d34ea48d08ce45ae5e15f0310~mv2.png',
  },
  {
    id: 25,
    name: 'ME Bank',
    url: 'https://static.wixstatic.com/media/e994c8_4f71a85fb6124f3eb5b03b7ac4adf4be~mv2.png',
  },
  {
    id: 26,
    name: 'St George',
    url: 'https://static.wixstatic.com/media/e994c8_a97a60fa787549e5836da9b0be2e282e~mv2.png',
  },
  {
    id: 27,
    name: 'Hejaz',
    url: 'https://static.wixstatic.com/media/e994c8_acb0af2b43514152a85c55bc91424648~mv2.png',
  },
  {
    id: 28,
    name: 'HSBC',
    url: 'https://static.wixstatic.com/media/e994c8_e8dcc9b7ad6c402f9a517c008a77451d~mv2.png',
  },
  {
    id: 29,
    name: 'Bankwest',
    url: 'https://static.wixstatic.com/media/e994c8_e48b903309394e608ed3e7dde95094ea~mv2.png',
  },
  {
    id: 30,
    name: 'Qudos Bank',
    url: 'https://static.wixstatic.com/media/e994c8_3970f51038054d58949c421b568be16b~mv2.png',
  },
];

export default function LendersCarousel() {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...lenderLogos, ...lenderLogos];

  return (
    <div className="w-full bg-light-gray rounded-3xl p-8 md:p-12">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
        Some Of Our Trusted Lenders
      </h2>

      {/* Carousel Container */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-light-gray to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-light-gray to-transparent z-10 pointer-events-none" />

        {/* Infinite Scrolling Carousel */}
        <motion.div
          className="flex gap-4 md:gap-6"
          animate={{ x: isHovered ? 0 : -100 }}
          transition={{
            duration: isHovered ? 0 : 5,
            ease: isHovered ? 'easeInOut' : 'linear',
            repeat: isHovered ? 0 : Infinity,
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 w-32 md:w-40 h-24 md:h-28 flex items-center justify-center bg-white rounded-2xl p-4 hover:bg-gradient-to-br hover:from-white hover:to-accent/5 transition-all duration-300"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={logo.url}
                alt={logo.name}
                width={140}
                height={100}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(lenderLogos.length / 6) }).map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-foreground/20"
            animate={{
              backgroundColor: index === 0 ? '#0d4d3e' : 'rgba(51, 51, 51, 0.2)',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
