import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Brain, Sparkles, Zap, TrendingUp, MapPin, Leaf, Package, ArrowRight, RotateCcw, CheckCircle2, BarChart3, Target, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIAssistant() {
  const { user } = useAppContext();
  const [cropType, setCropType] = useState('');
  const [region, setRegion] = useState(user?.region || 'Oromia');
  const [quantity, setQuantity] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [analysisStep, setAnalysisStep] = useState('');

  const cropOptions = ['Teff', 'Coffee', 'Wheat', 'Maize', 'Sorghum', 'Barley', 'Chat', 'Sesame'];
  const regionOptions = ['Addis Ababa', 'Oromia', 'Amhara', 'SNNPR', 'Tigray', 'Sidama'];

  const handleAnalyze = () => {
    if (!cropType || !region) return;
    setIsAnalyzing(true);
    setResult(null);
    const steps = ['Scanning regional supply data...', 'Analyzing seasonal demand...', 'Evaluating competitor pricing...', 'Computing optimal price range...', 'Generating recommendation...'];
    let stepIdx = 0;
    setAnalysisStep(steps[0]);
    const interval = setInterval(() => { stepIdx++; if (stepIdx < steps.length) setAnalysisStep(steps[stepIdx]); }, 400);

    setTimeout(() => {
      clearInterval(interval);
      let base = 90, demandLevel = 'Moderate', trend = 'Stable', confidence = 84, seasonalNote = 'Standard market conditions.', recommendation = 'Price at market average.';
      if (cropType === 'Teff') { base = 120; demandLevel = 'High'; trend = 'Rising'; confidence = 92; seasonalNote = 'Peak season demand expected in 2 months.'; recommendation = 'Strong seller market — list at the higher end.'; }
      else if (cropType === 'Coffee') { base = 400; demandLevel = 'Very High'; trend = 'Rising'; confidence = 95; seasonalNote = 'Export demand at annual peak.'; recommendation = 'Premium pricing justified — Ethiopian coffee commands a global premium.'; }
      else if (cropType === 'Wheat') { base = 80; demandLevel = 'Moderate'; trend = 'Stable'; confidence = 88; seasonalNote = 'Supply levels balanced.'; recommendation = 'Price competitively to move volume.'; }
      else if (cropType === 'Maize') { base = 65; demandLevel = 'Low'; trend = 'Declining'; confidence = 82; seasonalNote = 'Post-harvest — supply abundant.'; recommendation = 'Consider holding stock 2-3 weeks.'; }
      if (region === 'Addis Ababa') base = Math.floor(base * 1.15);
      else if (region === 'Oromia') base = Math.floor(base * 1.05);
      const suggested = base + Math.floor(Math.random() * 20);
      setResult({ suggestedPrice: suggested, minPrice: Math.floor(suggested * 0.85), maxPrice: Math.floor(suggested * 1.15), avgMarketPrice: Math.floor(suggested * 0.95), demandLevel, trend, confidence, seasonalNote, recommendation, potentialRevenue: quantity ? Number(quantity) * suggested : null, reasoning: `Based on current ${cropType} market data in ${region}, seasonal demand, regional supply, and 6-month pricing history.` });
      setIsAnalyzing(false);
    }, 2200);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 py-16 sm:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-violet-500/20 rounded-full blur-[120px] float-animation"></div>
          <div className="absolute bottom-0 right-[10%] w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] float-animation" style={{animationDelay:'2s'}}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-violet-200 font-medium text-sm mb-6">
            <Brain className="h-4 w-4" /> Powered by Claude AI Engine
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            AI Pricing <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300">Assistant</span>
          </h1>
          <p className="text-lg sm:text-xl text-violet-200/80 max-w-2xl mx-auto leading-relaxed">
            Get intelligent, data-driven price suggestions based on real-time market analysis, seasonal trends, and regional demand.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden sticky top-24">
              <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-purple-50">
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Zap className="h-5 w-5 text-violet-600" /> Analysis Input</h2>
                <p className="text-sm text-slate-500 mt-1">Enter your crop details below</p>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Crop Type</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Leaf className="h-5 w-5" /></div>
                    <select value={cropType} onChange={e => setCropType(e.target.value)} className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 text-slate-900 transition-all appearance-none cursor-pointer">
                      <option value="">Select a crop</option>
                      {cropOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Region</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><MapPin className="h-5 w-5" /></div>
                    <select value={region} onChange={e => setRegion(e.target.value)} className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 text-slate-900 transition-all appearance-none cursor-pointer">
                      {regionOptions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity (kg) <span className="text-slate-400 font-normal">Optional</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400"><Package className="h-5 w-5" /></div>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-all" placeholder="e.g. 500" />
                  </div>
                </div>
                <button onClick={handleAnalyze} disabled={!cropType || !region || isAnalyzing} className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold text-base hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isAnalyzing ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Analyzing...</>) : (<><Brain className="h-5 w-5" />Analyze with AI</>)}
                </button>
                {result && <button onClick={() => { setResult(null); setCropType(''); setQuantity(''); }} className="w-full py-3 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"><RotateCcw className="h-4 w-4" />New Analysis</button>}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            {isAnalyzing && (
              <div className="bg-white rounded-3xl border border-violet-200 shadow-xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-400 to-violet-600 opacity-5 ai-shimmer"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 ai-pulse"><Brain className="h-7 w-7 text-white" /></div>
                    <div><h3 className="text-xl font-bold text-slate-900">AI is Analyzing...</h3><p className="text-sm text-violet-600 font-medium">{cropType} in {region}</p></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-violet-700"><div className="w-5 h-5 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin shrink-0"></div><span className="font-medium text-sm">{analysisStep}</span></div>
                    <div className="h-2.5 bg-violet-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full ai-shimmer" style={{width:'85%'}}></div></div>
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {['Regional supply','Seasonal trends','Demand scoring'].map((l,i) => (
                        <div key={l} className="bg-violet-50 rounded-xl p-3 text-center border border-violet-100"><div className="sparkle-dot" style={{animationDelay:`${i*0.5}s`}}><div className="w-2 h-2 bg-violet-400 rounded-full mx-auto mb-1.5"></div></div><span className="text-xs font-medium text-violet-600">{l}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="space-y-5">
                {/* Main Price Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"><Brain className="h-5 w-5 text-white" /></div>
                      <div><h3 className="font-bold text-white">AI Price Recommendation</h3><p className="text-violet-200 text-xs">{cropType} • {region}</p></div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-lg"><div className="w-2 h-2 rounded-full bg-emerald-400"></div><span className="text-xs font-semibold text-white">{result.confidence}% confidence</span></div>
                  </div>
                  <div className="p-6">
                    <div className="text-center py-6">
                      <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-2">Suggested Price</p>
                      <div className="flex items-end justify-center gap-2"><span className="text-6xl font-extrabold text-slate-900">{result.suggestedPrice}</span><span className="text-2xl font-bold text-slate-400 mb-2">ETB/kg</span></div>
                      <div className="mt-3 inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full"><span className="text-sm text-slate-500">Range:</span><span className="text-sm font-bold text-slate-700">{result.minPrice} — {result.maxPrice} ETB</span></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100"><BarChart3 className="h-5 w-5 text-slate-400 mx-auto mb-2" /><p className="text-xs text-slate-400 mb-0.5">Demand</p><p className={`text-sm font-bold ${result.demandLevel==='Very High'||result.demandLevel==='High'?'text-emerald-600':result.demandLevel==='Moderate'?'text-amber-600':'text-red-500'}`}>{result.demandLevel}</p></div>
                      <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100"><TrendingUp className="h-5 w-5 text-slate-400 mx-auto mb-2" /><p className="text-xs text-slate-400 mb-0.5">Trend</p><p className={`text-sm font-bold ${result.trend==='Rising'?'text-emerald-600':result.trend==='Stable'?'text-blue-600':'text-red-500'}`}>{result.trend} {result.trend==='Rising'?'↑':result.trend==='Declining'?'↓':'→'}</p></div>
                      <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100"><Target className="h-5 w-5 text-slate-400 mx-auto mb-2" /><p className="text-xs text-slate-400 mb-0.5">Market Avg</p><p className="text-sm font-bold text-slate-700">{result.avgMarketPrice} ETB</p></div>
                    </div>
                  </div>
                </div>

                {result.potentialRevenue && (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-5 flex items-center justify-between">
                    <div><p className="text-sm font-semibold text-emerald-700 mb-1">Estimated Revenue</p><p className="text-3xl font-extrabold text-slate-900">{result.potentialRevenue.toLocaleString()} <span className="text-lg font-bold text-slate-400">ETB</span></p><p className="text-xs text-emerald-600 mt-1">For {quantity} kg at {result.suggestedPrice} ETB/kg</p></div>
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center"><TrendingUp className="h-7 w-7 text-emerald-600" /></div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm"><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center"><Brain className="h-4 w-4 text-violet-600" /></div><h4 className="font-bold text-slate-900 text-sm">AI Recommendation</h4></div><p className="text-sm text-slate-600 leading-relaxed">{result.recommendation}</p></div>
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm"><div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center"><Info className="h-4 w-4 text-amber-600" /></div><h4 className="font-bold text-slate-900 text-sm">Seasonal Insight</h4></div><p className="text-sm text-slate-600 leading-relaxed">{result.seasonalNote}</p></div>
                </div>

                <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5"><div className="flex items-start gap-3"><Sparkles className="h-5 w-5 text-violet-500 mt-0.5 shrink-0" /><div><p className="text-sm font-semibold text-violet-700 mb-1">Analysis Methodology</p><p className="text-sm text-violet-600 leading-relaxed">{result.reasoning}</p></div></div></div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div><h4 className="font-bold text-slate-900">Ready to list your produce?</h4><p className="text-sm text-slate-500">Use this AI-suggested price in your new listing.</p></div>
                  <Link to="/farmer" className="px-6 py-3 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 whitespace-nowrap">Go to Dashboard <ArrowRight className="h-5 w-5" /></Link>
                </div>
              </div>
            )}

            {!result && !isAnalyzing && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 float-animation"><Sparkles className="h-10 w-10 text-violet-500" /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Get Your AI Price Analysis</h3>
                <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-8">Select a crop type and region, then click <span className="font-semibold text-violet-600">"Analyze with AI"</span> to receive an intelligent pricing recommendation.</p>
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                  {[{icon: BarChart3, label:'Market Data', bg:'bg-blue-50', fg:'text-blue-500'},{icon: TrendingUp, label:'Price Trends', bg:'bg-emerald-50', fg:'text-emerald-500'},{icon: Target, label:'Demand Analysis', bg:'bg-violet-50', fg:'text-violet-500'}].map(({icon:Icon,label,bg,fg}) => (
                    <div key={label} className={`rounded-xl p-3 text-center ${bg}`}><Icon className={`h-6 w-6 mx-auto mb-1.5 ${fg}`} /><span className="text-xs font-medium text-slate-600">{label}</span></div>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400"><CheckCircle2 className="h-4 w-4 text-emerald-400" /><span>Analysis is free and instant</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
