
import React, { useState, useCallback } from 'react';
import { Sparkles, Copy, RefreshCcw, Camera, Palette, Zap, Image as ImageIcon, Check, Layout, Sun, Monitor } from 'lucide-react';
import { PromptConfig, GeneratedPrompt, Style, Lighting, Camera as CameraType } from './types';
import { enhancePrompt } from './geminiService';

const App: React.FC = () => {
  const [config, setConfig] = useState<PromptConfig>({
    idea: '',
    style: Style.REALISTIC,
    lighting: Lighting.CINEMATIC,
    camera: CameraType.WIDE_ANGLE,
    mood: 'Epic',
    artist: '',
    aspectRatio: '16:9'
  });

  const [results, setResults] = useState<GeneratedPrompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!config.idea.trim()) {
      alert("يرجى إدخال فكرة أولاً!");
      return;
    }
    setLoading(true);
    try {
      const data = await enhancePrompt(config);
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">محترف أوامر الصور</h1>
            <p className="text-slate-400 mt-1">اصنع أوامر احترافية لـ Midjourney و DALL-E و Stable Diffusion</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>مدعوم بـ Gemini 3 Flash</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 block">فكرتك الأساسية (بالعربية أو الإنجليزية)</label>
              <textarea
                value={config.idea}
                onChange={(e) => setConfig({...config, idea: e.target.value})}
                placeholder="مثلاً: قطة ترتدي بدلة رائد فضاء في غابة من الكريستال..."
                className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-400" />
                  النمط الفني (Style)
                </label>
                <select
                  value={config.style}
                  onChange={(e) => setConfig({...config, style: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.values(Style).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  الإضاءة (Lighting)
                </label>
                <select
                  value={config.lighting}
                  onChange={(e) => setConfig({...config, lighting: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.values(Lighting).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  الكاميرا (Camera)
                </label>
                <select
                  value={config.camera}
                  onChange={(e) => setConfig({...config, camera: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.values(CameraType).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-pink-400" />
                    الأبعاد
                  </label>
                  <select
                    value={config.aspectRatio}
                    onChange={(e) => setConfig({...config, aspectRatio: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 outline-none"
                  >
                    <option value="16:9">16:9</option>
                    <option value="9:16">9:16</option>
                    <option value="1:1">1:1</option>
                    <option value="4:3">4:3</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-sky-400" />
                    المزاج
                  </label>
                  <input
                    type="text"
                    value={config.mood}
                    onChange={(e) => setConfig({...config, mood: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 outline-none"
                    placeholder="مثلاً: غامض"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                loading 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/20 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                  جاري التوسيع...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  توسيع الفكرة بالذكاء الاصطناعي
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-8">
          {results.length > 0 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-indigo-400" />
                الأوامر المقترحة
              </h2>
              {results.map((result, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-colors group">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Variation {idx + 1}</span>
                        <p className="text-slate-300 text-sm">{result.arabicDescription}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(result.english, idx)}
                        className="bg-slate-800 hover:bg-slate-700 p-2.5 rounded-xl transition-all active:scale-95"
                        title="نسخ الأمر"
                      >
                        {copiedIndex === idx ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    <div className="bg-slate-950/50 border border-slate-800/50 p-5 rounded-2xl mb-4 relative">
                      <p className="text-slate-100 leading-relaxed font-mono text-sm break-words" dir="ltr">
                        {result.english}
                        <span className="text-indigo-400 opacity-80"> --ar {config.aspectRatio} --v 6.0</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-3 py-1 bg-slate-800 text-slate-400 text-xs rounded-full border border-slate-700 group-hover:border-slate-600 transition-colors">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl">
              <div className="bg-slate-900 p-6 rounded-full mb-6">
                <ImageIcon className="w-12 h-12 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">ابدأ بكتابة فكرتك</h3>
              <p className="text-slate-500 max-w-sm">
                أدخل تفاصيل بسيطة وسيقوم الذكاء الاصطناعي بتحويلها إلى أوامر احترافية ودقيقة.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} محترف أوامر الصور - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
};

export default App;
