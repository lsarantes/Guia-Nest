import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // Datos de los tenants según la imagen
  const tenantsData = [
    { id: 1, name: 'Tech Solutions' },
    { id: 2, name: 'Marketing Pro' },
    { id: 3, name: 'Consulting Exp' },
  ];

  for (const tenantInfo of tenantsData) {
    // Crear o actualizar tenant
    const tenant = await prisma.tenant.upsert({
      where: { id: tenantInfo.id },
      update: {},
      create: {
        name: tenantInfo.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Crear dos usuarios por tenant
    const usersData = [
      {
        email: `admin_${tenant.id}@example.com`,
        name: `Admin ${tenant.name}`,
        password: 'admin123',
        telephone: '8888-0000',
        role: Role.ADMIN,
        tenantId: tenant.id,
      },
      {
        email: `user_${tenant.id}@example.com`,
        name: `User ${tenant.name}`,
        password: 'user123',
        telephone: '8888-1111',
        role: Role.USER,
        tenantId: tenant.id,
      },
    ];

    for (const user of usersData) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
    }
  }

  console.log('✅ Seed ejecutado correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
