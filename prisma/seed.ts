import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ResourceTypes = [
  'Oxygen',
  'Food',
  'Energy',
];

async function main() {
  // Eliminar recursos existentes
  await prisma.resource.deleteMany();

  // Crear recursos iniciales
  for (const type of ResourceTypes) {
    await prisma.resource.create({
      data: {
        type,
        level: 100,
        critical: false,
      },
    });
  }

  console.log('Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
