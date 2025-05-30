
import html2canvas from 'html2canvas';

export const shareToInstagramStory = async (
  playerName: string,
  score: number,
  gameType: string,
  completionTime: number,
  totalQuestions: number
) => {
  try {
    // Criar um elemento temporário para capturar como imagem
    const shareElement = document.createElement('div');
    shareElement.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 1080px;
      height: 1920px;
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
      color: white;
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      box-sizing: border-box;
    `;

    const gameNames = {
      'quiz': 'Quiz Brega',
      'letras': 'Complete a Letra',
      'emojis': 'Desafio de Emojis',
      'timeline': 'Linha do Tempo'
    };

    const minutes = Math.floor(completionTime / 60);
    const seconds = completionTime % 60;
    const timeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    shareElement.innerHTML = `
      <div style="text-align: center; max-width: 800px;">
        <h1 style="font-size: 120px; margin: 0 0 40px 0; background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          🎵 BREGA RAIZ
        </h1>
        <div style="background: rgba(255,255,255,0.1); border-radius: 40px; padding: 60px; margin: 40px 0; border: 2px solid rgba(255,255,255,0.2);">
          <h2 style="font-size: 80px; margin: 0 0 30px 0; color: #4ecdc4;">
            ${gameNames[gameType] || 'Jogo Brega'}
          </h2>
          <div style="font-size: 60px; margin: 30px 0; color: #ff6b6b; font-weight: bold;">
            ${playerName}
          </div>
          <div style="display: flex; justify-content: space-around; margin: 50px 0; flex-wrap: wrap; gap: 40px;">
            <div style="text-align: center; min-width: 200px;">
              <div style="font-size: 100px; color: #45b7d1; font-weight: bold;">${score}</div>
              <div style="font-size: 40px; color: #ccc;">Pontos</div>
            </div>
            <div style="text-align: center; min-width: 200px;">
              <div style="font-size: 100px; color: #ff9f43; font-weight: bold;">${Math.floor((score / totalQuestions) * 100)}%</div>
              <div style="font-size: 40px; color: #ccc;">Precisão</div>
            </div>
            <div style="text-align: center; min-width: 200px;">
              <div style="font-size: 100px; color: #ff6b6b; font-weight: bold;">${timeFormatted}</div>
              <div style="font-size: 40px; color: #ccc;">Tempo</div>
            </div>
          </div>
        </div>
        <div style="font-size: 50px; color: #ccc; margin-top: 60px;">
          Jogue você também! 🎮
        </div>
      </div>
    `;

    document.body.appendChild(shareElement);

    // Capturar como imagem
    const canvas = await html2canvas(shareElement, {
      width: 1080,
      height: 1920,
      scale: 1,
      backgroundColor: null,
      useCORS: true
    });

    // Remover elemento temporário
    document.body.removeChild(shareElement);

    // Converter para blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png', 1.0);
    });

    // Verificar se é dispositivo móvel e tem suporte ao Web Share API
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      const file = new File([blob], 'brega-score.png', { type: 'image/png' });
      
      await navigator.share({
        title: `Minha pontuação no ${gameNames[gameType] || 'Jogo Brega'}!`,
        text: `Acabei de fazer ${score} pontos no ${gameNames[gameType] || 'Jogo Brega'} em ${timeFormatted}! 🎵`,
        files: [file]
      });
    } else {
      // Fallback: fazer download da imagem
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `brega-score-${playerName}-${gameType}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Mostrar instrução para o usuário
      alert('Imagem baixada! Para compartilhar no Instagram Stories:\n1. Abra o Instagram\n2. Vá em Stories\n3. Adicione a imagem baixada\n4. Compartilhe!');
    }

    return true;
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    alert('Erro ao gerar imagem para compartilhamento. Tente novamente.');
    return false;
  }
};
