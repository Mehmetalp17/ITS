import {
  PrismaClient,
  InternshipStatus,
  InternshipOrderType,
} from '@prisma/client';

const prisma = new PrismaClient();

// A pre-hashed password for 'password123' (using bcrypt, cost 10)
// This is best practice so you don't store plain text.
const HASHED_PASSWORD =
  '$2b$10$vOqam42NDF7.qk7lcv8Hpe51Wwv9Atp/yM65eRT5fGMtSGtmtxjZe';

async function main() {
  console.log(`Start seeding ...`);

  // 1. Roles
  console.log('Seeding Roles...');
  const roleAdmin = await prisma.role.upsert({
    where: { name: 'General Admin' },
    update: {},
    create: { name: 'General Admin' },
  });
  const roleChair = await prisma.role.upsert({
    where: { name: 'Commission Chair' },
    update: {},
    create: { name: 'Commission Chair' },
  });
  const roleMember = await prisma.role.upsert({
    where: { name: 'Commission Member' },
    update: {},
    create: { name: 'Commission Member' },
  });

  // 3. Departments (Seeding before Users/Students)
console.log('Seeding Departments...');

const bilgisayarMuh = await prisma.department.upsert({
  where: { name: 'Bilgisayar Mühendisliği (İngilizce)' },
  update: {},
  create: { name: 'Bilgisayar Mühendisliği (İngilizce)' },
});

const biyomuh = await prisma.department.upsert({
  where: { name: 'Biyomühendislik (İngilizce)' },
  update: {},
  create: { name: 'Biyomühendislik (İngilizce)' },
});

const cevreMuh = await prisma.department.upsert({
  where: { name: 'Çevre Mühendisliği (İngilizce)' },
  update: {},
  create: { name: 'Çevre Mühendisliği (İngilizce)' },
});

const elektronikMuh = await prisma.department.upsert({
  where: { name: 'Elektronik Mühendisliği' },
  update: {},
  create: { name: 'Elektronik Mühendisliği' },
});

const endustriMuh = await prisma.department.upsert({
  where: { name: 'Endüstri Mühendisliği (İngilizce)' },
  update: {},
  create: { name: 'Endüstri Mühendisliği (İngilizce)' },
});

const endustriselTasarim = await prisma.department.upsert({
  where: { name: 'Endüstriyel Tasarım' },
  update: {},
  create: { name: 'Endüstriyel Tasarım' },
});

const fizik = await prisma.department.upsert({
  where: { name: 'Fizik (İngilizce)' },
  update: {},
  create: { name: 'Fizik (İngilizce)' },
});

const haritaMuh = await prisma.department.upsert({
  where: { name: 'Harita Mühendisliği' },
  update: {},
  create: { name: 'Harita Mühendisliği' },
});

const iktisat = await prisma.department.upsert({
  where: { name: 'İktisat' },
  update: {},
  create: { name: 'İktisat' },
});

const insaatMuh = await prisma.department.upsert({
  where: { name: 'İnşaat Mühendisliği (İngilizce)' },
  update: {},
  create: { name: 'İnşaat Mühendisliği (İngilizce)' },
});

const isletme = await prisma.department.upsert({
  where: { name: 'İşletme' },
  update: {},
  create: { name: 'İşletme' },
});

const kimya = await prisma.department.upsert({
  where: { name: 'Kimya (İngilizce)' },
  update: {},
  create: { name: 'Kimya (İngilizce)' },
});

const kimyaMuh = await prisma.department.upsert({
  where: { name: 'Kimya Mühendisliği (İngilizce)' },
  update: {},
  create: { name: 'Kimya Mühendisliği (İngilizce)' },
});

const makineMuh = await prisma.department.upsert({
  where: { name: 'Makine Mühendisliği (İngilizce)' },
  update: {},
  create: { name: 'Makine Mühendisliği (İngilizce)' },
});

const malzemeBilimi = await prisma.department.upsert({
  where: { name: 'Malzeme Bilimi ve Mühendisliği' },
  update: {},
  create: { name: 'Malzeme Bilimi ve Mühendisliği' },
});

const matematik = await prisma.department.upsert({
  where: { name: 'Matematik (İngilizce)' },
  update: {},
  create: { name: 'Matematik (İngilizce)' },
});

const mimarlik = await prisma.department.upsert({
  where: { name: 'Mimarlık' },
  update: {},
  create: { name: 'Mimarlık' },
});

const molekulerBiyoloji = await prisma.department.upsert({
  where: { name: 'Moleküler Biyoloji ve Genetik (İngilizce)' },
  update: {},
  create: { name: 'Moleküler Biyoloji ve Genetik (İngilizce)' },
});

const sehirPlanlama = await prisma.department.upsert({
  where: { name: 'Şehir ve Bölge Planlama' },
  update: {},
  create: { name: 'Şehir ve Bölge Planlama' },
});

const ucakMuh = await prisma.department.upsert({
  where: { name: 'Uçak Mühendisliği (İngilizce)' },
  update: {},
  create: { name: 'Uçak Mühendisliği (İngilizce)' },
});

const veriBilimi = await prisma.department.upsert({
  where: { name: 'Veri Bilimi ve Analitiği (İngilizce)' },
  update: {},
  create: { name: 'Veri Bilimi ve Analitiği (İngilizce)' },
});

const yonetimBilisim = await prisma.department.upsert({
  where: { name: 'Yönetim Bilişim Sistemleri (İngilizce)' },
  update: {},
  create: { name: 'Yönetim Bilişim Sistemleri (İngilizce)' },
});

  // 2. Users
  console.log('Seeding Users...');
  // General Admins
  await prisma.user.upsert({
    where: { username: 'admin1' },
    update: {},
    create: {
      name: 'Admin User',
      username: 'admin1',
      email: 'admin1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleAdmin.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'admin2' },
    update: {},
    create: {
      name: 'Admin Two',
      username: 'admin2',
      email: 'admin2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleAdmin.id,
    },
  });

  // Computer Engineering Staff
  await prisma.user.upsert({
    where: { username: 'ceng_chair' },
    update: {},
    create: {
      name: 'Ahmet Yılmaz',
      username: 'ceng_chair',
      email: 'ceng_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: bilgisayarMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'ceng_member1' },
    update: {},
    create: {
      name: 'Mehmet Kaya',
      username: 'ceng_member1',
      email: 'ceng_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: bilgisayarMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'ceng_member2' },
    update: {},
    create: {
      name: 'Ayşe Demir',
      username: 'ceng_member2',
      email: 'ceng_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: bilgisayarMuh.id,
    },
  });

  // Electrical Engineering Staff
  await prisma.user.upsert({
    where: { username: 'eeng_chair' },
    update: {},
    create: {
      name: 'Fatma Öztürk',
      username: 'eeng_chair',
      email: 'eeng_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: elektronikMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'eeng_member1' },
    update: {},
    create: {
      name: 'Can Arslan',
      username: 'eeng_member1',
      email: 'eeng_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: elektronikMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'eeng_member2' },
    update: {},
    create: {
      name: 'Zeynep Çelik',
      username: 'eeng_member2',
      email: 'eeng_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: elektronikMuh.id,
    },
  });

  // Mechanical Engineering Staff
  await prisma.user.upsert({
    where: { username: 'meng_chair' },
    update: {},
    create: {
      name: 'Burak Şahin',
      username: 'meng_chair',
      email: 'meng_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: makineMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'meng_member1' },
    update: {},
    create: {
      name: 'Elif Yıldız',
      username: 'meng_member1',
      email: 'meng_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: makineMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'meng_member2' },
    update: {},
    create: {
      name: 'Emre Aydın',
      username: 'meng_member2',
      email: 'meng_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: makineMuh.id,
    },
  });

  // Bioengineering Staff
  await prisma.user.upsert({
    where: { username: 'biyo_chair' },
    update: {},
    create: {
      name: 'Selin Özkan',
      username: 'biyo_chair',
      email: 'biyo_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: biyomuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'biyo_member1' },
    update: {},
    create: {
      name: 'Deniz Kara',
      username: 'biyo_member1',
      email: 'biyo_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: biyomuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'biyo_member2' },
    update: {},
    create: {
      name: 'Cengiz Yılmaz',
      username: 'biyo_member2',
      email: 'biyo_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: biyomuh.id,
    },
  });

  // Environmental Engineering Staff
  await prisma.user.upsert({
    where: { username: 'cevre_chair' },
    update: {},
    create: {
      name: 'Cem Aksu',
      username: 'cevre_chair',
      email: 'cevre_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: cevreMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'cevre_member1' },
    update: {},
    create: {
      name: 'Gökçe Erdoğan',
      username: 'cevre_member1',
      email: 'cevre_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: cevreMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'cevre_member2' },
    update: {},
    create: {
      name: 'Ayşe Demir',
      username: 'cevre_member2',
      email: 'cevre_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: cevreMuh.id,
    },
  });

  // Industrial Engineering Staff
  await prisma.user.upsert({
    where: { username: 'endustri_chair' },
    update: {},
    create: {
      name: 'Murat Taş',
      username: 'endustri_chair',
      email: 'endustri_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: endustriMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'endustri_member1' },
    update: {},
    create: {
      name: 'Esra Yılmaz',
      username: 'endustri_member1',
      email: 'endustri_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: endustriMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'endustri_member2' },
    update: {},
    create: {
      name: 'Kaan Demir',
      username: 'endustri_member2',
      email: 'endustri_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: endustriMuh.id,
    },
  });

  // Industrial Design Staff
  await prisma.user.upsert({
    where: { username: 'tasarim_chair' },
    update: {},
    create: {
      name: 'Aylin Çelik',
      username: 'tasarim_chair',
      email: 'tasarim_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: endustriselTasarim.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'tasarim_member1' },
    update: {},
    create: {
      name: 'Berk Aydın',
      username: 'tasarim_member1',
      email: 'tasarim_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: endustriselTasarim.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'tasarim_member2' },
    update: {},
    create: {
      name: 'Oğuzhan Kaya',
      username: 'tasarim_member2',
      email: 'tasarim_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: endustriselTasarim.id,
    },
  });

  // Physics Staff
  await prisma.user.upsert({
    where: { username: 'fizik_chair' },
    update: {},
    create: {
      name: 'Selim Yıldız',
      username: 'fizik_chair',
      email: 'fizik_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: fizik.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'fizik_member1' },
    update: {},
    create: {
      name: 'Ebru Kurt',
      username: 'fizik_member1',
      email: 'fizik_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: fizik.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'fizik_member2' },
    update: {},
    create: {
      name: 'Fatma Kurt',
      username: 'fizik_member2',
      email: 'fizik_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: fizik.id,
    },
  });

  // Civil Engineering Staff
  await prisma.user.upsert({
    where: { username: 'insaat_chair' },
    update: {},
    create: {
      name: 'Hakan Öztürk',
      username: 'insaat_chair',
      email: 'insaat_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: insaatMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'insaat_member1' },
    update: {},
    create: {
      name: 'Serpil Acar',
      username: 'insaat_member1',
      email: 'insaat_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: insaatMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'insaat_member2' },
    update: {},
    create: {
      name: 'Tolga Eren',
      username: 'insaat_member2',
      email: 'insaat_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: insaatMuh.id,
    },
  });

  // Chemical Engineering Staff
  await prisma.user.upsert({
    where: { username: 'kimya_muh_chair' },
    update: {},
    create: {
      name: 'Merve Şen',
      username: 'kimya_muh_chair',
      email: 'kimya_muh_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: kimyaMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'kimya_muh_member1' },
    update: {},
    create: {
      name: 'Arda Tekin',
      username: 'kimya_muh_member1',
      email: 'kimya_muh_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: kimyaMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'kimya_muh_member2' },
    update: {},
    create: {
      name: 'Murat Sert',
      username: 'kimya_muh_member2',
      email: 'kimya_muh_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: kimyaMuh.id,
    },
  });

  // Aerospace Engineering Staff
  await prisma.user.upsert({
    where: { username: 'ucak_chair' },
    update: {},
    create: {
      name: 'Yusuf Kılıç',
      username: 'ucak_chair',
      email: 'ucak_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: ucakMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'ucak_member1' },
    update: {},
    create: {
      name: 'Seda Yalçın',
      username: 'ucak_member1',
      email: 'ucak_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: ucakMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'ucak_member2' },
    update: {},
    create: {
      name: 'Barış Koç',
      username: 'ucak_member2',
      email: 'ucak_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: ucakMuh.id,
    },
  });

  // Data Science Staff
  await prisma.user.upsert({
    where: { username: 'veri_chair' },
    update: {},
    create: {
      name: 'Canan Polat',
      username: 'veri_chair',
      email: 'veri_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: veriBilimi.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'veri_member1' },
    update: {},
    create: {
      name: 'Onur Akyüz',
      username: 'veri_member1',
      email: 'veri_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: veriBilimi.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'veri_member2' },
    update: {},
    create: {
      name: 'Onurcan Yakamoz',
      username: 'veri_member2',
      email: 'veri_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: veriBilimi.id,
    },
  });

  // Architecture Staff
  await prisma.user.upsert({
    where: { username: 'mimarlik_chair' },
    update: {},
    create: {
      name: 'Sinan Kartal',
      username: 'mimarlik_chair',
      email: 'mimarlik_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: mimarlik.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'mimarlik_member1' },
    update: {},
    create: {
      name: 'İrem Doğan',
      username: 'mimarlik_member1',
      email: 'mimarlik_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: mimarlik.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'mimarlik_member2' },
    update: {},
    create: {
      name: 'Selin Çetin',
      username: 'mimarlik_member2',
      email: 'mimarlik_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: mimarlik.id,
    },
  });

  // Surveying Engineering Staff
  await prisma.user.upsert({
    where: { username: 'harita_chair' },
    update: {},
    create: {
      name: 'Levent Kaya',
      username: 'harita_chair',
      email: 'harita_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: haritaMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'harita_member1' },
    update: {},
    create: {
      name: 'Sevgi Aksoy',
      username: 'harita_member1',
      email: 'harita_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: haritaMuh.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'harita_member2' },
    update: {},
    create: {
      name: 'Selvi Akar',
      username: 'harita_member2',
      email: 'harita_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: haritaMuh.id,
    },
  });

  // Economics Staff
  await prisma.user.upsert({
    where: { username: 'iktisat_chair' },
    update: {},
    create: {
      name: 'Kemal Ünlü',
      username: 'iktisat_chair',
      email: 'iktisat_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: iktisat.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'iktisat_member1' },
    update: {},
    create: {
      name: 'Hülya Güven',
      username: 'iktisat_member1',
      email: 'iktisat_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: iktisat.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'iktisat_member2' },
    update: {},
    create: {
      name: 'Murat Özer',
      username: 'iktisat_member2',
      email: 'iktisat_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: iktisat.id,
    },
  });

  // Business Administration Staff
  await prisma.user.upsert({
    where: { username: 'isletme_chair' },
    update: {},
    create: {
      name: 'Nejat Bozkurt',
      username: 'isletme_chair',
      email: 'isletme_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: isletme.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'isletme_member1' },
    update: {},
    create: {
      name: 'Pelin Öztürk',
      username: 'isletme_member1',
      email: 'isletme_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: isletme.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'isletme_member2' },
    update: {},
    create: {
      name: 'Tamer Arslan',
      username: 'isletme_member2',
      email: 'isletme_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: isletme.id,
    },
  });

  // Chemistry Staff
  await prisma.user.upsert({
    where: { username: 'kimya_chair' },
    update: {},
    create: {
      name: 'Nilgün Sever',
      username: 'kimya_chair',
      email: 'kimya_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: kimya.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'kimya_member1' },
    update: {},
    create: {
      name: 'Kerem Deniz',
      username: 'kimya_member1',
      email: 'kimya_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: kimya.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'kimya_member2' },
    update: {},
    create: {
      name: 'Kerim Alp',
      username: 'kimya_member2',
      email: 'kimya_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: kimya.id,
    },
  });

  // Materials Science Staff
  await prisma.user.upsert({
    where: { username: 'malzeme_chair' },
    update: {},
    create: {
      name: 'Orhan Güler',
      username: 'malzeme_chair',
      email: 'malzeme_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: malzemeBilimi.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'malzeme_member1' },
    update: {},
    create: {
      name: 'Dilek Akar',
      username: 'malzeme_member1',
      email: 'malzeme_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: malzemeBilimi.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'malzeme_member2' },
    update: {},
    create: {
      name: 'Damla Göktürk',
      username: 'malzeme_member2',
      email: 'malzeme_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: malzemeBilimi.id,
    },
  });

  // Mathematics Staff
  await prisma.user.upsert({
    where: { username: 'matematik_chair' },
    update: {},
    create: {
      name: 'Zeynep Işık',
      username: 'matematik_chair',
      email: 'matematik_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: matematik.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'matematik_member1' },
    update: {},
    create: {
      name: 'Cemal Yıldız',
      username: 'matematik_member1',
      email: 'matematik_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: matematik.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'matematik_member2' },
    update: {},
    create: {
      name: 'Cemil Ay',
      username: 'matematik_member2',
      email: 'matematik_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: matematik.id,
    },
  });

  // Molecular Biology Staff
  await prisma.user.upsert({
    where: { username: 'molekuler_chair' },
    update: {},
    create: {
      name: 'Sibel Erkan',
      username: 'molekuler_chair',
      email: 'molekuler_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: molekulerBiyoloji.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'molekuler_member1' },
    update: {},
    create: {
      name: 'Tunç Özdil',
      username: 'molekuler_member1',
      email: 'molekuler_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: molekulerBiyoloji.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'molekuler_member2' },
    update: {},
    create: {
      name: 'Timur Sertdemir',
      username: 'molekuler_member2',
      email: 'molekuler_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: molekulerBiyoloji.id,
    },
  });

  // Urban Planning Staff
  await prisma.user.upsert({
    where: { username: 'sehir_chair' },
    update: {},
    create: {
      name: 'Ufuk Yalçın',
      username: 'sehir_chair',
      email: 'sehir_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: sehirPlanlama.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'sehir_member1' },
    update: {},
    create: {
      name: 'Gülsen Aydoğan',
      username: 'sehir_member1',
      email: 'sehir_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: sehirPlanlama.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'sehir_member2' },

    update: {},
    create: {
      name: 'Sezen Atalay',
      username: 'sehir_member2',
      email: 'sehir_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: sehirPlanlama.id,
    },
  });
  

  // Management Information Systems Staff
  await prisma.user.upsert({
    where: { username: 'ybs_chair' },
    update: {},
    create: {
      name: 'Veli Karaca',
      username: 'ybs_chair',
      email: 'ybs_chair@example.com',
      password: HASHED_PASSWORD,
      roleId: roleChair.id,
      departmentId: yonetimBilisim.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'ybs_member1' },
    update: {},
    create: {
      name: 'Nurcan Demir',
      username: 'ybs_member1',
      email: 'ybs_member1@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: yonetimBilisim.id,
    },
  });
  await prisma.user.upsert({
    where: { username: 'ybs_member2' },
    update: {},
    create: {
      name: 'Selçuk Erdem',
      username: 'ybs_member2',
      email: 'ybs_member2@example.com',
      password: HASHED_PASSWORD,
      roleId: roleMember.id,
      departmentId: yonetimBilisim.id,
    },
  });

 // 4. Students
console.log('Seeding Students...');
// CENG Students (4)
const s1 = await prisma.student.upsert({
  where: { id: '220104004001' },
  update: {},
  create: {
    id: '220104004001',
    name: 'Ali Veli',
    email: 'ali.veli@example.com',
    phone_number: '555-101-0001',
    departmentId: bilgisayarMuh.id,
  },
});
const s2 = await prisma.student.upsert({
  where: { id: '220104004002' },
  update: {},
  create: {
    id: '220104004002',
    name: 'Ayşe Kaya',
    email: 'ayse.kaya@example.com',
    phone_number: '555-101-0002',
    departmentId: bilgisayarMuh.id,
  },
});
const s3 = await prisma.student.upsert({
  where: { id: '220104004003' },
  update: {},
  create: {
    id: '220104004003',
    name: 'Mehmet Yılmaz',
    email: 'mehmet.yilmaz@example.com',
    phone_number: '555-101-0003',
    departmentId: bilgisayarMuh.id,
  },
});
const s4 = await prisma.student.upsert({
  where: { id: '220104004004' },
  update: {},
  create: {
    id: '220104004004',
    name: 'Fatma Demir',
    email: 'fatma.demir@example.com',
    phone_number: '555-101-0004',
    departmentId: bilgisayarMuh.id,
  },
});

// EENG Students (4)
const s5 = await prisma.student.upsert({
  where: { id: '220105001001' },
  update: {},
  create: {
    id: '220105001001',
    name: 'Hasan Çelik',
    email: 'hasan.celik@example.com',
    phone_number: '555-102-0001',
    departmentId: elektronikMuh.id,
  },
});
const s6 = await prisma.student.upsert({
  where: { id: '220105001002' },
  update: {},
  create: {
    id: '220105001002',
    name: 'Zeynep Şahin',
    email: 'zeynep.sahin@example.com',
    phone_number: '555-102-0002',
    departmentId: elektronikMuh.id,
  },
});
const s7 = await prisma.student.upsert({
  where: { id: '220105001003' },
  update: {},
  create: {
    id: '220105001003',
    name: 'Burak Öz',
    email: 'burak.oz@example.com',
    phone_number: '555-102-0003',
    departmentId: elektronikMuh.id,
  },
});
const s8 = await prisma.student.upsert({
  where: { id: '220105001004' },
  update: {},
  create: {
    id: '220105001004',
    name: 'Elif Arda',
    email: 'elif.arda@example.com',
    phone_number: '555-102-0004',
    departmentId: elektronikMuh.id,
  },
});

// MENG Students (4)
const s9 = await prisma.student.upsert({
  where: { id: '220106002001' },
  update: {},
  create: {
    id: '220106002001',
    name: 'Kemal Can',
    email: 'kemal.can@example.com',
    phone_number: '555-103-0001',
    departmentId: makineMuh.id,
  },
});
const s10 = await prisma.student.upsert({
  where: { id: '220106002002' },
  update: {},
  create: {
    id: '220106002002',
    name: 'Derya Güneş',
    email: 'derya.gunes@example.com',
    phone_number: '555-103-0002',
    departmentId: makineMuh.id,
  },
});
const s11 = await prisma.student.upsert({
  where: { id: '220106002003' },
  update: {},
  create: {
    id: '220106002003',
    name: 'Ömer Faruk',
    email: 'omer.faruk@example.com',
    phone_number: '555-103-0003',
    departmentId: makineMuh.id,
  },
});
const s12 = await prisma.student.upsert({
  where: { id: '220106002004' },
  update: {},
  create: {
    id: '220106002004',
    name: 'İpek Yıldız',
    email: 'ipek.yildiz@example.com',
    phone_number: '555-103-0004',
    departmentId: makineMuh.id,
  },
});

// Bioengineering Students (3)
const s13 = await prisma.student.upsert({
  where: { id: '220107003001' },
  update: {},
  create: {
    id: '220107003001',
    name: 'Ece Şimşek',
    email: 'ece.simsek@example.com',
    phone_number: '555-104-0001',
    departmentId: biyomuh.id,
  },
});
const s14 = await prisma.student.upsert({
  where: { id: '220107003002' },
  update: {},
  create: {
    id: '220107003002',
    name: 'Berkay Korkmaz',
    email: 'berkay.korkmaz@example.com',
    phone_number: '555-104-0002',
    departmentId: biyomuh.id,
  },
});
const s15 = await prisma.student.upsert({
  where: { id: '220107003003' },
  update: {},
  create: {
    id: '220107003003',
    name: 'Selin Aslan',
    email: 'selin.aslan@example.com',
    phone_number: '555-104-0003',
    departmentId: biyomuh.id,
  },
});

// Environmental Engineering Students (2)
const s16 = await prisma.student.upsert({
  where: { id: '220108004001' },
  update: {},
  create: {
    id: '220108004001',
    name: 'Mert Yıldırım',
    email: 'mert.yildirim@example.com',
    phone_number: '555-105-0001',
    departmentId: cevreMuh.id,
  },
});
const s17 = await prisma.student.upsert({
  where: { id: '220108004002' },
  update: {},
  create: {
    id: '220108004002',
    name: 'Beste Çetin',
    email: 'beste.cetin@example.com',
    phone_number: '555-105-0002',
    departmentId: cevreMuh.id,
  },
});

// Industrial Engineering Students (3)
const s18 = await prisma.student.upsert({
  where: { id: '220109005001' },
  update: {},
  create: {
    id: '220109005001',
    name: 'Ege Aksoy',
    email: 'ege.aksoy@example.com',
    phone_number: '555-106-0001',
    departmentId: endustriMuh.id,
  },
});
const s19 = await prisma.student.upsert({
  where: { id: '220109005002' },
  update: {},
  create: {
    id: '220109005002',
    name: 'Damla Bulut',
    email: 'damla.bulut@example.com',
    phone_number: '555-106-0002',
    departmentId: endustriMuh.id,
  },
});
const s20 = await prisma.student.upsert({
  where: { id: '220109005003' },
  update: {},
  create: {
    id: '220109005003',
    name: 'Kağan Uzun',
    email: 'kagan.uzun@example.com',
    phone_number: '555-106-0003',
    departmentId: endustriMuh.id,
  },
});

// Industrial Design Students (2)
const s21 = await prisma.student.upsert({
  where: { id: '220110006001' },
  update: {},
  create: {
    id: '220110006001',
    name: 'Deniz Özkan',
    email: 'deniz.ozkan@example.com',
    phone_number: '555-107-0001',
    departmentId: endustriselTasarim.id,
  },
});
const s22 = await prisma.student.upsert({
  where: { id: '220110006002' },
  update: {},
  create: {
    id: '220110006002',
    name: 'Lale Demirtaş',
    email: 'lale.demirtas@example.com',
    phone_number: '555-107-0002',
    departmentId: endustriselTasarim.id,
  },
});

// Physics Students (2)
const s23 = await prisma.student.upsert({
  where: { id: '220111007001' },
  update: {},
  create: {
    id: '220111007001',
    name: 'Umut Güler',
    email: 'umut.guler@example.com',
    phone_number: '555-108-0001',
    departmentId: fizik.id,
  },
});
const s24 = await prisma.student.upsert({
  where: { id: '220111007002' },
  update: {},
  create: {
    id: '220111007002',
    name: 'Nazlı Koç',
    email: 'nazli.koc@example.com',
    phone_number: '555-108-0002',
    departmentId: fizik.id,
  },
});

// Civil Engineering Students (3)
const s25 = await prisma.student.upsert({
  where: { id: '220112008001' },
  update: {},
  create: {
    id: '220112008001',
    name: 'Volkan Taş',
    email: 'volkan.tas@example.com',
    phone_number: '555-109-0001',
    departmentId: insaatMuh.id,
  },
});
const s26 = await prisma.student.upsert({
  where: { id: '220112008002' },
  update: {},
  create: {
    id: '220112008002',
    name: 'Pınar Yavuz',
    email: 'pinar.yavuz@example.com',
    phone_number: '555-109-0002',
    departmentId: insaatMuh.id,
  },
});
const s27 = await prisma.student.upsert({
  where: { id: '220112008003' },
  update: {},
  create: {
    id: '220112008003',
    name: 'Alper Duran',
    email: 'alper.duran@example.com',
    phone_number: '555-109-0003',
    departmentId: insaatMuh.id,
  },
});

// Chemical Engineering Students (2)
const s28 = await prisma.student.upsert({
  where: { id: '220113009001' },
  update: {},
  create: {
    id: '220113009001',
    name: 'Ceren Polat',
    email: 'ceren.polat@example.com',
    phone_number: '555-110-0001',
    departmentId: kimyaMuh.id,
  },
});
const s29 = await prisma.student.upsert({
  where: { id: '220113009002' },
  update: {},
  create: {
    id: '220113009002',
    name: 'Oğuz Yiğit',
    email: 'oguz.yigit@example.com',
    phone_number: '555-110-0002',
    departmentId: kimyaMuh.id,
  },
});

// Aerospace Engineering Students (3)
const s30 = await prisma.student.upsert({
  where: { id: '220114010001' },
  update: {},
  create: {
    id: '220114010001',
    name: 'Gizem Kaplan',
    email: 'gizem.kaplan@example.com',
    phone_number: '555-111-0001',
    departmentId: ucakMuh.id,
  },
});
const s31 = await prisma.student.upsert({
  where: { id: '220114010002' },
  update: {},
  create: {
    id: '220114010002',
    name: 'Tuna Dağ',
    email: 'tuna.dag@example.com',
    phone_number: '555-111-0002',
    departmentId: ucakMuh.id,
  },
});
const s32 = await prisma.student.upsert({
  where: { id: '220114010003' },
  update: {},
  create: {
    id: '220114010003',
    name: 'Yasemin Parlak',
    email: 'yasemin.parlak@example.com',
    phone_number: '555-111-0003',
    departmentId: ucakMuh.id,
  },
});

// Data Science Students (3)
const s33 = await prisma.student.upsert({
  where: { id: '220115011001' },
  update: {},
  create: {
    id: '220115011001',
    name: 'Arda Tekin',
    email: 'arda.tekin@example.com',
    phone_number: '555-112-0001',
    departmentId: veriBilimi.id,
  },
});
const s34 = await prisma.student.upsert({
  where: { id: '220115011002' },
  update: {},
  create: {
    id: '220115011002',
    name: 'Simge Acar',
    email: 'simge.acar@example.com',
    phone_number: '555-112-0002',
    departmentId: veriBilimi.id,
  },
});
const s35 = await prisma.student.upsert({
  where: { id: '220115011003' },
  update: {},
  create: {
    id: '220115011003',
    name: 'Bora Ağır',
    email: 'bora.agir@example.com',
    phone_number: '555-112-0003',
    departmentId: veriBilimi.id,
  },
});

// Architecture Students (2)
const s36 = await prisma.student.upsert({
  where: { id: '220116012001' },
  update: {},
  create: {
    id: '220116012001',
    name: 'Cemre Bal',
    email: 'cemre.bal@example.com',
    phone_number: '555-113-0001',
    departmentId: mimarlik.id,
  },
});
const s37 = await prisma.student.upsert({
  where: { id: '220116012002' },
  update: {},
  create: {
    id: '220116012002',
    name: 'Serkan Aydın',
    email: 'serkan.aydin@example.com',
    phone_number: '555-113-0002',
    departmentId: mimarlik.id,
  },
});

// Surveying Engineering Students (2)
const s38 = await prisma.student.upsert({
  where: { id: '220117013001' },
  update: {},
  create: {
    id: '220117013001',
    name: 'Gökhan Erdem',
    email: 'gokhan.erdem@example.com',
    phone_number: '555-114-0001',
    departmentId: haritaMuh.id,
  },
});
const s39 = await prisma.student.upsert({
  where: { id: '220117013002' },
  update: {},
  create: {
    id: '220117013002',
    name: 'Melis Özdemir',
    email: 'melis.ozdemir@example.com',
    phone_number: '555-114-0002',
    departmentId: haritaMuh.id,
  },
});

// Economics Students (3)
const s40 = await prisma.student.upsert({
  where: { id: '220118014001' },
  update: {},
  create: {
    id: '220118014001',
    name: 'Emre Kılıç',
    email: 'emre.kilic@example.com',
    phone_number: '555-115-0001',
    departmentId: iktisat.id,
  },
});
const s41 = await prisma.student.upsert({
  where: { id: '220118014002' },
  update: {},
  create: {
    id: '220118014002',
    name: 'Sude Yalçın',
    email: 'sude.yalcin@example.com',
    phone_number: '555-115-0002',
    departmentId: iktisat.id,
  },
});
const s42 = await prisma.student.upsert({
  where: { id: '220118014003' },
  update: {},
  create: {
    id: '220118014003',
    name: 'Eren Başar',
    email: 'eren.basar@example.com',
    phone_number: '555-115-0003',
    departmentId: iktisat.id,
  },
});

// Business Administration Students (3)
const s43 = await prisma.student.upsert({
  where: { id: '220119015001' },
  update: {},
  create: {
    id: '220119015001',
    name: 'Zehra Kara',
    email: 'zehra.kara@example.com',
    phone_number: '555-116-0001',
    departmentId: isletme.id,
  },
});
const s44 = await prisma.student.upsert({
  where: { id: '220119015002' },
  update: {},
  create: {
    id: '220119015002',
    name: 'Burak Özen',
    email: 'burak.ozen@example.com',
    phone_number: '555-116-0002',
    departmentId: isletme.id,
  },
});
const s45 = await prisma.student.upsert({
  where: { id: '220119015003' },
  update: {},
  create: {
    id: '220119015003',
    name: 'Elif Karaca',
    email: 'elif.karaca@example.com',
    phone_number: '555-116-0003',
    departmentId: isletme.id,
  },
});

// Chemistry Students (2)
const s46 = await prisma.student.upsert({
  where: { id: '220120016001' },
  update: {},
  create: {
    id: '220120016001',
    name: 'Can Arslan',
    email: 'can.arslan@example.com',
    phone_number: '555-117-0001',
    departmentId: kimya.id,
  },
});
const s47 = await prisma.student.upsert({
  where: { id: '220120016002' },
  update: {},
  create: {
    id: '220120016002',
    name: 'Duygu Sezer',
    email: 'duygu.sezer@example.com',
    phone_number: '555-117-0002',
    departmentId: kimya.id,
  },
});

// Materials Science Students (2)
const s48 = await prisma.student.upsert({
  where: { id: '220121017001' },
  update: {},
  create: {
    id: '220121017001',
    name: 'Ahmet Türk',
    email: 'ahmet.turk@example.com',
    phone_number: '555-118-0001',
    departmentId: malzemeBilimi.id,
  },
});
const s49 = await prisma.student.upsert({
  where: { id: '220121017002' },
  update: {},
  create: {
    id: '220121017002',
    name: 'Nisa Çelik',
    email: 'nisa.celik@example.com',
    phone_number: '555-118-0002',
    departmentId: malzemeBilimi.id,
  },
});

// Mathematics Students (2)
const s50 = await prisma.student.upsert({
  where: { id: '220122018001' },
  update: {},
  create: {
    id: '220122018001',
    name: 'Kaan Yavuz',
    email: 'kaan.yavuz@example.com',
    phone_number: '555-119-0001',
    departmentId: matematik.id,
  },
});
const s51 = await prisma.student.upsert({
  where: { id: '220122018002' },
  update: {},
  create: {
    id: '220122018002',
    name: 'İrem Özgür',
    email: 'irem.ozgur@example.com',
    phone_number: '555-119-0002',
    departmentId: matematik.id,
  },
});

// Molecular Biology Students (2)
const s52 = await prisma.student.upsert({
  where: { id: '220123019001' },
  update: {},
  create: {
    id: '220123019001',
    name: 'Cem Doğan',
    email: 'cem.dogan@example.com',
    phone_number: '555-120-0001',
    departmentId: molekulerBiyoloji.id,
  },
});
const s53 = await prisma.student.upsert({
  where: { id: '220123019002' },
  update: {},
  create: {
    id: '220123019002',
    name: 'Aylin Öztürk',
    email: 'aylin.ozturk@example.com',
    phone_number: '555-120-0002',
    departmentId: molekulerBiyoloji.id,
  },
});

// Urban Planning Students (2)
const s54 = await prisma.student.upsert({
  where: { id: '220124020001' },
  update: {},
  create: {
    id: '220124020001',
    name: 'Onur Tekin',
    email: 'onur.tekin@example.com',
    phone_number: '555-121-0001',
    departmentId: sehirPlanlama.id,
  },
});
const s55 = await prisma.student.upsert({
  where: { id: '220124020002' },
  update: {},
  create: {
    id: '220124020002',
    name: 'Gamze Aydın',
    email: 'gamze.aydin@example.com',
    phone_number: '555-121-0002',
    departmentId: sehirPlanlama.id,
  },
});

// Management Information Systems Students (3)
const s56 = await prisma.student.upsert({
  where: { id: '220125021001' },
  update: {},
  create: {
    id: '220125021001',
    name: 'Barış Yılmaz',
    email: 'baris.yilmaz@example.com',
    phone_number: '555-122-0001',
    departmentId: yonetimBilisim.id,
  },
});
const s57 = await prisma.student.upsert({
  where: { id: '220125021002' },
  update: {},
  create: {
    id: '220125021002',
    name: 'Ebru Şahin',
    email: 'ebru.sahin@example.com',
    phone_number: '555-122-0002',
    departmentId: yonetimBilisim.id,
  },
});
const s58 = await prisma.student.upsert({
  where: { id: '220125021003' },
  update: {},
  create: {
    id: '220125021003',
    name: 'Doruk Çetin',
    email: 'doruk.cetin@example.com',
    phone_number: '555-122-0003',
    departmentId: yonetimBilisim.id,
  },
});


  // 5. Terms
  console.log('Seeding Terms...');
  const termSummer25 = await prisma.term.upsert({
    where: { name: '2025 Summer Internship Term' },
    update: {},
    create: {
      name: '2025 Summer Internship Term',
      startDate: new Date('2025-06-01T00:00:00Z'),
      endDate: new Date('2025-09-01T00:00:00Z'),
    },
  });
  const termWinter25 = await prisma.term.upsert({
    where: { name: '2025 Winter Internship Term' },
    update: {},
    create: {
      name: '2025 Winter Internship Term',
      startDate: new Date('2025-01-01T00:00:00Z'),
      endDate: new Date('2025-02-28T00:00:00Z'),
    },
  });

  // 6. Companies
  console.log('Seeding Companies...');
  const aselsan = await prisma.company.upsert({
    where: { name: 'ASELSAN' },
    update: {},
    create: {
      name: 'ASELSAN',
      phone: '0312-000-0001',
      email: 'info@aselsan.com',
    },
  });
  const roketsan = await prisma.company.upsert({
    where: { name: 'ROKETSAN' },
    update: {},
    create: {
      name: 'ROKETSAN',
      phone: '0312-000-0002',
      email: 'info@roketsan.com',
    },
  });
  const havelsan = await prisma.company.upsert({
    where: { name: 'HAVELSAN' },
    update: {},
    create: {
      name: 'HAVELSAN',
      phone: '0312-000-0003',
      email: 'info@havelsan.com',
    },
  });
  const turkTelekom = await prisma.company.upsert({
    where: { name: 'TÜRK TELEKOM' },
    update: {},
    create: {
      name: 'TÜRK TELEKOM',
      phone: '0212-000-0004',
      email: 'info@turktelekom.com',
    },
  });
  const turkcell = await prisma.company.upsert({
    where: { name: 'TURKCELL' },
    update: {},
    create: {
      name: 'TURKCELL',
      phone: '0212-000-0005',
      email: 'info@turkcell.com',
    },
  });
  const garanti = await prisma.company.upsert({
    where: { name: 'GARANTİ BBVA' },
    update: {},
    create: {
      name: 'GARANTİ BBVA',
      phone: '0212-000-0006',
      email: 'info@garanti.com',
    },
  });
  const isBankasi = await prisma.company.upsert({
    where: { name: 'İŞ BANKASI' },
    update: {},
    create: {
      name: 'İŞ BANKASI',
      phone: '0212-000-0007',
      email: 'info@isbank.com',
    },
  });

  // 7. Internships
  console.log('Seeding Internships...');

  // Student 1 (Ali Veli) - STAJ1 (Completed) & STAJ2 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s1.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s1.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-15T00:00:00Z'),
      endDate: new Date('2025-07-15T00:00:00Z'),
      grade: 'S', // Satisfactory
      gradeComment: 'Excellent performance. Demonstrated strong technical skills and professionalism.',
      reportUrl: 'https://example.com/reports/s1_staj1.pdf',
      documentUrl: 'https://example.com/docs/s1_staj1.pdf',
      companyContactName: 'Ahmet Yılmaz',
      companyContactPosition: 'Senior Engineer',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s1.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s1.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 20,
      startDate: new Date('2025-07-20T00:00:00Z'),
      endDate: new Date('2025-08-20T00:00:00Z'),
      companyContactName: 'Elif Demir',
      companyContactPosition: 'HR Manager',
    },
  });

  // Student 2 (Ayşe Kaya) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s2.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s2.id,
      companyId: havelsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 25,
      startDate: new Date('2025-07-01T00:00:00Z'),
      endDate: new Date('2025-08-05T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s2_staj1.pdf',
    },
  });

  // Student 3 (Mehmet Yılmaz) - STAJ1 (Completed, Winter)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s3.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s3.id,
      companyId: turkTelekom.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-15T00:00:00Z'),
      endDate: new Date('2025-02-15T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Good adaptation to corporate environment. Met all requirements.',
    },
  });

  // Student 4 (Fatma Demir) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s4.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s4.id,
      companyId: turkcell.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-01T00:00:00Z'),
      endDate: new Date('2025-08-29T00:00:00Z'),
    },
  });

  // Student 5 (Hasan Çelik) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s5.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s5.id,
      companyId: garanti.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-20T00:00:00Z'),
      endDate: new Date('2025-07-18T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Performed well and showed initiative in assigned tasks.',
    },
  });

  // Student 6 (Zeynep Şahin) - STAJ1 (Awaiting) & STAJ2 (In Progress, Erasmus)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s6.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s6.id,
      companyId: isBankasi.id,
      termId: termWinter25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-20T00:00:00Z'),
      endDate: new Date('2025-02-18T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s6_staj1.pdf',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s6.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s6.id,
      companyId: aselsan.id, // Can be same company
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 40,
      isErasmus: true,
      startDate: new Date('2025-07-01T00:00:00Z'),
      endDate: new Date('2025-08-26T00:00:00Z'),
    },
  });

  // Student 7 (Burak Öz) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s7.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s7.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-07T00:00:00Z'),
      endDate: new Date('2025-08-01T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Outstanding work ethic and collaboration skills.',
    },
  });

  // Student 8 (Elif Arda) - STAJ1 (In Progress, Winter)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s8.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s8.id,
      companyId: turkcell.id,
      termId: termWinter25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-13T00:00:00Z'),
      endDate: new Date('2025-02-07T00:00:00Z'),
    },
  });

  // Student 9 (Kemal Can) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s9.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s9.id,
      companyId: havelsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 30,
      startDate: new Date('2025-06-16T00:00:00Z'),
      endDate: new Date('2025-07-28T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Solid performance throughout the internship period.',
    },
  });

  // Student 10 (Derya Güneş) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s10.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s10.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-04T00:00:00Z'),
      endDate: new Date('2025-08-29T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s10_staj1.pdf',
    },
  });

  // Student 11 (Ömer Faruk) - STAJ1 (Completed) & STAJ2 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s11.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s11.id,
      companyId: garanti.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-20T00:00:00Z'),
      endDate: new Date('2025-02-14T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Meets all expectations. Ready for advanced internship.',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s11.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s11.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 20,
      startDate: new Date('2025-07-21T00:00:00Z'),
      endDate: new Date('2025-08-15T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s11_staj2.pdf',
    },
  });

  // Student 12 (İpek Yıldız) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s12.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s12.id,
      companyId: turkTelekom.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-11T00:00:00Z'),
      endDate: new Date('2025-09-05T00:00:00Z'),
    },
  });

  // Student 13 (Ece Şimşek) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s13.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s13.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-10T00:00:00Z'),
      endDate: new Date('2025-07-10T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Excellent performance in bioengineering tasks.',
    },
  });

  // Student 14 (Berkay Korkmaz) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s14.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s14.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-05T00:00:00Z'),
      endDate: new Date('2025-08-02T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s14_staj1.pdf',
    },
  });

  // Student 15 (Selin Aslan) - STAJ1 (In Progress) & STAJ2 (Erasmus, In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s15.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s15.id,
      companyId: havelsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-05T00:00:00Z'),
      endDate: new Date('2025-08-30T00:00:00Z'),
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s15.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s15.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 40,
      isErasmus: true,
      startDate: new Date('2025-06-01T00:00:00Z'),
      endDate: new Date('2025-07-25T00:00:00Z'),
      companyContactName: 'Dr. Elena Schmidt',
      companyContactPosition: 'Research Director',
    },
  });

  // Student 16 (Mert Yıldırım) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s16.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s16.id,
      companyId: turkTelekom.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-10T00:00:00Z'),
      endDate: new Date('2025-02-05T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Strong environmental engineering knowledge.',
    },
  });

  // Student 17 (Beste Çetin) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s17.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s17.id,
      companyId: turkcell.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-15T00:00:00Z'),
      endDate: new Date('2025-08-12T00:00:00Z'),
    },
  });

  // Student 18 (Ege Aksoy) - STAJ1 (Completed) & STAJ2 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s18.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s18.id,
      companyId: garanti.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-25T00:00:00Z'),
      endDate: new Date('2025-07-22T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Demonstrated strong industrial engineering skills.',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s18.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s18.id,
      companyId: turkTelekom.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 20,
      startDate: new Date('2025-07-25T00:00:00Z'),
      endDate: new Date('2025-08-20T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Advanced industrial engineering project completed successfully.',
    },
  });

  // Student 19 (Damla Bulut) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s19.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s19.id,
      companyId: isBankasi.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-12T00:00:00Z'),
      endDate: new Date('2025-08-08T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s19_staj1.pdf',
    },
  });

  // Student 20 (Kağan Uzun) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s20.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s20.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-01T00:00:00Z'),
      endDate: new Date('2025-08-28T00:00:00Z'),
    },
  });

  // Student 21 (Deniz Özkan) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s21.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s21.id,
      companyId: roketsan.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-15T00:00:00Z'),
      endDate: new Date('2025-02-10T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Creative design approach and good execution.',
    },
  });

  // Student 22 (Lale Demirtaş) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s22.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s22.id,
      companyId: havelsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-18T00:00:00Z'),
      endDate: new Date('2025-08-14T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s22_staj1.pdf',
    },
  });

  // Student 23 (Umut Güler) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s23.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s23.id,
      companyId: turkTelekom.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-20T00:00:00Z'),
      endDate: new Date('2025-07-17T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Solid understanding of physics principles.',
    },
  });

  // Student 24 (Nazlı Koç) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s24.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s24.id,
      companyId: turkcell.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-08T00:00:00Z'),
      endDate: new Date('2025-09-02T00:00:00Z'),
    },
  });

  // Student 25 (Volkan Taş) - STAJ1 (Completed) & STAJ2 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s25.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s25.id,
      companyId: garanti.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-18T00:00:00Z'),
      endDate: new Date('2025-02-13T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Excellent civil engineering knowledge and skills.',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s25.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s25.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 20,
      startDate: new Date('2025-07-01T00:00:00Z'),
      endDate: new Date('2025-07-28T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s25_staj2.pdf',
    },
  });

  // Student 26 (Pınar Yavuz) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s26.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s26.id,
      companyId: isBankasi.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-22T00:00:00Z'),
      endDate: new Date('2025-08-18T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s26_staj1.pdf',
    },
  });

  // Student 27 (Alper Duran) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s27.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s27.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-03T00:00:00Z'),
      endDate: new Date('2025-08-29T00:00:00Z'),
    },
  });

  // Student 28 (Ceren Polat) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s28.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s28.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-18T00:00:00Z'),
      endDate: new Date('2025-07-15T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Strong chemical engineering fundamentals.',
    },
  });

  // Student 29 (Oğuz Yiğit) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s29.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s29.id,
      companyId: havelsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-25T00:00:00Z'),
      endDate: new Date('2025-08-20T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s29_staj1.pdf',
    },
  });

  // Student 30 (Gizem Kaplan) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s30.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s30.id,
      companyId: turkTelekom.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-22T00:00:00Z'),
      endDate: new Date('2025-02-17T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Exceptional aerospace engineering skills.',
    },
  });

  // Student 31 (Tuna Dağ) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s31.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s31.id,
      companyId: turkcell.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-28T00:00:00Z'),
      endDate: new Date('2025-08-24T00:00:00Z'),
    },
  });

  // Student 32 (Yasemin Parlak) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s32.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s32.id,
      companyId: garanti.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-02T00:00:00Z'),
      endDate: new Date('2025-08-28T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s32_staj1.pdf',
    },
  });

  // Student 33 (Arda Tekin) - STAJ1 (Completed) & STAJ2 (Erasmus, Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s33.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s33.id,
      companyId: isBankasi.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-22T00:00:00Z'),
      endDate: new Date('2025-07-19T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Outstanding data science and analytics skills.',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s33.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s33.id,
      companyId: turkcell.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 40,
      isErasmus: true,
      startDate: new Date('2025-05-15T00:00:00Z'),
      endDate: new Date('2025-07-10T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Exceptional performance in international data science project. Erasmus internship.',
      companyContactName: 'Prof. Hans Mueller',
      companyContactPosition: 'AI Lab Director',
    },
  });

  // Student 34 (Simge Acar) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s34.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s34.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-06T00:00:00Z'),
      endDate: new Date('2025-08-31T00:00:00Z'),
    },
  });

  // Student 35 (Bora Ağır) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s35.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s35.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-30T00:00:00Z'),
      endDate: new Date('2025-08-26T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s35_staj1.pdf',
    },
  });

  // Student 36 (Cemre Bal) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s36.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s36.id,
      companyId: havelsan.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-25T00:00:00Z'),
      endDate: new Date('2025-02-20T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Excellent architectural design and planning.',
    },
  });

  // Student 37 (Serkan Aydın) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s37.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s37.id,
      companyId: turkTelekom.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-10T00:00:00Z'),
      endDate: new Date('2025-09-04T00:00:00Z'),
    },
  });

  // Student 38 (Gökhan Erdem) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s38.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s38.id,
      companyId: turkcell.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-28T00:00:00Z'),
      endDate: new Date('2025-07-25T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Strong surveying and mapping skills.',
    },
  });

  // Student 39 (Melis Özdemir) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s39.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s39.id,
      companyId: garanti.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-05T00:00:00Z'),
      endDate: new Date('2025-08-30T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s39_staj1.pdf',
    },
  });

  // Student 40 (Emre Kılıç) - STAJ1 (Completed) & STAJ2 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s40.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s40.id,
      companyId: isBankasi.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-01-28T00:00:00Z'),
      endDate: new Date('2025-02-23T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Strong economic analysis and research skills.',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s40.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s40.id,
      companyId: garanti.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 20,
      startDate: new Date('2025-08-01T00:00:00Z'),
      endDate: new Date('2025-08-28T00:00:00Z'),
    },
  });

  // Student 41 (Sude Yalçın) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s41.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s41.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-20T00:00:00Z'),
      endDate: new Date('2025-08-16T00:00:00Z'),
    },
  });

  // Student 42 (Eren Başar) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s42.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s42.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-07T00:00:00Z'),
      endDate: new Date('2025-09-01T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s42_staj1.pdf',
    },
  });

  // Student 43 (Zehra Kara) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s43.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s43.id,
      companyId: havelsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-06-30T00:00:00Z'),
      endDate: new Date('2025-07-27T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Excellent business management skills.',
    },
  });

  // Student 44 (Burak Özen) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s44.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s44.id,
      companyId: turkTelekom.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-12T00:00:00Z'),
      endDate: new Date('2025-09-06T00:00:00Z'),
    },
  });

  // Student 45 (Elif Karaca) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s45.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s45.id,
      companyId: turkcell.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-10T00:00:00Z'),
      endDate: new Date('2025-08-06T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s45_staj1.pdf',
    },
  });

  // Student 46 (Can Arslan) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s46.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s46.id,
      companyId: garanti.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-02-01T00:00:00Z'),
      endDate: new Date('2025-02-26T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Strong chemistry laboratory skills.',
    },
  });

  // Student 47 (Duygu Sezer) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s47.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s47.id,
      companyId: isBankasi.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-14T00:00:00Z'),
      endDate: new Date('2025-09-08T00:00:00Z'),
    },
  });

  // Student 48 (Ahmet Türk) - STAJ1 (Completed) & STAJ2 (Erasmus, Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s48.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s48.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-02T00:00:00Z'),
      endDate: new Date('2025-07-29T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Excellent materials science knowledge.',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s48.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s48.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 45,
      isErasmus: true,
      startDate: new Date('2025-06-10T00:00:00Z'),
      endDate: new Date('2025-08-10T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s48_staj2.pdf',
      companyContactName: 'Dr. Anna Kovacs',
      companyContactPosition: 'Materials Lab Manager',
    },
  });

  // Student 49 (Nisa Çelik) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s49.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s49.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-15T00:00:00Z'),
      endDate: new Date('2025-09-10T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s49_staj1.pdf',
    },
  });

  // Student 50 (Kaan Yavuz) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s50.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s50.id,
      companyId: havelsan.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-02-03T00:00:00Z'),
      endDate: new Date('2025-02-28T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Strong mathematical analysis and problem-solving.',
    },
  });

  // Student 51 (İrem Özgür) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s51.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s51.id,
      companyId: turkTelekom.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-16T00:00:00Z'),
      endDate: new Date('2025-08-12T00:00:00Z'),
    },
  });

  // Student 52 (Cem Doğan) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s52.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s52.id,
      companyId: turkcell.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-04T00:00:00Z'),
      endDate: new Date('2025-07-31T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Outstanding molecular biology research skills.',
    },
  });

  // Student 53 (Aylin Öztürk) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s53.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s53.id,
      companyId: garanti.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-18T00:00:00Z'),
      endDate: new Date('2025-09-12T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s53_staj1.pdf',
    },
  });

  // Student 54 (Onur Tekin) - STAJ1 (Completed) & STAJ2 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s54.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s54.id,
      companyId: isBankasi.id,
      termId: termWinter25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-02-05T00:00:00Z'),
      endDate: new Date('2025-02-28T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Excellent urban planning and design skills.',
    },
  });
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s54.id,
        internshipOrder: InternshipOrderType.STAJ2,
      },
    },
    update: {},
    create: {
      studentId: s54.id,
      companyId: havelsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ2,
      durationDays: 20,
      startDate: new Date('2025-07-05T00:00:00Z'),
      endDate: new Date('2025-08-01T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Advanced urban planning project successfully completed.',
    },
  });

  // Student 55 (Gamze Aydın) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s55.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s55.id,
      companyId: aselsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-24T00:00:00Z'),
      endDate: new Date('2025-08-20T00:00:00Z'),
    },
  });

  // Student 56 (Barış Yılmaz) - STAJ1 (Completed)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s56.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s56.id,
      companyId: roketsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.COMPLETED,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-07-08T00:00:00Z'),
      endDate: new Date('2025-08-04T00:00:00Z'),
      grade: 'S',
      gradeComment: 'Strong MIS and systems analysis skills.',
    },
  });

  // Student 57 (Ebru Şahin) - STAJ1 (Awaiting)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s57.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s57.id,
      companyId: havelsan.id,
      termId: termSummer25.id,
      status: InternshipStatus.AWAITING_EVALUATION,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-20T00:00:00Z'),
      endDate: new Date('2025-09-14T00:00:00Z'),
      reportUrl: 'https://example.com/reports/s57_staj1.pdf',
    },
  });

  // Student 58 (Doruk Çetin) - STAJ1 (In Progress)
  await prisma.internship.upsert({
    where: {
      studentId_internshipOrder: {
        studentId: s58.id,
        internshipOrder: InternshipOrderType.STAJ1,
      },
    },
    update: {},
    create: {
      studentId: s58.id,
      companyId: turkTelekom.id,
      termId: termSummer25.id,
      status: InternshipStatus.IN_PROGRESS,
      internshipOrder: InternshipOrderType.STAJ1,
      durationDays: 20,
      startDate: new Date('2025-08-22T00:00:00Z'),
      endDate: new Date('2025-09-16T00:00:00Z'),
    },
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
