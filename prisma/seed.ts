import { db } from "../src/lib/db";

async function main() {
  console.log("Seeding database for 2026...");

  // Use raw SQL to avoid schema mismatch
  await db.$executeRaw`INSERT INTO profiles (id, email, name, role, created_at, updated_at) 
    VALUES ('admin_001', 'admin@techhub.dev', 'Admin', 'admin', NOW(), NOW())
    ON CONFLICT (email) DO NOTHING`;
  console.log("Admin profile ready");

  // Products
  await db.$executeRaw`INSERT INTO products (id, name, description, price, type, active, created_at, updated_at) VALUES
    ('prod_001', 'SaaS Starter Kit 2026', 'Template completo para criar seu SaaS em tempo recorde.', 297.0, 'software', true, NOW(), NOW()),
    ('prod_002', 'TypeScript Avançado', 'Curso completo de TypeScript para desenvolvedores.', 397.0, 'course', true, NOW(), NOW()),
    ('prod_003', 'Mentoria 1:1', 'Sessões personalizadas de mentoria.', 500.0, 'consulting', true, NOW(), NOW()),
    ('prod_004', 'API REST Pronta para Produção', 'Boilerplate de API REST.', 197.0, 'software', true, NOW(), NOW())
    ON CONFLICT DO NOTHING`;
  console.log("Products created");

  // Podcast episodes
  await db.$executeRaw`INSERT INTO podcast_episodes (id, title, description, episode_number, duration, spotify_url, apple_url, published_at, created_at) VALUES
    ('ep_001', 'Pilot: Por que criamos o TechHub', 'No primeiro episódio, discutimos a motivação.', 1, 1920, 'https://spotify.com', 'https://apple.com', '2026-01-15', NOW()),
    ('ep_002', 'IA no Desenvolvimento', 'Discussão sobre o papel da IA.', 2, 2700, 'https://spotify.com', 'https://apple.com', '2026-02-01', NOW()),
    ('ep_003', 'Carreira Tech: Do Júnior ao Sênior', 'Conversa sobre evolução profissional.', 3, 2280, 'https://spotify.com', 'https://apple.com', '2026-02-15', NOW()),
    ('ep_004', 'Arquitetura de Software', 'Princípios fundamentais de arquitetura.', 4, 3120, 'https://spotify.com', 'https://apple.com', '2026-03-01', NOW())
    ON CONFLICT DO NOTHING`;
  console.log("Podcast episodes created");

  // Articles
  await db.$executeRaw`INSERT INTO articles (id, title, slug, excerpt, category, published, published_at, author_id, views, created_at, updated_at) VALUES
    ('art_001', 'Inteligência Artificial em 2026', 'ia-2026', 'Um guia prático sobre IA.', 'IA', true, '2026-03-15', 'admin_001', 0, NOW(), NOW()),
    ('art_002', 'Next.js 17: Novidades', 'nextjs-17-novidades', 'Análise das novas features.', 'Desenvolvimento', true, '2026-03-10', 'admin_001', 0, NOW(), NOW()),
    ('art_003', 'Carreira em Tech', 'carreira-tech', 'Um roteiro prático.', 'Mercado', true, '2026-03-05', 'admin_001', 0, NOW(), NOW()),
    ('art_004', 'TypeScript Avançado', 'typescript-patterns', 'Deep dive em patterns.', 'Desenvolvimento', true, '2026-02-28', 'admin_001', 0, NOW(), NOW())
    ON CONFLICT DO NOTHING`;
  console.log("Articles created");

  // Discussions - clear first
  await db.$executeRaw`DELETE FROM discussions`;
  console.log("Cleared discussions");

  await db.$executeRaw`INSERT INTO discussions (id, title, content, excerpt, category, author_name, replies, likes, views, pinned, locked, published, created_at, updated_at) VALUES
    ('disc_001', 'Qual a melhor abordagem para autenticação?', 'Estou começando um novo projeto...', 'Estou começando...', 'Desenvolvimento', 'Pedro Silva', 24, 45, 230, false, false, true, NOW(), NOW()),
    ('disc_002', 'GPT-5 vs Claude 4: qual usar para código?', 'Fiz vários testes comparando...', 'Fiz vários testes...', 'IA', 'Ana Costa', 56, 89, 520, false, false, true, NOW(), NOW()),
    ('disc_003', 'Como sair de júnior para pleno?', 'Entrei na área há 8 meses...', 'Entrei na área...', 'Carreira', 'Lucas Ferreira', 38, 67, 340, false, false, true, NOW(), NOW()),
    ('disc_004', 'Next.js 17 vale a pena migrar?', 'Tenho um projeto em Next.js 15...', 'Tenho um projeto...', 'Desenvolvimento', 'Juliana Santos', 19, 34, 180, false, false, true, NOW(), NOW()),
    ('disc_005', 'Deploy de IA em produção', 'Estou colocando meu primeiro modelo...', 'Estou colocando...', 'IA', 'Rafael Oliveira', 42, 78, 410, false, false, true, NOW(), NOW()),
    ('disc_006', 'Salário de dev sênior em 2026', 'Recebi uma proposta de R$ 15k...', 'Recebi uma proposta...', 'Mercado', 'Camila Rocha', 87, 123, 890, true, false, true, NOW(), NOW()),
    ('disc_007', 'Frameworks front-end: qual escolher?', 'Com tantas opções...', 'Com tantas opções...', 'Desenvolvimento', 'Mariana Lima', 31, 52, 290, false, false, true, NOW(), NOW()),
    ('disc_008', 'Como fazer networking?', 'Sou introvertido e tenho dificuldade...', 'Sou introvertido...', 'Carreira', 'Bruno Almeida', 45, 88, 450, false, false, true, NOW(), NOW())`;
  console.log("Discussions created");

  console.log("\n✅ Seeding completed for 2026!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
