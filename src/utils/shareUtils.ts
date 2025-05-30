
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
      background: #000000;
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
      'quiz': 'Quiz Finalizado!',
      'letras': 'Jogo Finalizado!',
      'emojis': 'Jogo Finalizado!',
      'timeline': 'Jogo Finalizado!'
    };

    const minutes = Math.floor(completionTime / 60);
    const seconds = completionTime % 60;
    const timeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const percentage = Math.floor((score / totalQuestions) * 100);

    shareElement.innerHTML = `
      <div style="text-align: center; max-width: 800px; width: 100%;">
        <!-- Header com ícone e título -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 60px;">
          <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 30px; box-shadow: 0 0 40px rgba(139, 92, 246, 0.3);">
            <div style="font-size: 60px;">🏆</div>
          </div>
          <h1 style="font-size: 72px; margin: 0; color: white; font-weight: bold;">
            ${gameNames[gameType] || 'Jogo Finalizado!'}
          </h1>
        </div>

        <!-- Cards de estatísticas -->
        <div style="display: flex; justify-content: space-between; gap: 30px; margin: 60px 0; width: 100%;">
          <div style="background: rgba(30, 30, 30, 0.8); border: 1px solid #374151; border-radius: 20px; padding: 40px; flex: 1; text-align: center; backdrop-filter: blur(10px);">
            <div style="font-size: 64px; font-weight: bold; color: #60a5fa; margin-bottom: 10px;">${score}</div>
            <div style="font-size: 32px; color: #9ca3af;">Pontos</div>
          </div>
          <div style="background: rgba(30, 30, 30, 0.8); border: 1px solid #374151; border-radius: 20px; padding: 40px; flex: 1; text-align: center; backdrop-filter: blur(10px);">
            <div style="font-size: 64px; font-weight: bold; color: #a78bfa; margin-bottom: 10px;">${percentage}%</div>
            <div style="font-size: 32px; color: #9ca3af;">Precisão</div>
          </div>
          <div style="background: rgba(30, 30, 30, 0.8); border: 1px solid #374151; border-radius: 20px; padding: 40px; flex: 1; text-align: center; backdrop-filter: blur(10px);">
            <div style="font-size: 64px; font-weight: bold; color: #f472b6; margin-bottom: 10px;">${timeFormatted}</div>
            <div style="font-size: 32px; color: #9ca3af;">Tempo</div>
          </div>
        </div>

        <!-- Mensagem de performance -->
        <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2)); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 30px; padding: 50px; margin: 60px 0; backdrop-filter: blur(10px);">
          <p style="font-size: 44px; color: white; font-weight: 600; margin: 0; line-height: 1.3;">
            ${getPerformanceMessage(percentage, gameType)} 🎯
          </p>
          <p style="font-size: 32px; color: #d1d5db; margin: 20px 0 0 0;">
            Jogador: ${playerName}
          </p>
        </div>

        <!-- Link do site -->
        <div style="background: rgba(0, 0, 0, 0.6); border: 2px solid #f59e0b; border-radius: 25px; padding: 40px; margin: 40px 0; backdrop-filter: blur(10px);">
          <p style="font-size: 36px; color: #fbbf24; margin: 0 0 15px 0; font-weight: bold;">🎮 Jogue você também!</p>
          <p style="font-size: 42px; color: #fbbf24; margin: 0; font-weight: bold; letter-spacing: 1px;">
            brega-raiz.lovable.app
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(shareElement);

    // Capturar como imagem
    const canvas = await html2canvas(shareElement, {
      width: 1080,
      height: 1920,
      scale: 1,
      backgroundColor: '#000000',
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
        title: `Minha pontuação no Brega Raiz!`,
        text: `Acabei de fazer ${score} pontos no Brega Raiz em ${timeFormatted}! 🎵\n\nJogue você também: brega-raiz.lovable.app`,
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
      alert(`Imagem baixada! Para compartilhar no Instagram Stories:
      
1. Abra o Instagram
2. Vá em Stories
3. Adicione a imagem baixada
4. Adicione um link para: brega-raiz.lovable.app
5. Compartilhe!

O link também está incluído na imagem para fácil acesso.`);
    }

    return true;
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    alert('Erro ao gerar imagem para compartilhamento. Tente novamente.');
    return false;
  }
};

const getPerformanceMessage = (percentage: number, gameType: string) => {
  if (percentage >= 80) {
    const messages = {
      'quiz': 'Você é um verdadeiro expert em brega!',
      'letras': 'Conhece todas as letras do brega!',
      'emojis': 'Mestre dos emojis do brega!',
      'timeline': 'Você é um mestre da história do brega!'
    };
    return messages[gameType] || 'Excelente performance!';
  }
  if (percentage >= 60) {
    return 'Muito bem! Você conhece bastante sobre brega!';
  }
  if (percentage >= 40) {
    return 'Bom trabalho! Continue estudando o brega!';
  }
  return 'Que tal explorar mais sobre a história do brega?';
};
