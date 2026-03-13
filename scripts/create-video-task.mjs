import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function createVideoTask() {
  console.log('🎬 Criando tarefa de vídeo...\n');

  try {
    const zai = await ZAI.create();

    const prompt = `A professional podcast studio with three young Black professionals (two women and one man in their 20s) sitting around a modern table with microphones, engaged in animated conversation about AI and technology. They are smiling, gesturing, and talking enthusiastically. Warm lighting with purple and green LED accents in background. Cinematic trailer style, dynamic camera movement. TechHub podcast intro.`;

    // Create video generation task (without polling)
    const task = await zai.video.generations.create({
      prompt: prompt,
      quality: 'speed', // Use speed for faster generation
      with_audio: true,
      duration: 5,
      fps: 30
    });

    console.log('✅ Tarefa criada!');
    console.log('📋 Task ID:', task.id);
    console.log('📊 Status:', task.task_status);

    // Save task ID for later
    const resultData = {
      taskId: task.id,
      status: task.task_status,
      createdAt: new Date().toISOString(),
      prompt: prompt
    };

    fs.writeFileSync('/home/z/my-project/download/video_task.json', JSON.stringify(resultData, null, 2));
    console.log('\n📁 Task ID salvo em: /home/z/my-project/download/video_task.json');

    return task.id;
  } catch (error) {
    console.error('❌ Erro:', error.message);
    throw error;
  }
}

createVideoTask()
  .then(taskId => {
    console.log('\n✅ Use o Task ID para verificar o status mais tarde');
    process.exit(0);
  })
  .catch(err => {
    process.exit(1);
  });
