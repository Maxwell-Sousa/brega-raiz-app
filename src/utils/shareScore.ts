import html2canvas from 'html2canvas';

export async function shareScoreToInstagram(elementId: string) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado');
    }

    // Gerar o canvas do elemento
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // Melhor qualidade
    });

    // Converter para blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png');
    });

    // Criar arquivo
    const file = new File([blob], 'score.png', { type: 'image/png' });

    // Verificar se o navegador suporta a API de compartilhamento
    if (navigator.share) {
      await navigator.share({
        files: [file],
        title: 'Minha pontuação no Só Há Brega!',
        text: 'Jogue também em sohabrega.com.br',
      });
    } else {
      // Fallback para navegadores que não suportam a API de compartilhamento
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'score.png';
      link.click();
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    alert('Não foi possível compartilhar a pontuação. Tente novamente mais tarde.');
  }
} 