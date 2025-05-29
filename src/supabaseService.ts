import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Substitua SUA_URL_SUPABASE pela URL do seu projeto Supabase
// É altamente recomendável usar variáveis de ambiente para suas credenciais
const supabaseUrl: string = 'https://bhnmsaebbljqpcvsxpfr.supabase.co'; // Ex: process.env.REACT_APP_SUPABASE_URL
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoäm1zYWViYmxqcXBjdnN4cGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTMzODYsImV4cCI6MjA2Mzc2OTM4Nn0.7-WDzStJDm7Ff0NwOlK9Q0BwZays1BLYOL8Yrpb_v2Y'; // Sua chave anon/pública. Ex: process.env.REACT_APP_SUPABASE_ANON_KEY

// Verifique se as credenciais foram fornecidas
if (!supabaseUrl || !supabaseKey) {
  console.error('Credenciais do Supabase não configuradas. Verifique suas variáveis de ambiente ou substitua os placeholders.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Função para buscar, embaralhar e retornar 10 perguntas do quiz
export async function getShuffledQuizQuestions() {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*'); // Seleciona todas as colunas

  if (error) {
    console.error('Erro ao buscar perguntas do quiz:', error);
    return [];
  }

  // Se não houver dados, retorna um array vazio
  if (!data || data.length === 0) {
    console.warn('Nenhuma pergunta encontrada na tabela quiz_questions.');
    return [];
  }

  // Embaralha o array de perguntas (Algoritmo Fisher-Yates)
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]]; // Troca os elementos
  }

  // Retorna as primeiras 10 perguntas embaralhadas, ou todas se forem menos de 10
  const numberOfQuestions = 10;
  console.log(`Buscadas ${data.length} perguntas de quiz. Retornando ${Math.min(data.length, numberOfQuestions)} embaralhadas.`);
  return data.slice(0, numberOfQuestions);
}

// Função para buscar, embaralhar e retornar desafios de emoji
export async function getShuffledEmojiChallenges() {
  const { data, error } = await supabase
    .from('emoji_challenges')
    .select('*'); // Seleciona todas as colunas

  if (error) {
    console.error('Erro ao buscar desafios de emoji:', error);
    return [];
  }

  // Se não houver dados, retorna um array vazio
  if (!data || data.length === 0) {
     console.warn('Nenhum desafio encontrado na tabela emoji_challenges.');
    return [];
  }

  // Embaralha o array de desafios (Algoritmo Fisher-Yates)
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]]; // Troca os elementos
  }

  console.log(`Buscados ${data.length} desafios de emoji. Retornando todos embaralhados.`);
  return data;
}

// Função para buscar, embaralhar e retornar frases para completar letras
export async function getShuffledLyricsComplete() {
  const { data, error } = await supabase
    .from('lyrics_complete')
    .select('*'); // Seleciona todas as colunas

  if (error) {
    console.error('Erro ao buscar frases para completar letras:', error);
    return [];
  }

   // Se não houver dados, retorna um array vazio
  if (!data || data.length === 0) {
     console.warn('Nenhuma frase encontrada na tabela lyrics_complete.');
    return [];
  }

  // Embaralha o array de frases (Algoritmo Fisher-Yates)
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]]; // Troca os elementos
  }

  console.log(`Buscadas ${data.length} frases para completar. Retornando todas embaralhadas.`);
  return data;
}

// Função para buscar, embaralhar e retornar eventos da linha do tempo
export async function getShuffledTimelineEvents() {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*'); // Seleciona todas as colunas

  if (error) {
    console.error('Erro ao buscar eventos da linha do tempo:', error);
    return [];
  }

    // Se não houver dados, retorna um array vazio
  if (!data || data.length === 0) {
     console.warn('Nenhum evento encontrado na tabela timeline_events.');
    return [];
  }

  // Embaralha o array de eventos (Algoritmo Fisher-Yates)
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]]; // Troca os elementos
  }

  console.log(`Buscados ${data.length} eventos da linha do tempo. Retornando todos embaralhados.`);
  return data;
} 