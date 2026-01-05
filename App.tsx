
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft,
  Loader2,
  Download,
  Brush
} from 'lucide-react';
import { InvitationPageType, WeddingDetails, StylePreset, GeneratedInvitation } from './types';
import { STYLE_PRESETS, DEFAULT_WEDDING_DETAILS } from './constants';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<WeddingDetails>(DEFAULT_WEDDING_DETAILS);
  const [selectedStyle, setSelectedStyle] = useState<StylePreset>(STYLE_PRESETS[0]);
  const [selectedPages, setSelectedPages] = useState<InvitationPageType[]>([
    InvitationPageType.COVER,
    InvitationPageType.DETAILS
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [generatedInvitation, setGeneratedInvitation] = useState<GeneratedInvitation | null>(null);
  const [highQuality, setHighQuality] = useState(false);

  const togglePage = (page: InvitationPageType) => {
    setSelectedPages(prev => 
      prev.includes(page) 
        ? prev.filter(p => p !== page) 
        : [...prev, page]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCurrentProgress(0);
    const results: any[] = [];

    try {
      for (let i = 0; i < selectedPages.length; i++) {
        const pageType = selectedPages[i];
        const imageUrl = await geminiService.generateInvitationPage(pageType, details, selectedStyle, highQuality);
        results.push({
          type: pageType,
          url: imageUrl,
          prompt: `Generated for ${pageType}`
        });
        setCurrentProgress(((i + 1) / selectedPages.length) * 100);
      }

      setGeneratedInvitation({
        id: Math.random().toString(36).substr(2, 9),
        pages: results,
        timestamp: Date.now()
      });
      setStep(4);
    } catch (error) {
      alert("Something went wrong during generation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center">
              <Heart className="text-rose-500 fill-rose-500" size={24} />
            </div>
            <h1 className="text-xl font-serif font-bold tracking-tight text-gray-900">EternalBond Studio</h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <span className={step === 1 ? 'text-rose-600' : ''}>Details</span>
            <span className="text-gray-300">/</span>
            <span className={step === 2 ? 'text-rose-600' : ''}>Style</span>
            <span className="text-gray-300">/</span>
            <span className={step === 3 ? 'text-rose-600' : ''}>Pages</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-12">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-serif text-gray-900 italic">Tell us your story</h2>
              <p className="text-gray-500">Enter your wedding details to personalize the designs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Partner 1</label>
                <input 
                  type="text" 
                  value={details.partner1}
                  onChange={(e) => setDetails({...details, partner1: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  placeholder="e.g. Alexander"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Partner 2</label>
                <input 
                  type="text" 
                  value={details.partner2}
                  onChange={(e) => setDetails({...details, partner2: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  placeholder="e.g. Isabella"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Wedding Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={details.date}
                    onChange={(e) => setDetails({...details, date: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    placeholder="June 24, 2025"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Wedding Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={details.time}
                    onChange={(e) => setDetails({...details, time: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    placeholder="4:00 PM"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Venue Name & Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={details.venue}
                    onChange={(e) => setDetails({...details, venue: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    placeholder="The Grand Conservatory, Charleston, SC"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">RSVP Deadline</label>
                <input 
                  type="text" 
                  value={details.rsvpDeadline}
                  onChange={(e) => setDetails({...details, rsvpDeadline: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  placeholder="May 10, 2025"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setStep(2)}
                className="group flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Choose Style
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <button onClick={() => setStep(1)} className="text-sm font-medium text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 mx-auto mb-4">
                <ChevronLeft size={16} /> Edit Details
              </button>
              <h2 className="text-4xl font-serif text-gray-900 italic">Select your aesthetic</h2>
              <p className="text-gray-500">A consistent theme will be applied to all pages.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STYLE_PRESETS.map((style) => (
                <button 
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`relative overflow-hidden rounded-3xl text-left transition-all border-4 ${
                    selectedStyle.id === style.id 
                      ? 'border-rose-500 shadow-2xl scale-[1.02]' 
                      : 'border-transparent hover:border-rose-200 shadow-md'
                  }`}
                >
                  <img src={style.previewUrl} alt={style.name} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-white">{style.name}</h3>
                      {selectedStyle.id === style.id && <CheckCircle2 className="text-rose-400" size={24} />}
                    </div>
                    <p className="text-gray-200 text-sm mt-1">{style.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setStep(3)}
                className="group flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Select Pages
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <button onClick={() => setStep(2)} className="text-sm font-medium text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 mx-auto mb-4">
                <ChevronLeft size={16} /> Back to Styles
              </button>
              <h2 className="text-4xl font-serif text-gray-900 italic">Invitation layout</h2>
              <p className="text-gray-500">Select which pages you want to generate (max 4).</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.values(InvitationPageType).map((type) => (
                <button
                  key={type}
                  onClick={() => togglePage(type)}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                    selectedPages.includes(type)
                      ? 'bg-rose-50 border-rose-500 text-rose-700'
                      : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <Sparkles size={24} className={selectedPages.includes(type) ? 'text-rose-500' : 'text-gray-300'} />
                  <span className="font-semibold text-center leading-tight">{type}</span>
                </button>
              ))}
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900">Pro Quality Mode</h4>
                  <p className="text-xs text-gray-500">Requires gemini-3-pro-image-preview</p>
                </div>
                <button 
                  onClick={() => setHighQuality(!highQuality)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${highQuality ? 'bg-rose-500' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${highQuality ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <div className="text-xs text-gray-400 italic">
                {highQuality ? 'Model: gemini-3-pro-image-preview (1K)' : 'Model: gemini-2.5-flash-image'}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={handleGenerate}
                disabled={selectedPages.length === 0}
                className="group flex items-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-300 text-white px-10 py-5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Generating... {Math.round(currentProgress)}%
                  </>
                ) : (
                  <>
                    <Brush size={24} />
                    Generate Invitation
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 4 && generatedInvitation && (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-serif text-gray-900 italic">Your Eternal Bond Invitations</h2>
              <p className="text-gray-500">Ready to download and share with your loved ones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              {generatedInvitation.pages.map((page, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center font-serif italic text-rose-500 text-xl border border-rose-100 z-10">
                    {idx + 1}
                  </div>
                  <div className="bg-white p-4 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-50 transition-transform hover:scale-[1.02]">
                    <img 
                      src={page.url} 
                      alt={page.type} 
                      className="w-full aspect-[3/4] object-cover rounded-[1.5rem]" 
                    />
                    <div className="mt-4 flex items-center justify-between px-2">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{page.type}</span>
                        <h4 className="font-serif text-lg text-gray-900">{details.partner1} & {details.partner2}</h4>
                      </div>
                      <a 
                        href={page.url} 
                        download={`wedding_${page.type.toLowerCase().replace(' ', '_')}.png`}
                        className="p-3 bg-gray-100 hover:bg-rose-100 hover:text-rose-600 text-gray-500 rounded-full transition-colors"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 pt-12">
              <button 
                onClick={() => setStep(1)}
                className="text-rose-600 font-semibold hover:underline"
              >
                Create another design
              </button>
              <div className="text-xs text-gray-400">
                Generated with AI Studio & Gemini • {new Date(generatedInvitation.timestamp).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Generation Progress Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm px-4">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-4 border-rose-100 border-t-rose-500 animate-spin mx-auto" />
              <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 fill-rose-500 animate-pulse" size={40} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-serif italic text-gray-900">Crafting your masterpiece...</h3>
              <p className="text-gray-500 italic">"The best thing to hold onto in life is each other."</p>
              
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 transition-all duration-500 ease-out"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
              <div className="text-sm font-medium text-rose-600">
                {Math.round(currentProgress)}% Complete
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
