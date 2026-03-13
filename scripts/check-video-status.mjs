import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import https from 'https';
import http from 'http';

const TASK_ID = '202603130952176bb1922473c74d84';

function downloadVideo(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(outputPath);

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadVideo(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function checkVideoStatus() {
  console.log('🔍 Verificando status do vídeo...\n');
  console.log('📋 Task ID:', TASK_ID);

  try {
    const zai = await ZAI.create();
    const result = await zai.async.result.query(TASK_ID);

    console.log('📊 Status:', result.task_status);

    if (result.task_status === 'SUCCESS') {
      const videoUrl = result.video_result?.[0]?.url ||
                      result.video_url ||
                      result.url ||
                      result.video;

      console.log('\n🎉 Vídeo pronto!');
      console.log('🎥 URL:', videoUrl);

      // Download video
      const outputPath = '/home/z/my-project/public/videos/podcast-trailer.mp4';
      const dir = '/home/z/my-project/public/videos';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      console.log('\n⬇️  Baixando vídeo...');
      await downloadVideo(videoUrl, outputPath);
      console.log('✅ Vídeo salvo em:', outputPath);

      // Update result file
      const resultData = {
        success: true,
        taskId: TASK_ID,
        status: result.task_status,
        videoUrl: videoUrl,
        localPath: outputPath,
        createdAt: new Date().toISOString()
      };
      fs.writeFileSync('/home/z/my-project/download/podcast_video_result.json', JSON.stringify(resultData, null, 2));

      return videoUrl;
    } else if (result.task_status === 'PROCESSING') {
      console.log('\n⏳ Vídeo ainda sendo processado...');
      console.log('💡 Execute este script novamente em alguns minutos');
      return null;
    } else {
      console.log('\n❌ Falha no processamento');
      console.log('📋 Resultado:', JSON.stringify(result, null, 2));
      return null;
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
    throw error;
  }
}

checkVideoStatus()
  .then(url => {
    if (url) {
      console.log('\n✅ Concluído!');
    }
    process.exit(0);
  })
  .catch(err => {
    process.exit(1);
  });
