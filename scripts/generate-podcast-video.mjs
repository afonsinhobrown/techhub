import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function generatePodcastVideo() {
  console.log('🎬 Iniciando geração do vídeo trailer do podcast...\n');

  try {
    const zai = await ZAI.create();

    const prompt = `A professional podcast studio with three young Black professionals (two women and one man in their 20s) sitting around a modern table with microphones, engaged in animated conversation about AI and technology. They are smiling, gesturing, and talking enthusiastically. Warm lighting with purple and green LED accents in background. Cinematic trailer style, dynamic camera movement. TechHub podcast intro.`;

    console.log('📝 Prompt:', prompt);
    console.log('⏱️  Duração: 5 segundos');
    console.log('🎵 Com áudio: Sim');
    console.log('🎬 Qualidade: quality\n');

    // Create video generation task
    const task = await zai.video.generations.create({
      prompt: prompt,
      quality: 'quality',
      with_audio: true,
      duration: 5,
      fps: 30
    });

    console.log('✅ Tarefa criada!');
    console.log('📋 Task ID:', task.id);
    console.log('📊 Status inicial:', task.task_status);
    console.log('\n⏳ Aguardando processamento (polling a cada 10 segundos)...\n');

    // Poll for results
    let result = await zai.async.result.query(task.id);
    let pollCount = 0;
    const maxPolls = 60;
    const pollInterval = 10000; // 10 seconds

    while (result.task_status === 'PROCESSING' && pollCount < maxPolls) {
      pollCount++;
      console.log(`🔄 Poll ${pollCount}/${maxPolls}: Status = ${result.task_status}`);
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      result = await zai.async.result.query(task.id);
    }

    console.log('\n📊 Status final:', result.task_status);

    if (result.task_status === 'SUCCESS') {
      // Get video URL from multiple possible fields
      const videoUrl = result.video_result?.[0]?.url ||
                      result.video_url ||
                      result.url ||
                      result.video;

      console.log('\n🎉 Vídeo gerado com sucesso!');
      console.log('🎥 URL do vídeo:', videoUrl);

      // Save result to file
      const outputPath = '/home/z/my-project/download/podcast_trailer_result.json';
      const resultData = {
        success: true,
        taskId: task.id,
        status: result.task_status,
        videoUrl: videoUrl,
        createdAt: new Date().toISOString()
      };

      fs.writeFileSync(outputPath, JSON.stringify(resultData, null, 2));
      console.log('\n📁 Resultado salvo em:', outputPath);

      return videoUrl;
    } else {
      console.log('\n❌ Falha na geração do vídeo');
      console.log('📋 Resultado:', JSON.stringify(result, null, 2));

      // Save error result
      const outputPath = '/home/z/my-project/download/podcast_trailer_error.json';
      fs.writeFileSync(outputPath, JSON.stringify({
        success: false,
        taskId: task.id,
        status: result.task_status,
        error: 'Video generation failed',
        result: result
      }, null, 2));

      return null;
    }
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    console.error(error.stack);

    // Save error
    const outputPath = '/home/z/my-project/download/podcast_trailer_error.json';
    fs.writeFileSync(outputPath, JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack
    }, null, 2));

    throw error;
  }
}

generatePodcastVideo()
  .then(url => {
    if (url) {
      console.log('\n✅ Processo concluído com sucesso!');
      process.exit(0);
    } else {
      console.log('\n⚠️ Processo concluído sem vídeo');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('\n❌ Processo falhou');
    process.exit(1);
  });
