
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
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
      color: white;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
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
      <!-- Background decoration -->
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%);"></div>
      
      <div style="text-align: center; max-width: 900px; width: 100%; position: relative; z-index: 1;">
        <!-- Header com ícone e título -->
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 80px;">
          <div style="width: 140px; height: 140px; background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 40px; box-shadow: 0 0 60px rgba(139, 92, 246, 0.4), 0 0 120px rgba(139, 92, 246, 0.2); position: relative;">
            <div style="font-size: 70px;">🏆</div>
            <div style="position: absolute; inset: -10px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899); opacity: 0.3; filter: blur(20px);"></div>
          </div>
          <h1 style="font-size: 84px; margin: 0; color: white; font-weight: 800; text-shadow: 0 4px 20px rgba(0,0,0,0.5); background: linear-gradient(135deg, #ffffff, #e2e8f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            ${gameNames[gameType] || 'Jogo Finalizado!'}
          </h1>
        </div>

        <!-- Cards de estatísticas com design melhorado -->
        <div style="display: flex; justify-content: space-between; gap: 40px; margin: 80px 0; width: 100%;">
          <div style="background: linear-gradient(145deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.9)); border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 30px; padding: 50px 30px; flex: 1; text-align: center; backdrop-filter: blur(20px); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #60a5fa, #3b82f6);"></div>
            <div style="font-size: 72px; font-weight: 900; color: #60a5fa; margin-bottom: 15px; text-shadow: 0 2px 10px rgba(96, 165, 250, 0.3);">${score}</div>
            <div style="font-size: 36px; color: #cbd5e1; font-weight: 600;">Pontos</div>
          </div>
          <div style="background: linear-gradient(145deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.9)); border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 30px; padding: 50px 30px; flex: 1; text-align: center; backdrop-filter: blur(20px); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #a78bfa, #8b5cf6);"></div>
            <div style="font-size: 72px; font-weight: 900; color: #a78bfa; margin-bottom: 15px; text-shadow: 0 2px 10px rgba(167, 139, 250, 0.3);">${percentage}%</div>
            <div style="font-size: 36px; color: #cbd5e1; font-weight: 600;">Precisão</div>
          </div>
          <div style="background: linear-gradient(145deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.9)); border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 30px; padding: 50px 30px; flex: 1; text-align: center; backdrop-filter: blur(20px); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #f472b6, #ec4899);"></div>
            <div style="font-size: 72px; font-weight: 900; color: #f472b6; margin-bottom: 15px; text-shadow: 0 2px 10px rgba(244, 114, 182, 0.3);">${timeFormatted}</div>
            <div style="font-size: 36px; color: #cbd5e1; font-weight: 600;">Tempo</div>
          </div>
        </div>

        <!-- Mensagem de performance com design melhorado -->
        <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.15)); border: 2px solid rgba(139, 92, 246, 0.4); border-radius: 40px; padding: 60px 50px; margin: 80px 0; backdrop-filter: blur(20px); position: relative; overflow: hidden;">
          <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%); animation: pulse 4s ease-in-out infinite;"></div>
          <div style="position: relative; z-index: 1;">
            <p style="font-size: 52px; color: white; font-weight: 700; margin: 0; line-height: 1.3; text-shadow: 0 2px 15px rgba(0,0,0,0.3);">
              ${getPerformanceMessage(percentage, gameType)} 🎯
            </p>
            <p style="font-size: 40px; color: #e2e8f0; margin: 30px 0 0 0; font-weight: 600;">
              Jogador: ${playerName}
            </p>
          </div>
        </div>

        <!-- Link do site com design melhorado -->
        <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2)); border: 3px solid #f59e0b; border-radius: 35px; padding: 50px; margin: 60px 0; backdrop-filter: blur(20px); position: relative; overflow: hidden;">
          <div style="position: absolute; inset: 0; background: linear-gradient(45deg, transparent 30%, rgba(251, 191, 36, 0.1) 50%, transparent 70%); animation: shimmer 3s ease-in-out infinite;"></div>
          <div style="position: relative; z-index: 1;">
            <p style="font-size: 42px; color: #fbbf24; margin: 0 0 20px 0; font-weight: 800; text-shadow: 0 2px 10px rgba(251, 191, 36, 0.3);">🎮 Jogue você também!</p>
            <p style="font-size: 48px; color: #fbbf24; margin: 0; font-weight: 900; letter-spacing: 2px; text-shadow: 0 2px 15px rgba(251, 191, 36, 0.4);">
              soabrega.vercel.app
            </p>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      </style>
    `;

    document.body.appendChild(shareElement);

    // Capturar como imagem
    const canvas = await html2canvas(shareElement, {
      width: 1080,
      height: 1920,
      scale: 1,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true
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
        title: `Minha pontuação no jogo!`,
        text: `Acabei de fazer ${score} pontos em ${timeFormatted}! 🎵\n\nJogue você também: soabrega.vercel.app`,
        files: [file]
      });
    } else {
      // Fallback: fazer download da imagem
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `score-${playerName}-${gameType}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Mostrar instrução para o usuário
      alert(`Imagem baixada! Para compartilhar no Instagram Stories:
      
1. Abra o Instagram
2. Vá em Stories
3. Adicione a imagem baixada
4. Adicione um link para: soabrega.vercel.app
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
