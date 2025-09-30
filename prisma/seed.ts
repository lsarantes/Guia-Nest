import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // 1️⃣ Crear Tenant principal (si no existe)
  const tenant = await prisma.tenant.upsert({
    where: { id: 1 }, // o usa { name: 'Tenant Principal' } si quieres
    update: {},
    create: {
      name: 'Tenant Principal',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // 2️⃣ Crear usuario ADMIN asociado al tenant
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Administrador',
      password: 'admin123', // ⚠️ En un proyecto real, encripta la contraseña
      telephone: '8888-8888',
      role: Role.ADMIN,
      tenantId: tenant.id,
    },
  });

  // 3️⃣ Crear algunos usuarios normales (opcional)
  const usersData = [
    {
      email: 'usuario1@example.com',
      name: 'Usuario Uno',
      password: '123456',
      telephone: '8888-1111',
      role: Role.USER,
      tenantId: tenant.id,
    },
    {
      email: 'usuario2@example.com',
      name: 'Usuario Dos',
      password: '123456',
      telephone: '8888-2222',
      role: Role.USER,
      tenantId: tenant.id,
    },
  ];

  // Usamos for...of para evitar problemas con ESLint y async
  for (const user of usersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('✅ Seed ejecutado correctamente');
}

// Ejecutar main sin retornar promesa en un callback
main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect(); // sin await ni async
  });
