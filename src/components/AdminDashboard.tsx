import React, { useState } from 'react';
import { useContent, SiteContent, TextStyle, defaultTextStyle } from '../context/ContentContext';
import { cn } from '../lib/utils';
import { Download, Layout, Type, Image as ImageIcon, Settings, Save, Bell, Plus, Trash, RotateCcw, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const AdminDashboard = () => {
  const { content, updateContent, updateSection, saveContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState<keyof SiteContent | 'export'>('hero');

  // SVG Icons map for export
  const svgIcons: Record<string, string> = {
    'Dumbbell': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>',
    'UserCheck': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>',
    'MapPin': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    'ChevronRight': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    'default': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
  };

  const generateStyleString = (style: TextStyle) => {
    return `font-size: ${getFontSizePx(style.fontSize)}; color: ${style.color}; font-weight: ${getFontWeightNum(style.fontWeight)}; text-align: ${style.textAlign}; white-space: pre-wrap;`;
  };

  const getFontWeightNum = (weight: string) => {
    switch (weight) {
      case 'normal': return 400;
      case 'medium': return 500;
      case 'bold': return 700;
      case 'extrabold': return 800;
      case 'black': return 900;
      default: return 400;
    }
  };

  const getFontSizePx = (size: string) => {
    switch (size) {
      case 'xs': return '0.75rem';
      case 'sm': return '0.875rem';
      case 'base': return '1rem';
      case 'lg': return '1.125rem';
      case 'xl': return '1.25rem';
      case '2xl': return '1.5rem';
      case '3xl': return '1.875rem';
      case '4xl': return '2.25rem';
      default: return '1rem';
    }
  };

  const handleExport = () => {
    // This function generates a standalone HTML file
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.hero.brandName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
    <link rel="stylesheet" href="https://webfontworld.github.io/gmarket/GmarketSans.css" />
    <style>
        body { font-family: '${content.theme.fontFamily}', 'Pretendard', sans-serif; }
        .scroll-reveal { opacity: 0; transform: translateY(20px); transition: all 0.6s ease-out; }
        .scroll-reveal.visible { opacity: 1; transform: translateY(0); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .snap-x { scroll-snap-type: x mandatory; }
        .snap-center { scroll-snap-align: center; }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '${content.theme.primaryColor}',
                        accent: '${content.theme.accentColor}',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-100">
    <div class="w-full max-w-[480px] mx-auto min-h-screen bg-white shadow-2xl overflow-hidden">
        
        <!-- Hero Section -->
        <section class="relative aspect-[9/16] w-full overflow-hidden">
            <div class="absolute inset-0">
                <img src="${content.hero.bgImage}" alt="Hero" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>
            <div class="absolute inset-0 flex flex-col justify-end p-6 pb-12 text-white">
                <p class="mb-2 uppercase tracking-wider" style="${generateStyleString(content.hero.styles.subCopy)}">${content.hero.subCopy}</p>
                <h1 class="mb-4 leading-tight" style="${generateStyleString(content.hero.styles.mainCopy)}">${content.hero.mainCopy}</h1>
                <p class="mb-8" style="${generateStyleString(content.hero.styles.brandName)}">${content.hero.brandName}</p>
                <div class="flex flex-col items-center w-full">
                    <span class="text-xs font-bold mb-2 animate-bounce text-accent">${content.hero.ctaSubText}</span>
                    <a href="${content.hero.ctaLink}" class="w-full py-4 rounded-xl font-bold text-lg text-white text-center shadow-lg bg-accent transition-transform active:scale-95">
                        ${content.hero.ctaText}
                    </a>
                </div>
            </div>
        </section>

        <!-- USP Summary -->
        <section class="relative py-16 px-6">
            <div class="absolute inset-0 z-0">
                <img src="${content.uspSummary.bgImage}" alt="USP Background" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
            </div>
            
            <div class="relative z-10 mb-10 text-center space-y-2">
                ${content.uspSummary.headCopy ? `<h2 style="${generateStyleString(content.uspSummary.styles.headCopy || content.uspSummary.styles.title)}">${content.uspSummary.headCopy}</h2>` : ''}
                ${content.uspSummary.bodyCopy ? `<p style="${generateStyleString(content.uspSummary.styles.bodyCopy || content.uspSummary.styles.description)}">${content.uspSummary.bodyCopy}</p>` : ''}
            </div>

            <div class="relative z-10 grid grid-cols-3 gap-3">
                ${content.uspSummary.items.map(item => `
                <div class="flex flex-col items-center text-center p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm h-full">
                    <div class="p-2.5 rounded-full mb-3 text-white shadow-md bg-accent">
                        ${svgIcons[item.icon] || svgIcons['default']}
                    </div>
                    <h3 class="mb-1 leading-tight" style="${generateStyleString(content.uspSummary.styles.title)}">${item.title}</h3>
                    <p class="leading-snug break-keep" style="${generateStyleString(content.uspSummary.styles.description)}">${item.description}</p>
                </div>`).join('')}
            </div>
        </section>

        <!-- Convention -->
        <section class="py-16 px-6 bg-gray-900 text-white">
            <div class="flex flex-col">
                <h2 class="mb-6" style="${generateStyleString(content.convention.styles.title)}">${content.convention.title}</h2>
                <div class="w-full h-48 rounded-lg overflow-hidden mb-6">
                    <img src="${content.convention.image}" alt="Convention" class="w-full h-full object-cover">
                </div>
                <p class="mb-12 leading-relaxed" style="${generateStyleString(content.convention.styles.description)}">${content.convention.description}</p>
                <div class="w-16 h-1 mx-auto mb-12 bg-accent"></div>
                <h3 class="leading-snug" style="${generateStyleString(content.convention.styles.mainCopy)}">${content.convention.mainCopy}</h3>
            </div>
        </section>

        <!-- Disruption -->
        <section class="relative py-24 px-6 overflow-hidden">
            <div class="absolute inset-0 z-0">
                <img src="${content.disruption.bgImage}" alt="Disruption Background" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>
            </div>
            <div class="relative z-10 scroll-reveal">
                <h2 class="mb-4 uppercase tracking-widest" style="${generateStyleString(content.disruption.styles.title)}">${content.disruption.title}</h2>
                <p class="mb-8 leading-relaxed" style="${generateStyleString(content.disruption.styles.description)}">${content.disruption.description}</p>
                <h3 class="leading-tight" style="${generateStyleString(content.disruption.styles.mainCopy)}">${content.disruption.mainCopy}</h3>
            </div>
        </section>

        <!-- Detailed USPs (Mixed Sections) -->
        <section class="py-16 bg-gray-50 overflow-hidden">
            <div class="px-6 mb-12 text-center space-y-2">
                ${content.detailedUsps.headCopy ? `<h2 style="${generateStyleString(content.detailedUsps.styles.headCopy || content.detailedUsps.styles.title)}">${content.detailedUsps.headCopy}</h2>` : ''}
                ${content.detailedUsps.bodyCopy ? `<p style="${generateStyleString(content.detailedUsps.styles.bodyCopy || content.detailedUsps.styles.description)}">${content.detailedUsps.bodyCopy}</p>` : ''}
            </div>
            <div class="px-6 space-y-12">
                ${content.detailedUsps.sections.map((section, idx) => `
                <div class="section-container">
                    ${section.type === 'card' ? `
                    <div class="bg-white rounded-2xl overflow-hidden shadow-md scroll-reveal">
                        ${section.image ? `<div class="h-48 overflow-hidden"><img src="${section.image}" alt="${section.title}" class="w-full h-full object-cover"></div>` : ''}
                        <div class="p-6">
                            <div class="text-xs font-bold mb-2 uppercase tracking-wider text-accent">POINT ${idx + 1}</div>
                            <h3 class="mb-3 whitespace-pre-wrap" style="${generateStyleString(content.detailedUsps.styles.title)}">${section.title}</h3>
                            <p class="leading-relaxed" style="${generateStyleString(content.detailedUsps.styles.description)}">${section.description}</p>
                        </div>
                    </div>
                    ` : `
                    <div class="space-y-4">
                        <div class="px-1">
                            <div class="text-xs font-bold mb-2 uppercase tracking-wider text-accent">POINT ${idx + 1}</div>
                            <h3 class="mb-2 whitespace-pre-wrap" style="${generateStyleString(content.detailedUsps.styles.title)}">${section.title}</h3>
                            <p class="leading-relaxed mb-4" style="${generateStyleString(content.detailedUsps.styles.description)}">${section.description}</p>
                        </div>
                        <div class="flex overflow-x-auto overflow-y-hidden pb-4 space-x-4 no-scrollbar snap-x snap-mandatory -mx-6 px-6">
                            ${section.items?.map((item, itemIdx) => `
                            <div class="flex-shrink-0 w-[85%] snap-center bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 scroll-reveal" style="transition-delay: ${itemIdx * 0.1}s">
                                <div class="aspect-[3/4] overflow-hidden bg-gray-200">
                                    <img src="${item.image}" alt="${item.text}" class="w-full h-full object-cover">
                                </div>
                                <div class="p-4 text-center">
                                    <p class="text-lg font-bold text-gray-900 mb-1">${item.text}</p>
                                    ${item.description ? `<p class="text-sm text-gray-500 whitespace-pre-wrap">${item.description}</p>` : ''}
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                    `}
                </div>
                `).join('')}
            </div>
        </section>

        <!-- Notices -->
        ${content.notices.show ? `
        <section class="py-12 px-6 bg-white border-t border-gray-100">
            <h3 class="text-lg font-bold mb-1 text-gray-900">${content.notices.title}</h3>
            ${content.notices.description ? `<p class="text-sm text-gray-500 mb-6">${content.notices.description}</p>` : ''}
            <div class="space-y-4">
                ${content.notices.items.map(item => `
                <div class="block p-4 rounded-xl bg-gray-50">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-xs font-medium text-gray-500">${item.date}</span>
                    </div>
                    <p class="font-medium text-gray-800 truncate">${item.title}</p>
                    ${item.description ? `<p class="text-[10px] text-gray-500 mt-1 line-clamp-2">${item.description}</p>` : ''}
                </div>`).join('')}
            </div>
        </section>
        ` : ''}

        <!-- Outro -->
        <section class="py-16 px-6 bg-white text-center">
            <div class="rounded-2xl overflow-hidden shadow-lg mb-8 border-2 border-accent">
                <img src="${content.outro.mapImage}" alt="Map" class="w-full aspect-square object-cover">
            </div>
            <a href="${content.outro.mapLink}" target="_blank" class="block w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-transform active:scale-95 bg-accent">
                ${content.outro.ctaText}
            </a>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-gray-400 py-12 px-6 text-sm">
            <div class="mb-8">
                <h4 class="text-white font-bold text-lg mb-4">${content.footer.brandName}</h4>
                <p class="mb-2">${content.footer.address}</p>
                <p class="mb-2">${content.footer.hours}</p>
                <a href="tel:${content.footer.phone}" class="flex items-center gap-2 mt-4 text-white font-bold">
                    ${content.footer.phone}
                </a>
            </div>
            <p class="mt-8 text-xs text-gray-600">&copy; ${new Date().getFullYear()} ${content.footer.brandName}. All rights reserved.</p>
        </footer>
    </div>
    
    <script>
        // Simple Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    </script>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Layout },
    { id: 'uspSummary', label: 'USP Summary', icon: Layout },
    { id: 'convention', label: 'Convention', icon: Type },
    { id: 'disruption', label: 'Disruption', icon: Type },
    { id: 'detailedUsps', label: 'Detailed USPs', icon: Layout },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'outro', label: 'Outro', icon: ImageIcon },
    { id: 'footer', label: 'Footer', icon: Settings },
    { id: 'theme', label: 'Theme', icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-xs text-gray-500 mt-1">S-Body Fitness</p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  activeTab === tab.id 
                    ? "bg-orange-50 text-orange-600" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <tab.icon className="mr-3 h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={saveContent}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </button>
          <button
            onClick={resetContent}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </button>
          <button
            onClick={() => {
              const jsonString = JSON.stringify(content, null, 2);
              navigator.clipboard.writeText(jsonString);
              alert('JSON 데이터가 클립보드에 복사되었습니다. 채팅창에 붙여넣어 주세요!');
            }}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm mb-2"
          >
            <Download className="mr-2 h-4 w-4" />
            Export JSON
          </button>
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Export to HTML
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6 capitalize">
              Edit {activeTab}
            </h3>

            {/* Dynamic Form Generation based on Active Tab */}
            <div className="space-y-6">
              {activeTab === 'hero' && (
                <>
                  <InputField label="Brand Name" value={content.hero.brandName} onChange={(v) => updateSection('hero', { ...content.hero, brandName: v })} />
                  <StyleEditor label="Brand Name Style" value={content.hero.styles.brandName} onChange={(s) => updateSection('hero', { ...content.hero, styles: { ...content.hero.styles, brandName: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>
                  
                  <InputField label="Main Copy" value={content.hero.mainCopy} onChange={(v) => updateSection('hero', { ...content.hero, mainCopy: v })} textarea />
                  <StyleEditor label="Main Copy Style" value={content.hero.styles.mainCopy} onChange={(s) => updateSection('hero', { ...content.hero, styles: { ...content.hero.styles, mainCopy: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>

                  <InputField label="Sub Copy" value={content.hero.subCopy} onChange={(v) => updateSection('hero', { ...content.hero, subCopy: v })} />
                  <StyleEditor label="Sub Copy Style" value={content.hero.styles.subCopy} onChange={(s) => updateSection('hero', { ...content.hero, styles: { ...content.hero.styles, subCopy: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>

                  <InputField label="Background Image URL" value={content.hero.bgImage} onChange={(v) => updateSection('hero', { ...content.hero, bgImage: v })} />
                  <InputField label="CTA Text" value={content.hero.ctaText} onChange={(v) => updateSection('hero', { ...content.hero, ctaText: v })} />
                  <InputField label="CTA Sub Text" value={content.hero.ctaSubText} onChange={(v) => updateSection('hero', { ...content.hero, ctaSubText: v })} />
                  <InputField label="CTA Link" value={content.hero.ctaLink} onChange={(v) => updateSection('hero', { ...content.hero, ctaLink: v })} />
                </>
              )}

              {activeTab === 'uspSummary' && (
                <>
                  <InputField label="Background Image URL" value={content.uspSummary.bgImage} onChange={(v) => updateSection('uspSummary', { ...content.uspSummary, bgImage: v })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>
                  <InputField label="Head Copy" value={content.uspSummary.headCopy || ''} onChange={(v) => updateSection('uspSummary', { ...content.uspSummary, headCopy: v })} />
                  <StyleEditor label="Head Copy Style" value={content.uspSummary.styles.headCopy || defaultTextStyle} onChange={(s) => updateSection('uspSummary', { ...content.uspSummary, styles: { ...content.uspSummary.styles, headCopy: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>
                  <InputField label="Body Copy" value={content.uspSummary.bodyCopy || ''} onChange={(v) => updateSection('uspSummary', { ...content.uspSummary, bodyCopy: v })} textarea />
                  <StyleEditor label="Body Copy Style" value={content.uspSummary.styles.bodyCopy || defaultTextStyle} onChange={(s) => updateSection('uspSummary', { ...content.uspSummary, styles: { ...content.uspSummary.styles, bodyCopy: s } })} />

                  <div className="border-t border-gray-100 my-4"></div>
                  <h4 className="font-medium text-gray-900">Item Text Styles</h4>
                  <StyleEditor label="Item Title Style" value={content.uspSummary.styles.title} onChange={(s) => updateSection('uspSummary', { ...content.uspSummary, styles: { ...content.uspSummary.styles, title: s } })} />
                  <StyleEditor label="Item Description Style" value={content.uspSummary.styles.description} onChange={(s) => updateSection('uspSummary', { ...content.uspSummary, styles: { ...content.uspSummary.styles, description: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>

                  {content.uspSummary.items.map((item, idx) => (
                    <div key={idx} className="p-4 border rounded-md bg-gray-50">
                      <p className="text-sm font-bold mb-2">Item {idx + 1}</p>
                      <div className="space-y-2">
                        <InputField 
                          label="Title" 
                          value={item.title} 
                          onChange={(v) => {
                            const newItems = [...content.uspSummary.items];
                            newItems[idx].title = v;
                            updateSection('uspSummary', { ...content.uspSummary, items: newItems });
                          }} 
                        />
                        <InputField 
                          label="Description" 
                          value={item.description} 
                          onChange={(v) => {
                            const newItems = [...content.uspSummary.items];
                            newItems[idx].description = v;
                            updateSection('uspSummary', { ...content.uspSummary, items: newItems });
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'convention' && (
                <>
                  <InputField label="Title" value={content.convention.title} onChange={(v) => updateSection('convention', { ...content.convention, title: v })} />
                  <StyleEditor label="Title Style" value={content.convention.styles.title} onChange={(s) => updateSection('convention', { ...content.convention, styles: { ...content.convention.styles, title: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>

                  <InputField label="Section Image URL" value={content.convention.image} onChange={(v) => updateSection('convention', { ...content.convention, image: v })} />

                  <div className="border-t border-gray-100 my-4"></div>

                  <InputField label="Description" value={content.convention.description} onChange={(v) => updateSection('convention', { ...content.convention, description: v })} textarea />
                  <StyleEditor label="Description Style" value={content.convention.styles.description} onChange={(s) => updateSection('convention', { ...content.convention, styles: { ...content.convention.styles, description: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>

                  <InputField label="Main Copy" value={content.convention.mainCopy} onChange={(v) => updateSection('convention', { ...content.convention, mainCopy: v })} textarea />
                  <StyleEditor label="Main Copy Style" value={content.convention.styles.mainCopy} onChange={(s) => updateSection('convention', { ...content.convention, styles: { ...content.convention.styles, mainCopy: s } })} />
                </>
              )}

              {activeTab === 'disruption' && (
                <>
                  <InputField label="Background Image URL" value={content.disruption.bgImage} onChange={(v) => updateSection('disruption', { ...content.disruption, bgImage: v })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>

                  <InputField label="Title" value={content.disruption.title} onChange={(v) => updateSection('disruption', { ...content.disruption, title: v })} />
                  <StyleEditor label="Title Style" value={content.disruption.styles.title} onChange={(s) => updateSection('disruption', { ...content.disruption, styles: { ...content.disruption.styles, title: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>

                  <InputField label="Description" value={content.disruption.description} onChange={(v) => updateSection('disruption', { ...content.disruption, description: v })} textarea />
                  <StyleEditor label="Description Style" value={content.disruption.styles.description} onChange={(s) => updateSection('disruption', { ...content.disruption, styles: { ...content.disruption.styles, description: s } })} />
                  
                  <div className="border-t border-gray-100 my-4"></div>

                  <InputField label="Main Copy" value={content.disruption.mainCopy} onChange={(v) => updateSection('disruption', { ...content.disruption, mainCopy: v })} textarea />
                  <StyleEditor label="Main Copy Style" value={content.disruption.styles.mainCopy} onChange={(s) => updateSection('disruption', { ...content.disruption, styles: { ...content.disruption.styles, mainCopy: s } })} />
                </>
              )}

              {activeTab === 'detailedUsps' && (
                <div className="space-y-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Global Section Copy</h4>
                    <InputField label="Head Copy" value={content.detailedUsps.headCopy || ''} onChange={(v) => updateSection('detailedUsps', { ...content.detailedUsps, headCopy: v })} />
                    <StyleEditor label="Head Copy Style" value={content.detailedUsps.styles.headCopy || defaultTextStyle} onChange={(s) => updateSection('detailedUsps', { ...content.detailedUsps, styles: { ...content.detailedUsps.styles, headCopy: s } })} />
                    
                    <div className="h-4"></div>
                    <InputField label="Body Copy" value={content.detailedUsps.bodyCopy || ''} onChange={(v) => updateSection('detailedUsps', { ...content.detailedUsps, bodyCopy: v })} textarea />
                    <StyleEditor label="Body Copy Style" value={content.detailedUsps.styles.bodyCopy || defaultTextStyle} onChange={(s) => updateSection('detailedUsps', { ...content.detailedUsps, styles: { ...content.detailedUsps.styles, bodyCopy: s } })} />
                    
                    <div className="border-t border-gray-100 my-6"></div>
                    <h4 className="font-medium text-gray-900 mb-4">Item Text Styles</h4>
                    <StyleEditor label="Item Title Style" value={content.detailedUsps.styles.title} onChange={(s) => updateSection('detailedUsps', { ...content.detailedUsps, styles: { ...content.detailedUsps.styles, title: s } })} />
                    <div className="h-4"></div>
                    <StyleEditor label="Item Description Style" value={content.detailedUsps.styles.description} onChange={(s) => updateSection('detailedUsps', { ...content.detailedUsps, styles: { ...content.detailedUsps.styles, description: s } })} />
                  </div>
                  
                  <div className="border-t border-gray-200"></div>

                  {content.detailedUsps.sections.map((section, idx) => (
                    <div key={section.id} className="p-4 border rounded-md bg-gray-50 relative group">
                      <div className="absolute top-2 right-2 flex gap-2">
                         <span className="text-xs font-bold text-gray-400 uppercase">{section.type} {idx + 1}</span>
                         <button 
                            onClick={() => {
                              const newSections = content.detailedUsps.sections.filter((_, i) => i !== idx);
                              updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                            }}
                            className="text-red-500 hover:bg-red-50 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash size={14} />
                          </button>
                      </div>
                      
                      <div className="space-y-4 mt-2">
                        <InputField 
                          label="Title" 
                          value={section.title} 
                          onChange={(v) => {
                            const newSections = [...content.detailedUsps.sections];
                            newSections[idx].title = v;
                            updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                          }} 
                          textarea
                        />
                        <InputField 
                          label="Description" 
                          value={section.description} 
                          onChange={(v) => {
                            const newSections = [...content.detailedUsps.sections];
                            newSections[idx].description = v;
                            updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                          }} 
                          textarea
                        />

                        {section.type === 'card' && (
                           <InputField 
                            label="Image URL" 
                            value={section.image || ''} 
                            onChange={(v) => {
                              const newSections = [...content.detailedUsps.sections];
                              newSections[idx].image = v;
                              updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                            }} 
                          />
                        )}

                        {section.type === 'carousel' && (
                          <div className="mt-4 space-y-3">
                            <label className="block text-xs font-bold text-gray-500 uppercase">Carousel Items</label>
                            {section.items?.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex gap-2 items-start bg-white p-2 rounded border border-gray-200">
                                <div className="flex-1 space-y-2">
                                  <input 
                                    type="text" 
                                    placeholder="Item Text"
                                    value={item.text}
                                    onChange={(e) => {
                                      const newSections = [...content.detailedUsps.sections];
                                      if (newSections[idx].items) {
                                        newSections[idx].items![itemIdx].text = e.target.value;
                                        updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                                      }
                                    }}
                                    className="block w-full text-xs border-gray-300 rounded p-1 border"
                                  />
                                  <textarea 
                                    placeholder="Description (Optional)"
                                    value={item.description || ''}
                                    onChange={(e) => {
                                      const newSections = [...content.detailedUsps.sections];
                                      if (newSections[idx].items) {
                                        newSections[idx].items![itemIdx].description = e.target.value;
                                        updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                                      }
                                    }}
                                    className="block w-full text-xs border-gray-300 rounded p-1 border resize-y"
                                    rows={2}
                                  />
                                  <input 
                                    type="text" 
                                    placeholder="Image URL"
                                    value={item.image}
                                    onChange={(e) => {
                                      const newSections = [...content.detailedUsps.sections];
                                      if (newSections[idx].items) {
                                        newSections[idx].items![itemIdx].image = e.target.value;
                                        updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                                      }
                                    }}
                                    className="block w-full text-xs border-gray-300 rounded p-1 border"
                                  />
                                </div>
                                <button
                                  onClick={() => {
                                    const newSections = [...content.detailedUsps.sections];
                                    if (newSections[idx].items) {
                                      newSections[idx].items = newSections[idx].items!.filter((_, i) => i !== itemIdx);
                                      updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                                    }
                                  }}
                                  className="text-gray-400 hover:text-red-500 p-1"
                                >
                                  <Trash size={12} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newSections = [...content.detailedUsps.sections];
                                if (!newSections[idx].items) newSections[idx].items = [];
                                newSections[idx].items!.push({ text: 'New Item', description: '', image: '' });
                                updateSection('detailedUsps', { ...content.detailedUsps, sections: newSections });
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            >
                              <Plus size={12} className="mr-1" /> Add Item
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => {
                          updateSection('detailedUsps', { 
                            ...content.detailedUsps, 
                            sections: [...content.detailedUsps.sections, { 
                              id: Date.now().toString(),
                              type: 'card',
                              title: 'New Card USP', 
                              description: 'Description here', 
                              image: '' 
                            }] 
                          });
                        }}
                        className="py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center transition-colors text-sm"
                      >
                        <Plus size={16} className="mr-2" /> Add Card
                    </button>
                    <button
                        onClick={() => {
                          updateSection('detailedUsps', { 
                            ...content.detailedUsps, 
                            sections: [...content.detailedUsps.sections, { 
                              id: Date.now().toString(),
                              type: 'carousel',
                              title: 'New Carousel USP', 
                              description: 'Description here', 
                              items: [{ text: 'Item 1', image: '' }, { text: 'Item 2', image: '' }]
                            }] 
                          });
                        }}
                        className="py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center transition-colors text-sm"
                      >
                        <Plus size={16} className="mr-2" /> Add Carousel
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notices' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Show Notices Section</span>
                    <button 
                      onClick={() => updateSection('notices', { ...content.notices, show: !content.notices.show })}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                        content.notices.show ? "bg-orange-500" : "bg-gray-200"
                      )}
                    >
                      <span className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        content.notices.show ? "translate-x-6" : "translate-x-1"
                      )} />
                    </button>
                  </div>
                  <InputField label="Section Title" value={content.notices.title} onChange={(v) => updateSection('notices', { ...content.notices, title: v })} />
                  <InputField label="Section Description" value={content.notices.description || ''} onChange={(v) => updateSection('notices', { ...content.notices, description: v })} textarea />
                  
                  <div className="space-y-4">
                    {content.notices.items.map((item, idx) => (
                      <div key={idx} className="p-4 border rounded-md bg-gray-50 relative group">
                        <button 
                          onClick={() => {
                            const newItems = content.notices.items.filter((_, i) => i !== idx);
                            updateSection('notices', { ...content.notices, items: newItems });
                          }}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash size={16} />
                        </button>
                        <div className="grid grid-cols-1 gap-3">
                          <InputField 
                            label="Title" 
                            value={item.title} 
                            onChange={(v) => {
                              const newItems = [...content.notices.items];
                              newItems[idx].title = v;
                              updateSection('notices', { ...content.notices, items: newItems });
                            }} 
                          />
                          <InputField 
                            label="Description" 
                            value={item.description || ''} 
                            onChange={(v) => {
                              const newItems = [...content.notices.items];
                              newItems[idx].description = v;
                              updateSection('notices', { ...content.notices, items: newItems });
                            }} 
                          />
                          <div className="grid grid-cols-1 gap-3">
                            <InputField 
                              label="Date" 
                              value={item.date} 
                              onChange={(v) => {
                                const newItems = [...content.notices.items];
                                newItems[idx].date = v;
                                updateSection('notices', { ...content.notices, items: newItems });
                              }} 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        updateSection('notices', { 
                          ...content.notices, 
                          items: [...content.notices.items, { title: 'New Notice', date: new Date().toLocaleDateString(), link: '#' }] 
                        });
                      }}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center transition-colors"
                    >
                      <Plus size={16} className="mr-2" /> Add Notice
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'outro' && (
                <>
                  <InputField label="CTA Text" value={content.outro.ctaText} onChange={(v) => updateSection('outro', { ...content.outro, ctaText: v })} />
                  <InputField label="Map Image URL" value={content.outro.mapImage} onChange={(v) => updateSection('outro', { ...content.outro, mapImage: v })} />
                  <InputField label="Map Link" value={content.outro.mapLink} onChange={(v) => updateSection('outro', { ...content.outro, mapLink: v })} />
                </>
              )}

              {activeTab === 'footer' && (
                <>
                  <InputField label="Brand Name" value={content.footer.brandName} onChange={(v) => updateSection('footer', { ...content.footer, brandName: v })} />
                  <InputField label="Address" value={content.footer.address} onChange={(v) => updateSection('footer', { ...content.footer, address: v })} />
                  <InputField label="Hours" value={content.footer.hours} onChange={(v) => updateSection('footer', { ...content.footer, hours: v })} />
                  <InputField label="Phone" value={content.footer.phone} onChange={(v) => updateSection('footer', { ...content.footer, phone: v })} />
                  <InputField label="Instagram Link" value={content.footer.instagram} onChange={(v) => updateSection('footer', { ...content.footer, instagram: v })} />
                  <InputField label="Blog Link" value={content.footer.blog} onChange={(v) => updateSection('footer', { ...content.footer, blog: v })} />
                </>
              )}

              {activeTab === 'theme' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Primary Color" value={content.theme.primaryColor} onChange={(v) => updateSection('theme', { ...content.theme, primaryColor: v })} type="color" />
                    <InputField label="Accent Color" value={content.theme.accentColor} onChange={(v) => updateSection('theme', { ...content.theme, accentColor: v })} type="color" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                    <select 
                      value={content.theme.fontFamily} 
                      onChange={(e) => updateSection('theme', { ...content.theme, fontFamily: e.target.value })}
                      className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    >
                      <option value="Pretendard">Pretendard</option>
                      <option value="GmarketSans">Gmarket Sans</option>
                      <option value="Inter">Inter</option>
                      <option value="sans-serif">System Sans</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Inputs
const InputField = ({ 
  label, 
  value, 
  onChange, 
  textarea = false, 
  type = "text" 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void; 
  textarea?: boolean;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
      />
    )}
  </div>
);

// Style Editor Component
const StyleEditor = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: TextStyle;
  onChange: (style: TextStyle) => void;
}) => {
  return (
    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
      <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">{label}</span>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Size</label>
          <select 
            value={value.fontSize} 
            onChange={(e) => onChange({ ...value, fontSize: e.target.value })}
            className="w-full text-xs border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="xs">XS</option>
            <option value="sm">SM</option>
            <option value="base">Base</option>
            <option value="lg">LG</option>
            <option value="xl">XL</option>
            <option value="2xl">2XL</option>
            <option value="3xl">3XL</option>
            <option value="4xl">4XL</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Weight</label>
          <select 
            value={value.fontWeight} 
            onChange={(e) => onChange({ ...value, fontWeight: e.target.value })}
            className="w-full text-xs border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="bold">Bold</option>
            <option value="extrabold">Extra Bold</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Align</label>
          <div className="flex border border-gray-300 rounded-md bg-white overflow-hidden">
            <button 
              onClick={() => onChange({ ...value, textAlign: 'left' })}
              className={cn("flex-1 p-1 flex justify-center hover:bg-gray-50", value.textAlign === 'left' && "bg-orange-100 text-orange-600")}
            >
              <AlignLeft size={14} />
            </button>
            <button 
              onClick={() => onChange({ ...value, textAlign: 'center' })}
              className={cn("flex-1 p-1 flex justify-center hover:bg-gray-50 border-l border-r border-gray-300", value.textAlign === 'center' && "bg-orange-100 text-orange-600")}
            >
              <AlignCenter size={14} />
            </button>
            <button 
              onClick={() => onChange({ ...value, textAlign: 'right' })}
              className={cn("flex-1 p-1 flex justify-center hover:bg-gray-50", value.textAlign === 'right' && "bg-orange-100 text-orange-600")}
            >
              <AlignRight size={14} />
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input 
              type="color" 
              value={value.color} 
              onChange={(e) => onChange({ ...value, color: e.target.value })}
              className="h-8 w-8 rounded cursor-pointer border-0 p-0"
            />
            <span className="text-xs text-gray-500 font-mono">{value.color}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
